import type { DataTableProps, PaginationProps, DataTableColumn } from 'naive-ui';
import type { BasicFormProps } from '@/components/Form';

// 扩展 column
export type BasicColumn<T = any> = DataTableColumn<T> & {
  key: String;
  // 内部标识 , 序号 | 操作
  flag?: 'INDEX' | 'ACTION';
  slots?: Recordable;
  // 默认情况下是否隐藏列
  defaultHidden?: boolean;
  // 业务控制是否显示
  ifShow?: boolean | ((column: BasicColumn) => boolean);
  children?: BasicColumn[];
};

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string;
  // 每页显示多少条
  sizeField: string;
  // 请求结果列表字段
  listField: string;
  // 请求结果总数字段
  totalField: string;
}

export interface FetchParams {
  searchInfo?: Recordable;
  page?: number;
}

export interface GetColumnsParams {
  ignoreIndex?: boolean;
  ignoreAction?: boolean;
}

export interface BasicTableProps extends DataTableProps {
  columns: BasicColumn[];
  // 接口请求对象
  api?: (...arg: any) => Promise<any>;
  // 请求之前处理参数
  beforeFetch?: Fn;
  // 自定义处理接口返回参数
  afterFetch?: Fn;
  // 查询条件请求之前处理
  handleSearchInfoFn?: Fn;
  // 请求接口配置
  fetchSetting?: Partial<FetchSetting>;
  // 立即请求接口
  immediate?: boolean;
  // 额外的请求参数
  searchInfo?: Recordable;
  // 使用搜索表单
  useSearchForm?: boolean;
  // 表单配置
  formConfig?: Partial<BasicFormProps>;
  // 在分页改变的时候清空选项
  clearSelectOnPageChange?: boolean;
  // 操作栏
  actionColumn?: BasicColumn;
  // 文本超过宽度是否显示...
  ellipsis?: boolean;
  // 是否显示序号列
  showIndexColumn?: boolean;
}

// 表单事件
export interface TableActionType {
  /** 用于设置表格参数 */
  setProps: (props: Partial<BasicTableProps>) => void;
  /** 刷新表格 */
  reload: (opt?: FetchParams) => Promise<void>;
  /** 设置表格 loading 状态 */
  setLoading: (loading: boolean) => void;

  /** 获取当前分页信息 */
  getPagination: () => PaginationProps | boolean;
  /** 设置分页信息 */
  setPagination: (info: Partial<PaginationProps>) => void;
  /** 获取当前是否显示分页 */
  getShowPagination: () => boolean;
  /** 设置当前是否显示分页 */
  setShowPagination: (show: boolean) => Promise<boolean>;

  /** 获取表格数据 */
  getDataSource: <T = Recordable>() => T[];
  /** 获取后端接口原始数据 */
  getRawDataSource: <T = Recordable>() => T;
  /** 更新表格数据 */
  updateTableData: (index: number, key: string, value: any) => Recordable;
  /** 设置表格数据 */
  setTableData: <T = Recordable>(values: T[]) => void;
  /** 获取表格 Columns （表头） 数据 */
  getColumns: () => BasicColumn[];
  /** 设置表格 Columns （表头） 数据 */
  setColumns: (columns: BasicColumn[] | string[]) => void;
  /** 根据唯一的 rowKey 更新指定行的数据.可用于不刷新整个表格而局部更新数据 */
  updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void;
  /** 根据唯一的rowKey 动态删除指定行的数据.可用于不刷新整个表格而局部更新数据 */
  deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => void;
  /** 可根据传入的 index 值决定插入数据行的位置，不传则是顺序插入，可用于不刷新整个表格而局部更新数据 */
  insertTableDataRecord: (record: Recordable | Recordable[], index?: number) => Recordable[] | void;
  /** 获取原始数据 */
  getCacheColumns: () => BasicColumn[];
  /** 根据 key 修改原始数据*/
  setCacheColumnsByField?: (key: string | undefined, value: BasicColumn) => void;
  /** 获取选中行的 keys */
  getSelectRowKeys: () => (string | number)[];
  /** 设置选中行 */
  setSelectedRowKeys: (rowKeys: string[] | number[]) => void;
  /** 根据 key 删除取消选中行 */
  deleteSelectRowByKey: (key: string) => void;
  /** 清空选中行 */
  clearSelectedRowKeys: () => void;

  /** 展开树形表格 */
  expandAll: () => void;
  /** 折叠树形表格 */
  collapseAll: () => void;
  emits?: EmitType;
}
