<template>
  <dark-mode-container class="p-4 rounded-lg shadow-xl mb-4">
    <BasicForm
      ref="formRef"
      submitOnReset
      v-bind="getFormProps"
      v-if="getBindValues.useSearchForm"
      :tableAction="tableAction"
      @register="registerForm"
      @submit="handleSearchInfoChange"
    >
      <template #[replaceFormSlotKey(item)]="data" v-for="item in getFormSlotKeys">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </BasicForm>

    <div class="flex items-center justify-between mb-2">
      <div>
        <slot name="tableTitle"></slot>
      </div>
      <toolbars v-bind="getProps" />
    </div>

    <n-data-table ref="tableElRef" v-bind="getBindValues" @change="handleTableChange">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </n-data-table>
  </dark-mode-container>
</template>

<script setup lang="ts">
  import type { BasicTableProps, TableActionType } from './types/table';
  import type { RowKey } from 'naive-ui/es/data-table/src/interface';
  import { basicProps } from './props';
  import { remove } from 'lodash-es';
  import { useLoading } from './hooks/useLoading';
  import toolbars from './components/toolbars.vue';
  import { BasicForm, useForm } from '@/components/Form';

  import { useDataSource } from './hooks/useDataSource';
  import { usePagination } from './hooks/usePagination';
  import { useColumns } from './hooks/useColumns';
  import { useTableExpand } from './hooks/useTableExpand';
  import { useTableForm } from './hooks/useTableForm';

  const slots = useSlots();
  const attrs = useAttrs();
  const props = defineProps(basicProps);
  const emits = defineEmits(['change', 'register', 'fetch-success']);

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
    handleTableChange: onTableChange,
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

  function handleTableChange(...args) {
    onTableChange.call(undefined, ...args);
    emits('change', ...args);
    // 解决通过useTable注册onChange时不起作用的问题
    // const { onChange } = unref(getProps);
    // onChange && isFunction(onChange) && onChange.call(undefined, ...args);
  }

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
