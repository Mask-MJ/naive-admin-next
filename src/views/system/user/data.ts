import type { FormSchema } from '@/components/Form';
import type { DataTableColumns } from 'naive-ui';
import { NPopconfirm, NSwitch, NButton } from 'naive-ui';
import { setRoleStatus } from '@/api/system/user';
import type { AccountList } from '@/api/system/types/user';

export const searchFormSchema: FormSchema[] = [
  {
    path: 'userName',
    label: '用户名称',
    component: 'NInput',
    giProps: { span: 8 },
  },
  {
    path: 'phonenumber',
    label: '手机号码',
    component: 'NInput',
    giProps: { span: 8 },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '正常', value: '0', key: '0' },
        { label: '停用', value: '1', key: '1' },
      ],
    },
    giProps: { span: 8 },
  },
  {
    path: 'userType',
    label: '加盟类型',
    component: 'NSelect',
    giProps: { span: 8 },
    componentProps: {
      options: [
        { label: '系统用户', value: '00' },
        { label: '合作公司用户', value: '10' },
      ],
    },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '正常', value: '0', key: '0' },
        { label: '停用', value: '1', key: '1' },
      ],
    },
    giProps: { span: 8 },
  },
  {
    path: 'userType',
    label: '加盟类型',
    component: 'NSelect',
    giProps: { span: 8 },
    componentProps: {
      options: [
        { label: '系统用户', value: '00' },
        { label: '合作公司用户', value: '10' },
      ],
    },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '正常', value: '0', key: '0' },
        { label: '停用', value: '1', key: '1' },
      ],
    },
    giProps: { span: 8 },
  },
  {
    path: 'userType',
    label: '加盟类型',
    component: 'NSelect',
    giProps: { span: 8 },
    componentProps: {
      options: [
        { label: '系统用户', value: '00' },
        { label: '合作公司用户', value: '10' },
      ],
    },
  },
  {
    path: 'userType',
    label: '加盟类型',
    component: 'NSelect',
    giProps: { span: 8 },
    componentProps: {
      options: [
        { label: '系统用户', value: '00' },
        { label: '合作公司用户', value: '10' },
      ],
    },
  },
  // {
  //   path: '[beginTime, endTime]',
  //   label: '创建时间',
  //   component: 'RangePicker',
  //   componentProps: {
  //     format: 'YYYY-MM-DD',
  //     placeholder: ['开始日期', '结束日期'],
  //   },
  //   giProps: {
  //     span: 12,
  //   },
  // },
];

export const columns: DataTableColumns<AccountList & { pendingStatus: boolean }> = [
  {
    title: '用户名称',
    key: 'userName',
    width: 100,
    align: 'center',
  },
  {
    title: '用户昵称',
    key: 'nickName',
    width: 100,
    align: 'center',
  },
  {
    title: '部门',
    key: 'dept.deptName',
    width: 100,
    align: 'center',
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    align: 'center',
    render: (rowData) => {
      return h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            const status = rowData.status === '0' ? '1' : '0';
            setRoleStatus({ userId: rowData.userId, status })
              .then(() => {
                rowData.status = status;
                window.$message.success(`已成功修改用户状态`);
              })
              .catch(() => {
                window.$message.error('修改用户状态失败');
              })
              .finally(() => {
                rowData.pendingStatus = false;
              });
          },
          onNegativeClick() {
            rowData.pendingStatus = false;
          },
        },
        {
          default: () => (rowData.status === '0' ? '是否停用用户' : '是否启用用户'),
          trigger: () =>
            h(
              NSwitch,
              {
                checkedValue: '0',
                uncheckedValue: '1',
                loading: rowData.pendingStatus,
                value: rowData.status,
                onUpdateValue() {
                  rowData.pendingStatus = true;
                },
              },
              { checked: () => '启用', unchecked: () => '停用' },
            ),
        },
      );
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 200,
    align: 'center',
  },
  {
    title: 'Action',
    key: 'actions',
    width: 200,
    fixed: 'right',
    render(row) {
      return h('div', { class: 'flex-between' }, [
        h(
          NButton,
          {
            strong: true,
            type: 'primary',
            secondary: true,
            size: 'small',
            onClick() {
              console.log(row);
            },
          },
          { icon: () => h('i', { class: 'i-ant-design:edit-outlined' }) },
        ),
        h(
          NButton,
          { strong: true, type: 'success', secondary: true, size: 'small' },
          { icon: () => h('i', { class: 'i-ant-design:edit-outlined' }) },
        ),
        h(
          NButton,
          { strong: true, type: 'warning', secondary: true, size: 'small' },
          { icon: () => h('i', { class: 'i-ant-design:edit-outlined' }) },
        ),
        h(
          NButton,
          { strong: true, type: 'error', secondary: true, size: 'small' },
          { icon: () => h('i', { class: 'i-ant-design:edit-outlined' }) },
        ),
      ]);
    },
  },
];
