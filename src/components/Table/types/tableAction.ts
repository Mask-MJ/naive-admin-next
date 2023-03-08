import { ButtonProps, PopconfirmProps, TooltipProps } from 'naive-ui';
import { Size } from 'naive-ui/es/button/src/interface';
export interface ActionItem extends ButtonProps {
  onClick?: Fn;
  label?: string;
  color?: 'success' | 'error' | 'warning';
  icon?: string;
  popConfirm?: PopconfirmProps;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean);
  tooltip?: string | TooltipProps;
  size?: Size;
}
