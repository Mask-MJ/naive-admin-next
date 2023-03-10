// import { BasicPageParams, BasicResult } from '@/api/model/baseModel';
export type AccountParams = {
  account?: string;
  nickname?: string;
};
export interface RoleStatus {
  status: string;
  userId: string;
}

export interface AccountList {
  status: string;
  userId: string;
}
