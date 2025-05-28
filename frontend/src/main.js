import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import '@/assets/global.css'

// 添加 Monaco 环境配置，解决 Web Worker 问题
window.MonacoEnvironment = {
  getWorkerUrl: (moduleId, label) => {
    // 指定 Worker 文件的路径（根据实际打包路径调整）
    return `/monaco-workers/${label}.worker.js`;
  }
};

const app = createApp(App)
app.use(router)
app.use(ArcoVue)
app.mount('#app')