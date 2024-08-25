<script lang="ts">
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import type { EmblaCarouselType } from "embla-carousel";
  import Autoplay from "embla-carousel-autoplay";
  import GlowyContainer from "$components/glowy-container.svelte";

  let { images }: { images: ExtendGalleryType[] } = $props();

  let emblaApi: EmblaCarouselType;

  let options = { loop: true };
  let plugins = [
    Autoplay({
      delay: 4000,
    }),
  ];

  function logSlidesInViewOnce(api: EmblaCarouselType) {
    console.log(api.slidesInView());
    api.off("slidesInView", logSlidesInViewOnce);
  }

  function setup(event: any) {
    emblaApi = event.detail;
    emblaApi.on("slidesInView", logSlidesInViewOnce);
  }
</script>

<div class="mask">
  <div
    class="embla"
    use:emblaCarouselSvelte={{ options, plugins }}
    on:emblaInit={setup}
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
            class="h-96 w-full object-contain"
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
  }

  .mask {
    mask-image: url("transparent.png");
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 200%;
  }
</style>
