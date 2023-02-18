import type { Router, RouteLocationNormalized } from 'vue-router';
import { AxiosCanceler } from '@/utils/axios/axiosCancel';
import { createPermissionGuard } from './permissionGuard';

export const setupRouterGuard = (router: Router) => {
  createPageGuard(router);
  createPermissionGuard(router);
  // createParamMenuGuard(router);
  // createStateGuard(router);
};

const createPageGuard = (router: Router) => {
  // const userStore = useUserStore();
  const axiosCanceler = new AxiosCanceler();
  const body = document.body;
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  router.beforeEach(async () => {
    window.$loadingBar?.start();
    axiosCanceler?.removeAllPending();

    return true;
  });
  router.afterEach((to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    window.$loadingBar?.finish();
  });
};
