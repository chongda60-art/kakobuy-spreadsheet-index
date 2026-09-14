const fs = require('node:fs');
const path = require('node:path');

const sourceDir = 'F:/seojieliu/content/kakobuy-first-content-validation';
const files = [
  ['KAKOBUY_QC_PHOTOS_DRAFT.md', 'where-to-see-kakobuy-qc-photos', 'QC photos'],
  ['KAKOBUY_PRODUCT_LINK_NOT_WORKING_DRAFT.md', 'kakobuy-product-link-not-working', 'Product links'],
  ['KAKOBUY_SPREADSHEET_WITH_QC_DRAFT.md', 'choose-kakobuy-spreadsheet-with-qc-photos', 'Spreadsheets'],
];
function field(text, label) { return (text.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`)) || [,''])[1].trim(); }
function section(text, heading) {
  const match = text.match(new RegExp(`## ${heading}\\n\\n([\\s\\S]*?)(?=\\n## |$)`));
  return match ? match[1].trim() : '';
}
const articles = files.map(([file, slug, topic]) => {
  const raw = fs.readFileSync(path.join(sourceDir, file), 'utf8');
  const draft = raw.split('# Final English Draft')[1].split('## References Used for This Guide')[0].trim();
  const faqBlock = section(draft, 'FAQ');
  const faq = [...faqBlock.matchAll(/### (.+)\n\n([\s\S]*?)(?=\n### |$)/g)].map(([, question, answer]) => ({ question: question.trim(), answer: answer.trim() }));
  const body = draft.replace(/\n## FAQ[\s\S]*$/, '').trim();
  return { slug, topic, title: field(raw, 'Suggested title'), meta: field(raw, 'Suggested meta'), targetKeyword: field(raw, 'Target keyword'), quickAnswer: section(draft, 'Quick Answer'), body, faq, status: 'review', wordCount: body.split(/\s+/).length };
});
fs.mkdirSync('content', { recursive: true });
fs.writeFileSync('content/questions.json', JSON.stringify(articles, null, 2));
console.log(`Imported ${articles.length} Kakobuy drafts`);
