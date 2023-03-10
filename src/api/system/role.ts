import type {
  RoleParams,
  RoleList,
  SetRoleParams,
  ScopeParams,
  SetRoleStatusParams,
} from '@/api/system/types/role';
import { defHttp } from '@/utils/axios';

enum Api {
  GetRoleList = '/system/role/list',
  GetTreeSelect = '/system/menu/treeselect',
  ControlRole = '/system/role/',
  SetRoleStatus = '/system/role/changeStatus',
  RoleMenuTree = '/system/menu/roleMenuTreeselect/',
  RoleDeptTree = '/system/dept/roleDeptTreeselect/',
  AllocatedList = '/system/role/authUser/allocatedList',
  DataScope = '/system/role/dataScope',
}

export const getRoleList = (params: RoleParams) =>
  defHttp.get<RoleList[]>({ url: Api.GetRoleList, params });

// 获取角色列表
export const getTreeSelect = () => defHttp.get({ url: Api.GetTreeSelect });
// 获取设置的 role
export const getRole = (params: string) => defHttp.get({ url: Api.ControlRole + params });
// 获取用户对应的菜单权限
export const getRoleMenuTree = (params: string) => defHttp.get({ url: Api.RoleMenuTree + params });
// 新建对应的角色
export const addRole = (params: SetRoleParams) => defHttp.post({ url: Api.ControlRole, params });
// 修改对应的角色
export const setRole = (params: SetRoleParams) => defHttp.put({ url: Api.ControlRole, params });
// 修改数据权限范围
export const setDataScope = (params: ScopeParams) => defHttp.put({ url: Api.DataScope, params });
// 获取对应的数据权限列表
export const getRoleDeptTree = ({ id }) => defHttp.get({ url: Api.RoleDeptTree + id });
// 删除对应的用户
export const deleteUser = (params: string) => defHttp.delete({ url: Api.ControlRole + params });
// 修改用户对应的状态
export const setRoleStatus = (params: SetRoleStatusParams) =>
  defHttp.put({ url: Api.SetRoleStatus, params });
