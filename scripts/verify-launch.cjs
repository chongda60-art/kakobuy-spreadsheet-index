const { chromium } = require('E:/seo/node_modules/playwright');
const base = process.env.KAKOBUY_BASE_URL || 'https://kakobuyspreadsheetindex.com';
const indexable = ['/', '/questions', '/questions/where-to-see-kakobuy-qc-photos', '/questions/kakobuy-product-link-not-working', '/questions/choose-kakobuy-spreadsheet-with-qc-photos', '/questions/how-to-read-a-kakobuy-weidian-link', '/questions/kakobuy-shoe-size-chart-and-labels-guide'];
const noindex = ['/topics/qc-photos', '/sources', '/about', '/contact', '/privacy'];
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const routes = [...indexable, ...noindex];
  const pages = [];
  for (const route of routes) {
    const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    const data = await page.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      robots: document.querySelector('meta[name="robots"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      faq: [...document.querySelectorAll('.related')].find((s) => s.querySelector('h2')?.textContent === 'FAQ')?.querySelectorAll('h3').length || 0,
      schema: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent || ''),
      forbidden: /CuriCart Bridge|bridge|approved data|referral UTM|These links leave|Open category on CuriCart|The user wants|Publishing Notes|Evidence Summary/i.test(document.body.innerText),
      badCuricartLinks: [...document.querySelectorAll('a[href*="www.curicart.com"]')].filter((a) => { try { const u = new URL(a.href); return u.origin !== 'https://www.curicart.com' || ['utm_source','utm_medium','utm_campaign','utm_content'].some((key) => !u.searchParams.get(key)); } catch { return true; } }).length,
    }));
    pages.push({ route, status: response?.status() || 0, ...data });
  }
  const robotsText = await (await fetch(`${base}/robots.txt`)).text();
  const sitemapText = await (await fetch(`${base}/sitemap.xml`)).text();
  const sitemapUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const mobile = [];
  for (const width of [390, 768, 1440]) { await page.setViewportSize({ width, height: 900 }); await page.goto(`${base}/questions/where-to-see-kakobuy-qc-photos`, { waitUntil: 'networkidle' }); mobile.push({ width, scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth), viewport: width }); }
  const result = { generatedAt: new Date().toISOString(), pages, robots: robotsText, sitemapUrls, mobile, exactSitemap: JSON.stringify(sitemapUrls.sort()) === JSON.stringify(indexable.map((x) => `${base}${x}`).sort()) };
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
