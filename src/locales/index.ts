import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

const messages = Object.fromEntries(
  Object.entries(import.meta.glob<{ default: any }>('./lang/*.y(a)?ml', { eager: true })).map(
    ([key, value]) => {
      const yaml = key.endsWith('.yaml');
      return [key.slice(7, yaml ? -5 : -4), value.default];
    },
  ),
);

export let i18n;

export const setupI18n = (app: App) => {
  i18n = createI18n({
    globalInjection: true,
    legacy: false,
    locale: 'zh-CN',
    messages,
  }) as any;
  app.use(i18n);
};
