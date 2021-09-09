import Vue from "vue"
import App from "./App.vue"

// 全局css
import "animate.css/animate.min.css" // 注意 Version 4 和 3 是完全不一样的

// ui 第三方框架
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)

import "./components" // 全局组件注册

// 加载 socket
// import SocketIO from "vue-socket.io"
// import env from "./config/env_config.js"
// Vue.use(new SocketIO(env.socketParam))

// 加载图表 v-charts
// import VCharts from "v-charts"
// Vue.use(VCharts)

// 注册 alert confirm
import notification from "./utils/notification"
Vue.prototype.$du_alert = notification.$du_alert
Vue.prototype.$du_confirm = notification.$du_confirm
Vue.prototype.$du_loading = notification.$du_loading
Vue.prototype.$du_message = notification.$du_message

Vue.config.productionTip = false
Vue.config.silent = true

// 加载工具
import store from "./utils/store" // 加载vuex
import router from "./utils/router" // 加载路由

// 加载axios
import instance from "./utils/axios"
import lodash from "lodash"
import moment from "moment"
import simpleJsExport from "simple-js-export"
Vue.prototype.$axios = instance
Vue.prototype.$lodash = lodash
Vue.prototype.$simpleJsExport = simpleJsExport
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
