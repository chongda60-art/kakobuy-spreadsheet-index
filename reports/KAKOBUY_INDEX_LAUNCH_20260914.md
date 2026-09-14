# Kakobuy index launch

- Production URL: https://kakobuyspreadsheetindex.com
- Vercel deployment: `dpl_AZLsLC5eDS2qJ9ioA2ZrbfvprGKy`
- Git commit: `2537217`
- Launch time: 2026-09-14

## Index scope

The following five URLs are `index, follow`, self-canonical, HTTP 200, and the only URLs in sitemap.xml:

- `/`
- `/questions`
- `/questions/where-to-see-kakobuy-qc-photos`
- `/questions/kakobuy-product-link-not-working`
- `/questions/choose-kakobuy-spreadsheet-with-qc-photos`

Topic, Sources, About, Contact, and Privacy pages remain `noindex, follow` and are not in the sitemap.

## Discovery submissions

The five URLs were submitted once as one IndexNow batch to each endpoint:

- `https://api.indexnow.org/indexnow`: HTTP 202
- `https://yandex.com/indexnow`: HTTP 202

No Google Indexing API was used. No social or external-link submission was made.

## Google Search Console

The read-only property list returned `https://www.curicart.com/` and `https://oopbuyanswers.com/`; no Kakobuy-specific property was available. The existing GSC helper is CuriCart-specific, so no Google sitemap submission was made and no CuriCart property was changed.

## Verification

- `pnpm check`, `pnpm lint`, `pnpm build`: passed.
- `scripts/verify-launch.cjs`: all required URLs 200, self-canonical, expected robots, exact five sitemap URLs, no forbidden terms, valid CuriCart attribution, and no horizontal overflow at 390/768/1440.
- Article pages each have H1=1, FAQ=5, Article + FAQPage JSON-LD.
- robots.txt allows `/` and declares the sitemap.

Evidence:

- `E:/seo/reports/kakobuy-spreadsheet-index/KAKOBUY_LAUNCH_VERIFICATION_20260914.json`
- `E:/seo/reports/kakobuy-spreadsheet-index/KAKOBUY_INDEXNOW_SUBMISSION_20260914.json`
- `E:/seo/reports/kakobuy-spreadsheet-index/ui-launch-20260914/`
