const fs = require('node:fs');
const path = require('node:path');

const sourceDir = 'E:/seo/seo_task_records/kakobuy-second-batch-2026-09-14';
const files = [
  ['KAKOBUY_WEIDIAN_LINK_DRAFT.md', 'how-to-read-a-kakobuy-weidian-link', 'Product links'],
  ['KAKOBUY_SHOE_SIZE_LABELS_DRAFT.md', 'kakobuy-shoe-size-chart-and-labels-guide', 'Sizing'],
];
function field(text, label) { return (text.match(new RegExp(`^## ${label}\\s*$\\n\\n([^\\n]+)`, 'm')) || text.match(new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+)$`, 'm')) || [, ''])[1].trim(); }
function section(text, heading) { const match = text.match(new RegExp(`## ${heading}\\n\\n([\\s\\S]*?)(?=\\n## |$)`)); return match ? match[1].trim() : ''; }
function parse(file, slug, topic) {
  const raw = fs.readFileSync(path.join(sourceDir, file), 'utf8');
  const draft = raw.split('## Final English Draft')[1].split('## Internal Links')[0].trim();
  const quickAnswer = section(draft, 'Quick Answer');
  const faqBlock = section(draft, 'FAQ');
  const faq = [...faqBlock.matchAll(/### (.+)\n\n([\s\S]*?)(?=\n### |$)/g)].map(([, question, answer]) => ({ question: question.trim(), answer: answer.trim() }));
  const sources = section(draft, 'Sources').split(/\n- /).map((item) => item.replace(/^- /, '').trim()).filter(Boolean);
  const body = draft.split('## Quick Answer')[1].replace(/^\s*[\s\S]*?\n\n(?=## Why This Matters|## Separate the Size Label)/, '').replace(/\n## FAQ[\s\S]*$/, '').trim();
  return { slug, topic, title: field(raw, 'Suggested Title'), h1: field(raw, 'H1'), meta: field(raw, 'Suggested Meta'), targetKeyword: field(raw, 'Primary Keyword'), quickAnswer, body, faq, sources, status: 'approved', wordCount: body.split(/\s+/).length };
}
const contentPath = path.resolve('content/questions.json');
const articles = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
for (const entry of files.map((item) => parse(...item))) {
  const index = articles.findIndex((article) => article.slug === entry.slug);
  if (index >= 0) articles[index] = entry; else articles.push(entry);
}
fs.writeFileSync(contentPath, JSON.stringify(articles, null, 2));
console.log(JSON.stringify(files.map(([, slug]) => { const article = articles.find((item) => item.slug === slug); return { slug, words: article.wordCount, faq: article.faq.length }; })));
