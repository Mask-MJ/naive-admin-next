import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { createProxy, wrapperEnv, createVitePlugins } from './build';

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  // const glsl = (await import('vite-plugin-glsl')).default;
  return {
    base: './',
    root,
    resolve: {
      alias: {
        '@': `${resolve(root, 'src')}`,
        '#': `${resolve(root, 'types')}`,
      },
    },
    server: {
      https: true,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      reportCompressedSize: false,
      outDir: 'dist',
      chunkSizeWarningLimit: 2000,
    },
    css: {
      preprocessorOptions: {},
    },
    plugins: createVitePlugins(),
  };
};
