import Interceptor from "@/plugins/interceptor.js"

const urlAPI = `${process.env.VUE_APP_URL_API}${process.env.VUE_APP_URL_POST}`

const post = {
  state: {
    PostList: []
  },
  actions: {
    async getPosts({ commit }, { page, page_size = 2 }) {
      const res = await Interceptor.get(`${urlAPI}/?page=${page}&page_size=${page_size}`)
      commit('SET_POSTS', res.data.results)
      return res.data.results
    },
    async uploadFile({ }, file) {
      if (!file) {
        throw new Error('no files')
      }
      const formData = new FormData();
      formData.append('file', file);
      const res = await Interceptor.post(`${urlAPI}/image/s`, formData)
      return res.data
    }
  },
  mutations: {
    SET_POSTS(state, value) {
      state.PostList = value
    }
  },
  getters: {}
}

export default post