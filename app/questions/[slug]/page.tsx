import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, Footer, Header, TopicNav } from "../../components";
import { articles, getArticle } from "@/lib/content";
import { curicartLink, categories } from "@/lib/links";
import { Markdown } from "@/lib/markdown";

type Params = Promise<{ slug: string }>;
export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Params }) { const { slug } = await params; const article = getArticle(slug); return article ? { title: article.title, description: article.meta, alternates: { canonical: `/questions/${slug}` }, robots: { index: false, follow: false } } : {}; }
export default async function QuestionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 2);
  return <><Header /><main className="question-layout"><article><p className="breadcrumb"><Link href="/">Home</Link> / <Link href="/questions">Questions</Link> / {article.topic}</p><h1>{article.title}</h1><div className="quick-answer"><strong>Quick answer</strong><p>{article.quickAnswer}</p></div><Markdown source={article.body.replace(/^## Quick Answer[\s\S]*?(?=\n## )/, "")} utmContent={`question_${article.slug}`} /><section className="related"><h2>Related product research</h2><p className="page-intro">Use these category views to compare product examples, source context, and visible options while you work through the answer.</p><div className="related-grid">{categories.map((category) => <a className="related-card" href={curicartLink(category.path, `question_${article.slug}_${category.slug}`)} key={category.slug} rel="noreferrer"><strong>{category.name} research</strong><small>Browse examples →</small></a>)}</div></section><section className="related"><h2>FAQ</h2><div className="prose">{article.faq.map((item) => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</div></section><section className="related"><h2>More questions</h2><div className="article-grid">{related.map((item) => <ArticleCard article={item} key={item.slug} />)}</div></section></article><aside className="question-aside"><h2>In this topic</h2><Link href="/topics/qc-photos">QC photos</Link><Link href="/topics/product-links">Product links</Link><Link href="/topics/spreadsheets">Spreadsheets</Link></aside></main><TopicNav /><Footer /></>;
}
