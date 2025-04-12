import '/node_modules/normalize.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPlugPersistedstate from "pinia-plugin-persistedstate"

import router from './router'
import Loading from "@/components/loading/Loading.vue"
import UserDrawer from "@/components/drawer/UserDrawer.vue"

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPlugPersistedstate)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.component('Loading', Loading)
app.component('UserDrawer', UserDrawer)
app.mount('#app')
