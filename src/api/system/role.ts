import type { RoleParams } from '@/api/system/types/role';
import { defHttp } from '@/utils/axios';

enum Api {
  GetRoleList = '/system/role/list',
  GetTreeSelect = '/system/menu/treeselect',
  ControlRole = '/system/role/',
  SetRoleStatus = '/system/role/changeStatus',
  RoleMenuTreeSelect = '/system/menu/roleMenuTreeselect/',
  RoleDeptTreeselect = '/system/dept/roleDeptTreeselect/',
  AllocatedList = '/system/role/authUser/allocatedList',
  UnAllocatedList = '/system/role/authUser/unallocatedList',
  SelectAll = 'system/role/authUser/selectAll',
  Cancel = '/system/role/authUser/cancel',
  CancelAll = '/system/role/authUser/cancelAll',
  DataScope = '/system/role/dataScope',
}

export const getRoleList = (params: RoleParams) => defHttp.get({ url: Api.GetRoleList, params });
