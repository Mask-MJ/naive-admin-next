<template>
  <div class="h-full">
    <dark-mode-container class="rounded-lg shadow-xl mb-4 overflow-hidden">
      <Form
        class="px-2 pt-2"
        ref="formRef"
        submitOnReset
        v-bind="getFormProps"
        :showActionButtonGroup="true"
        :isAutoCollapsed="true"
        v-if="getBindValues.useSearchForm"
        :tableAction="tableAction"
        @register="registerForm"
        @submit="handleSearchInfoChange"
      >
        <template #[replaceFormSlotKey(item)]="data" v-for="item in getFormSlotKeys">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </Form>
    </dark-mode-container>
    <dark-mode-container class="rounded-lg shadow-xl mb-4">
      <div class="flex items-center justify-between px-2">
        <div class="mt-2">
          <slot name="toolbar"></slot>
        </div>
        <toolbars class="mt-2 mr-2" v-bind="getProps" />
      </div>

      <n-data-table
        class="p-2"
        ref="tableElRef"
        v-bind="getBindValues"
        @update:page="updatePage"
        @update:page-size="updatePageSize"
        @update:checked-row-keys="setSelectedRowKeys"
      >
        <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
          <slot :name="item" v-bind="data"></slot>
        </template>
      </n-data-table>
    </dark-mode-container>
  </div>
</template>

<script setup lang="ts">
  // import type { DataTableRowKey } from 'naive-ui';
  import type { RowKey } from 'naive-ui/es/data-table/src/interface';
  import type { BasicTableProps, TableActionType } from './types/table';

  import { basicProps } from './props';
  import { remove } from 'lodash-es';
  import { useLoading } from './hooks/useLoading';
  import toolbars from './components/toolbars.vue';
  import { useForm } from '@/components/Form';

  import { useDataSource } from './hooks/useDataSource';
  import { usePagination } from './hooks/usePagination';
  import { useColumns } from './hooks/useColumns';
  import { useTableExpand } from './hooks/useTableExpand';
  import { useTableForm } from './hooks/useTableForm';

  const slots = useSlots();
  const attrs = useAttrs();
  const props = defineProps(basicProps);
  const emits = defineEmits(['change', 'register', 'fetch-success', 'fetch-error']);

  const tableData = ref<Recordable[]>([]);
  const innerPropsRef = ref<Partial<BasicTableProps>>();
  const checkedRowKeysRef = ref<Array<string | number>>([]);
  const [registerForm, formActions] = useForm();

  const getProps = computed(() => ({ ...props, ...unref(innerPropsRef) } as BasicTableProps));

  const getBindValues = computed(() => {
    let propsData = {
      ...attrs,
      ...unref(getProps),
      data: unref(getDataSourceRef),
      loading: unref(getLoading),
      tableLayout: 'fixed',
      rowKey: unref(getRowKey),
      columns: toRaw(unref(getViewColumns)),
      pagination: getPagination(),
      checkedRowKeys: unref(checkedRowKeysRef),
      ...unref(getExpandOption),
    };
    return propsData as unknown as BasicTableProps;
  });

  // loading hooks
  const { getLoading, setLoading } = useLoading(getProps);
  // pagination hooks
  const { getPagination, setPagination, setShowPagination, getShowPagination } =
    usePagination(getProps);
  // columns hooks
  const { getViewColumns, getColumns, setColumns, getCacheColumns, setCacheColumnsByField } =
    useColumns(getProps, getPagination);

  const setProps = (props: Partial<BasicTableProps>) => {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props };
  };

  const getSelectRowKeys = () => checkedRowKeysRef.value;
  const setSelectedRowKeys = (rows: RowKey[]) => {
    checkedRowKeysRef.value = rows;
  };
  const clearSelectedRowKeys = () => {
    checkedRowKeysRef.value = [];
  };
  const deleteSelectRowByKey = (row: RowKey) => {
    remove(checkedRowKeysRef.value, (e) => e === row);
  };

  const {
    // handleTableChange: onTableChange,
    getDataSourceRef,
    getDataSource,
    getRawDataSource,
    setTableData,
    updateTableDataRecord,
    deleteTableDataRecord,
    insertTableDataRecord,
    fetch,
    getRowKey,
    reload,
    updateTableData,
  } = useDataSource(
    getProps,
    {
      tableData,
      getPagination,
      setLoading,
      setPagination,
      getFieldsValue: formActions.getPathsValue,
      clearSelectedRowKeys,
    },
    emits,
  );

  //页码切换
  const updatePage = (page) => {
    setPagination({ page: page });
    reload();
  };

  //分页数量切换
  const updatePageSize = (size) => {
    setPagination({ page: 1, pageSize: size });
    reload();
  };

  const { getExpandOption, expandAll, collapseAll } = useTableExpand(getProps, tableData, emits);

  const { getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchInfoChange } =
    useTableForm(getProps, slots, fetch, getLoading);

  const tableAction: TableActionType = {
    setProps,
    reload,
    setLoading,
    getPagination,
    setPagination,
    getShowPagination,
    setShowPagination,
    getDataSource,
    getRawDataSource,
    updateTableData,
    setTableData,
    getColumns,
    setColumns,
    updateTableDataRecord,
    deleteTableDataRecord,
    insertTableDataRecord,
    getCacheColumns,
    setCacheColumnsByField,
    getSelectRowKeys,
    setSelectedRowKeys,
    deleteSelectRowByKey,
    clearSelectedRowKeys,
    expandAll,
    collapseAll,
    emits,
  };
  defineExpose(tableAction);

  emits('register', tableAction, formActions);
</script>

<style scoped></style>
