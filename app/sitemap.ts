import type { MetadataRoute } from "next";

const base = "https://kakobuyspreadsheetindex.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/questions", "/questions/where-to-see-kakobuy-qc-photos", "/questions/kakobuy-product-link-not-working", "/questions/choose-kakobuy-spreadsheet-with-qc-photos", "/questions/how-to-read-a-kakobuy-weidian-link", "/questions/kakobuy-shoe-size-chart-and-labels-guide"].map((path) => ({ url: `${base}${path}` }));
}
