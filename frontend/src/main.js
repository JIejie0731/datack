import '@arco-design/web-vue/dist/arco.css'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import './assets/fonts.css'
import './assets/main.css'
import './assets/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')

document.documentElement.style.setProperty('--color-primary', '#222');
document.documentElement.style.setProperty('--menu-horizontal-selected-border-color', '#222');
