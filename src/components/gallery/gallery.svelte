<script lang="ts">
  import { flip } from "svelte/animate";
  import SearchIcon from "./search-icon.svelte";
  import SadIcon from "./sad-icon.svelte";
  import GalleryItem from "./gallery-item.svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";
  import GalleryIcon from "./gallery-icon.svelte";

  const AUDIO_URL = "/input.mp3";

  const DEBOUNCE_RATE = 250;
  const NOT_SEARCH_FOUND_LINES = [
    "Huh? What are you even looking for?",
    "You sure you're not making that up?",
    "Sorry, I don’t think even Google knows that one.",
    "You might be searching in the wrong universe!",
    "Nice try, but that’s not a thing.",
    "Nope, that’s not in my playbook.",
    "Are you searching for a unicorn?",
    "I think you just confused me... and I’m a computer.",
    "You might want to double-check that one!",
    "I’ve got nothing. Are you sure that’s a thing?",
  ];

  let { images }: { images: ExtendGalleryType[] } = $props();

  let searchTerm = $state("");
  let searchElement: HTMLInputElement;
  let searchIsFocused = $state(false);

  let timer: number;

  function debounce(e: Event) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchTerm = (e.target as HTMLInputElement).value;
    }, DEBOUNCE_RATE);
  }

  let filteredImages = $derived.by(() => {
    if (searchTerm != "") {
      return images.filter((image) => {
        const imgTitle = image.data.title.toLowerCase();
        const searchLowercase = searchTerm.toLowerCase();
        return (
          imgTitle.includes(searchLowercase) ||
          image.data.caption.includes(searchLowercase)
        );
      });
    }

    return images;
  });

  onMount(() => {});
</script>

<section class="space-y-4">
  <h2
    class="font-heading text-5xl font-bold tracking-wide text-accent flex items-center gap-4"
  >
    <GalleryIcon />
    <span>Gallery</span>
  </h2>
  <header
    class="flex flex-row-reverse border border-b-2 border-transparent rounded-sm overflow-hidden data-[is-focused=true]:border-surface group"
    data-is-focused={searchIsFocused}
  >
    <input
      oninput={debounce}
      class="bg-surface-light p-2 w-full peer focus:outline-none"
      bind:this={searchElement}
      placeholder="Search"
      onfocus={() => {
        searchIsFocused = true;
      }}
      onblur={() => {
        searchIsFocused = false;
      }}
    />
    <button
      class="px-2 bg-surface-light flex items-center text-disabled hover:text-white group-data-[is-focused=true]:text-white"
      onclick={() => searchElement.focus()}
    >
      <SearchIcon
        class="text-xl group-data-[is-focused=true]:text-2xl transition-all ease-linear duration-150"
      />
    </button>
  </header>

  {#if filteredImages.length <= 0}
    <div
      class="text-7xl flex items-center gap-2 justify-center mt-8"
      in:fly={{ duration: 150, easing: quintOut, y: 100 }}
    >
      <SadIcon class="animate-bounce" />
      <p class="text-5xl font-heading">
        {NOT_SEARCH_FOUND_LINES[
          Math.floor(Math.random() * NOT_SEARCH_FOUND_LINES.length)
        ]}
      </p>
    </div>
  {/if}

  <div class="grid grid-cols-4 gap-8">
    {#each filteredImages as image (image.id)}
      <div animate:flip={{ duration: 250 }}>
        <GalleryItem {image} />
      </div>
    {/each}
  </div>
</section>
