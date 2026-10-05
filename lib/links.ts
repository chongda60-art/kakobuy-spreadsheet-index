export const curicartBase = "https://www.curicart.com";
export function curicartLink(path: string, content: string) {
  const url = new URL(path, curicartBase);
  url.searchParams.set("utm_source", "kakobuyspreadsheetindex");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "kakobuy_questions");
  url.searchParams.set("utm_content", content);
  return url.toString();
}

export const categories = [
  { name: "Shoe", slug: "shoe", icon: "◒", path: "/en/Productlistt_1.html?fuid=1&&category=Shoe" },
  { name: "Accessories", slug: "accessories", icon: "◇", path: "/en/Productlistt_9.html?fuid=9&&category=Accessories" },
  { name: "Electronics", slug: "electronics", icon: "▣", path: "/en/Productlistt_10.html?fuid=10&&category=Electronics" },
];
