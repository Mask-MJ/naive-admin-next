export interface RoleParams {
  pageNum: number;
}

export interface RoleList {
  admin: boolean;
  roleId: string;
}

export interface SetRoleParams {}

export interface ScopeParams {
  roleId: number;
  userIds?: string;
  userId?: string;
}
