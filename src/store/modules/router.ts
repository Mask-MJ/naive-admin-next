import type { RouteRecordRaw } from 'vue-router';
import type { RouterState } from '../types';
import type { Menu } from '#/router';
// import type { MenuOption } from 'naive-ui';
// import type { RouteList } from '@/api/basic/types/user';

import { defineStore } from 'pinia';
import { i18n } from '@/locales';
import { getMenuList } from '@/api/basic/user';
import { strFirstLower } from '@/utils/tools';
import { find } from 'lodash-es';
import pages from '~pages';
import { transformRouteToMenu } from '../helper/menus-helper';

export const useRouterStore = defineStore('router-store', {
  state: (): RouterState => ({
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    menuList: [],
  }),
  actions: {
    setMenuList(list: Menu[]) {
      this.menuList = list;
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.menuList = [];
      this.lastBuildMenuTime = 0;
    },
    // 构建路由
    async buildRoutesAction(): Promise<RouteRecordRaw[]> {
      const { t } = i18n.global;
      // 路由列表
      const routes: RouteRecordRaw[] = [];
      window.$message.loading(t('app.menuLoading'));
      // 获取后台路由
      const routeList = await getMenuList();
      // 后台路由转换为一级路由
      routeList.forEach((ele) => {
        ele.children.forEach((e) => {
          const name = `${strFirstLower(ele.name as string)}-${strFirstLower(e.name as string)}`;
          // 从文件路由中取出相符的 构建路由对象
          const route = find(pages, ['name', name]);
          // 对照后台路由改造文件路由
          if (route) {
            route.meta = { ...e.meta, parentName: ele.name, hidden: ele.hidden };
            routes.push(route);
          }
        });
      });
      // 路由列表转换菜单列表
      this.menuList = transformRouteToMenu(routeList, routes);
      return routes;
    },
  },
});
