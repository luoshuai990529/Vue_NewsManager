import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Message
} from 'element-ui';
Vue.use(ElementUI);
Vue.prototype.$axios = axios;




// 创建全局前置路由守卫
// 拦截所有的路由跳转，进行校验
// 只有校验通过才放行
router.beforeEach((to, from, next) => {
  if (to.meta.needAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      // Toast.fail("请先登录!")
      Message({
        message: "请先登录",
        type: "warning",
      })
      // // 如果没有就跳转到登录页
      router.push("/login").catch(err => {
        console.log(err);
      })
      // 有可能找到另一种跳转方法
      // next("/login")
      // 新版路由已经不是这么写了
      // 需要直接用router.push
      return
    }
  }
  next();
})
// 添加axios拦截器
axios.interceptors.request.use(config => {
  if (localStorage.getItem("token") && !config.headers.Authorization) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
  }
  return config
}, err => {
  console.log(err);
})

// 设置 axios 的基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')