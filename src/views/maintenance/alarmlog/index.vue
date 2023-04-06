<template>
  <Table @register="registerTable" />
</template>

<script setup lang="ts">
  import { useTable } from '@/components/Table';
  import { getAlarmList } from '@/api/maintenance/alarmlog';
  import { columns, schemas } from './data';

  const [registerTable] = useTable({
    api: getAlarmList,
    columns,
    useSearchForm: true,
    scrollX: 1300,
    showIndexColumn: false,
    formConfig: { labelWidth: 100, schemas },
    // actionColumn: false,
    bordered: true,
    rowKey: (rowData) => rowData.id,
  });
</script>
