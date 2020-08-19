import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login.vue"
Vue.use(VueRouter)

const routes = [{
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    components: {
      HomeTemp: Home
    },
    meta: {
      needAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      LoginTemp: Login
    },

  },
]

const router = new VueRouter({
  routes
})

export default router