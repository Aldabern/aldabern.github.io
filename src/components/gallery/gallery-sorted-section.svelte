<script lang="ts">
  import { flip } from "svelte/animate";
  import GalleryItem from "./gallery-item.svelte";
  import { slide } from "svelte/transition";
  import { splitTextInHalf } from "src/utils/string-splitter";
  import Arrow from "./icons/arrow.svelte";

  interface Props {
    year: string;
    results: ExtendGalleryType[];
  }

  let props: Props = $props();
  let open = $state(true);

  const [firstHalf, secondHalf] = splitTextInHalf(props.year);
</script>

<header class="w-full flex justify-between items-center">
  <h3
    class="text-4xl font-bold font-heading border-b-2 border-surface-highlight"
  >
    {firstHalf}<span class="text-accent">{secondHalf}</span>
  </h3>

  <button
    onclick={() => (open = !open)}
    class:rotate-180={open}
    class:text-accent={open}
    class="transition-transform"
  >
    <Arrow class="text-xl" />
  </button>
</header>
{#if open}
  <div
    class="grid grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-0 mt-6"
    transition:slide={{ axis: "y" }}
  >
    {#each props.results as image (image.id)}
      <div animate:flip={{ duration: 250 }}>
        <GalleryItem {image} />
      </div>
    {/each}
  </div>
{/if}
