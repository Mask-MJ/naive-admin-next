<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="handleAdd"> 新增字典 </n-button>
      <n-button type="error" @click="handleRefresh"> 刷新缓存 </n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<script setup lang="ts">
  import type { DictList } from '@/api/system/types/dict';
  import { useModal } from '@/components/Modal';
  import { TableAction, useTable } from '@/components/Table';
  import { getDictList, deleteDictList, refreshCache } from '@/api/system/dict';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const router = useRouter();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getDictList,
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
      render: (row: DictList) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => {
                openModal(true, { dictId: row.dictId });
              },
            },
            {
              type: 'success',
              icon: 'i-ant-design:database-outlined',
              tooltip: '列表',
              onClick: () => {
                router.push(`/system/dictData/${row.dictType}`);
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
                  await deleteDictList(row.dictId);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.dictId,
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
