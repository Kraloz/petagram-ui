import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Home from '@/views/Home/Home.vue'
import Post from '@/views/Post/Post.vue'
import _404 from '@/views/_404.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/',
    name: 'Post',
    component: Post
  },
  {
    path: '/(.*)',
    name: '404',
    component: _404

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
