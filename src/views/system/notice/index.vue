<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button class="mr-2" type="primary" @click="handleAdd"> 新增公告 </n-button>
      <n-button type="error" @click="handleDelete"> 批量删除 </n-button>
    </template>
  </Table>
  <setModal @register="registerModal" @success="reload()" />
</template>

<script setup lang="ts">
  import type { NoticeList } from '@/api/system/types/notice';
  import { useModal } from '@/components/Modal';
  import { TableAction, useTable } from '@/components/Table';
  import { deleteNotice, getNoticeList } from '@/api/system/notice';
  import { columns, schemas } from './data';
  import setModal from './modal/setModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectRowKeys }] = useTable({
    api: getNoticeList,
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
      render: (row: NoticeList) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => {
                openModal(true, { noticeId: row.noticeId });
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
                  await deleteNotice(row.noticeId);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.noticeId,
  });

  const handleAdd = () => {
    openModal(true);
  };

  const handleDelete = async () => {
    const keys = getSelectRowKeys().join(',');
    console.log(keys);
    window.$dialog.warning({
      title: '系统提示',
      content: `是否确认删除公告编号为 ${keys} 的数据项?`,
      onPositiveClick: async () => {
        await deleteNotice(keys);
        window.$message.success('删除成功');
        await reload();
      },
    });
  };
</script>

<style scoped></style>
