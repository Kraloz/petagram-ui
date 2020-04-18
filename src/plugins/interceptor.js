import axios from "axios"
import persistData from "@/plugins/persistData"
import dayjs from "dayjs"

const Interceptor = {
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    }

    const token = persistData.getItem('access', false)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  },
  async refreshToken() {
    const refresh = persistData.getItem('refresh')
    const urlRefresh = `${process.env.VUE_APP_URL_API}${process.env.VUE_APP_URL_SECURITY}/refresh`
    const res = await axios.authenticate.post(urlRefresh, {
      refresh
    })
    persistData.setData('access', res.refresh)
    return res.refresh
  },
  async validateToken() {
    const exp = persistData.getItem('expire')
    const diff = dayjs().diff(dayjs(exp), 'm')
    if (diff > 2) {
      await this.refreshToken()
    } else {
      return
    }


  },
  async get(url) {
    try {
      await this.validateToken()
      return axios.get(url, { headers: this.getHeaders() })
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        // Refresk Token
        const resToken = await this.refreshToken()

        // TODO: seguimiento de proceso refresh token
        persistData.setData('access', resToken.data.refresh)
        // dura 30 minutos
        const res = await axios.get(url, { headers: this.getHeaders() })
        return res
      }
      console.error(err)
      throw (err)
    }
  },
  async post(url, data = {}) {
    await this.validateToken()
    return axios.post(url, data, { headers: this.getHeaders() })
  },
  async put(url, data = {}) {
    await this.validateToken()
    return axios.put(url, data, { headers: this.getHeaders() })
  },
  authenticate: {
    async get(url) {
      return axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    async post(url, data = {}) {
      return axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }
}

export default Interceptor
