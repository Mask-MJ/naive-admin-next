<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <n-button type="primary" @click="handleAdd"> 新增 </n-button>
        <n-button type="error" @click="handleDelete"> 删除 </n-button>
      </template>
    </BasicTable>
  </div>
</template>

<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';

  import { getRoleList } from '@/api/system/role';
  import { columns } from './data';
  const [registerTable] = useTable({
    canResize: true,
    title: '用户权限控制',
    titleHelpMessage: '用户权限控制',
    api: getRoleList,
    columns,
    // useSearchForm: true,
    // formConfig: {
    //   labelWidth: 100,
    //   schemas: searchFormSchema,
    // },
    bordered: true,
    actionColumn: {
      width: 160,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
    },
    fetchSetting: { listField: 'rows' },
    rowKey: (rowData) => rowData.roleId,
    showTableSetting: true,
    rowSelection: {
      type: 'checkbox',
    },
  });

  const handleAdd = () => {};
  const handleDelete = () => {};
</script>

<style scoped></style>
