<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="handleAdd"> 新增参数 </n-button>
      <n-button type="error" @click="handleRefresh"> 刷新缓存 </n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<script setup lang="ts">
  import type { ConfigList } from '@/api/system/types/config';
  import { useModal } from '@/components/Modal';
  import { TableAction, useTable } from '@/components/Table';
  import { getConfigList, delConfig, refreshCache } from '@/api/system/config';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getConfigList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 150,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row: ConfigList) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => {
                openModal(true, { configId: row.configId });
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
                  await delConfig(row.configId);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.configId,
  });

  const handleAdd = () => {
    openModal(true);
  };

  const handleRefresh = async () => {
    await refreshCache();
    await reload();
  };
</script>

<style scoped></style>
