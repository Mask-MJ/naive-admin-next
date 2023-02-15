<template>
  <n-form v-bind="getBindValue" ref="formElRef" :model="formModel">
    <n-grid v-bind="getGrid">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema" :key="schema.path">
        <n-form-item-gi :label="schema.label" :path="schema.path" :span="schema.giProps?.span">
          <FormItem
            :allDefaultValues="defaultValueRef"
            :formProps="getProps"
            :formModel="formModel"
            :schema="schema"
            :setFormModel="setFormModel"
            :formActionType="formActionType"
          >
            <template #[item]="data" v-for="item in Object.keys($slots)">
              <slot :name="item" v-bind="data || {}"></slot>
            </template>
          </FormItem>
        </n-form-item-gi>
      </template>

      <FormAction v-bind="getFormActionBindProps" @toggle-advanced="handleToggleAdvanced">
        <template
          #[item]="data"
          v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']"
        >
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </FormAction>
      <slot name="formFooter"></slot>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts" name="BasicForm">
  import type { BasicFormProps, FormSchema, FormActionType } from './types/form';

  import { isArray, isFunction, merge, cloneDeep } from 'lodash';
  import { basicProps } from './props';
  import { dateUtil } from '@/utils/dateUtil';
  import { useFormValues } from './hooks/useFormValues';
  import { useFormEvents } from './hooks/useFormEvents';
  import { createFormContext } from './hooks/useFormContext';

  import FormItem from './components/FormItem.vue';
  import FormAction from './components/FormAction.vue';

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

  // 展开缩起配置
  const advanceState = reactive<{ collapsed: Boolean; collapsedRows: Number }>({
    collapsed: getProps.value.gridProps?.collapsed || false, // 是否折叠
    collapsedRows: getProps.value.gridProps?.collapsedRows || 1, // 折叠后的行数
  });

  // 绑定操作栏
  const getFormActionBindProps = computed(() => ({ ...getProps.value, ...getGrid.value }));

  // 修改折叠状态
  const handleToggleAdvanced = (collapsed) => {
    advanceState.collapsed = !collapsed;
  };

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
  // 创建 form 上下文
  createFormContext({
    resetAction: resetPaths,
    submitAction: handleSubmit,
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
