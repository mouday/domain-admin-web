import { createApp } from 'vue'
// import 'modern-css-reset'
import './style/tailwind.css'

import { createPinia } from 'pinia'

// import ElementPlus from 'element-plus'
// import langZhCn from 'element-plus/es/locale/lang/zh-cn'
// import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { Http } from './api/index.js'
import SingleMessage from './components/single-message/index.js'
import { router } from './router/index.js'

import './style/base.less'

import App from './App.vue'

const app = createApp(App)

app.config.globalProperties.$http = Http
app.config.globalProperties.$msg = SingleMessage

app.use(router)

// 使用 Element Plus
// app.use(ElementPlus)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
