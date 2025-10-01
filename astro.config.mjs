import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://rol4nd909.github.io',
  base: '/fm-blog-preview-card/',
  integrations: [tailwind({
    applyBaseStyles: false,
    config: './tailwind.config.mjs',
    nesting: true,
  })],
});
