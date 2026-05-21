
import { SITE } from "./site";

export function buildSeo({
  title,
  description,
  image,
  canonical
}) {
  return {
    title: title || SITE.title,
    description: description || SITE.description,
    image: image || SITE.image,
    canonical: canonical || SITE.url()
  };
}
