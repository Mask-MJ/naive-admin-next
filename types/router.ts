import 'vue-router';
import type { RouteMeta } from 'vue-router';
import type { VNodeChild } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    // 路由标题
    title: string;
    // 是否不缓存
    noCache: boolean;
    // 图标
    icon: string;
    // 隐藏
    hidden: boolean;
    // 父级名称
    parentName: string;
    // 是否固定
    affix?: boolean;
  }
}

export type Menu = {
  key: string;
  label: string | (() => VNodeChild);
  // routeName: string;
  // path: string;
  orderNo?: number;
  icon: () => VNodeChild;
  meta?: Partial<RouteMeta>;
  show: boolean;
  children?: Menu[];
};
