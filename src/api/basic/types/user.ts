import type { RouteMeta } from 'vue-router';

export interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

export interface LoginResultModel {
  access_token: string;
  expires_in: number;
}

export interface GetUserInfoModel {
  roles: string[];
  user: UserInfo;
  permissions: string[];
}

export interface GetPictureModel {
  captchaOnOff: boolean;
  code: number;
  img: string;
  msg: string;
  uuid: string;
}

export interface UserInfo {
  admin: boolean;
  nickName: string;
  avatar: string;
  userName: string;
}

export interface RouteList {
  hidden: boolean;
  meta: RouteMeta;
  name: string;
  path: string;
  redirect: string;
  children: RouteList[];
}
