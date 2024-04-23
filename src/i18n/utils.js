export function getLanguage() {
  let defaultLanguage = navigator.language

  if (defaultLanguage.startsWith('en')) {
    defaultLanguage = 'en-US'
  } else if (defaultLanguage.startsWith('zh')) {
    defaultLanguage = 'zh-CN'
  }

  const language = localStorage.getItem('language') || defaultLanguage
  // console.log(language)
  return language
}
