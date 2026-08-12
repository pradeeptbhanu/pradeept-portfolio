import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pradeeptbhanu.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
