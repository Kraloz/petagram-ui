import Axios from 'axios'
import persistentData from '@/plugins/persistentData'
import moment from 'moment'

const InterceptorAPI = {
  getHeaders() {
    return new Promise((resolve) => {
      persistentData.getData('jwtToken', false).then(jwtToken => {
        let params = {
          'Content-Type': "application/json"
        }
        if (jwtToken && jwtToken != '') params.Authorization = `Bearer ${jwtToken}`
        resolve(params)
      })
    })
  },
  validateToken() {
    return new Promise((resolve) => {
      persistentData.getData('tokenExpired', false).then(jwtToken => {
        if (moment(jwtToken).diff(moment(), 'm') < 1) {
          this.refreshToken().then(() => { resolve() })
        } else {
          resolve()
        }
      })
    })
  },
  refreshToken() {
    return new Promise((resolve, reject) => {
      persistentData.getData('jwtToken', false).then(jwtToken => {
        Axios.post(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API_SECURITY}/refreshToken`, {
          'Value': jwtToken
        }).then(res => {
          const expired = moment().add(13, 'm').format()
          persistentData.setData('tokenExpired', expired, false)
          resolve(res)
        })
        .catch(err => {
          persistentData.setData('jwtToken', '')
          persistentData.setData('tokenExpired', '')
          window.mainApp.$store.dispatch('loggedIn', false)
          reject(err)
        })
      })
    })
  },
  get(endpoint) {
    const self = this
    return new Promise((resolve, reject) => {
      this.validateToken()
        .then(() => {
          this.getHeaders().then(headers => {
            Axios.get(endpoint, { headers })
              .then(res => {
                resolve(res)
              })
              .catch(err => {
                if (err.response.status === 401) {
                  // Refresk Token
                  self.refreshToken()
                    .then(res_token => {
                      persistentData.setData('jwtToken', res_token.data.token, false)
                      this.getHeaders().then(headers => {
                        Axios.get(endpoint, { headers })
                          .then(res => resolve(res))
                          .catch(err => reject(err))
                      })
                    })
                }
                reject(err)
              })
          })
        })
    })
  },
  put(endpoint, data) {
    return new Promise((resolve, reject) => {
      this.validateToken()
        .then(() => {
          this.getHeaders().then(headers => {
            Axios.put(endpoint, data, { headers })
              .then(res => resolve(res))
              .catch(err => reject(err))
          })
        })
    })
  },
  post(endpoint, data) {
    const self = this
    return new Promise((resolve, reject) => {
      this.validateToken()
        .then(() => {
          this.getHeaders().then(headers => {
            Axios.post(endpoint, data, { headers })
              .then(res => resolve(res))
              .catch(err => {
                if (err.response.status === 401) {
                  // Refresk Token
                  self.refreshToken()
                    .then(res_token => {
                      persistentData.setData('jwtToken', res_token.data.token, false)
                      this.getHeaders().then(headers => {
                        Axios.post(endpoint, data, { headers })
                          .then(res => resolve(res))
                          .catch(err => {
                            reject(err)
                          })
                        })
                      })
                }
                reject(err)
              })
          })
        })
    })
  },
  authenticate: {
    get(endpoint) {
      return new Promise((resolve, reject) => {
        Axios.get(endpoint)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    post(endpoint, data) {
      return new Promise((resolve, reject) => {
        Axios.post(endpoint, data)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    }
  }
}

export default InterceptorAPI