<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="handleAdd"> 新增部门 </n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<script setup lang="ts">
  import type { DeptList } from '@/api/system/types/dept';
  import { useModal } from '@/components/Modal';
  import { TableAction, useTable } from '@/components/Table';
  import { getDeptList, deleteDept } from '@/api/system/dept';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getDeptList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    fetchSetting: { listField: 'data' },
    showIndexColumn: false,
    actionColumn: {
      width: 150,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row: DeptList) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => {
                openModal(true, { deptId: row.deptId });
              },
            },
            {
              type: 'error',
              icon: 'i-ant-design:delete-outlined',
              label: '是否确认删除',
              popConfirm: {
                showIcon: false,
                positiveButtonProps: { type: 'error' },
                onPositiveClick: async () => {
                  await deleteDept(row.deptId);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.deptId,
  });
  const handleAdd = () => {
    openModal(true);
  };
</script>

<style scoped></style>
