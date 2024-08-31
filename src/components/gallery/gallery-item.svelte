<script lang="ts">
  import GlowyContainer from "$components/glowy-container.svelte";
  import { onMount } from "svelte";

  const AUDIO_URL = "/sfx/hover.mp3";
  let AUDIO: HTMLAudioElement;

  let { image }: { image: ExtendGalleryType } = $props();

  onMount(() => {
    AUDIO = new Audio(AUDIO_URL);
    AUDIO.volume = 0.2;
  });
</script>

<GlowyContainer>
  <!-- svelte-ignore a11y_mouse_events_have_key_events -->
  <article
    class="rounded-md transition-all group grayscale-[20%] hover:grayscale-0"
    onmouseenter={(e) => {
      AUDIO.play();
    }}
  >
    <section class="h-full overflow-hidden rounded-t-md">
      <img
        src={image.imageResult.src}
        alt={image.data.caption}
        class="block w-full object-cover lg:h-96 h-48"
      />
    </section>
    <div class="p-2 bg-surface-light md:py-4 rounded-b-md">
      <h3
        class="font-heading text-lg md:text-4xl font-bold text-center group-hover:text-accent group-hover:tracking-widest transition-[letter-spacing] group-hover:text-effect tracking-wide"
      >
        {image.data.title}
      </h3>
      <p class="my-2">{image.data.caption}</p>
      <time
        class="text-accent font-bold tracking-widest"
        datetime={image.data.date.toISOString()}
        >{image.data.date.toLocaleDateString()}</time
      >
    </div>
  </article>
</GlowyContainer>
