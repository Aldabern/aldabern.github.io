/// <reference path="../.astro/types.d.ts" />

declare module "typewriter-effect/dist/core" {
  const Typewriter: typeof import("typewriter-effect").TypewriterClass;
  export default Typewriter;
}
