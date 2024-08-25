/// <reference path="../.astro/types.d.ts" />

import type { CollectionEntry } from "astro:content";

declare global {
  type ExtendGalleryType = CollectionEntry<"gallery"> & {
    imageResult: GetImageResult;
  };
}
