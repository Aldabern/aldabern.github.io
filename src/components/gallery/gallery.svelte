<script lang="ts">
  import { flip } from "svelte/animate";
  import SearchIcon from "./icons/search-icon.svelte";
  import SadIcon from "./icons/sad-icon.svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";
  import GallerySortedSection from "./gallery-sorted-section.svelte";

  const AUDIO_URL = "/sfx/input.mp3";
  let AUDIO: HTMLAudioElement;

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
        return imgTitle.includes(searchLowercase);
      });
    }

    return images;
  });

  let filteredImagesByYear = $derived.by(() => {
    const data: Record<string, ExtendGalleryType[]> = {};

    filteredImages.map((image) => {
      const year = image.data.date.getFullYear();

      if (!data[year]) {
        data[year] = [];
      }

      data[year].push(image);
    });

    return Object.entries(data).sort((a, b) => Number(b[0]) - Number(a[0]));
  });

  onMount(() => {
    AUDIO = new Audio(AUDIO_URL);
    AUDIO.volume = 0.2;
  });
</script>

<section class="space-y-4">
  <header
    class="flex justify-between items-center bg-accent py-2 px-2 rounded-md"
  >
    <h2
      class="font-heading text-xl md:text-4xl font-bold tracking-wide flex items-center gap-4 text-black"
    >
      <span>Gallery ({filteredImages.length})</span>
    </h2>
    <div
      class="flex flex-row-reverse border-b-2 border-transparent rounded-md overflow-hidden data-[is-focused=true]:border-surface-highlight group data-[is-focused=true]:flex-grow-[0.5] transition-all duration-200 ease-linear"
      data-is-focused={searchIsFocused}
    >
      <input
        oninput={debounce}
        class="bg-surface-light p-1 md:p-2 w-full peer focus:outline-none"
        bind:this={searchElement}
        placeholder="Search"
        onfocus={() => {
          searchIsFocused = true;
          AUDIO.play();
        }}
        onblur={() => {
          searchIsFocused = false;
          AUDIO.play();
        }}
      />
      <button
        class="px-2 bg-surface-light flex items-center text-disabled hover:text-white group-data-[is-focused=true]:text-white"
        onclick={() => searchElement.focus()}
      >
        <SearchIcon
          class=" text-lg md:text-xl group-data-[is-focused=true]:text-xl md:group-data-[is-focused=true]:text-2xl transition-all ease-linear duration-150"
        />
      </button>
    </div>
  </header>

  <!-- Not Found Images -->
  {#if filteredImages.length <= 0}
    <div
      class=" mt-8 h-[720px]"
      in:fly={{ duration: 150, easing: quintOut, y: 100 }}
    >
      <p class="md:text-5xl font-heading mt-8 flex gap-4">
        <SadIcon class="animate-bounce" />
        {NOT_SEARCH_FOUND_LINES[
          Math.floor(Math.random() * NOT_SEARCH_FOUND_LINES.length)
        ]}
      </p>
    </div>
  {/if}

  <section class="grid grid-cols-1 gap-4">
    {#each filteredImagesByYear as imagesByYear (imagesByYear[0])}
      {@const year = imagesByYear[0]}
      {@const results = imagesByYear[1]}
      <div animate:flip={{ duration: 250 }}>
        <GallerySortedSection {year} {results} />
      </div>
    {/each}
  </section>
</section>
