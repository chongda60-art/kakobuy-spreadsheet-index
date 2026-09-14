const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('E:/seo/node_modules/playwright');

const baseUrl = (process.env.KAKOBUY_BASE_URL || 'https://kakobuyspreadsheetindex.com').replace(/\/$/, '');
const outputDir = path.resolve(process.env.KAKOBUY_MONITOR_OUTPUT || 'E:/seo/reports/kakobuy-spreadsheet-index/monitor');
const date = new Date().toISOString().slice(0, 10);

function fail(route, check, detail) { return { route, check, detail }; }

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const failures = [];
  const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
  const robotsText = await robotsResponse.text();
  if (!robotsResponse.ok) failures.push(fail('/robots.txt', 'http', String(robotsResponse.status)));
  if (!/Allow:\s*\//i.test(robotsText)) failures.push(fail('/robots.txt', 'allow', 'Allow: / missing'));
  if (!robotsText.split(/\r?\n/).some((line) => line.trim().toLowerCase() === `sitemap: ${baseUrl}/sitemap.xml`.toLowerCase())) failures.push(fail('/robots.txt', 'sitemap', 'sitemap declaration missing'));

  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
  const sitemapText = await sitemapResponse.text();
  if (!sitemapResponse.ok) failures.push(fail('/sitemap.xml', 'http', String(sitemapResponse.status)));
  const urls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  if (!urls.length) failures.push(fail('/sitemap.xml', 'urls', 'no sitemap URLs'));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  for (const url of urls) {
    const route = new URL(url).pathname || '/';
    let response;
    try { response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }); } catch (error) { failures.push(fail(route, 'navigation', error.message.split('\n')[0])); continue; }
    const checks = await page.evaluate(() => {
      const robots = document.querySelector('meta[name="robots"]')?.content || '';
      const canonical = document.querySelector('link[rel="canonical"]')?.href || '';
      const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => { try { return JSON.parse(node.textContent || '{}')['@type']; } catch { return null; } }).filter(Boolean);
      const curicartLinks = [...document.querySelectorAll('a[href*="www.curicart.com"]')];
      const badCuricart = curicartLinks.filter((anchor) => { try { const u = new URL(anchor.href); return u.origin !== 'https://www.curicart.com' || ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].some((key) => !u.searchParams.get(key)); } catch { return true; } }).length;
      return { robots, canonical, title: document.title, h1: document.querySelectorAll('h1').length, schema, badCuricart, scrollWidth: document.documentElement.scrollWidth, viewportWidth: window.innerWidth };
    });
    if (!response || response.status() !== 200) failures.push(fail(route, 'http', String(response?.status() || 0)));
    if (!checks.canonical || checks.canonical !== url) failures.push(fail(route, 'canonical', checks.canonical || 'missing'));
    if (!/index\s*,?\s*follow/i.test(checks.robots)) failures.push(fail(route, 'robots', checks.robots || 'missing'));
    if (!checks.title) failures.push(fail(route, 'title', 'missing'));
    if (checks.h1 !== 1) failures.push(fail(route, 'h1', String(checks.h1)));
    if (route.startsWith('/questions/') && route !== '/questions') {
      if (!checks.schema.includes('Article')) failures.push(fail(route, 'schema', 'Article missing'));
      if (!checks.schema.includes('FAQPage')) failures.push(fail(route, 'schema', 'FAQPage missing'));
    }
    if (checks.badCuricart) failures.push(fail(route, 'curicart_utm', String(checks.badCuricart)));
    if (checks.scrollWidth > checks.viewportWidth) failures.push(fail(route, 'mobile_overflow', `${checks.scrollWidth}>${checks.viewportWidth}`));
  }
  await browser.close();

  const summary = { checkedAt: new Date().toISOString(), baseUrl, sitemapUrlCount: urls.length, passed: failures.length === 0, failureCount: failures.length, failures };
  const jsonPath = path.join(outputDir, `KAKOBUY_WEEKLY_MONITOR_${date}.json`);
  const markdownPath = path.join(outputDir, `KAKOBUY_WEEKLY_MONITOR_${date}.md`);
  fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2));
  const lines = [`# Kakobuy weekly monitor — ${date}`, '', `- Production: ${baseUrl}`, `- Sitemap URLs checked: ${urls.length}`, `- Result: ${summary.passed ? 'PASS' : 'FAIL'}`, `- Failures: ${failures.length}`, ''];
  if (failures.length) { lines.push('## Failed checks', '', ...failures.map((item) => `- ${item.route} — ${item.check}: ${item.detail}`)); } else { lines.push('All sitemap URLs passed HTTP, canonical, robots, title, H1, applicable schema, CuriCart attribution, and 390px overflow checks.'); }
  fs.writeFileSync(markdownPath, lines.join('\n'));
  console.log(JSON.stringify({ passed: summary.passed, sitemapUrlCount: urls.length, failureCount: failures.length, jsonPath, markdownPath }));
  process.exitCode = failures.length ? 1 : 0;
})().catch((error) => { console.error(error.message); process.exitCode = 1; });
