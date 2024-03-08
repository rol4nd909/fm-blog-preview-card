import { defineConfig } from 'astro/config';

import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://rol4nd909.github.io',
  base: '/fm-blog-preview-card/',
  integrations: [icon(), tailwind({
    applyBaseStyles: false
  })]
});