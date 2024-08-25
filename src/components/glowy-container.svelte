<script lang="ts">
    import type { Snippet } from "svelte";

  let { hover = true, children }: {hover: boolean, children: Snippet} = $props();
</script>

<div class="rounded-md"  data-effect-on-hover={hover}>{@render children()}</div>

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
    bottom: -4px;
    opacity: 0;
    z-index: -1;
    border-radius: inherit;
    transition: opacity 250ms ease-in-out;
  }

  div[data-effect-on-hover="false"]::after,
  div[data-effect-on-hover="false"]::before {
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

  div[data-effect-on-hover="true"]:hover::after,
  div[data-effect-on-hover="true"]:hover::before {
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

  div::after {
    filter: blur(0.25rem);
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
