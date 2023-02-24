<template>
  <template v-if="schema.slot">
    <slot
      :name="schema.slot"
      :model="formModel"
      :path="schema.path"
      :value="formModel[schema.path]"
    ></slot>
  </template>
  <template v-else-if="schema.component === 'NRadioGroup'">
    <n-radio-group :value="formModel[schema.path]" @update:value="changeValue($event, schema.path)">
      <n-space>
        <template v-if="schema.componentProps.type === 'button'">
          <n-radio-button
            v-for="option in schema.componentProps.options"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </template>
        <template v-else>
          <n-radio
            v-for="option in schema.componentProps.options"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </template>
      </n-space>
    </n-radio-group>
  </template>
  <template v-else-if="schema.component === 'NCheckboxGroup'">
    <n-checkbox-group
      :value="formModel[schema.path]"
      @update:value="changeValue($event, schema.path)"
    >
      <n-space>
        <n-checkbox
          v-for="option in schema.componentProps.options"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        />
      </n-space>
    </n-checkbox-group>
  </template>

  <component
    v-else
    v-bind="getComponentsProps"
    :is="getComponents(schema.component)"
    :value="formModel[schema.path]"
    @update:value="changeValue($event, schema.path)"
  />
  <template v-if="schema.suffix">
    <slot
      :name="schema.suffix"
      :model="formModel"
      :path="schema.path"
      :value="formModel[schema.path]"
    ></slot>
  </template>
</template>
<script setup lang="ts">
  import type { FormSchema, BasicFormProps, FormActionType } from '../types/form';
  import type { ComponentType } from '../componentMap';
  import type { TableActionType } from '@/components/Table/types/table';

  import { componentMap } from '../componentMap';
  import { isFunction } from 'lodash-es';

  const props = defineProps({
    schema: { type: Object as PropType<FormSchema>, default: () => ({}) },
    formProps: { type: Object as PropType<BasicFormProps>, default: () => ({}) },
    allDefaultValues: { type: Object as PropType<Recordable>, default: () => ({}) },
    formModel: { type: Object as PropType<Recordable>, default: () => ({}) },
    formActionType: { type: Object as PropType<Partial<FormActionType>> },
    setFormModel: {
      type: Function as PropType<(key: string, value: any, schema: FormSchema) => void>,
      default: null,
    },
    tableAction: { type: Object as PropType<TableActionType> },
  });

  const getComponents = (component: ComponentType) => componentMap.get(component);
  const getComponentsProps = () => {
    const { schema, tableAction, formModel, formActionType } = props;
    // const compProps = schema.componentProps ?? {};
    let { componentProps = {} } = schema;
    if (isFunction(componentProps)) {
      componentProps = componentProps({ schema, tableAction, formModel, formActionType }) ?? {};
    }
    if (schema.component === 'NDivider') {
      componentProps = Object.assign({ type: 'horizontal' }, componentProps, {
        orientation: 'left',
        plain: true,
      });
    }
    // return { clearable: true, ...compProps };
    return componentProps as Recordable;
  };
  const changeValue = (value, key) => {
    props.setFormModel(key, value, props.schema);
  };
</script>
