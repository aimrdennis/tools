import { getCollection } from "astro:content";
import { SITE } from "../lib/site";

export async function GET() {

  const posts = await getCollection("blog");

  const urls = posts.map((post) => `
<url>
  <loc>${SITE.blog(post.slug)}</loc>
  <lastmod>${new Date(
    post.data.date || Date.now()
  ).toISOString()}</lastmod>
</url>
`).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
  <loc>${SITE.url()}</loc>
</url>

<url>
  <loc>${SITE.url("/blog")}</loc>
</url>

${urls}

</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
