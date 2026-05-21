
import { SITE } from "./site";

export function createBreadcrumbs(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: SITE.url(item.url)
    }))
  };
}
