import Vue from 'vue'
import Vuex from 'vuex'

import security from "@/store/modules/security"
import post from "@/store/modules/post"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    security,
    post
  }
})
