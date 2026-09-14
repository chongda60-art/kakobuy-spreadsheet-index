import { Footer, Header } from "../components";
export const metadata = { title: "Contact", alternates: { canonical: "/contact" }, robots: { index: false, follow: true } };
export default function ContactPage() { return <><Header /><main className="page-shell"><p className="eyebrow">Contact</p><h1>Share a question for a future guide</h1><p className="page-intro">For corrections or source suggestions, contact the editorial team through the project owner. Include the page URL and the specific detail that needs checking.</p></main><Footer /></>; }
