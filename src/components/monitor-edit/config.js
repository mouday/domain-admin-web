import { TimeUnitEnum } from '@/emuns/time-unit-enums.js'
import { translate } from '@/i18n/index.js'

// 表单验证
export const formRules = {
  // 标题
  title: [
    {
      message: '名称不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 监控类型
  monitor_type: [
    {
      message: '监控类型不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 检测频率
  interval: [
    {
      message: '检测频率不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 重试次数
  allow_error_count: [
    {
      message: '重试次数不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 启用
  // is_active: [
  //   {
  //     message: '启用不能为空',
  //     required: true,
  //     trigger: 'blur',
  //   },
  // ],
}

// 引入枚举值

export const IntervalUnitOptions = [
  // {
  //   value: TimeUnitEnum.Millisecond,
  //   label: translate('毫秒'),
  // },
  {
    value: TimeUnitEnum.Second,
    label: translate('秒'),
  },
  {
    value: TimeUnitEnum.Minute,
    label: translate('分钟'),
  },
  {
    value: TimeUnitEnum.Hour,
    label: translate('小时'),
  },
  {
    value: TimeUnitEnum.Day,
    label: translate('天'),
  },
  {
    value: TimeUnitEnum.Week,
    label: translate('周'),
  },
  {
    value: TimeUnitEnum.Month,
    label: translate('月'),
  },
  {
    value: TimeUnitEnum.Year,
    label: translate('年'),
  },
]
