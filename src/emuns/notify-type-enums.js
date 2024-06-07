import { translate } from '@/i18n/index.js'

// 枚举值，用于逻辑判断
export const NotifyTypeEnum = {
  // 未知
  Unknown: 0,

  // 邮件
  Email: 1,

  // webkook
  Webhook: 2,

  // 企业微信
  WorkWeixin: 3,

  // 钉钉
  DingTalk: 4,

  // 飞书
  Feishu: 5,

  // 电报
  Telegram:  6,
}

export const NotifyTypeOptions = [
  {
    value: NotifyTypeEnum.Email,
    label: translate('邮件'),
  },
  {
    value: NotifyTypeEnum.Webhook,
    label: 'Webhook',
  },
  {
    value: NotifyTypeEnum.WorkWeixin,
    label: translate('企业微信'),
  },
  {
    value: NotifyTypeEnum.DingTalk,
    label: translate('钉钉'),
  },
  {
    value: NotifyTypeEnum.Feishu,
    label: translate('飞书'),
  },
  {
    value: NotifyTypeEnum.Telegram,
    label: translate('电报'),
  },
]

export function notifyTypeFilter(value) {
  const item = NotifyTypeOptions.find((item) => item.value == value)
  if (item) {
    return item.label
  }
  return
}
