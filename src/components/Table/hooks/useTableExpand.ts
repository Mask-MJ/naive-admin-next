import type { ComputedRef, Ref } from 'vue';
import type { BasicTableProps } from '../types/table';

export function useTableExpand(
  propsRef: ComputedRef<BasicTableProps>,
  tableData: Ref<Recordable[]>,
  emits: EmitType,
) {
  const expandedRowKeys = ref<string[]>([]);

  const getRowKey = computed(() => propsRef.value.rowKey as unknown as string);

  const getExpandOption = computed(() => {
    const { defaultExpandAll } = unref(propsRef);
    if (!defaultExpandAll) return {};

    return {
      expandedRowKeys: unref(expandedRowKeys),
      onExpandedRowsChange: (keys: string[]) => {
        expandedRowKeys.value = keys;
        emits('expanded-rows-change', keys);
      },
    };
  });

  function expandAll() {
    const keys = getAllKeys();
    expandedRowKeys.value = keys;
  }

  function expandRows(keys: string[]) {
    // use row ID expands the specified table row
    const { defaultExpandAll } = unref(propsRef);
    if (!defaultExpandAll) return;
    expandedRowKeys.value = [...expandedRowKeys.value, ...keys];
  }

  function getAllKeys(data?: Recordable[]) {
    const keys: string[] = [];
    const { childrenKey } = unref(propsRef);
    toRaw(data || unref(tableData)).forEach((item) => {
      keys.push(item[unref(getRowKey) as string]);
      const children = item[childrenKey || 'children'];
      if (children?.length) {
        keys.push(...getAllKeys(children));
      }
    });
    return keys;
  }

  function collapseAll() {
    expandedRowKeys.value = [];
  }

  return { getExpandOption, expandAll, expandRows, collapseAll };
}
