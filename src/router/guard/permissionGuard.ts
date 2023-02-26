import type { Router } from 'vue-router';

import { setupLayouts } from 'virtual:generated-layouts';
import { PageEnum } from '@/enums/pageEnum';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStore();
  const routerStore = useRouterStore();
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken;

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        try {
          await userStore.afterLoginAction();
          next((to.query?.redirect as string) || PageEnum.BASE_HOME);
          return;
        } catch {}
      }
      next();
      return;
    }
    // token or user does not exist
    if (!token) {
      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = { ...redirectData.query, redirect: to.path };
      }
      next(redirectData);
      return;
    }

    // Jump to the 404 page after processing the login
    if (from.path === LOGIN_PATH && to.name === 'all' && to.fullPath !== PageEnum.BASE_HOME) {
      next(PageEnum.BASE_HOME);
      return;
    }

    // 判断是否存有用户信息
    if (Object.keys(userStore.userInfo).length === 0) {
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }
    // 判断是否已经异步添加路由
    if (routerStore.isDynamicAddedRoute) {
      next();
      return;
    }
    //异步添加路由
    let routes = await routerStore.buildRoutesAction();
    // 转换成 layout
    routes = setupLayouts(routes);
    routes.forEach((route) => {
      router.addRoute(route);
    });
    // 设置为已异步添加路由
    routerStore.setDynamicAddedRoute(true);

    if (to.name === 'all') {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
