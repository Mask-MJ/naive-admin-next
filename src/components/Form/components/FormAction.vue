<template>
  <div class="flex">
    <slot name="resetBefore"></slot>
    <n-button
      type="default"
      class="mr-2"
      v-bind="getResetBtnOptions"
      @click="formContext.resetAction"
      v-if="showResetButton"
    >
      {{ getResetBtnOptions.label }}
    </n-button>
    <slot name="submitBefore"></slot>
    <n-button
      type="primary"
      class="mr-2"
      v-bind="getSubmitBtnOptions"
      @click="formContext.submitAction"
      v-if="showSubmitButton"
    >
      {{ getSubmitBtnOptions.label }}
    </n-button>
    <slot name="advanceBefore"></slot>
    <n-button quaternary size="small" @click="toggleAdvanced" v-if="showAdvancedButton">
      {{ collapsed ? t('components.form.putAway') : t('components.form.unfold') }}
      <template #icon>
        <n-icon>
          <!-- <cash-icon /> -->
          <i class="i-ant-design:down-outlined" v-if="collapsed"></i>
          <i class="i-ant-design:up-outlined" v-else></i>
        </n-icon>
      </template>
    </n-button>
    <slot name="advanceAfter"></slot>
  </div>
</template>

<script setup lang="ts" name="BasicFormAction">
  import type { ButtonOptions } from '../types/form';
  import { useFormContext } from '../hooks/useFormContext';

  const emits = defineEmits(['toggle-advanced']);
  const props = defineProps({
    showActionButtonGroup: { type: Boolean, default: true },
    showResetButton: { type: Boolean, default: true },
    showSubmitButton: { type: Boolean, default: true },
    showAdvancedButton: { type: Boolean, default: true },
    collapsed: { type: Boolean, default: true },
    resetButtonOptions: { type: Object as PropType<Partial<ButtonOptions>>, default: () => ({}) },
    submitButtonOptions: { type: Object as PropType<Partial<ButtonOptions>>, default: () => ({}) },
    // actionGiOptions: { type: Object as PropType<Partial<GridItemProps>>, default: () => ({}) },
  });

  const { t } = useI18n();
  const formContext = useFormContext();

  const getResetBtnOptions = computed(() =>
    Object.assign({ label: t('components.form.resetText') }, props.resetButtonOptions),
  );
  const getSubmitBtnOptions = computed(() =>
    Object.assign({ label: t('components.form.queryText') }, props.submitButtonOptions),
  );

  const toggleAdvanced = () => {
    emits('toggle-advanced');
  };
</script>
