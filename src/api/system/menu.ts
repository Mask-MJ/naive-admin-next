import type { MenuList } from './types/menu';

import { defHttp } from '@/utils/axios';

enum Api {
  GetMenuList = '/system/menu/getRouters',
  List = '/system/menu/list',
  Menu = '/system/menu/',
}

export const getMenuList = (params) => defHttp.get<MenuList[]>({ url: Api.List, params });

export const deleteMenu = (id: string) => defHttp.delete({ url: Api.Menu + id });
export const addMenu = (params) => defHttp.post({ url: Api.Menu, params });
export const setMenu = (params) => defHttp.put({ url: Api.Menu, params });
