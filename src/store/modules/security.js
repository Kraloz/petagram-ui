import Interceptor from "@/plugins/interceptor"
import persistData from "@/plugins/persistData"
import Decoder from "@/plugins/decoder"
import * as dayjs from 'dayjs'

const urlAPI = `${process.env.VUE_APP_URL_API}${process.env.VUE_APP_URL_SECURITY}`

const security = {
  state: {
    isLoggedIn: false
  },
  actions: {
    async initStoreLogin({ commit }) {
      const token = persistData.getItem('access')
      commit('SET_LOGGED_IN', (token !== null))
      return
    },
    async logIn({ commit }, { username, password }) {
      try {
        const res = await Interceptor.authenticate.post(`${urlAPI}/login/`, { username, password })
        persistData.setItem('access', res.data.access)
        persistData.setItem('refresh', res.data.refresh)
        // expiration date
        const { exp } = Decoder.decodeToken(res.data.access)
        persistData.setItem('expire', dayjs.unix(exp).format())

        commit('SET_LOGGED_IN', true)
        return
      } catch (err) {
        console.error(err)
      }
    },
    async logOut({ commit }) {
      persistData.removeItem('access')
      persistData.removeItem('refresh')
      persistData.removeItem('expire')

      commit('SET_LOGGED_IN', true)
      return
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.isLoggedIn = value
    }
  },
  getters: {}
}

export default security
