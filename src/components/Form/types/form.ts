import type {
  FormItemProps,
  GridItemProps,
  GridProps,
  ButtonProps,
  FormItemRule,
  FormProps,
  FormInst,
} from 'naive-ui';
import type { LabelPlacement, LabelAlign } from 'naive-ui/es/form/src/interface';
import type { ComponentMap } from './component';

// 时间结构
export type PathMapToTime = [string, [string, string], (string | [string, string])?][];
export type ButtonOptions = Partial<ButtonProps> & { label: string };

// 渲染回调参数
export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  path: string;
}

// 表单子项配置
export type FormSchema = ComponentMap &
  FormItemProps & {
    path: string;
    suffix?: string | number | ((values: RenderCallbackParams) => string | number); // 组件后面插槽
    changeEvent?: string; // 表单更新事件名称
    giProps?: Partial<GridItemProps>;
    defaultValue?: any; // 所渲渲染组件的初始值
    show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
    ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean); // 动态判断当前组件是否显示，js 控制，会删除 dom
    render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string; // 自定义渲染组件
    renderGiContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string; // 自定义渲染组件（需要自行包含 formItem）
    renderComponentContent?:
      | ((renderCallbackParams: RenderCallbackParams) => any)
      | VNode
      | VNode[]
      | string; // 自定义渲染组内部的 slot
    slot?: string; // 自定义 slot，渲染组件
    giSlot?: string; // 自定义 slot，渲染组件 （需要自行包含 formItem）
    dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean); // 动态判断当前组件是否禁用
    dynamicRules?: (renderCallbackParams: RenderCallbackParams) => FormItemRule[]; // 动态判返当前组件的校验规则
  };

// 扩展form组件配置
export interface BasicFormProps extends FormProps {
  /** Form 布局配置 */
  gridProps?: GridProps; // 整个表单通用 Grid 配置
  labelPlacement?: LabelPlacement;
  labelAlign?: LabelAlign;
  labelGridItem?: Partial<GridItemProps>; // 整个表单通用 labelGridItem 配置
  wrapperGridItem?: Partial<GridItemProps>; // 整个表单通用 wrapperGridItem 配置
  isAutoCollapsed: Boolean; // 是否开启自动折叠
  autoAdvancedLine: Number; // 超过 x 行自动折叠
  /** Form 布局配置 */

  name?: string;
  schemas?: FormSchema[]; // 表单配置规则
  mergeDynamicData?: Recordable; // 额外传递到子组件的参数 values
  pathMapToTime?: PathMapToTime; // 用于将表单内时间区域的应设成 2 个字段
  submitOnReset?: boolean; // 重置时是否提交表单
  autoSetPlaceHolder?: boolean; // 自动设置表单内组件的 placeholder
  showAdvancedButton?: boolean; // 是否显示收起展开按钮

  /** FormAction 组件 */
  showActionButtonGroup?: boolean; // 是否显示操作按钮(重置/提交)
  showResetButton?: boolean; // 是否显示重置按钮
  showSubmitButton?: boolean; // 是否显示提交按钮
  actionGiOptions?: Partial<GridItemProps>; // 操作按钮外层 Gi 组件配置，如果开启 showAdvancedButton，则不用设置
  resetButtonOptions?: Partial<ButtonOptions>; // 重置按钮配置
  submitButtonOptions?: Partial<ButtonOptions>; // 确认按钮配置
  /** FormAction 组件 */

  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
  transformDateFunc?: (date: any) => string;
}

// 表单操作事件
export interface FormActionType extends FormInst {
  submit: (e?: Event | undefined) => Promise<void>; // 提交表单
  resetPaths: () => Promise<void>; // 重置表单值
  getPathsValue: () => Recordable; // 获取表单值
  setPathsValue: (values: Record<string, any>) => Promise<void>; // 设置表单字段值
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>; // 更新表单的 schema, 只更新函数所传的参数
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>; // 重置表单 schema
  setProps: (formProps: Partial<FormProps>) => Promise<void>; // 设置表单 Props
  removeSchemaByPath: (path: string | string[]) => Promise<void>; // 根据 path 删除 Schema
  appendSchemaByPath: (
    schema: FormSchema | FormSchema[],
    prefixPath: string | undefined,
    first?: boolean | undefined,
  ) => Promise<void>; //  插入到指定 Path 后面，如果没传指定 Path，则插入到最后,当 first = true 时插入到第一个位置
}

export type RegisterFn = (formInstance: FormActionType) => void;
export type UseFormReturnType = [RegisterFn, FormActionType];
