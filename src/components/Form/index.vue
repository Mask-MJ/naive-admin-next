<template>
  <dark-mode-container class="p-2 rounded-lg shadow-xl mb-4">
    <n-form v-bind="getBindValue" ref="formElRef" :model="formModel">
      <n-grid v-bind="getGrid">
        <slot name="formHeader"></slot>
        <template v-for="schema in getSchema" :key="schema.path">
          <n-form-item-gi
            :tableAction="tableAction"
            :label="schema.label"
            :path="schema.path"
            :rule="schema.rule"
            :span="schema.giProps?.span"
          >
            <FormItem
              :allDefaultValues="defaultValueRef"
              :formProps="getProps"
              :formModel="formModel"
              :schema="schema"
              :setFormModel="setFormModel"
              :formActionType="formActionType"
            >
              <template #[item]="data" v-for="item in (Object.keys($slots) as any)">
                <slot :name="item" v-bind="data || {}"></slot>
              </template>
            </FormItem>
          </n-form-item-gi>
        </template>
        <n-form-item-gi
          class="flex flex-row-reverse"
          suffix
          v-bind="actionGiOptions"
          v-if="showActionButtonGroup"
        >
          <slot name="resetBefore"></slot>
          <n-button
            type="default"
            v-bind="getResetBtnOptions"
            @click="resetPaths"
            v-if="showResetButton"
          >
            {{ getResetBtnOptions.label }}
          </n-button>
          <slot name="submitBefore"></slot>
          <n-button
            type="primary"
            class="ml-2"
            v-bind="getSubmitBtnOptions"
            @click="handleSubmit"
            v-if="showSubmitButton"
          >
            {{ getSubmitBtnOptions.label }}
          </n-button>
          <slot name="advanceBefore"></slot>
          <slot name="advanceBefore"></slot>
          <n-button
            class="ml-2"
            quaternary
            size="small"
            @click="handleToggleAdvanced"
            v-if="isShowAdvancedButton"
          >
            {{
              advanceState.collapsed ? t('components.form.unfold') : t('components.form.putAway')
            }}
            <template #icon>
              <n-icon>
                <i class="i-ant-design:down-outlined" v-if="advanceState.collapsed"></i>
                <i class="i-ant-design:up-outlined" v-else></i>
              </n-icon>
            </template>
          </n-button>
        </n-form-item-gi>
        <slot name="formFooter"></slot>
      </n-grid>
    </n-form>
  </dark-mode-container>
</template>

<script setup lang="ts" name="BasicForm">
  import type { BasicFormProps, FormSchema, FormActionType } from './types/form';

  import { isArray, isFunction, merge, cloneDeep } from 'lodash';
  import { basicProps } from './props';
  import { dateUtil } from '@/utils/dateUtil';
  import { useFormValues } from './hooks/useFormValues';
  import { useFormEvents } from './hooks/useFormEvents';
  import FormItem from './components/FormItem.vue';

  const { t } = useI18n();
  const attrs = useAttrs();
  const props = defineProps({ ...basicProps });
  const emits = defineEmits([
    'advanced-change',
    'reset',
    'submit',
    'register',
    'path-value-change',
  ]);
  // 表单数据
  const formModel = reactive<Recordable>({});
  // 表单选项默认值
  const defaultValueRef = ref<Recordable>({});
  // 通过 setProps 注入的值
  const propsRef = ref<Partial<BasicFormProps>>({});
  // 存放 schema
  const schemaRef = ref<Nullable<FormSchema[]>>(null);
  // 存放表单实例
  const formElRef = ref<Nullable<FormActionType>>();

  // 获取最初传入的 props 和通过 setProps 事件传入的 props 合集
  const getProps = computed(() => merge({ ...props }, propsRef.value) as BasicFormProps);
  // 布局对象
  const getGrid = computed(() => merge(getProps.value.gridProps, advanceState));
  // 获取在调用实例上绑定的值, 传递到 n-from 上
  const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) }));
  // 获取传入的 schema 并处理
  const getSchema = computed((): FormSchema[] => {
    const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
    for (const schema of schemas) {
      const { defaultValue, component } = schema;
      // 处理时间相关组件的默认值
      if (defaultValue && ['NDatePicker', 'NTimePicker'].includes(component)) {
        if (!Array.isArray(defaultValue)) {
          schema.defaultValue = dateUtil(defaultValue);
        } else {
          const def: any[] = [];
          defaultValue.forEach((item) => {
            def.push(dateUtil(item));
          });
          schema.defaultValue = def;
        }
      }
    }
    if (unref(getProps).showAdvancedButton) {
      return cloneDeep(schemas.filter((schema) => schema.component !== 'NDivider') as FormSchema[]);
    } else {
      return cloneDeep(schemas as FormSchema[]);
    }
  });

  // 当折叠生效或者当 行数超过 3 行时, 显示折叠按钮
  const isShowAdvancedButton = computed(() => {
    // 获取所有的 form-item 的 span 加起来是否大于 (form 的 span(默认24) * 3 + 操作栏的 span (默认8) )
    const allcols = (Number(props.gridProps.cols) || 24) * props.autoAdvancedLine;
    let len = Number(props.actionGiOptions.span);
    getSchema.value.forEach((ele) => (len += Number(ele.giProps?.span) || 8));
    if (getProps.value.gridProps?.collapsed) {
      return true;
    } else if (len > allcols) {
      advanceState.collapsed = true;
      return true;
    }
    return false;
  });

  // 展开缩起配置
  const advanceState = reactive<{ collapsed: Boolean; collapsedRows: Number }>({
    collapsed: isShowAdvancedButton.value ? true : false, // 是否折叠
    collapsedRows: getProps.value.gridProps?.collapsedRows || 2, // 折叠后的行数
  });

  // 修改折叠状态
  const handleToggleAdvanced = () => {
    advanceState.collapsed = !advanceState.collapsed;
  };

  const getResetBtnOptions = computed(() =>
    Object.assign({ label: t('components.form.resetText') }, props.resetButtonOptions),
  );
  const getSubmitBtnOptions = computed(() =>
    Object.assign({ label: t('components.form.queryText') }, props.submitButtonOptions),
  );

  const { initDefault } = useFormValues({
    getProps,
    defaultValueRef,
    getSchema,
    formModel,
  });

  const {
    resetPaths,
    handleSubmit,
    restoreValidation,
    validate,
    getPathsValue,
    updateSchema,
    resetSchema,
    appendSchemaByPath,
    removeSchemaByPath,
    setPathsValue,
  } = useFormEvents({
    emits,
    getProps,
    formModel,
    getSchema,
    defaultValueRef,
    formElRef: formElRef as Ref<FormActionType>,
    schemaRef: schemaRef as Ref<FormSchema[]>,
  });

  watch(
    () => unref(getProps).model,
    () => {
      const { model } = unref(getProps);
      if (!model) return;
      setPathsValue(model);
    },
    {
      immediate: true,
    },
  );

  watch(
    () => unref(getProps).schemas,
    (schemas) => {
      resetSchema(schemas ?? []);
    },
  );

  watch(
    () => getSchema.value,
    (schema) => {
      if (schema?.length) {
        initDefault();
      }
    },
  );

  const setProps = async (formProps: Partial<BasicFormProps>) => {
    propsRef.value = merge(unref(propsRef) || {}, formProps);
  };

  const setFormModel = (key: string, value: any, schema: FormSchema) => {
    formModel[key] = value;
    if (isFunction(schema.dynamicRules) || isArray(schema.rule)) {
      return;
    }
    emits('path-value-change', key, value);
  };

  const formActionType: Partial<FormActionType> = {
    submit: handleSubmit,
    getPathsValue,
    setPathsValue,
    resetPaths,
    updateSchema,
    resetSchema,
    setProps,
    removeSchemaByPath,
    appendSchemaByPath,
    restoreValidation,
    validate,
  };

  onMounted(() => {
    initDefault();
    emits('register', formActionType);
  });
</script>
