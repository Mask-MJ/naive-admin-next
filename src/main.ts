import { createApp } from 'vue';

import 'uno.css';
import '@/styles/index.scss';

import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter, router } from '@/router';
import { setupI18n } from '@/locales';
import { setupRouterGuard } from '@/router/guard';

const setupApp = () => {
  // const appLoading = createApp(AppLoading);
  // appLoading.mount('#appLoading');

  const app = createApp(App);
  // 配置 store
  setupStore(app);
  // 多语言
  setupI18n(app);
  // 配置路由
  setupRouter(app);
  // 路由守卫
  setupRouterGuard(router);
  app.mount('#app');
};

setupApp();
