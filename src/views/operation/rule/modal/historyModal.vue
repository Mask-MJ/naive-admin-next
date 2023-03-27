<template>
  <Modal title="历史计费规则列表" class="!w-200" @register="registerModal" positiveText="">
    <Table v-if="ListId" @register="registerTable" />
    <detailModal @register="registerDetailModal" />
  </Modal>
</template>

<script setup lang="ts">
  import type { RuleList } from '@/api/operation/types/rule';

  import { useModalInner, useModal } from '@/components/Modal';
  import { TableAction, useTable } from '@/components/Table';
  import { getHistoryList } from '@/api/operation/rule';
  import { schemas, columns } from './historyData';
  import detailModal from './detailModal.vue';

  const ListId = ref();

  const [registerDetailModal, { openModal: openDetailModel }] = useModal();
  const [registerModal] = useModalInner(async (data: RuleList) => {
    ListId.value = data.id;
  });
  const [registerTable] = useTable({
    api: getHistoryList,
    columns,
    useSearchForm: true,
    searchInfo: { ruleId: ListId },
    formConfig: { labelWidth: 100, schemas },
    scrollX: 700,
    actionColumn: {
      width: 80,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row: RuleList) =>
        h(TableAction, {
          actions: [
            {
              icon: 'i-ant-design:form-outlined',
              tooltip: '详情',
              onClick: () => openDetailModel(true, { isHistory: true, id: row.id }),
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.id,
  });
</script>

<style scoped></style>
