import type { PropType } from 'vue';
import type { BasicFormProps } from '@/components/Form';
import type { FetchSetting, BasicColumn } from './types/table';
import type { DataTableColumn } from 'naive-ui';
import { FETCH_SETTING } from './const';

export const basicProps = {
  // 修改默认值
  bordered: { type: Boolean, default: true },
  striped: { type: Boolean, default: true },
  singleLine: { type: Boolean, default: false },
  remote: { type: Boolean, default: true },
  size: { type: String, default: 'small' },
  scrollX: { type: Number, default: 1000 },
  // 扩展
  // 请求接口
  api: { type: Function as PropType<(...arg: any[]) => Promise<any>>, default: null },
  // 请求之前对参数进行处理
  beforeFetch: { type: Function as PropType<Fn>, default: null },
  // 请求之后对返回值进行处理
  afterFetch: { type: Function as PropType<Fn>, default: null },
  // 开启表单后，在请求之前处理搜索条件参数
  handleSearchInfoFn: { type: Function as PropType<Fn>, default: null },
  // 接口请求配置，可以配置请求的字段和响应的字段名
  fetchSetting: { type: Object as PropType<FetchSetting>, default: () => FETCH_SETTING },
  // 立即请求接口
  immediate: { type: Boolean, default: true },
  // 额外的请求参数
  searchInfo: { type: Object as PropType<Recordable>, default: null },
  // 使用搜索表单
  useSearchForm: { type: Boolean, default: false },
  // 表单配置
  formConfig: { type: Object as PropType<Partial<BasicFormProps>>, default: null },
  // 文本超过宽度是否显示... | 带提示的省略
  ellipsis: { type: [Boolean, Object], default: () => ({ tooltip: true }) },
  // 在分页改变的时候清空选项
  clearSelectOnPageChange: { type: Boolean, default: false },
  // 操作栏
  actionColumn: { type: Object as PropType<DataTableColumn>, default: null },
  // 是否展示序号
  showIndexColumn: { type: Boolean, default: true },
  columns: { type: [Array] as PropType<BasicColumn[]>, default: () => [] },
};
