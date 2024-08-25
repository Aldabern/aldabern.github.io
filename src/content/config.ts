import { defineCollection, z } from "astro:content";

const galleryCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      caption: z.string(),
      img: image(),
      date: z.date(),
      showcase: z.boolean().optional(),
      color: z.string().optional(),
    }),
});

export const collections = {
  gallery: galleryCollection,
};
