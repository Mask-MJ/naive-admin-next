import type { AlarmList } from './types/alarmlog';

import { defHttp } from '@/utils/axios';

enum Api {
  AlarmList = '/base/device-alarm-log/list',
}

/** 获取列表 */
export const getAlarmList = (params) => defHttp.get<AlarmList[]>({ url: Api.AlarmList, params });
