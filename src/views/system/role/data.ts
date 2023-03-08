import type { BasicColumn } from '@/components/Table';
import type { FormSchema } from '@/components/Form';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    key: 'roleName',
    width: 200,
  },
  {
    title: '角色编号',
    key: 'roleId',
    width: 100,
  },
  {
    title: '权限字符',
    key: 'roleKey',
    width: 200,
  },
  {
    title: '显示顺序',
    key: 'roleSort',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 200,
  },
];

export const schemas: FormSchema[] = [
  {
    path: 'roleName',
    component: 'NInput',
    label: '角色名称',
    giProps: { span: 8 },
    componentProps: { placeholder: '输入角色名称' },
  },
  {
    path: 'roleKey',
    component: 'NInput',
    label: '权限字符',
    giProps: { span: 8 },
    componentProps: { placeholder: '输入权限字符' },
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '状态',
    giProps: { span: 8 },
    componentProps: {
      options: [
        { label: '正常', value: '0', key: '0' },
        { label: '停用', value: '1', key: '1' },
      ],
    },
  },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    giProps: { span: 16 },
    componentProps: {
      type: 'datetimerange',
    },
  },
];
