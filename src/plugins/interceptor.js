import axios from "axios"
import persistData from "@/plugins/persistData"

const Interceptor = {
  // headers
  // params (query params)
  // data (body)
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    }

    const token = persistData.getItem('token', false)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  },
  async get(url) {
    return axios.get(url, { headers: this.getHeaders() }
    )
  },
  async post(url, data = {}) {
    return axios.post(url, { data },{headers: this.getHeaders()})
  },
  async put(url, data = {}) {
    return axios.put(url, { headers: this.getHeaders(), data })
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
