import type { PluginOption } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import Unocss from 'unocss/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
// import transformerDirective from '@unocss/transformer-directives';
// import glsl from 'vite-plugin-glsl';
// import Inspect from 'vite-plugin-inspect';

import { configAutoImportPlugin } from './autoImport';
export const createVitePlugins = (): PluginOption[] => {
  // const glsl = (await import('vite-plugin-glsl')).default;
  return [
    vue(),
    mkcert(),
    VueI18nPlugin({
      runtimeOnly: true,
      include: [path.resolve(process.cwd(), 'src/locales/lang/**')],
    }),
    Pages({
      dirs: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue'],
    }),
    Layouts(),
    Unocss(),
    // glsl(),
    ...configAutoImportPlugin(),
    // Inspect(),
  ];
};
