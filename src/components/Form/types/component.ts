import { CSSProperties } from 'vue';
import type {
  InputProps,
  InputNumberProps,
  SelectProps,
  TreeSelectProps,
  TreeProps,
  RadioGroupProps,
  CheckboxProps,
  CheckboxGroupProps,
  AutoCompleteProps,
  CascaderProps,
  DatePickerProps,
  TimePickerProps,
  SwitchProps,
  SliderProps,
  DividerProps,
  RateProps,
} from 'naive-ui';

interface NInput {
  component: 'NInput';
  componentProps?: InputProps;
}

interface NInputNumber {
  component: 'NInputNumber';
  componentProps?: InputNumberProps;
}

interface NSelect {
  component: 'NSelect';
  componentProps?: SelectProps;
}

interface NTreeSelect {
  component: 'NTreeSelect';
  componentProps?: TreeSelectProps;
}

interface NTree {
  component: 'NTree';
  componentProps?: TreeProps;
}

interface ApiTree {
  component: 'ApiTree';
  componentProps?: TreeProps & {
    api: any;
    style?: CSSProperties;
    params?: any;
    immediate?: boolean;
    resultField?: string;
    afterFetch?: any;
    defaultCheckedKeys?: (string | number)[];
  };
}

interface NRadioGroup {
  component: 'NRadioGroup';
  componentProps?: RadioGroupProps & {
    options: OptionsItem[];
  };
}

interface NCheckbox {
  component: 'NCheckbox';
  componentProps?: CheckboxProps;
}

interface NCheckboxGroup {
  component: 'NCheckboxGroup';
  componentProps?: CheckboxGroupProps;
}

interface NAutoComplete {
  component: 'NAutoComplete';
  componentProps?: AutoCompleteProps;
}

interface NCascader {
  component: 'NCascader';
  componentProps?: CascaderProps;
}

interface NDatePicker {
  component: 'NDatePicker';
  componentProps?: DatePickerProps;
}

interface NTimePicker {
  component: 'NTimePicker';
  componentProps?: TimePickerProps;
}

interface NSwitch {
  component: 'NSwitch';
  componentProps?: SwitchProps;
}

interface NSlider {
  component: 'NSlider';
  componentProps?: SliderProps;
}

interface NDivider {
  component: 'NDivider';
  componentProps?: DividerProps;
}

interface NRate {
  component: 'NRate';
  componentProps?: RateProps;
}

export type ComponentMap =
  | NInput
  | NInputNumber
  | NSelect
  | NTreeSelect
  | NTree
  | ApiTree
  | NRadioGroup
  | NCheckbox
  | NCheckboxGroup
  | NAutoComplete
  | NCascader
  | NDatePicker
  | NTimePicker
  | NSwitch
  | NSlider
  | NDivider
  | NRate;

export type ComponentType = Pick<ComponentMap, 'component'>['component'];

export type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };
