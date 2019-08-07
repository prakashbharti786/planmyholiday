const defaultBlogsState = () => {
  return {
    data: []
  }
}
export default {
  namespaced: true,
  state: defaultBlogsState,

  mutations: {
    setData(state, data) {
      state.data = data
    },
    resetState(state) {
      Object.assign(state, defaultBlogsState())
    }
  },

  actions: {
    async index({ commit }) {
      const { data } = await this.$axios.get(`blogs`)
      commit('setData', data)
    },
    async show({ commit }, id) {
      const { data } = await this.$axios.get(`/blogs/${id}`)
      commit('setData', data)
    }
  },

  getters: {
    getData(state) {
      return state.data
    }
  }
}
