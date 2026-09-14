# Kakobuy second-batch release

- Production: https://kakobuyspreadsheetindex.com
- Vercel deployment: `dpl_DjBweUz1E9ZXRyNY69BevZMhCLot`
- Content commit: `3aa8549`
- New routes: 2

## New approved pages

- `/questions/how-to-read-a-kakobuy-weidian-link`
- `/questions/kakobuy-shoe-size-chart-and-labels-guide`

Both pages use only the Final English Draft content. Each has its approved meta, one H1, five FAQ items, Article + FAQPage JSON-LD, the existing three CuriCart category cards, complete attribution parameters, and no local product detail links.

## Validation

- `pnpm check`: passed
- `pnpm lint`: passed
- `pnpm build`: passed
- Production URL validation: both new pages HTTP 200, self-canonical, `index, follow`, H1=1, FAQ=5, applicable schema present, CuriCart UTM errors=0.
- Visible content checks: Weidian page 1110 words; shoe labels page 1021 words; internal review sections were not rendered.
- Mobile overflow: 390/768/1440 checks passed.
- Sitemap: 7 URLs total, including both new pages; no auxiliary topic/source pages added.
- Weekly monitor after deployment: PASS, 7 URLs, failureCount=0.

## Discovery

Only the two new URLs were submitted once to each endpoint:

- `https://api.indexnow.org/indexnow`: HTTP 200
- `https://yandex.com/indexnow`: HTTP 200

No Google submission was made because the owner already handled the GSC sitemap. No DNS or CuriCart changes were made.

Evidence:

- `E:/seo/reports/kakobuy-spreadsheet-index/KAKOBUY_SECOND_BATCH_PRODUCTION_VALIDATION.json`
- `E:/seo/reports/kakobuy-spreadsheet-index/monitor/KAKOBUY_WEEKLY_MONITOR_2026-09-14.json`
- `E:/seo/reports/kakobuy-spreadsheet-index/ui-second-batch-20260914/`
