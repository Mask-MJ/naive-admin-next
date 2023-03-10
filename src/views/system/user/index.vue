<template>
  <div class="flex">
    <div class="w-1/4 xl:w-1/5 mr-4">
      <n-input v-model:value="searchValue" placeholder="搜索" />
      <n-tree
        :show-irrelevant-nodes="false"
        :pattern="searchValue"
        :data="data"
        block-line
        key-field="id"
        @update-selected-keys="handleSelect"
      />
    </div>
    <div class="w-3/4 xl:w-4/5">
      <Table @register="registerTable">
        <template #toolbar>
          <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
        </template>
      </Table>
    </div>
    <AccountModal @register="registerSetModal" @success="reload()" />
    <ResetModal @register="registerResetModal" />
  </div>
</template>

<script setup lang="ts">
  import type { AccountList } from '@/api/system/types/user';

  import { TableAction, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns, schemas } from './data';
  import { getDeptList, getAccountList, deleteUser } from '@/api/system/user';
  import AccountModal from './modal/AccountModal.vue';
  import ResetModal from './modal/ResetModal.vue';

  const searchValue = ref('');
  const searchInfo = reactive<Recordable>({});
  const data = ref();

  const router = useRouter();
  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerResetModal, { openModal: openResetModel }] = useModal();

  const [registerTable, { reload }] = useTable({
    api: getAccountList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    searchInfo,
    bordered: true,
    actionColumn: {
      width: 200,
      title: '操作',
      flag: 'ACTION',
      key: 'ACTION',
      render: (row: AccountList) =>
        h(TableAction, {
          actions: [
            {
              type: 'primary',
              icon: 'i-ant-design:form-outlined',
              tooltip: '编辑',
              onClick: () => {
                openSetModel(true, { userId: row.userId, treeData: data.value });
              },
            },
            {
              type: 'warning',
              icon: 'i-ant-design:user-outlined',
              tooltip: '分配角色',
              onClick: () => {
                router.push(`/system/distribution/${row.userId}`);
              },
            },
            {
              type: 'success',
              icon: 'i-ant-design:key-outlined',
              tooltip: '重置密码',
              onClick: () => {
                openResetModel(true, { userId: row.userId });
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
                  await deleteUser(row.userId);
                  window.$message.success('删除成功');
                  await reload();
                },
              },
            },
          ],
        }),
    },
    rowKey: (rowData) => rowData.userId,
  });

  const handleAdd = () => {
    openSetModel(true, { treeData: data.value });
  };

  /** 更新表格数据 */
  const handleSelect = (deptId) => {
    searchInfo.deptId = deptId[0];
    reload();
  };

  onMounted(async () => {
    data.value = await getDeptList('0');
  });
</script>

<style scoped></style>
