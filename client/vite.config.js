import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Express serves the production build from client/build (server/src/index.js)
    outDir: 'build',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    proxy: {
      // the `server` container from docker-compose.yml
      '/api': 'http://server:8080',
    },
    watch: {
      // file events don't reliably cross the Docker bind mount on macOS
      usePolling: true,
    },
  },
});
