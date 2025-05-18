// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import tailwind from '@astrojs/tailwind';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: 'append',
          properties: {
            className: ['heading-anchor'],
            ariaHidden: 'false',
            title: 'anchor',
            tabIndex: -1
          },
          content: {
            type: 'element',
            tagName: 'span',
            properties: {
              className: ['anchor-icon'],
              'data-i18n-key': 'toc.anchor'
            },
            children: [{ type: 'text', value: '#' }]
          }
        }]
      ]
    }),
    tailwind()
  ],
  vite: {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.mts']
    }
  },
  site: 'https://librn.com',
});
