import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import LoginPage from '@/views/Login/Login.vue'
import HomePage from '@/views/Home/Home.vue'
import PostPage from '@/views/Post/Post.vue'
import ProfilePage from '@/views/Profile/Profile.vue'

import _404 from '@/views/_404.vue'

Vue.use(VueRouter)

function securedRoute(path, name, component) {
  return {
    path,
    name,
    component,
    beforeEnter: (to, from, next) => {
      if (store.dispatch.isLoggedIn) {
        console.log('nextt')
        next()
      } else {
        console.log('nope')
        next({ name: "Login" })
      }
    }
  }
}

const routes = [
  {
    path: '/',
    name: 'Index',
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next({ name: "Home" })
      } else {
        next({ name: "Login" })
      }
    }
  },
  {
    path: '/login/',
    name: 'Login',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next({ name: "Home" })
      } else {
        next()
      }
    }
  },
  securedRoute('/home/', 'Home', HomePage),
  securedRoute('/post/', 'Post', PostPage),
  securedRoute('/profile/', 'Profile', ProfilePage),
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
