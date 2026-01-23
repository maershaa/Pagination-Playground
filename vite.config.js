import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Pagination-Playground/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        classicPagination: resolve(__dirname, 'pagination-page.html'),
        loadMorePagination: resolve(__dirname, 'load-more.html'),
        infiniteScroll: resolve(__dirname, 'infinite-scroll.html'),
        imgSearchWithPagination: resolve(__dirname, 'imgSearchWithPagination.html')
      },
    },
  },
});
