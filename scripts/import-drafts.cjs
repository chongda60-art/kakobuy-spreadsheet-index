const fs = require('node:fs');
const path = require('node:path');

const sourceDir = 'E:/seo/seo_task_records/kakobuy-content-release-2026-09-14';
const files = [
  ['KAKOBUY_QC_PHOTOS_FINAL.md', 'where-to-see-kakobuy-qc-photos', 'QC photos'],
  ['KAKOBUY_PRODUCT_LINK_NOT_WORKING_FINAL.md', 'kakobuy-product-link-not-working', 'Product links'],
  ['KAKOBUY_SPREADSHEET_WITH_QC_FINAL.md', 'choose-kakobuy-spreadsheet-with-qc-photos', 'Spreadsheets'],
];
function field(text, label) { return (text.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`)) || [,''])[1].trim(); }
function section(text, heading) {
  const match = text.match(new RegExp(`## ${heading}\\n\\n([\\s\\S]*?)(?=\\n## |$)`));
  return match ? match[1].trim() : '';
}
const articles = files.map(([file, slug, topic]) => {
  const raw = fs.readFileSync(path.join(sourceDir, file), 'utf8');
  const quickAnswer = section(raw, 'Quick Answer');
  const draft = raw.split('## Quick Answer')[1].split('## Sources')[0].trim();
  const faqBlock = section(raw, 'FAQ');
  const faq = [...faqBlock.matchAll(/### (.+)\n\n([\s\S]*?)(?=\n### |$)/g)].map(([, question, answer]) => ({ question: question.trim(), answer: answer.trim() }));
  const sources = section(raw, 'Sources').split(/\n- /).map((item) => item.replace(/^- /, '').trim()).filter(Boolean);
  const body = draft.replace(/^.*?\n\n/, '').replace(/\n## FAQ[\s\S]*$/, '').trim();
  return { slug, topic, title: field(raw, 'Final Title'), meta: field(raw, 'Meta'), targetKeyword: field(raw, 'Primary keyword'), quickAnswer, body, faq, sources, status: 'review', wordCount: body.split(/\s+/).length };
});
fs.mkdirSync('content', { recursive: true });
fs.writeFileSync('content/questions.json', JSON.stringify(articles, null, 2));
console.log(`Imported ${articles.length} Kakobuy drafts`);
