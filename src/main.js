import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/assets/less/root.less'
import router from './router'

const app = createApp(App)
app.use(router).mount('#app');