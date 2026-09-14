# Kakobuy GSC read-only check

- Checked at: 2026-09-14
- OAuth property-list request: HTTP 200
- Kakobuy property exists in the owner’s Search Console UI, but is not visible to the configured local OAuth service account: **No access**
- Properties returned: `https://www.curicart.com/`, `https://oopbuyanswers.com/`
- Kakobuy sitemap status request: **not attempted** because the property was not present in the readable property list.
- No write API was called and no other property was changed.

The result is an identity mismatch, not evidence that the property is absent. A controllable browser/CDP session for the owner UI was not available in this environment, so no browser read was attempted. Re-run the same read-only check after this OAuth identity is granted access or a verified browser session becomes controllable.
