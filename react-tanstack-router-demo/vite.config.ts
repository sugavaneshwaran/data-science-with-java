import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // tanstackRouter must come before react in the plugins array so it can
    // generate the route tree before the React plugin processes the files.
    tanstackRouter({
      target: 'react',
      // Manual code-splitting via .lazy.tsx files (see routes/charts.tsx +
      // routes/charts.lazy.tsx) rather than the automatic splitter, so the
      // pattern is explicit and visible in the file tree.
      autoCodeSplitting: false,
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    react(),
  ],
})
