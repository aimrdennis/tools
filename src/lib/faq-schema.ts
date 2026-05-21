
function clean(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function generateFaqSchema(html = "") {
  const faqBlocks = [
    ...html.matchAll(
      /<div class="faq-item">([\s\S]*?)<\/div>/gi
    ),
    ...html.matchAll(
      /<details class="faq-item">([\s\S]*?)<\/details>/gi
    )
  ];

  const unique = new Set();

  const entities = faqBlocks
    .map((block) => {
      const source = block[1];

      const question =
        source.match(/<h3>(.*?)<\/h3>/i)?.[1] ||
        source.match(/<summary>(.*?)<\/summary>/i)?.[1] ||
        "";

      const answer =
        source.match(/<p>(.*?)<\/p>/i)?.[1] ||
        source.match(/<div class="answer">(.*?)<\/div>/i)?.[1] ||
        "";

      const q = clean(question);
      const a = clean(answer);

      if (!q || !a) {
        return null;
      }

      if (unique.has(q)) {
        return null;
      }

      unique.add(q);

      return {
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a
        }
      };
    })
    .filter(Boolean);

  if (!entities.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entities
  };
}
