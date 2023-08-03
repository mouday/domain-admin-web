import config from './config.js'

const LANGUAGE_MAP = {}

let defaultLanguage = navigator.language

if (defaultLanguage.startsWith('en')) {
  defaultLanguage = 'en-US'
} else if (defaultLanguage.startsWith('zh')) {
  defaultLanguage = 'zh-CN'
}

const language = localStorage.getItem('language') || defaultLanguage
console.log(language)

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
    label: 'English',
    value: 'en-US',
  },
]
