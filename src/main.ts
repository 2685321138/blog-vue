import { createApp } from 'vue'
import App from './App.vue'
import "./assets/css/iconfont.css";
import "./assets/css/markdown.css";
import "./assets/css/index.css";
import animated from "animate.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import echarts from "echarts"
import axios from "axios";
import VueAxios from "vue-axios";
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import store from "../src/store/index"
import {ElMessage} from 'element-plus'


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
     app.component(key, component)
}

// app.directive('highlight',function (el) {
//      let blocks = el.querySelectorAll('pre code');
//      blocks.forEach((block)=>{
//           hljs.highlightBlock(block)
//      })
// })
     app.use(animated)
        .use(router)
        .use(ElementPlus)
        .use(VueAxios,axios).use(store)

app.provide('$message', ElMessage)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
