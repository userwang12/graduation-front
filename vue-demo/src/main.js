import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// 这个文件是连接HTML和Vue的桥梁,它初始化Vue应用并制定从哪个组件开始渲染
// 在HTML中，我们使用<div id="app"></div>来指定Vue的挂载点
// 在Vue中，我们使用createApp(App).mount('#app')来指定Vue的挂载点
