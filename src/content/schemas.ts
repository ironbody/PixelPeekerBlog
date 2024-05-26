import { z } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  pubDate: z.date(),
  image: z
    .object({
      url: z.string().url(),
      alt: z.string(),
    })
    .optional(),
  tags: z.array(z.string()).max(4),
});

export type blogType = z.infer<typeof blogSchema>;
