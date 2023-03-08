<template>
  <n-modal
    v-bind="getBindValue"
    @mask-click="handleCancel"
    @esc="handleCancel"
    @close="handleCancel"
    @negative-click="handleCancel"
  >
    <slot></slot>
  </n-modal>
</template>

<script setup lang="ts" name="BasicModal">
  import type { ModalProps } from 'naive-ui';
  import type { ModalMethods } from './type';

  import { merge } from 'lodash';
  import { basicProps } from './props';

  const attrs = useAttrs();
  const emits = defineEmits(['register', 'update:show', 'negative-click']);
  const props = defineProps(basicProps);

  const show = ref(false);
  const propsRef = ref<Partial<ModalProps> | null>(null);

  const getMergeProps = computed((): Recordable => {
    return { ...props, ...(unref(propsRef) as any) };
  });

  const getBindValue = computed((): Recordable => {
    return { ...attrs, ...unref(getMergeProps), show: unref(show) };
  });

  /**
   * @description: 设置modal参数
   */
  const setModalProps = (props: Partial<ModalProps>): void => {
    // Keep the last setModalProps
    propsRef.value = merge(unref(propsRef) || ({} as any), props);
    if (Reflect.has(props, 'show')) {
      show.value = !!props.show;
    }
  };

  // 取消事件
  const handleCancel = (e) => {
    show.value = false;
    emits('negative-click', e);
  };

  const modalMethods: ModalMethods = {
    setModalProps,
    emitVisible: undefined,
  };

  const instance = getCurrentInstance();
  if (instance) {
    emits('register', modalMethods, instance.uid);
  }

  watchEffect(() => {
    show.value = !!props.show;
  });

  watch(
    () => unref(show),
    (v) => {
      emits('update:show', v);
      instance && modalMethods.emitVisible?.(v, instance.uid);
    },
    { immediate: false },
  );
</script>

<style scoped></style>
