import type { UserState } from '../types';
import type { UserInfo, LoginParams } from '@/api/basic/types/user';

import { defineStore } from 'pinia';
import { router } from '@/router';
import { USER_INFO_KEY, TOKEN_KEY } from '@/enums/cacheEnum';
import { PageEnum } from '@/enums/pageEnum';
import { loginApi, getUserInfoAsync, doLogout } from '@/api/basic/user';

export const useUserStore = defineStore('user-store', {
  state: (): UserState => ({
    // user info
    userInfo: useStorage(USER_INFO_KEY, {} as UserInfo),
    // token
    token: useStorage(TOKEN_KEY, ''),
    // roles
    roles: [],
    permissions: [],
  }),
  getters: {
    getToken(): string {
      return this.token || '';
    },
  },
  actions: {
    setToken(info?: string) {
      this.token = info;
    },
    setUserInfo(info: UserInfo = {} as UserInfo) {
      this.userInfo = info;
    },
    setRoles(roles: string[]) {
      this.roles = roles;
    },
    setPermissions(permissions: string[]) {
      this.permissions = permissions;
    },
    async login(params: LoginParams): Promise<UserInfo | null> {
      try {
        const data = await loginApi(params);
        const { access_token } = data;
        this.setToken(access_token);
        return this.afterLoginAction();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await this.getUserInfoAction();
      // const permissionStore = usePermissionStore();
      // if (!permissionStore.isDynamicAddedRoute) {
      //   const routes = await permissionStore.buildRoutesAction();
      //   routes.forEach((route) => {
      //     router.addRoute(route);
      //   });
      //   permissionStore.setDynamicAddedRoute(true);
      // }
      await router.replace(PageEnum.BASE_HOME);
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const result = await getUserInfoAsync();
      this.setRoles(result.roles);
      this.setPermissions(result.permissions);
      this.setUserInfo(result.user);
      return result.user;
    },
    async logout() {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken();
      this.setUserInfo();
      router.push(PageEnum.BASE_LOGIN);
    },
  },
});
