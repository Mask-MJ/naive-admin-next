<template>
  <n-form ref="formElRef" v-bind="getBindValue" :model="formModel">
    <n-grid v-bind="getGrid">
      <template v-for="schema in getSchema" :key="schema.path">
        <n-form-item-gi
          v-show="getShow(schema).isShow"
          :label="schema.label"
          :path="schema.path"
          :span="getGridItem(schema.giProps?.span)"
          :rule="handleRule(schema)"
        >
          <!-- 判断插槽 -->
          <template v-if="schema.slot">
            <slot
              :name="schema.slot"
              :model="formModel"
              :path="schema.path"
              :value="formModel[schema.path]"
            ></slot>
          </template>
          <FormItem
            v-else
            :value="formModel[schema.path]"
            :formModel="formModel"
            :formProps="getProps"
            :schema="schema"
            :allDefaultValues="defaultValueRef"
            :formActionType="formActionType"
            @set-form-model="setFormModel"
          >
            <template #[item]="data" v-for="item in Object.keys($slots)">
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
        <form-action v-bind="getFormActionBindProps" @action="actions">
          <template
            #[item]="data"
            v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']"
          >
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </form-action>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">
  import type { FormItemRule } from 'naive-ui';
  import type { BasicFormProps, FormSchema, FormActionType } from './types/form';

  import { isArray, isFunction, merge, cloneDeep, isNull, isBoolean } from 'lodash';
  import { dateUtil } from '@/utils/dateUtil';
  import { basicProps } from './props';
  import { setComponentRuleType } from './helper';
  import { useFormValues } from './hooks/useFormValues';
  import { useFormEvents } from './hooks/useFormEvents';

  // import FormItem from './components/FormItem.vue';
  // import FormAction from './components/FormAction.vue';

  const { t } = useI18n();
  const attrs = useAttrs();
  const props = defineProps(basicProps);
  const emits = defineEmits([
    'advanced-change',
    'reset',
    'submit',
    'register',
    'path-value-change',
  ]);

  // 表单数据
  const formModel = reactive({});
  // 表单选项默认值
  const defaultValueRef = ref<Recordable>({});
  // 存放 schema
  const schemaRef = ref<Nullable<FormSchema[]>>(null);
  // 存放表单实例
  const formElRef = ref<Nullable<FormActionType>>();
  const isInitedDefaultRef = ref(false);
  // 通过 setProps 注入的值
  const propsRef = ref<Partial<BasicFormProps>>({});
  // 展开缩起配置
  const advanceState = reactive<{ collapsed: Boolean; collapsedRows: Number }>({
    collapsed: false, // 是否折叠
    collapsedRows: 2, // 折叠后的行数
  });

  // 获取最初传入的 props 和通过 setProps 事件传入的 props 合集
  const getProps = computed(() => merge({ ...props }, propsRef.value) as BasicFormProps);
  // 布局对象
  const getGrid = computed(() => merge(advanceState, getProps.value.gridProps));
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
      return cloneDeep(
        schemas.filter((schema) => {
          const isIfShow = getShow(schema).isIfShow;
          return schema.component !== 'NDivider' && isIfShow;
        }),
      );
    } else {
      return cloneDeep(schemas.filter((schema) => getShow(schema).isIfShow));
    }
  });
  const isShowAdvancedButton = ref(false);

  const getFormActionBindProps = computed((): Recordable => {
    return { ...getProps, ...advanceState, isShowAdvancedButton: isShowAdvancedButton.value };
  });

  const { handleFormValues, initDefault } = useFormValues({
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
    handleFormValues,
  });

  // 获取全局传入的 labelGridItem 如果 有设置 schema.giProps?.span
  const getGridItem = (span?: number | string) => span || getProps.value.labelGridItem?.span;
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

  const formActionType: FormActionType = {
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

  const getShow = (schema: FormSchema): { isShow: boolean; isIfShow: boolean } => {
    const getValues = computed(() => ({
      path: schema.path,
      model: formModel,
      values: {
        ...getProps.value.mergeDynamicData,
        ...defaultValueRef.value,
        ...formModel,
      } as Recordable,
      schema: schema,
    }));
    const { show, ifShow } = schema;

    let isShow = true;
    let isIfShow = true;

    if (isBoolean(show)) {
      isShow = show;
    }
    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(show)) {
      isShow = show(unref(getValues));
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(unref(getValues));
    }
    return { isShow, isIfShow };
  };

  const handleRule = (schema: FormSchema): FormItemRule[] => {
    const { rule: defRules = [], component, label, dynamicRules, required } = schema;
    const getValues = computed(() => ({
      path: schema.path,
      model: formModel,
      values: {
        ...getProps.value.mergeDynamicData,
        ...defaultValueRef.value,
        ...formModel,
      } as Recordable,
      schema: schema,
    }));

    const getComponentsProps = computed(() => {
      let { componentProps = {} } = schema;
      if (isFunction(componentProps)) {
        componentProps = componentProps({ schema, formModel, formActionType }) ?? {};
      }
      if (schema.component === 'NDivider') {
        componentProps = Object.assign({ type: 'horizontal' }, componentProps, {
          orientation: 'left',
          plain: true,
        });
      }
      return componentProps as Recordable;
    });
    if (isFunction(dynamicRules)) {
      return dynamicRules(unref(getValues)) as FormItemRule[];
    }
    let rules: FormItemRule[] = cloneDeep(isArray(defRules) ? defRules : [defRules]);

    function validator(rule: any, value: any) {
      const msg = rule.message || label;
      if (value === undefined || isNull(value)) {
        // 空值
        return Promise.reject(msg);
      } else if (Array.isArray(value) && value.length === 0) {
        // 数组类型
        return Promise.reject(msg);
      } else if (typeof value === 'string' && value.trim() === '') {
        // 空字符串
        return Promise.reject(msg);
      } else if (
        typeof value === 'object' &&
        Reflect.has(value, 'checked') &&
        Reflect.has(value, 'halfChecked') &&
        Array.isArray(value.checked) &&
        Array.isArray(value.halfChecked) &&
        value.checked.length === 0 &&
        value.halfChecked.length === 0
      ) {
        // 非关联选择的tree组件
        return Promise.reject(msg);
      }
      return Promise.resolve();
    }

    const getRequired = isFunction(required) ? required(unref(getValues)) : required;

    /*
     * 1、若设置了required属性，又没有其他的rules，就创建一个验证规则；
     * 2、若设置了required属性，又存在其他的rules，则只rules中不存在required属性时，才添加验证required的规则
     *     也就是说rules中的required，优先级大于required
     */
    if (getRequired) {
      if (!rules || rules.length === 0) {
        rules = [{ required: getRequired, validator }];
      } else {
        const requiredIndex: number = rules.findIndex((rule) => Reflect.has(rule, 'required'));

        if (requiredIndex === -1) {
          rules.push({ required: getRequired, validator });
        }
      }
    }

    const requiredRuleIndex: number = rules.findIndex(
      (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator'),
    );

    if (requiredRuleIndex !== -1) {
      const rule = rules[requiredRuleIndex];
      const { isShow } = getShow(schema);
      if (!isShow) {
        rule.required = false;
      }
      if (component) {
        if (!Reflect.has(rule, 'type')) {
          rule.type = component === 'NInputNumber' ? 'number' : 'string';
        }

        rule.message = rule.message || label;

        if (component.includes('Input') || component.includes('Textarea')) {
          rule.whitespace = true;
        }
        const valueFormat = unref(getComponentsProps)?.valueFormat;
        setComponentRuleType(rule, component, valueFormat);
      }
    }

    // Maximum input length rule check
    const characterInx = rules.findIndex((val) => val.max);
    if (characterInx !== -1 && !rules[characterInx].validator) {
      rules[characterInx].message =
        rules[characterInx].message ||
        t('components.form.maxTip', [rules[characterInx].max] as Recordable);
    }
    return rules;
  };

  const actions = (type: string) => {
    if (type === 'reset') {
      resetPaths();
    } else if (type === 'submit') {
      handleSubmit();
    } else if (type === 'toggle') {
      // 修改折叠状态
      advanceState.collapsed = !advanceState.collapsed;
    }
  };

  watch(
    () => unref(getProps).model,
    () => {
      const { model } = unref(getProps);
      if (!model) return;
      setPathsValue(model);
    },
    { immediate: true },
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
      if (unref(isInitedDefaultRef)) {
        return;
      }
      if (schema?.length) {
        initDefault();
        isInitedDefaultRef.value = true;
      }
    },
  );

  // 监听 schema 当折叠生效或者当 行数超过 props.autoAdvancedLine 行时, 显示折叠按钮
  watchEffect(() => {
    if (props.isAutoCollapsed) {
      // 获取所有的 form-item 的 span 加起来是否大于 (form 的 span(默认24) * 3 + 操作栏的 span (默认8) )
      const allcols = (Number(props.gridProps.cols) || 24) * props.autoAdvancedLine;
      let len = Number(props.actionGiOptions.span);
      getSchema.value.forEach((ele) => {
        len += Number(ele.giProps?.span) || 8;
      });
      advanceState.collapsed = Boolean(len > allcols);
      isShowAdvancedButton.value = Boolean(len > allcols);
    } else {
      advanceState.collapsed = false;
    }
  });

  onMounted(() => {
    initDefault();
    emits('register', formActionType);
  });
</script>

<style scoped></style>
