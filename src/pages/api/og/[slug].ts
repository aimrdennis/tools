import { getCollection } from "astro:content";
import { SITE } from "../../../lib/site";

export async function getStaticPaths() {

  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: {
      slug: post.slug
    }
  }));
}

export async function GET({ params }) {

  const posts = await getCollection("blog");

  const post = posts.find(
    (p) => p.slug === params.slug
  );

  const title =
    post?.data.title || SITE.title;

  const kategori =
    (post?.data.category || "BLOG").toUpperCase();

  const themes = [
    ["#7c3aed", "#111827"],
    ["#06b6d4", "#0f172a"],
    ["#ec4899", "#111827"],
    ["#22c55e", "#111827"],
    ["#f59e0b", "#111827"]
  ];

  const theme =
    themes[params.slug.length % themes.length];

  const [color1, color2] = theme;

  const fontSize =
    title.length > 80 ? 46 :
    title.length > 55 ? 54 : 64;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">

<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${color1}"/>
    <stop offset="100%" stop-color="${color2}"/>
  </linearGradient>

  <filter id="blur">
    <feGaussianBlur stdDeviation="80"/>
  </filter>

  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40"
      fill="none"
      stroke="rgba(255,255,255,.05)"
      stroke-width="1"/>
  </pattern>
</defs>

<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="1200" height="630" fill="url(#grid)"/>

<circle
  cx="980"
  cy="120"
  r="240"
  fill="${color1}"
  opacity="0.45"
  filter="url(#blur)"
/>

<circle
  cx="220"
  cy="580"
  r="180"
  fill="#ffffff"
  opacity="0.08"
  filter="url(#blur)"
/>

<rect width="1200" height="630" fill="rgba(0,0,0,.18)"/>

<!-- badge -->
<rect
  x="60"
  y="60"
  width="260"
  height="52"
  rx="26"
  fill="rgba(255,255,255,.12)"
  stroke="rgba(255,255,255,.18)"
/>

<text
  x="90"
  y="94"
  fill="#ffffff"
  font-size="24"
  font-family="Arial,sans-serif"
  font-weight="700"
>
🔥 ${escapeXML(kategori)}
</text>

<!-- brand -->
<rect
  x="720"
  y="40"
  width="420"
  height="60"
  rx="18"
  fill="rgba(255,255,255,.08)"
  stroke="rgba(255,255,255,.12)"
/>

<text
  x="1120"
  y="80"
  text-anchor="end"
  fill="#ffffff"
  font-size="28"
  font-family="Arial,sans-serif"
  font-weight="800"
>
LEBAHHACK ⚡ ${escapeXML(SITE.title)}
</text>

<!-- title -->
<foreignObject x="60" y="190" width="900" height="300">
  <div xmlns="http://www.w3.org/1999/xhtml"
    style="
      font-size:${fontSize}px;
      font-family:Arial,sans-serif;
      font-weight:800;
      line-height:1.15;
      color:white;
      word-break:break-word;
      text-shadow:0 4px 20px rgba(0,0,0,.45);
    ">
    ${escapeXML(title)}
  </div>
</foreignObject>

<!-- icon -->
<text
  x="1020"
  y="360"
  font-size="120"
  opacity="0.15"
>
🤖
</text>

<!-- footer -->
<text
  x="60"
  y="560"
  fill="#cbd5e1"
  font-size="24"
  font-family="Arial,sans-serif"
>
${escapeXML(SITE.website)}
</text>

<text
  x="900"
  y="560"
  fill="#ffffff"
  font-size="22"
  font-family="Arial,sans-serif"
  font-weight="700"
  opacity="0.8"
>
AI • Teknologi • Blog
</text>

</svg>
`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400"
    }
  });
}

function escapeXML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
