/*
 * @Author: lw
 * @Date: 2022-10-28 11:41:26
 * @LastEditTime: 2022-11-25 15:39:01
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\main.js
 */
import { createApp } from 'vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './style.css'
import "./styles/index.scss"
import 'animate.css';
import App from './App.vue'
import Router from "./router/index"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// Icons
import SvgIcon from './components/SvgIcon/SvgIcon.vue'
import './assets/iconfont/iconfont.js';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-loading.css'
// 适配
// import "amfe-flexible/index.js"

// pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);
app.use(pinia);
app.use(Router);
import './permission.js'

app.use(ElementPlus, {
  locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('SvgIcon', SvgIcon);
app.mount('#app');