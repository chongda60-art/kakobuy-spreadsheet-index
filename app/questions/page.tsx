import { Footer, Header, QuestionList } from "../components";
export const metadata = { title: "Questions" };
export default function QuestionsPage() { return <><Header /><main className="page-shell"><p className="eyebrow">Question library</p><h1>Kakobuy questions, answered clearly</h1><p className="page-intro">Browse practical guides for QC photos, product links, and spreadsheet checks. Start with the wording that matches the problem in front of you.</p><div className="content-section"><QuestionList /></div></main><Footer /></>; }
