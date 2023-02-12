import { createApp } from 'vue';

// import '@unocss/reset/normalize.css';
import 'uno.css';
import App from './App.vue';
import { setupStore } from '@/store';
import { setupI18n } from '@/locales';

const setupApp = () => {
  // const appLoading = createApp(AppLoading);
  // appLoading.mount('#appLoading');

  const app = createApp(App);
  // 配置 store
  setupStore(app);
  // 多语言
  setupI18n(app);
  // 配置路由
  // setupRouter(app);
  // 路由守卫
  // setupRouterGuard(router);
  app.mount('#app');
};

setupApp();
