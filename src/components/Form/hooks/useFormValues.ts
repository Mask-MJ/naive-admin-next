import type { Ref, ComputedRef } from 'vue';
import type { BasicFormProps, FormSchema } from '../types/form';
import { unref } from 'vue';
import { isUndefined, isNull, cloneDeep } from 'lodash-es';

interface UseFormValuesContext {
  defaultValueRef: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  getProps: ComputedRef<BasicFormProps>;
  formModel: Recordable;
}

export function useFormValues({ defaultValueRef, getSchema, formModel }: UseFormValuesContext) {
  function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};
    schemas.forEach((item) => {
      const { defaultValue } = item;
      if (!(isUndefined(defaultValue) || isNull(defaultValue))) {
        obj[item.path] = defaultValue;

        if (formModel[item.path] === undefined) {
          formModel[item.path] = defaultValue;
        }
      }
    });
    defaultValueRef.value = cloneDeep(obj);
  }

  return { initDefault };
}
