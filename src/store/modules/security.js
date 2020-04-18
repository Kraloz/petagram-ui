import Interceptor from "@/plugins/interceptor"
import persistData from "@/plugins/persistData"
import Decoder from "@/plugins/decoder"
import * as dayjs from 'dayjs'

const urlAPI = `${process.env.VUE_APP_URL_API}${process.env.VUE_APP_URL_SECURITY}`

const security = {
  actions: {
    async logIn({ }, { username, password }) {
      try {
        const res = await Interceptor.authenticate.post(`${urlAPI}/login/`, { username, password })
        persistData.setItem('access', res.data.access)
        persistData.setItem('refresh', res.data.refresh)
        // expiration date
        const { exp } = Decoder.decodeToken(res.data.access)
        persistData.setItem('expire', dayjs.unix(exp).format())
        return
      } catch (err) {
        console.error(err)
      }
    },
    async logOut() {
      persistData.removeItem('access')
      persistData.removeItem('refresh')
      persistData.removeItem('expire')
      return
    }
  },
  mutations: {},
  getters: {
    isLoggedIn: () => {
      console.log('isLoggedIn?', token !== null)
      console.log('value :', persistData.getItem('access'))
      const token = persistData.getItem('access')
      return token !== null
    }
  }
}

export default security
