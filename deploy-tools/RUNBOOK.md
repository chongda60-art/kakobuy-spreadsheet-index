# Kakobuy Spreadsheet Index Runbook

All commands run from `E:\seo\kakobuy-spreadsheet-index`.

1. `powershell -ExecutionPolicy Bypass -File deploy-tools\preflight.ps1`
2. `powershell -ExecutionPolicy Bypass -File deploy-tools\build.ps1`
3. Start local preview with `pnpm dev -p 3130`.
4. Run `powershell -ExecutionPolicy Bypass -File deploy-tools\verify.ps1` and `node scripts\capture-screenshots.cjs`.
5. Deploy only after review: `powershell -ExecutionPolicy Bypass -File deploy-tools\deploy.ps1 -Production`.

## Weekly read-only monitor

Run once per week after the production site is stable:

```powershell
powershell -ExecutionPolicy Bypass -File deploy-tools\monitor.ps1
```

The script reads the live sitemap and checks every listed URL for HTTP 200, self-canonical, `index, follow`, title, one H1, applicable Article/FAQPage schema, CuriCart attribution parameters, and 390px horizontal overflow. It writes only aggregate pass/fail results and failed URLs under `E:\seo\reports\kakobuy-spreadsheet-index\monitor\`.

Use `deploy-tools\GSC_14_DAY_REVIEW_TEMPLATE.md` for a separate 14-day Search Console review. It is a blank template and does not represent collected GSC data.

The project intentionally remains `noindex, follow`, robots-disallowed, and uses an empty sitemap until a separate SEO approval changes that policy. Do not bind the domain, edit DNS, or submit URLs from this runbook. Product cards remain hidden until an approved stable CuriCart product API contract exists. Category links are generated in `lib/links.ts` with the required campaign parameters.
