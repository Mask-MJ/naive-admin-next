import type { AccountParams, RoleStatus, AccountList } from './types/user';

import { defHttp } from '@/utils/axios';

enum Api {
  List = '/system/user/list',
  TreeSelect = '/system/dept/treeselect',
  ChangeStatus = '/system/user/changeStatus',
  User = '/system/user/',
  ResetPwd = '/system/user/resetPwd',
  AuthRole = '/system/user/authRole/',
  UploadAvatar = '/system/user/profile/avatar',
  Profile = '/system/user/profile',
  UpdatePwd = '/system/user/profile/updatePwd',
}

// 获取账户列表
export const getAccountList = (params?: AccountParams) =>
  defHttp.get<AccountList[]>({ url: Api.List, params });
// 修改用户状态
export const setRoleStatus = (params: RoleStatus) => defHttp.put({ url: Api.ChangeStatus, params });
