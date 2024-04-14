import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 导入 elementplus ui库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入 elementplus 中的 icon库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 全局注册 elementplus
app.use(ElementPlus)

// 全局注册全部的elementplus icon
for (const [keyicon, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(keyicon, component)
  }

app.mount('#appOwl')

