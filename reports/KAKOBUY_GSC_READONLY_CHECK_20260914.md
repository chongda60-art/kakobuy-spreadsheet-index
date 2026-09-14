# Kakobuy GSC read-only check

- Checked at: 2026-09-14
- OAuth property-list request: HTTP 200
- Kakobuy property visible to the configured OAuth service account: **No**
- Properties returned: `https://www.curicart.com/`, `https://oopbuyanswers.com/`
- Kakobuy sitemap status request: **not attempted** because the property was not present in the readable property list.
- No write API was called and no other property was changed.

This configured OAuth identity does not yet expose the manually verified Kakobuy URL-prefix property. Re-run the same read-only check after the property is granted to this identity or after Search Console permissions propagate.
