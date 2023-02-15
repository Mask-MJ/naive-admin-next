import type { Component } from 'vue';

import {
  NInput,
  NSelect,
  NRadioGroup,
  NCheckbox,
  NCheckboxGroup,
  NAutoComplete,
  NCascader,
  NDatePicker,
  NInputNumber,
  NSwitch,
  NTimePicker,
  NTreeSelect,
  NSlider,
  NRate,
  NDivider,
} from 'naive-ui';

export const componentMap = new Map<ComponentType, Component>();

componentMap.set('NInput', NInput);
componentMap.set('NInputNumber', NInputNumber);
componentMap.set('NAutoComplete', NAutoComplete);
componentMap.set('NSelect', NSelect);
componentMap.set('NTreeSelect', NTreeSelect);
componentMap.set('NSwitch', NSwitch);
componentMap.set('NRadioGroup', NRadioGroup);
componentMap.set('NCheckbox', NCheckbox);
componentMap.set('NCheckboxGroup', NCheckboxGroup);
componentMap.set('NCascader', NCascader);
componentMap.set('NSlider', NSlider);
componentMap.set('NRate', NRate);
componentMap.set('NDatePicker', NDatePicker);
componentMap.set('NTimePicker', NTimePicker);
componentMap.set('NDivider', NDivider);

export type ComponentType =
  | 'NInput'
  | 'NInputNumber'
  | 'NSelect'
  | 'NTreeSelect'
  | 'NRadioGroup'
  | 'NCheckbox'
  | 'NCheckboxGroup'
  | 'NAutoComplete'
  | 'NCascader'
  | 'NDatePicker'
  | 'NTimePicker'
  | 'NSwitch'
  | 'NSlider'
  | 'NDivider'
  | 'NRate';
