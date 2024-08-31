<script lang="ts">
  import { onMount } from "svelte";
  import Typewriter from "typewriter-effect/dist/core";

  let p: HTMLParagraphElement;

  onMount(() => {
    var typewriter = new Typewriter(p, {
      loop: false,
      delay: 75,
      deleteSpeed: 50,
      stringSplitter: (input: string) => {
        return Array.from(input) as any as string;
      },
    });

    typewriter
      .typeString("Hey there 👋, welcome to my website!")
      .pauseFor(100)
      .typeString("<br/>")
      .typeString(
        'Feel <strong>free</strong> to look around my <span class="text-accent" >gallery</strong></span>.',
      )
      .pauseFor(1000);

    typewriter.start();
  });
</script>

<p bind:this={p} class="text-white font-heading md:text-3xl lg:text-4xl"></p>
