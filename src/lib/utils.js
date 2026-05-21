// ======================
// FORMAT DATE
// ======================

export function formatDate(date) {

  if (!date) return "";

  return new Date(date)
    .toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

}

// ======================
// SLUGIFY
// ======================

export function slugify(text = "") {

  return text
    .toString()
    .toLowerCase()
    .trim()

    .replace(/\s+/g, "-")

    .replace(/[^\w\-]+/g, "")

    .replace(/\-\-+/g, "-");

}

// ======================
// READING TIME
// ======================

export function readingTime(content = "") {

  const words = content
    .replace(/<[^>]*>/g, "")
    .split(/\s+/).length;

  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;

}

// ======================
// EXCERPT
// ======================

export function excerpt(text = "", limit = 140) {

  const clean = text
    .replace(/<[^>]+>/g, "")
    .trim();

  if (clean.length <= limit) {
    return clean;
  }

  return clean.slice(0, limit) + "...";

}

// ======================
// GENERATE FAQ SCHEMA
// ======================

export function generateFaqSchema(html = "") {

  if (!html) return null;

  const regex =
    /<h2[^>]*>(.*?)<\/h2>\s*<p>(.*?)<\/p>/gis;

  const matches = [...html.matchAll(regex)];

  if (!matches.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: matches.map((item) => ({
      "@type": "Question",

      name: item[1]
        .replace(/<[^>]+>/g, "")
        .trim(),

      acceptedAnswer: {
        "@type": "Answer",

        text: item[2]
          .replace(/<[^>]+>/g, "")
          .trim()
      }
    }))
  };

}

// ======================
// TABLE OF CONTENTS
// ======================

export function generateTOC(html = "") {

  const regex =
    /<h([2-4])[^>]*>(.*?)<\/h\1>/gi;

  const items = [];

  let match;

  while ((match = regex.exec(html)) !== null) {

    const level = Number(match[1]);

    const text = match[2]
      .replace(/<[^>]+>/g, "")
      .trim();

    const id = slugify(text);

    items.push({
      id,
      text,
      level
    });

  }

  return items;

}

// ======================
// RELATED POSTS
// ======================

export function getRelatedPosts(
  posts = [],
  currentSlug = "",
  category = "",
  limit = 3
) {

  return posts

    .filter((post) => {

      return (
        post.slug !== currentSlug &&
        post.data.category === category
      );

    })

    .slice(0, limit);

}

// ======================
// SORT POSTS
// ======================

export function sortPosts(posts = []) {

  return posts.sort(
    (a, b) =>
      new Date(b.data.date) -
      new Date(a.data.date)
  );

}

// ======================
// FILTER PUBLISHED
// ======================

export function publishedPosts(posts = []) {

  return posts.filter((post) => {

    return (
      post.data.status === "publish"
    );

  });

}

// ======================
// GROUP BY CATEGORY
// ======================

export function groupByCategory(posts = []) {

  return posts.reduce((acc, post) => {

    const category =
      post.data.category || "News";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(post);

    return acc;

  }, {});

}
