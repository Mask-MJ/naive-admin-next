import type { FormSchema } from '@/components/Form';
import { getFatherGroup } from '@/api/operation/rule';

export const schemas: FormSchema[] = [
  {
    path: 'id',
    component: 'NInput',
    show: false,
  },
  {
    path: 'ruleName',
    component: 'NInput',
    label: '规则名称',
    required: true,
    componentProps: { placeholder: '请输入规则名称' },
    giProps: { span: 8 },
  },
  {
    path: 'issueTime',
    component: 'NDatePicker',
    label: '下发时间',
    required: true,
    changeEvent: 'update:formatted-value',
    componentProps: {
      type: 'datetime',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      isDateDisabled: (ts: number) => ts < Date.now(),
    },
    giProps: { span: 8 },
  },
  {
    path: 'belongGroup',
    component: 'ApiTreeSelect',
    label: '所属分组',
    required: true,
    componentProps: {
      api: getFatherGroup,
      resultField: 'data',
      labelField: 'groupName',
      keyField: 'id',
    },
    giProps: { span: 8 },
  },
  {
    path: 'ruleDescript',
    component: 'NInput',
    label: '规则说明',
    componentProps: { type: 'textarea', placeholder: '请输入规则说明' },
  },
  {
    path: 'divider-basic',
    component: 'NDivider',
    label: '占桩费设置',
  },
  {
    path: 'freeTime',
    component: 'NInputNumber',
    label: '免费时长',
    giProps: { span: 6 },
    componentProps: { showButton: false },
    renderComponentContent: () => ({ suffix: () => '分钟' }),
  },
  {
    path: 'highConsume',
    component: 'NInputNumber',
    label: '最高消费',
    giProps: { span: 6 },
    componentProps: { precision: 2, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/单' }),
  },
  {
    path: 'standardMoney',
    component: 'NInputNumber',
    label: '标准占桩费',
    labelWidth: 120,
    giProps: { span: 7 },
    componentProps: { precision: 2, showButton: false },
  },
  {
    path: 'standardTime',
    component: 'NInputNumber',
    labelWidth: 30,
    label: '/',
    giProps: { span: 5 },
    componentProps: { showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/分钟' }),
  },
  {
    path: 'divider-basic',
    component: 'NDivider',
    label: '预约设置',
  },
  {
    path: 'reserveTime',
    component: 'NInputNumber',
    label: '预约保留时长',
    giProps: { span: 6 },
    labelWidth: 100,
    componentProps: { showButton: false },
    renderComponentContent: () => ({ suffix: () => '分钟/次' }),
  },
  {
    path: 'reserveCharge',
    component: 'NInputNumber',
    label: '预约计费',
    giProps: { span: 6 },
    componentProps: { precision: 2, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/次' }),
  },
  {
    path: 'divider-basic',
    component: 'NDivider',
    label: '计费设置',
  },
  {
    path: 'ruleModel',
    component: 'NRadioGroup',
    label: '规则模式',
    giProps: { span: 24 },
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '标准计费', value: 0 },
        { label: '分时计费(尖峰平谷)', value: 1 },
      ],
    },
  },
  {
    path: 'standardEnergy',
    component: 'NInputNumber',
    label: '标准电费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 0,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'standardService',
    component: 'NInputNumber',
    label: '标准服务费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 0,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'tipEnergy',
    component: 'NInputNumber',
    label: '尖时电费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 1,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'peakEnergy',
    component: 'NInputNumber',
    label: '峰时电费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 1,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'ordinaryEnergy',
    component: 'NInputNumber',
    label: '平时电费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 1,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'valleyEnergy',
    component: 'NInputNumber',
    label: '谷时电费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 1,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'tipService',
    component: 'NInputNumber',
    label: '尖时服务费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 1,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'peakService',
    component: 'NInputNumber',
    label: '峰时服务费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 1,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'ordinaryService',
    component: 'NInputNumber',
    label: '平时服务费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 1,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'valleyService',
    component: 'NInputNumber',
    label: '谷时服务费',
    giProps: { span: 6 },
    required: true,
    ifShow: ({ values }) => values.ruleModel === 1,
    componentProps: { precision: 3, showButton: false },
    renderComponentContent: () => ({ suffix: () => '元/度' }),
  },
  {
    path: 'times',
    component: 'SelectPicker',
    label: '分时设置',
    ifShow: ({ values }) => values.ruleModel === 1,
    giProps: { span: 24 },
    required: true,
    componentProps: {
      options: [
        { label: '尖', type: 'error', path: 'tipTime' },
        { label: '峰', type: 'warning', path: 'peakTime' },
        { label: '平', type: 'success', path: 'ordinaryTime' },
        { label: '谷', type: 'info', path: 'valleyTime' },
      ],
    },
    rule: [
      {
        required: true,
        validator: (_rule, value) => {
          let len = 0;
          for (const i in value) {
            len += value[i].length;
          }
          return len === 48 ? Promise.resolve() : Promise.reject('时间段不能留空');
        },
        trigger: 'change',
      },
    ],
  },
];
