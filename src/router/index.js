import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login.vue"
import PubArticle from "@/views/PubArticle.vue"
import PostList from "@/views/PostList.vue"

Vue.use(VueRouter)

const routes = [{
    path: "/",
    redirect: "/home/postlist"
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
    children: [{
      path: "editinfo",
      components: {
        EditInfoTemp: PubArticle
      },
      meta: {
        needAuth: true
      },
    }, {
      path: "postlist",
      components: {
        PostListTemp: PostList
      },
      meta: {
        needAuth: true
      },
    }, ]
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