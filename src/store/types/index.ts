import type { RouteRecordRaw } from 'vue-router';
import type { RemovableRef } from '@vueuse/core';
import type { Theme } from './theme';
import type { UserInfo } from '@/api/basic/types/user';
import type { Menu } from '#/router';

export type ThemeState = RemovableRef<Theme>;
export interface UserState {
  userInfo: RemovableRef<UserInfo>;
  token: RemovableRef<string | undefined>;
  roles: string[];
  // 权限代码列表
  permissions: string[];
}

export interface AppState {
  /** 重载页面(控制页面的显示) */
  reloadFlag: boolean;
  /** 项目配置的抽屉可见状态 */
  settingDrawerVisible: boolean;
  /** 侧边栏折叠状态 */
  siderCollapse: boolean;
  /** vertical-mix模式下 侧边栏的固定状态 */
  mixSiderFixed: boolean;
}

export interface RouterState {
  // 路由是否动态添加
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  // 触发菜单更新
  lastBuildMenuTime: number;
  // 菜单列表
  menuList: Menu[];
}

export interface TabState {
  cacheTabList: RemovableRef<string[]>;
  tabList: RouteRecordRaw[];
  // lastDragEndIndex: number;
  activeTab: string;
}

/** 多页签Tab的路由 */
export interface GlobalTabRoute
  extends Pick<import('vue-router').RouteLocationNormalizedLoaded, 'name' | 'fullPath' | 'meta'> {
  /** 滚动的位置 */
  scrollPosition: {
    left: number;
    top: number;
  };
}
