
export const SITE = {
  name: "Ai Mr Dennis",

  title: "Tools Ai Mr Dennis",

  description: "Ai Mr Dennis Website modern",

  author: "OpenPobo",

  locale: "id-ID",

  themeColor: "#ffffff",

  image: "/images/og-cover.jpg",

  baseUrl:
    import.meta.env.SITE_URL ||
    "https://tools.aimrdennis.com",

  url(path = "") {
    return `${this.baseUrl}/${path}`
      .replace(/([^:]\/)\/+/g, "$1");
  },

  blog(slug = "") {
    return this.url(`blog/${slug}`);
  },

  blogAmp(slug = "") {
    return this.url(`blog/${slug}/amp`);
  },

  category(slug = "") {
    return this.url(`category/${slug}`);
  },

  tag(slug = "") {
    return this.url(`tag/${slug}`);
  },

  imageUrl(path = "") {
    return this.url(path);
  },

  menu: [
    {
      name: "SEO",
      url: "/blog/seo"
    },

    {
      name: "AI",
      url: "/blog/ai"
    },

    {
      name: "Crypto",
      url: "/blog/crypto"
    }
  ],

  social: {
    twitter: "@openpobo",
    github: "https://github.com/openpobo"
  }
};
