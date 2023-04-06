<template>
  <Table @register="registerTable">
    <template #toolbar>
      <n-button type="primary" @click="handleAdd"> 新增 </n-button>
    </template>
  </Table>
  <setModal @register="registerSetModal" @success="reload()" />
</template>

<script setup lang="ts">
  import type { PostList } from '@/api/system/types/post';

  import { useTable, TableAction } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns, schemas } from './data';
  import { getPostList, deletePost } from '@/api/system/post';
  import setModal from './modal/setModal.vue';

  const [registerSetModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getPostList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    rowKey: (rowData) => rowData.roleId,
    actionColumn: {
      width: 150,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row: PostList) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => {
                openModal(true, { postId: row.postId });
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
                  await deletePost(row.postId);
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
