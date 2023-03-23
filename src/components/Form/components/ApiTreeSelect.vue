<template>
  <n-tree-select v-bind="getAttrs" @update:value="handleChange">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </n-tree-select>
</template>

<script setup lang="ts" name="ApiTreeSelect">
  import { get, isArray, isFunction } from 'lodash-es';

  const attrs = useAttrs();
  const emits = defineEmits(['update:value', 'options-change']);
  const props = defineProps({
    api: { type: Function as PropType<(arg?: Recordable) => Promise<Recordable>> },
    params: { type: Object },
    immediate: { type: Boolean, default: true },
    resultField: { type: String, default: '' },
  });

  const isFirstLoaded = ref<Boolean>(false);
  const treeData = ref();
  const getAttrs = computed(() => {
    return { ...(props.api ? { options: treeData.value } : {}), ...attrs };
  });

  function handleChange(...args) {
    emits('update:value', ...args);
  }

  watch(
    () => props.params,
    () => {
      !unref(isFirstLoaded) && fetch();
    },
    { deep: true },
  );

  watch(
    () => props.immediate,
    (v) => {
      v && !isFirstLoaded.value && fetch();
    },
  );

  onMounted(() => {
    props.immediate && fetch();
  });

  async function fetch() {
    const { api } = props;
    if (!api || !isFunction(api)) return;
    treeData.value = [];
    let result;
    try {
      result = await api(props.params);
    } catch (e) {
      console.error(e);
    }
    if (!result) return;
    if (!isArray(result)) {
      result = get(result, props.resultField);
    }
    treeData.value = result || [];
    isFirstLoaded.value = true;
    emits('options-change', treeData.value);
  }
</script>

<style scoped></style>
