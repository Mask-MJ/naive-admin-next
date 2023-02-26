<template>
  <div>
    <div></div>
    <div>
      <Form @register="register" @submit="handleSubmit" />
      <n-data-table
        remote
        ref="table"
        :single-line="false"
        :columns="columnsRef"
        :data="dataRef"
        :loading="loadingRef"
        :pagination="pagination"
        size="small"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useForm } from '@/components/Form/hooks/useForm';
  import { searchFormSchema, columns } from './data';
  import { getAccountList } from '@/api/system/user';
  const dataRef = ref();
  const loadingRef = ref(false);
  const columnsRef = ref(columns);

  const pagination = reactive({
    page: 1,
    pageCount: 1,
    pageSize: 10,
  });

  const [register] = useForm({
    labelWidth: 80,
    schemas: searchFormSchema,
  });

  const handleSubmit = (e) => {
    console.log(e);
  };

  onMounted(async () => {
    const result = await getAccountList();
    dataRef.value = result;
  });
</script>

<style scoped></style>
