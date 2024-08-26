<script lang="ts">
  import type { EmblaCarouselType } from "embla-carousel";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import Autoplay from "embla-carousel-autoplay";

  interface Props {
    images: ExtendGalleryType[];
  }

  let { images }: Props = $props();

  let emblaApi: EmblaCarouselType;

  let options = { loop: true };
  let plugins = [
    Autoplay({
      delay: 4000,
    }),
  ];

  function logSlidesInViewOnce(api: EmblaCarouselType) {
    api.off("slidesInView", logSlidesInViewOnce);
  }

  function setup(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail;
    emblaApi.on("slidesInView", logSlidesInViewOnce);
  }
</script>

<section>
  <div
    class="embla overflow-hidden mask rounded-md"
    use:emblaCarouselSvelte={{ options, plugins }}
    onemblaInit={setup}
  >
    <div class="embla__container">
      {#each images as image, index}
        <div
          class="embla__slide bg-[var(--color)]"
          style="--color: {image.data.color};"
        >
          <img
            src={image.imageResult.src}
            alt={image.data.title}
            class="h-[400px] w-full object-contain"
          />
        </div>
      {/each}
    </div>
  </div>

  <div class="flex gap-4 mt-4">
    <button
      class="outline outline-surface outline-2 rounded-[50%] px-4 py-2 text-lg hover:outline-surface-highlight"
      onclick={() => emblaApi.scrollPrev()}>&lt;</button
    >
    <button
      class="outline outline-surface outline-2 rounded-[50%] px-4 py-2 text-lg hover:outline-surface-highlight"
      onclick={() => emblaApi.scrollNext()}>&gt;</button
    >
  </div>
</section>

<style>
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
  }
</style>
