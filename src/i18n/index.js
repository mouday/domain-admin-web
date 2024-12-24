import config from './config.js'
import { getLanguage } from './utils.js'

const LANGUAGE_MAP = {}

const language = getLanguage()

for (let item of config) {
  LANGUAGE_MAP[item['zh-CN']] = item
}

export function translate(text) {
  if (text in LANGUAGE_MAP) {
    return LANGUAGE_MAP[text][language] || text
  } else {
    return text
  }
}

export function useI18n(app) {
  app.config.globalProperties.$t = translate
}

export const languageOptions = [
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: '繁體中文',
    value: 'zh-TW',
  },
  {
    label: 'English',
    value: 'en-US',
  }
]
