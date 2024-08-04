import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { analyzer } from 'vite-bundle-analyzer'
import browserslistToEsbuild from 'browserslist-to-esbuild'
// https://vitejs.dev/config/
// NOTE: renamed to .mts -> https://vitejs.dev/guide/troubleshooting.html#this-package-is-esm-only
export default defineConfig({
  plugins: [
    react(),
    // analyzer()
  ],
  build: {
    outDir: 'build',
    target: browserslistToEsbuild(), // it will look for your browserslist config in either package.json or the .browserslistrc.
  },
})
