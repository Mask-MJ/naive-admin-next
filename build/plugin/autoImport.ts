import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export const configAutoImportPlugin = () => [
  AutoImport({
    // 自动导入 vue vue-router @vueuse/head @vueuse/core
    imports: [
      'vue',
      'vue-router',
      'vue-i18n',
      '@vueuse/head',
      '@vueuse/core',
      {
        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
      },
    ],
    vueTemplate: true,
    dirs: ['src/store/modules', 'src/components', 'src/composables'],
    dts: 'types/auto-imports.d.ts',
  }),
  Components({
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'types/components.d.ts',
    resolvers: [IconsResolver(), NaiveUiResolver()],
  }),
  // 自动导入 icon
  Icons({
    autoInstall: true,
  }),
];
