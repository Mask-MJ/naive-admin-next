import type { Menu } from '#/router';
import type { RouteList } from '@/api/basic/types/user';

import { RouteRecordRaw, RouterLink } from 'vue-router';
import { find } from 'lodash-es';

// 把路由对象转换为菜单对象
export const transformRouteToMenu = (routeList: RouteList[], routes: RouteRecordRaw[]): Menu[] => {
  const menuList: Menu[] = [];
  // 判断后台返回的路由对象是否在文件路由中存在
  routes.forEach((ele) => {
    const parentRoute = find(routeList, ['name', ele.meta!.parentName]);
    if (parentRoute) {
      // 判断 menuList 中是否存在 menu
      const menu = find(menuList, ['key', parentRoute.name]);
      if (!menu) {
        const menu: Menu = {
          label: parentRoute.meta.title,
          key: parentRoute.name,
          icon: () => h('i', { class: `i-${parentRoute.meta?.icon}` }),
          show: !parentRoute.hidden,
          children: [
            {
              label: () =>
                h(RouterLink, { to: { path: ele.path } }, { default: () => ele.meta!.title }),
              key: ele.path,
              icon: () => h('i', { class: `i-${ele.meta?.icon}` }),
              show: !ele.meta!.hidden,
            },
          ],
        };
        menuList.push(menu);
      } else {
        menu.children?.push({
          label: () =>
            h(RouterLink, { to: { path: ele.path } }, { default: () => ele.meta!.title }),
          key: ele.path,
          icon: () => h('i', { class: `i-${ele.meta?.icon}` }),
          show: !ele.meta!.hidden,
        });
      }
    }
  });
  return menuList;
};
