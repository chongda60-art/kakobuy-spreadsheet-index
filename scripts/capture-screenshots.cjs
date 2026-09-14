const { chromium } = require('E:/seo/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const baseURL = process.env.KAKOBUY_BASE_URL || 'http://localhost:3130';
const out = path.resolve(process.env.KAKOBUY_SCREENSHOT_DIR || 'E:/seo/reports/kakobuy-spreadsheet-index/ui');
fs.mkdirSync(out, { recursive: true });
(async () => { const browser = await chromium.launch({ headless: true }); for (const [name, width] of [['mobile',390],['tablet',768],['desktop',1440]]) { const page = await browser.newPage({ viewport: { width, height: 1000 } }); for (const [slug, route] of [['home','/'],['questions','/questions'],['qc','/questions/where-to-see-kakobuy-qc-photos'],['topic','/topics/qc-photos']]) { await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' }); await page.screenshot({ path: path.join(out, `${slug}-${name}.png`), fullPage: true }); } await page.close(); } await browser.close(); console.log(out); })();
