const defaultTestimonialsState = () => {
  return {
    data: [],
    testimonials: []
  }
}
export default {
  namespaced: true,
  state: defaultTestimonialsState,

  mutations: {
    setData(state, obj) {
      state[obj.name] = obj.data
    },
    resetState(state) {
      Object.assign(state, defaultTestimonialsState())
    }
  },

  actions: {
    async show({ commit }, obj) {
      const { data } = await this.$axios.get(`/testimonials/${obj.id}`)
      commit('setData', data)
    },
    async fetchTestimonials({ commit }) {
      const { data } = await this.$axios.get(`testimonials`)
      commit('setData', { name: 'testimonials', data: data })
    }
  },

  getters: {
    getData(state) {
      return state.data
    },
    getTestimonials(state) {
      return state.testimonials
    }
  }
}
