"""Bounded Kakobuy Search Console property/sitemap attempt.

Uses the existing read-only service-account configuration. It never prints or
stores OAuth tokens or verification values. Add --attempt to make one Sites.add
call; sitemap submission only occurs if the property is then visible.
"""
import argparse
import json
from pathlib import Path
from urllib.parse import quote

import requests
from google.auth.transport.requests import Request
from google.oauth2 import service_account

SITE = "https://kakobuyspreadsheetindex.com/"
SITEMAP = "https://kakobuyspreadsheetindex.com/sitemap.xml"
READONLY = "https://www.googleapis.com/auth/webmasters.readonly"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--attempt", action="store_true")
    parser.add_argument("--report", default="E:/seo/reports/kakobuy-spreadsheet-index/KAKOBUY_GSC_AUTO_RECOVERY_20260914.json")
    args = parser.parse_args()
    config = json.loads((Path.home() / ".config/codex-seo/google-api.json").read_text())
    session = requests.Session()
    session.trust_env = False
    session.proxies = {"http": "http://127.0.0.1:10808", "https": "http://127.0.0.1:10808"}
    credentials = service_account.Credentials.from_service_account_file(config["service_account_path"], scopes=[READONLY])
    credentials.refresh(Request(session=session))
    token_info = session.get("https://oauth2.googleapis.com/tokeninfo", params={"access_token": credentials.token}, timeout=30)
    token_json = token_info.json() if token_info.ok else {}
    result = {"tokeninfo_status": token_info.status_code, "scope": token_json.get("scope"), "sites_add": None, "property_list": None, "sitemap_submit": None, "siteverification": "skipped_scope_missing"}
    headers = {"Authorization": "Bearer " + credentials.token}
    if args.attempt:
        response = session.put("https://www.googleapis.com/webmasters/v3/sites/" + quote(SITE, safe=""), headers=headers, timeout=30)
        result["sites_add"] = {"status": response.status_code, "category": "scope_or_permission" if response.status_code in (401, 403) else ("success" if response.ok else "platform_error")}
    properties_response = session.get("https://www.googleapis.com/webmasters/v3/sites", headers=headers, timeout=30)
    properties = [entry.get("siteUrl") for entry in properties_response.json().get("siteEntry", [])] if properties_response.ok else []
    result["property_list"] = {"status": properties_response.status_code, "properties": properties, "kakobuy_managed": SITE in properties}
    if result["property_list"]["kakobuy_managed"] and result["sites_add"] and result["sites_add"]["category"] == "success":
        sitemap_response = session.put("https://www.googleapis.com/webmasters/v3/sites/" + quote(SITE, safe="") + "/sitemaps/" + quote(SITEMAP, safe=""), headers=headers, timeout=30)
        result["sitemap_submit"] = {"status": sitemap_response.status_code, "category": "success" if sitemap_response.ok else "platform_error"}
    else:
        result["sitemap_submit"] = {"status": None, "category": "not_attempted_property_not_managed_or_add_failed"}
    Path(args.report).parent.mkdir(parents=True, exist_ok=True)
    Path(args.report).write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(args.report)


if __name__ == "__main__":
    main()
