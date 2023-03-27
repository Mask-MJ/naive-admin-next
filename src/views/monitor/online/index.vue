<template>
  <Table @register="registerTable" />
</template>

<script setup lang="ts">
  import type { OnlineList } from '@/api/monitor/types/online';

  import { TableAction, useTable } from '@/components/Table';
  import { getOnlineList, deleteOnline } from '@/api/monitor/online';
  import { columns, schemas } from './data';

  const [registerTable, { reload }] = useTable({
    api: getOnlineList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    rowKey: (rowData) => rowData.tokenId,
    actionColumn: {
      width: 100,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row: OnlineList) =>
        h(TableAction, {
          actions: [
            {
              type: 'error',
              icon: 'i-ant-design:delete-outlined',
              label: '强退',
              popConfirm: {
                showIcon: false,
                positiveButtonProps: { type: 'error' },
                onPositiveClick: async () => {
                  await deleteOnline(row.tokenId);
                  window.$message.success('强退成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
  });
</script>
