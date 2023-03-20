<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="handleAdd"> 新增菜单 </n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<script setup lang="ts">
  import type { MenuList } from '@/api/system/types/menu';
  import { useModal } from '@/components/Modal';
  import { TableAction, useTable } from '@/components/Table';
  import { getMenuList, deleteMenu } from '@/api/system/menu';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getMenuList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    fetchSetting: { listField: 'data' },
    showIndexColumn: false,
    pagination: false,
    rowKey: (rowData) => rowData.menuId,
    actionColumn: {
      width: 150,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (rowData: MenuList) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => {
                openModal(true, rowData);
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
                  await deleteMenu(rowData.menuId);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
  });
  const handleAdd = () => {
    openModal(true);
  };
</script>

<style scoped></style>
