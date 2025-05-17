// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  vite: {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.mts']
    }
  }
});