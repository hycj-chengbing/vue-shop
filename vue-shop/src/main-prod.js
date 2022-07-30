import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './components/network/index'
import './plugins/element.js'
import {dateFormat} from './utils/dateFormat'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/normalize.css'
import './assets/css/global.css'

import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', dateFormat)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
