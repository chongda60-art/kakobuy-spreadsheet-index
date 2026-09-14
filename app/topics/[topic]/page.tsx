import { notFound } from "next/navigation";
import { Footer, Header, ArticleCard } from "../../components";
import { articles, getTopic } from "@/lib/content";
import { categories, curicartLink } from "@/lib/links";

type Params = Promise<{ topic: string }>;
export function generateStaticParams() { return [{ topic: "qc-photos" }, { topic: "product-links" }, { topic: "spreadsheets" }]; }
export async function generateMetadata({ params }: { params: Params }) { const { topic: slug } = await params; const topic = getTopic(slug); return topic ? { title: topic.name, description: topic.description, robots: { index: false, follow: false } } : {}; }
export default async function TopicPage({ params }: { params: Params }) {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const matching = articles.filter((article) => article.topic.toLowerCase().includes(topic.name.split(" ")[0].toLowerCase()) || (topic.slug === "spreadsheets" && article.topic === "Spreadsheets") || (topic.slug === "product-links" && article.topic === "Product links"));
  return <><Header /><main className="page-shell"><p className="eyebrow">Topic</p><h1>{topic.name}</h1><p className="page-intro">{topic.description}</p><section className="content-section"><div className="article-grid">{matching.map((article) => <ArticleCard article={article} key={article.slug} />)}</div></section><section className="category-section"><div className="section-heading"><div><p className="eyebrow">Product research</p><h2>Related categories</h2></div></div><div className="related-grid">{categories.map((category) => <a className="related-card" href={curicartLink(category.path, `topic_${topic.slug}_${category.slug}`)} key={category.slug} rel="noreferrer"><strong>{category.name}</strong><small>Browse examples →</small></a>)}</div></section></main><Footer /></>;
}
