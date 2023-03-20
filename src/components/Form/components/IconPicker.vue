<template>
  <n-input-group>
    <n-input
      disabled
      :placeholder="t('components.form.iconPlaceholder')"
      v-model:value="currentSelect"
    />
    <n-popover trigger="hover">
      <template #trigger>
        <n-button type="primary">
          <template #icon>
            <i class="i-ant-design:appstore-outlined"></i>
          </template>
        </n-button>
      </template>
      <div class="w-70" v-if="getPaginationList.length">
        <n-scrollbar style="max-height: 200px">
          <ul class="flex flex-wrap px-2">
            <li
              v-for="icon in getPaginationList"
              :key="icon"
              :class="currentSelect === icon ? 'border border-primary' : ''"
              class="p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary"
              @click="handleClick(icon)"
              :title="icon"
            >
              <i :class="`i-${icon}`"></i>
            </li>
          </ul>
        </n-scrollbar>
        <div class="flex py-2 items-center justify-center" v-if="getTotal >= pageSize">
          <n-pagination
            size="small"
            :pageSize="pageSize"
            :itemCount="getTotal"
            @update:page="handlePageChange"
          />
        </div>
      </div>
    </n-popover>
  </n-input-group>
</template>

<script setup lang="ts">
  import { icons } from '@iconify-json/ant-design';
  import { keys } from 'lodash';
  import { usePagination } from '@/hooks/usePagination';

  const emits = defineEmits(['change', 'update:value']);
  const props = defineProps({
    value: { type: String, default: '' },
    pageSize: { type: Number, default: 140 },
  });

  const getIcons = () => keys(icons.icons).map((item) => `${icons.prefix}:${item}`);

  const { t } = useI18n();
  const currentSelect = ref('');
  const currentList = ref(getIcons());

  const { getPaginationList, getTotal, setCurrentPage } = usePagination(
    currentList,
    props.pageSize,
  );

  watchEffect(() => {
    currentSelect.value = props.value;
  });

  watch(
    () => currentSelect.value,
    (v) => {
      emits('update:value', v);
      return emits('change', v);
    },
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleClick(icon: string) {
    currentSelect.value = icon;
  }
</script>

<style scoped></style>
