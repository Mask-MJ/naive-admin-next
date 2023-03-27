<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="openModal(true)"> 新增 </n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<script setup lang="ts">
  import type { GroupList } from '@/api/operation/types/group';

  import { TableAction, useTable } from '@/components/Table';
  import { getGroupList, deleteGroup } from '@/api/operation/group';
  import { useModal } from '@/components/Modal';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getGroupList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 100,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row: GroupList) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => openModal(true, row),
            },
            {
              type: 'error',
              icon: 'i-ant-design:delete-outlined',
              label: '是否确认删除',
              popConfirm: {
                showIcon: false,
                positiveButtonProps: { type: 'error' },
                onPositiveClick: async () => {
                  await deleteGroup(row.id);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
  });
</script>
