<script lang="ts">
  import GlowyContainer from "$components/glowy-container.svelte";

  let { image }: { image: ExtendGalleryType } = $props();
</script>

<GlowyContainer
  ><article
    class="rounded-md transition-all group grayscale-[20%] hover:grayscale-0"
  >
    <section class="h-full overflow-hidden rounded-t-md">
      <img
        src={image.imageResult.src}
        alt={image.data.caption}
        class="block w-full object-cover h-96"
      />
    </section>
    <div class="p-2 text-disabled bg-surface-light py-4">
      <h2
        class="font-heading text-4xl font-bold text-center group-hover:text-accent group-hover:tracking-widest transition-all"
      >
        {image.data.title}
      </h2>
      <p class="text-lg">{image.data.caption}</p>
      <span>{image.data.date.toDateString()}</span>
    </div>
  </article></GlowyContainer
>
