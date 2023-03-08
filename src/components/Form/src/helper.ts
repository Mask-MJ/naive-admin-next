import type { FormItemRule } from 'naive-ui';
import type { ComponentType } from './componentMap';

import { i18n } from '@/locales';

const { t } = i18n.global;

export const setComponentRuleType = (
  rule: FormItemRule,
  component: ComponentType,
  valueFormat: string,
) => {
  if (['NDatePicker', 'NTimePicker'].includes(component)) {
    rule.type = valueFormat ? 'string' : 'object';
  } else if (['NCheckboxGroup', 'NTimePicker'].includes(component)) {
    rule.type = 'array';
  } else if (['NInputNumber'].includes(component)) {
    rule.type = 'number';
  }
};

export const createPlaceholderMessage = (component: ComponentType) => {
  if (component.includes('Input') || component.includes('Complete')) {
    return t('components.form.inputText');
  }
  if (component.includes('Picker')) {
    return t('components.form.chooseText');
  }
  if (
    component.includes('Select') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    // return `请选择${label}`;
    return t('components.form.chooseText');
  }
  return '';
};
