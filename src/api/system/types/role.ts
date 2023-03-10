export interface RoleParams {
  pageNum: number;
}

export interface RoleList {
  admin: boolean;
  roleId: string;
  status: string;
}

export interface SetRoleParams {}

export interface ScopeParams {
  roleId: number;
  userIds?: string;
  userId?: string;
}

export interface SetRoleStatusParams {
  roleId: string;
  status: string;
}
