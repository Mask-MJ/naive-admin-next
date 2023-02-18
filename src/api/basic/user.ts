import type {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  GetPictureModel,
  RouteList,
} from './types/user';
import { defHttp } from '@/utils/axios';

enum Api {
  Login = '/system/token/login',
  GetPictureCode = '/code',
  Logout = '/system/token/logout',
  GetUserInfo = '/system/user/getInfo',
  GetMenuList = '/system/menu/getRouters',
}

/**
 * @description: user login api
 */
export const loginApi = (params: LoginParams) =>
  defHttp.post<LoginResultModel>({ url: Api.Login, params });

/**
 * @description: getPictureCode
 */
export const getPictureCode = () => defHttp.get<GetPictureModel>({ url: Api.GetPictureCode });
/**
 * @description: getUserInfo
 */
export const getUserInfoAsync = () => defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });

export const getMenuList = () => defHttp.get<RouteList[]>({ url: Api.GetMenuList });

export const doLogout = () => defHttp.delete({ url: Api.Logout });
