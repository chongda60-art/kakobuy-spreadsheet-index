import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL("https://kakobuyspreadsheetindex.com"), title: { default: "Kakobuy Spreadsheet Index", template: "%s | Kakobuy Spreadsheet Index" }, description: "Practical Kakobuy answers for QC photos, product links, and spreadsheet research.", alternates: { canonical: "/" }, robots: { index: true, follow: true }, verification: { google: "dgey96pDeeoWxA3o0L-UxVhW7DbiQ1zbYiOmLadYNeY" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
