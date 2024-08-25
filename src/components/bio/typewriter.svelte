<script lang="ts">
  import { onMount } from "svelte";
  import Typewriter from "typewriter-effect/dist/core";

  let p: HTMLParagraphElement;

  onMount(() => {
    var typewriter = new Typewriter(p, {
      loop: false,
      delay: 75,
      stringSplitter: (input: string) => {
        return Array.from(input) as any as string;
      },
    });

    typewriter
      .typeString("Hey there 👋, welcome to my website!")
      .pauseFor(300)
      .deleteChars(50)
      .typeString(
        'Feel <strong>free</strong> to look around my <span style="color: var(--text-accent);">gallery</strong></span>.',
      )
      .pauseFor(1000);

    typewriter.start();
  });
</script>

<p bind:this={p} class="text-white font-heading text-4xl"></p>
