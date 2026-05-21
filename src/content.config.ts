import {
  defineCollection,
  z
} from "astro:content";

// ======================
// BLOG
// ======================

const blog = defineCollection({

  type: "content",

  schema: z.object({

    title: z.string(),

    description: z.string(),

    date: z.coerce.date(),

    category: z.string(),

    tags: z
      .array(z.string())
      .default([]),

    status: z
      .string()
      .default("publish"),

    author: z
      .string()
      .optional(),

    featured: z
      .boolean()
      .optional()

  })

});

// ======================
// TOOLS
// ======================

const tools = defineCollection({

  type: "content",

  schema: z.object({

    title: z.string(),

    description: z.string()

  })

});

// ======================
// EXPORT
// ======================

export const collections = {

  blog,
  tools

};
