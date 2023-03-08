<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
        <n-button class="mr-2" type="error" @click="handleDeleteAll"> 批量取消授权 </n-button>
        <n-button class="mr-2" type="warning" @click="handleClose"> 关闭 </n-button>
      </template>
    </BasicTable>
    <addUser @register="registerModal" @success="reload()" />
  </div>
</template>

<script setup lang="ts">
  import type { CancelParams } from '@/api/system/types/assign';

  import { BasicTable, useTable } from '@/components/Table';
  import { TableAction } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import addUser from './modal/addUser.vue';

  import { getAllocatedList, cancel, cancelAll } from '@/api/system/assign';
  import { schemas, columns } from './data';
  import { useGo } from '@/hooks/usePage';

  const props = defineProps({
    id: { type: String },
  });

  const go = useGo();
  const router = useRouter();
  const { removeTab } = useMultipleTabStore();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectRowKeys }] = useTable({
    api: getAllocatedList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    bordered: true,
    searchInfo: { roleId: props.id },
    actionColumn: {
      width: 100,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row) =>
        h(TableAction, {
          actions: [
            {
              type: 'error',
              icon: 'i-ant-design:delete-outlined',
              label: '是否确认删除',
              popConfirm: {
                showIcon: false,
                positiveButtonProps: { type: 'error' },
                onPositiveClick: async () => {
                  await cancel({ roleId: props.id, userId: row.userId } as CancelParams);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
    fetchSetting: { listField: 'rows' },
    rowKey: (rowData) => rowData.userId,
  });

  const handleAdd = () => {
    openModal(true, { roleId: props.id });
  };

  const handleDeleteAll = async () => {
    const userIds = getSelectRowKeys();
    if (userIds.length === 0) {
      window.$message.error('请选择要取消授权的用户');
    } else {
      let params = {
        roleId: Number(props.id),
        userIds: userIds.join(','),
      };
      await cancelAll(params);
      reload();
    }
  };

  const handleClose = async () => {
    await removeTab(router.currentRoute.value.fullPath);
    go('/system/role');
  };
</script>

<style scoped></style>
