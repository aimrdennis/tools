import { getCollection } from "astro:content";
import { SITE } from "../lib/site";

export async function GET() {

  const posts = await getCollection("blog");

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.date) -
      new Date(a.data.date)
  );

  const items = sortedPosts.map((post) => `
<item>

  <title><![CDATA[${post.data.title}]]></title>

  <link>${SITE.blog(post.slug)}</link>

  <guid>${SITE.blog(post.slug)}</guid>

  <description><![CDATA[
    ${post.data.description || ""}
  ]]></description>

  <pubDate>
    ${new Date(
      post.data.date || Date.now()
    ).toUTCString()}
  </pubDate>

</item>
`).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>

<rss version="2.0">

<channel>

  <title><![CDATA[${SITE.title}]]></title>

  <link>${SITE.url()}</link>

  <description><![CDATA[
    ${SITE.description}
  ]]></description>

  <language>id-ID</language>

  ${items}

</channel>

</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
