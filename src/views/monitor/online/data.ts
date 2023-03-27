import type { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '会话编号',
    key: 'tokenId',
    width: 240,
  },
  {
    title: '登录名称',
    key: 'userName',
    width: 100,
  },
  {
    title: '主机',
    key: 'ipaddr',
    width: 100,
  },

  {
    title: '登录时间',
    key: 'loginTime',
    width: 120,
  },
];

export const schemas: FormSchema[] = [
  {
    path: 'phonenumber',
    label: '登录地址',
    component: 'NInput',
    giProps: { span: 8 },
  },
  {
    path: 'userName',
    label: '用户名称',
    component: 'NInput',
    giProps: { span: 8 },
  },
];
