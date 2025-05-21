import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/assets/less/root.less'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(router).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

/*初始化*/
let init = () => {
    console.log('初始化中');
    if(localStorage.getItem('router') == null) {
        localStorage.setItem('router', '1');
    }
}
init()