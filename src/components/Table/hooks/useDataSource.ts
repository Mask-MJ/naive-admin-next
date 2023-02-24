import type { ComputedRef } from 'vue';
import type { PaginationProps } from 'naive-ui';
import type { BasicTableProps, FetchParams } from '../types/table';

import { useTimeoutFn } from '@/hooks/core/useTimeout';
import { isFunction, isBoolean, get, merge, isObject } from 'lodash-es';
import { FETCH_SETTING, PAGE_SIZE } from '../const';

interface ActionType {
  tableData: Ref<Recordable[]>;
  getPagination: () => boolean | PaginationProps;
  setPagination: (info: Partial<PaginationProps>) => void;
  setLoading: (loading: boolean) => void;
  getFieldsValue: () => Recordable;
  clearSelectedRowKeys: () => void;
}

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  {
    tableData,
    getPagination,
    setPagination,
    setLoading,
    getFieldsValue,
    clearSelectedRowKeys,
  }: ActionType,
  emits: EmitType,
) {
  const dataSourceRef = ref();
  const rawDataSourceRef = ref<Recordable>({});

  watchEffect(() => {
    tableData.value = unref(dataSourceRef);
  });

  watch(
    () => unref(propsRef).data,
    () => {
      const { data, api } = unref(propsRef);
      !api && data && (dataSourceRef.value = data);
    },
    { immediate: true },
  );

  const handleTableChange = (pagination: PaginationProps) => {
    const { clearSelectOnPageChange } = unref(propsRef);
    if (clearSelectOnPageChange) {
      clearSelectedRowKeys();
    }
    setPagination(pagination);
    fetch({});
  };

  const getRowKey = computed(() => propsRef.value.rowKey as unknown as string);
  const getDataSourceRef = computed(() => unref(dataSourceRef));

  const updateTableData = async (index: number, key: string, value: any) => {
    const record = dataSourceRef.value[index];
    if (record) {
      record[key] = value;
    }
    return record;
  };

  const updateTableDataRecord = (
    rowKey: string | number,
    record: Recordable,
  ): Recordable | undefined => {
    const row = findTableDataRecord(rowKey);
    if (row) {
      for (const field in row) {
        if (Reflect.has(record, field)) row[field] = record[field];
      }
      return row;
    }
  };

  const deleteTableDataRecord = (rowKey: string | number | string[] | number[]) => {
    if (!dataSourceRef.value || dataSourceRef.value.length == 0) return;
    const rowKeyName = unref(getRowKey);
    if (!rowKeyName) return;
    const rowKeys = !Array.isArray(rowKey) ? [rowKey] : rowKey;

    function deleteRow(data, key) {
      const row: { index: number; data: [] } = findRow(data, key);
      if (row === null || row.index === -1) {
        return;
      }
      row.data.splice(row.index, 1);

      function findRow(data, key) {
        if (data === null || data === undefined) {
          return null;
        }
        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          let targetKeyName: string = rowKeyName as string;
          if (isFunction(rowKeyName)) {
            targetKeyName = rowKeyName(row);
          }
          if (row[targetKeyName] === key) {
            return { index: i, data };
          }
          if (row.children?.length > 0) {
            const result = findRow(row.children, key);
            if (result != null) {
              return result;
            }
          }
        }
        return null;
      }
    }

    for (const key of rowKeys) {
      deleteRow(dataSourceRef.value, key);
      deleteRow(unref(propsRef).data, key);
    }
    setPagination({ pageCount: unref(propsRef).data?.length });
  };

  const insertTableDataRecord = (
    record: Recordable | Recordable[],
    index: number,
  ): Recordable[] | undefined => {
    index = index ?? dataSourceRef.value?.length;
    const _record = isObject(record) ? [record as Recordable] : (record as Recordable[]);
    unref(dataSourceRef).splice(index, 0, ..._record);
    return unref(dataSourceRef);
  };

  const findTableDataRecord = (rowKey: string | number) => {
    if (!dataSourceRef.value || dataSourceRef.value.length == 0) return;

    const rowKeyName = unref(getRowKey);
    if (!rowKeyName) return;

    const { childrenKey = 'children' } = unref(propsRef);

    const findRow = (array: any[]) => {
      let ret;
      array.some(function iter(r) {
        if (Reflect.has(r, rowKeyName) && r[rowKeyName] === rowKey) {
          ret = r;
          return true;
        }
        return r[childrenKey] && r[childrenKey].some(iter);
      });
      return ret;
    };

    return findRow(dataSourceRef.value);
  };

  const fetch = async (opt?: FetchParams) => {
    const { api, searchInfo, fetchSetting, beforeFetch, afterFetch, useSearchForm, pagination } =
      unref(propsRef);
    if (!api || !isFunction(api)) return;
    try {
      setLoading(true);
      const { pageField, sizeField, listField, totalField } = Object.assign(
        {},
        FETCH_SETTING,
        fetchSetting,
      );
      let pageParams: Recordable = {};

      const { page = 1, pageSize = PAGE_SIZE } = unref(getPagination()) as PaginationProps;

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPagination())) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt.page) || page;
        pageParams[sizeField] = pageSize;
      }

      let params: Recordable = merge(
        pageParams,
        useSearchForm ? getFieldsValue() : {},
        searchInfo,
        opt?.searchInfo ?? {},
      );
      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params;
      }

      const res = await api(params);
      rawDataSourceRef.value = res;

      const isArrayResult = Array.isArray(res);

      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultPageCount: number = isArrayResult ? res.length : get(res, totalField);

      // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
      if (Number(resultPageCount)) {
        const pageTotal = Math.ceil(resultPageCount / pageSize);
        if (page > pageTotal) {
          setPagination({
            page: pageTotal,
          });
          return await fetch(opt);
        }
      }

      if (afterFetch && isFunction(afterFetch)) {
        resultItems = (await afterFetch(resultItems)) || resultItems;
      }
      dataSourceRef.value = resultItems;
      setPagination({
        pageCount: resultPageCount || 0,
      });
      if (opt && opt.page) {
        setPagination({
          page: opt.page || 1,
        });
      }
      emits('fetch-success', {
        items: unref(resultItems),
        pageCount: resultPageCount,
      });
      return resultItems;
    } catch (error) {
      emits('fetch-error', error);
      dataSourceRef.value = [];
      setPagination({ pageCount: 0 });
    } finally {
      setLoading(false);
    }
  };

  const setTableData = <T = Recordable>(values: T[]) => {
    dataSourceRef.value = values;
  };

  const getDataSource = <T = Recordable>() => getDataSourceRef.value as T[];

  const getRawDataSource = <T = Recordable>() => rawDataSourceRef.value as T;

  const reload = async (opt?: FetchParams) => await fetch(opt);

  onMounted(() => {
    useTimeoutFn(() => {
      unref(propsRef).immediate && fetch();
    }, 16);
  });

  return {
    getDataSourceRef,
    getDataSource,
    getRawDataSource,
    getRowKey,
    setTableData,
    fetch,
    reload,
    updateTableData,
    updateTableDataRecord,
    deleteTableDataRecord,
    insertTableDataRecord,
    findTableDataRecord,
    handleTableChange,
  };
}
