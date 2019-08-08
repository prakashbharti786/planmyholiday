const defaultBlogsState = () => {
  return {
    data: [],
    blogs: []
  }
}
export default {
  namespaced: true,
  state: defaultBlogsState,

  mutations: {
    setData(state, obj) {
      state[obj.name] = obj.data
    },
    addData(state, obj) {
      state[obj.name].unshift(obj.data)
    },
    resetState(state) {
      Object.assign(state, defaultBlogsState())
    }
  },

  actions: {
    async show({ commit }, obj) {
      const { data } = await this.$axios.get(`/blogs/${obj.id}`)
      // eslint-disable-next-line no-console
      console.log(data)
      commit('addData', { name: 'data', data: data })
    },
    async fetchBlogs({ commit }) {
      const { data } = await this.$axios.get(`blogs`)
      commit('setData', { name: 'blogs', data: data })
    }
  },

  getters: {
    getData(state) {
      return state.data
    },
    getBlogs(state) {
      return state.blogs
    }
  }
}
