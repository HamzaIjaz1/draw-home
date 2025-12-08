import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { DEPLOY_ENV, publicEnvs } from '@draw-house/common/dist/envVariables/public';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          isStagingDeployEnv: DEPLOY_ENV === 'staging',
        } satisfies Record<string, boolean>,
      },
    }),
  ],
  define: {
    'process.env': publicEnvs,
  },
  server: {
    port: 3001,
  },
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    outDir: path.join(__dirname, 'preview-dist'),
  },
  root: path.join(__dirname, 'src'),
  publicDir: path.join(__dirname, 'public'),
});
