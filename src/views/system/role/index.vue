<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
      </template>
    </BasicTable>
    <setModal @register="registerSetModal" @success="reload()" />
    <depModal @register="registerDepModal" @success="reload()" />
  </div>
</template>

<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { getRoleList, deleteUser } from '@/api/system/role';
  import { columns, schemas } from './data';
  import { TableAction } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import setModal from './modal/setModal.vue';
  import depModal from './modal/depModal.vue';

  const router = useRouter();
  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerDepModal, { openModal: openDepModel }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getRoleList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    actionColumn: {
      width: 200,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => {
                openSetModel(true, { roleId: row.roleId });
              },
            },
            {
              type: 'warning',
              icon: 'i-ant-design:user-outlined',
              tooltip: '分配',
              onClick: () => {
                router.push(`/system/assign/${encodeURIComponent(row.roleId as string)}`);
              },
            },
            {
              type: 'success',
              icon: 'i-ant-design:poweroff-outlined',
              tooltip: '权限',
              onClick: () => {
                openDepModel(true, { roleId: row.roleId });
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
                  await deleteUser(row.roleId as string);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
    fetchSetting: { listField: 'rows' },
    rowKey: (rowData) => rowData.roleId,
  });

  const handleAdd = () => {
    openSetModel(true);
  };
</script>

<style scoped></style>
