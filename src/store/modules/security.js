import Interceptor from "@/plugins/interceptor"
import persistData from "@/plugins/persistData"

const urlAPI = `${process.env.VUE_APP_URL_API}${process.env.VUE_APP_URL_SECURITY}`

const security = {
  state: {
    logged_in: false
  },
  actions: {
    async logIn({ commit }, { username, password }) {
      console.log(username, password)
      console.log('')
      const res = await Interceptor.authenticate.post(`${urlAPI}/login/`, { username, password })
      commit('SET_LOGGED_IN', true)
      persistData.setItem('token', res.data.access)
      persistData.setItem('refresh', res.data.refresh)
      return res.data
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.logged_in = value
    }
  },
  getters: {}
}

export default security
