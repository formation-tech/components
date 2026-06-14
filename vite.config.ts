import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const libEntries = {
  index: resolve(__dirname, 'src/index.ts'),
  'ft-owl-logo': resolve(__dirname, 'src/ft-owl-logo.ts'),
  'react/index': resolve(__dirname, 'src/react/index.ts'),
  'react/ft-owl-logo': resolve(__dirname, 'src/react/ft-owl-logo.tsx'),
}

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      root: 'demo',
      publicDir: resolve(__dirname, 'public'),
      server: {
        open: true,
      },
    }
  }

  return {
    build: {
      lib: {
        entry: libEntries,
        formats: ['es'],
        fileName: (_, name) => `${name}.js`,
      },
      rollupOptions: {
        external: [/^lit(\/.*)?$/, /^react(\/.*)?$/, '@lit/react'],
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name].js',
        },
      },
      outDir: 'dist',
      emptyOutDir: true,
      copyPublicDir: false,
    },
  }
})
