// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const markdownProcessor = unified({
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
});

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: markdownProcessor,
  },
  integrations: [
    react(),
    mdx()
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.mts']
    },
    assetsInclude: ['**/*.glb']
  },
  site: 'https://librn.com',
});
