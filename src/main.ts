import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/reset/tabbar.css'
import './assets/main.css'
import 'lib-flexible/flexible'
import 'animate.css/animate.min.css'
import ElementPlus from 'element-plus'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Particles from 'particles.vue3'
// 引入UI库
import Vant4 from '@/vant4/index.js'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(Vant4)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(ElementPlus)
app.use(Particles)
app.mount('#app')
