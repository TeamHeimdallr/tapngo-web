import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  server: {
    port: 3000,
  },

  resolve: {
    alias: [{ find: '~', replacement: resolve(__dirname, 'src') }],
  },

  build: {
    emptyOutDir: true,
    manifest: true,
    minify: true,
    polyfillModulePreload: false,
    rollupOptions: {
      output: {
        chunkFileNames: 'chunk-[name].[hash].js',
        entryFileNames: 'entry-[name].[hash].js',
        inlineDynamicImports: false,
        sourcemap: false,
      },
    },
    sourcemap: false,
  },

  plugins: [
    nodePolyfills(),
    tsconfigPaths(),
    react({
      babel: {
        plugins: [
          'babel-plugin-macros',
          ['auto-import', { declarations: [{ default: 'React', path: 'react' }] }],
          [
            '@emotion/babel-plugin-jsx-pragmatic',
            { export: 'jsx', import: '__cssprop', module: '@emotion/react' },
          ],
          ['@babel/plugin-transform-react-jsx', { pragma: '__cssprop' }, 'twin.macro'],
        ],
      },
    }),
  ],
});
