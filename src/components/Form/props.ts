import type { GridProps, GridItemProps, ButtonProps } from 'naive-ui';
import type { LabelPlacement } from 'naive-ui/es/form/src/interface';

import type { FormSchema, PathMapToTime, layout } from './types/form';

export const basicProps = {
  // 表单配置规则
  schemas: { type: Array as PropType<FormSchema[]>, default: () => [] },
  // 额外传递到子组件的参数 values
  mergeDynamicData: { type: Object as PropType<Recordable>, default: null },
  // 用于将表单内时间区域的应设成 2 个字段
  pathMapToTime: { type: Array as PropType<PathMapToTime>, default: () => [] },
  submitOnReset: { type: Boolean, default: false },
  autoSetPlaceHolder: { type: Boolean, default: true },
  // 是否显示收起展开按钮
  showAdvancedButton: { type: Boolean, default: false },
  // 是否显示操作按钮
  showActionButtonGroup: { type: Boolean, default: true },
  // 显示显示重置按钮
  showResetButton: { type: Boolean, default: true },
  // 是否显示提交按钮
  showSubmitButton: { type: Boolean, default: true },
  // 操作列 Gi 配置
  actionGiOptions: Object as PropType<Partial<GridItemProps>>,
  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 自定义重置函数
  resetFunc: Function as PropType<() => Promise<void>>,
  // 自定义提交函数
  submitFunc: Function as PropType<() => Promise<void>>,
  // 转化时间
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date,
  },
  // 以下为默认props
  // 是否展示必填的星号
  // showRequireMark: { type: Boolean, default: true },
  // 整个表单通用 labelGridItem 配置
  labelGridItem: Object as PropType<Partial<GridProps>>,
  // 整个表单通用 wrapperGridItem 配置
  wrapperGridItem: Object as PropType<Partial<GridProps>>,
  // 表单布局方式
  layout: { type: String as PropType<layout>, default: 'horizontal' },
  // 整个表单通用 Grid 配置
  gridProps: Object as PropType<GridProps>,
  labelPlacement: { type: String as PropType<LabelPlacement>, default: 'left' },
};
