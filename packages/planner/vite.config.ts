import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { DEPLOY_ENV, NODE_ENV, publicEnvs } from '@draw-house/common/dist/envVariables/public';
import { WITH_REACT_SCAN } from '@draw-house/common/dist/envVariables/private';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          isProductionNodeEnv: NODE_ENV === 'production',
          isStagingDeployEnv: DEPLOY_ENV === 'staging',
          WITH_REACT_SCAN,
        } satisfies Record<string, boolean>,
      },
    }),
  ],
  define: {
    'process.env': publicEnvs,
  },
  server: {
    port: 3000,
  },
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    outDir: path.join(__dirname, 'dist'),
  },
  root: path.join(__dirname, 'src'),
  publicDir: path.join(__dirname, 'public'),
});
