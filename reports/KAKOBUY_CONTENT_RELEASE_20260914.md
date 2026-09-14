# Kakobuy first content release validation

## Release

- Commit: `89c387a add approved Kakobuy question guides`
- GitHub: `https://github.com/chongda60-art/kakobuy-spreadsheet-index`
- Vercel deployment: `dpl_CLbo3M7qHkJ68Kg3kUosVWxPRJoa`
- Production: `https://kakobuyspreadsheetindex.com`
- Inspector: `https://vercel.com/chen-d2eb/kakobuy-spreadsheet-index/CLbo3M7qHkJ68Kg3kUosVWxPRJoa`

## Published question routes (still noindex)

- `/questions/where-to-see-kakobuy-qc-photos`
- `/questions/kakobuy-product-link-not-working`
- `/questions/choose-kakobuy-spreadsheet-with-qc-photos`

Each route has one H1, five visible FAQ questions, a self-canonical URL, Article and FAQPage JSON-LD, and the approved three-category reader-facing section: Shoe, Accessories, and Electronics.

## Validation

- `pnpm check`: passed
- `pnpm lint`: passed
- `pnpm build`: passed
- `node scripts/verify-site.cjs`: passed locally and on production
- Visible words: 1410 / 1535 / 1565 on the three question pages
- Forbidden front-end terms: 0
- Local `/product/` links: 0
- Invalid CuriCart UTM links: 0
- Mobile/tablet/desktop horizontal overflow: 0 at 390 / 768 / 1440 px
- `robots.txt`: `Disallow: /`
- `sitemap.xml`: empty
- Page robots: `noindex, follow`

Reports and screenshots:

- `E:/seo/reports/kakobuy-spreadsheet-index/KAKOBUY_THREE_ARTICLE_VALIDATION.json`
- `E:/seo/reports/kakobuy-spreadsheet-index/KAKOBUY_THREE_ARTICLE_PRODUCTION_VALIDATION.json`
- `E:/seo/reports/kakobuy-spreadsheet-index/ui-production-20260914/`

## Next gate

SEO Strategy Director must separately approve changing the site from noindex to index and opening robots/sitemap. No search submission was made in this release.
