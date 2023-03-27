import { defHttp } from '@/utils/axios';

import { GroupList } from './types/group';

enum Api {
  List = '/base/charging-group/group/list',
  TreeList = '/base/charging-group/group/treeList',
  Group = '/base/charging-group/group',
  ListDeTa = '/base/charging-group/{id}',
  FatherGroup = '/base/charging-group/fatherGroup',
  DeleteGroup = '/base/charging-group/group/',
}

export const getGroupList = (params) => defHttp.get<GroupList[]>({ url: Api.List, params });

export const addGroup = (params) => defHttp.post({ url: Api.Group, params });

export const setGroup = (params) => defHttp.put({ url: Api.Group, params });

export const getFatherGroup = () => defHttp.get({ url: Api.FatherGroup });

export const deleteGroup = (id: string) => defHttp.delete({ url: Api.DeleteGroup + id });
