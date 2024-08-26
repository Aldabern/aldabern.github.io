<script lang="ts">
    import type { Snippet } from "svelte";

  let { children }: {children: Snippet} = $props();
</script>

<div class="rounded-md hover:scale-105 transition-transform duration-200 " >{@render children()}</div>

<style>
  @property --gradient-angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  div {
    position: relative;
    isolation: isolate;
  }

  div::after,
  div::before {
    content: "";
    position: absolute;
    inset: -2px;
    bottom: -6px;
    opacity: 1;
    z-index: -1;
    border-radius: inherit;
    filter: blur(0rem);
    transition: filter 0.75s;
    background-color: #242323;
  }


  div:hover::after,
  div:hover::before {
    background: conic-gradient(
      from var(--gradient-angle),
      var(--clr-1),
      var(--clr-2),
      var(--clr-3),
      var(--clr-2),
      var(--clr-1)
    );
    opacity: 1;
    animation: rotation 5s linear infinite;

  }

  div:hover::after {
    filter: blur(1.75rem);
  }

  @keyframes rotation {
    0% {
      --gradient-angle: 0deg;
    }
    100% {
      --gradient-angle: 360deg;
    }
  }
</style>
