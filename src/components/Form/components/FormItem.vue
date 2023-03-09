<template>
  <component style="width: 100%" :is="getComponent(schema.component)" v-bind="compAttr" />
</template>

<script setup lang="ts">
  import type { TableActionType } from '@/components/Table';
  import type { FormSchema, FormActionType, BasicFormProps } from '../types/form';
  import type { ComponentType } from '../types/component';

  import { isFunction, upperFirst } from 'lodash';
  import { componentMap } from '../componentMap';

  const emits = defineEmits(['setFormModel']);
  const props = defineProps({
    schema: { type: Object as PropType<FormSchema>, default: () => {} },
    formModel: { type: Object as PropType<Recordable>, default: () => ({}) },
    formProps: { type: Object as PropType<BasicFormProps>, default: () => ({}) },
    // form 实例上的方法
    formActionType: { type: Object as PropType<FormActionType> },
    // 表格 实例上的方法
    tableAction: { type: Object as PropType<TableActionType> },
  });

  const getSchema = computed(() => props.schema);
  const isTree = ['ApiTree', 'NTree'].includes(getSchema.value.component);
  const isCheck = ['NSwitch', 'NCheckbox'].includes(getSchema.value.component);
  const bindValue = computed(() => ({
    [isCheck ? 'checked' : isTree ? 'checked-keys' : 'value']:
      props.formModel[getSchema.value.path],
  }));

  const getComponentsProps = computed(() => {
    const { schema, tableAction, formModel, formActionType } = props;
    let { componentProps = {} } = schema;
    if (isFunction(componentProps)) {
      // 如果是函数形式的 componentProps 则返回实例方法
      componentProps = componentProps({ schema, tableAction, formModel, formActionType }) ?? {};
    }
    return componentProps;
  });

  const getComponent = (component: ComponentType) => componentMap.get(component);

  const changeEvent = getSchema.value.changeEvent || 'update:value';
  const path = getSchema.value.path;
  const eventKey = `on${upperFirst(changeEvent)}`;
  const propsData: Recordable = {
    allowClear: true,
    ...unref(getComponentsProps),
  };

  const on = {
    [eventKey]: (...args: Nullable<Recordable>[]) => {
      const [e] = args;
      if (propsData[eventKey]) {
        propsData[eventKey](...args);
      }
      const target = e ? e.target : null;
      const value = target ? (isCheck ? target.checked : target.value) : e;
      emits('setFormModel', path, value, getSchema.value);
    },
  };

  const compAttr = computed(() => {
    return { ...unref(getComponentsProps), ...on, ...bindValue.value };
  });
</script>

<style scoped></style>
