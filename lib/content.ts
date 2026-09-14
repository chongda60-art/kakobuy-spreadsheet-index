import rawArticles from "@/content/questions.json";

export type Article = (typeof rawArticles)[number];
export const articles = rawArticles as Article[];
export const topics = [
  { slug: "qc-photos", name: "QC photos", description: "How to separate warehouse images from listing and research photos." },
  { slug: "product-links", name: "Product links", description: "Checks for source URLs, item IDs, and changing marketplace pages." },
  { slug: "spreadsheets", name: "Spreadsheets", description: "A row-by-row way to judge product lists and image context." },
];
export function getArticle(slug: string) { return articles.find((article) => article.slug === slug); }
export function getTopic(slug: string) { return topics.find((topic) => topic.slug === slug); }
