# Kakobuy GSC automatic recovery attempt

- OAuth tokeninfo scope: `https://www.googleapis.com/auth/webmasters.readonly`
- `sites.add` for `https://kakobuyspreadsheetindex.com/`: HTTP 403, insufficient authentication scopes.
- Property list reread: HTTP 200; properties were `https://www.curicart.com/` and `https://oopbuyanswers.com/` only.
- Kakobuy property managed: no.
- Kakobuy sitemap submission: not attempted because the property was not managed and the add call failed.
- Site Verification API: not attempted because the available token did not include a site-verification scope.
- Google Indexing API: not used.

The reusable bounded script is `scripts/gsc-kakobuy-launch.py`. It writes status categories only and never writes OAuth tokens or verification values.
