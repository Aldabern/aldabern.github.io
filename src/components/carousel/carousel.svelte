<script lang="ts">
  import type { EmblaCarouselType } from "embla-carousel";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import Autoplay from "embla-carousel-autoplay";
  import Fade from "embla-carousel-fade";

  interface Props {
    images: ExtendGalleryType[];
  }

  let { images }: Props = $props();

  let emblaApi: EmblaCarouselType;

  let options = { loop: true };
  let plugins = [
    Fade(),
    Autoplay({
      delay: 7000,
    }),
  ];

  function change() {
    console.log("Changed");
  }

  function setup(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail;
    emblaApi.on("settle", change);
  }
</script>

<section class="relative group">
  <div
    class="embla overflow-hidden rounded-md"
    use:emblaCarouselSvelte={{ options, plugins }}
    onemblaInit={setup}
  >
    <div class="embla__container">
      {#each images as image}
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

  <div
    class="opacity-0 transition-opacity duration-700 ease-linear flex justify-between items-center px-4 gap-4 mt-4 absolute inset-0 group-hover:opacity-100"
  >
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
