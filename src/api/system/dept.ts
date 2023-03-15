import type { DeptList } from './types/dept';
import { defHttp } from '@/utils/axios';

enum Api {
  GetDeptList = '/system/dept/list', // 获取部门列表
  Dept = '/system/dept/',
  roleDeptTreeselect = '/system/dept/roleDeptTreeselect',
}

// 获取部门列表
export const getDeptList = (params) =>
  defHttp.get<DeptList>({ url: Api.GetDeptList, params }, { isTransformResponse: false });
// 获取用户对应的菜单权限
export const getDeptSelect = (params: string) => defHttp.get({ url: Api.GetDeptList + params });
// 获取角色列表
export const getTreeSelect = () => defHttp.get({ url: Api.GetDeptList });

// 获取部门信息
export const getDept = (params: string) => defHttp.get({ url: Api.Dept + params });
// 新增部门
export const addDept = (params) => defHttp.post({ url: Api.Dept, params });
// 修改部门
export const setDept = (params) => defHttp.put({ url: Api.Dept, params });
// 删除部门
export const deleteDept = (params: string) => defHttp.delete({ url: Api.Dept + params });
