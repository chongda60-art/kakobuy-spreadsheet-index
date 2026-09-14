import Link from "next/link";
import type { ReactNode } from "react";

function withCuriCartUtm(href: string, utmContent?: string) {
  try {
    const url = new URL(href);
    if (url.hostname !== "www.curicart.com") return href;
    url.searchParams.set("utm_source", "kakobuyspreadsheetindex");
    url.searchParams.set("utm_medium", "referral");
    url.searchParams.set("utm_campaign", "kakobuy_questions");
    url.searchParams.set("utm_content", utmContent || "article_related");
    return url.toString();
  } catch {
    return href;
  }
}

function inline(value: string, utmContent?: string): ReactNode[] {
  const parts = value.split(/(\[[^\]]+\]\([^\)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
    if (!match) return <span key={index}>{part}</span>;
    return <a key={index} href={withCuriCartUtm(match[2], utmContent)} rel="noreferrer">{match[1]}</a>;
  });
}

export function Markdown({ source, utmContent }: { source: string; utmContent?: string }) {
  const lines = source.split(/\r?\n/);
  const nodes: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { nodes.push(<ul key={`list-${nodes.length}`}>{list.map((item) => <li key={item}>{inline(item, utmContent)}</li>)}</ul>); list = []; } };
  lines.forEach((line, index) => {
    if (!line.trim()) { flush(); return; }
    if (line.startsWith("- ") || /^\d+\. /.test(line)) { list.push(line.replace(/^- |^\d+\. /, "")); return; }
    flush();
    if (line.startsWith("## ")) nodes.push(<h2 key={index}>{inline(line.slice(3), utmContent)}</h2>);
    else if (line.startsWith("### ")) nodes.push(<h3 key={index}>{inline(line.slice(4), utmContent)}</h3>);
    else nodes.push(<p key={index}>{inline(line, utmContent)}</p>);
  });
  flush();
  return <div className="prose">{nodes}</div>;
}

export function InternalLink({ href, children }: { href: string; children: ReactNode }) { return <Link href={href}>{children}</Link>; }
