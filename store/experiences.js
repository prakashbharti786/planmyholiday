const defaultExperiencesState = () => {
  return {
    data: [],
    featuredExperiences: [
      {
        name: 'Adventure',
        image: 'sites/default/files/themes/Adventure.jpg'
      },
      {
        name: 'Art',
        image: 'sites/default/files/themes/Art.jpg'
      },
      {
        name: 'Nightlife',
        image: 'sites/default/files/themes/Nightlife.jpg'
      },
      {
        name: 'Islands',
        image: 'sites/default/files/themes/Islands.jpg'
      },
      {
        name: 'Romantic',
        image: 'sites/default/files/themes/Romantic.jpg'
      },
      {
        name: 'Exclusive',
        image: 'sites/default/files/themes/Exclusive.jpg'
      }
    ]
  }
}
export default {
  namespaced: true,
  state: defaultExperiencesState,

  mutations: {
    setData(state, obj) {
      state[obj.name] = obj.data
    },
    addData(state, obj) {
      state[obj.name].unshift(obj.data)
    },
    resetState(state) {
      Object.assign(state, defaultExperiencesState())
    }
  },

  actions: {
    async show({ commit }, obj) {
      const { data } = await this.$axios.get(`/experiences/${obj.id}`)
      // eslint-disable-next-line no-console
      console.log(data)
      commit('addData', { name: 'data', data: data })
    },
    async fetchExperiences({ commit }) {
      const { data } = await this.$axios.get(`home-slider`)
      commit('setData', {
        name: 'featuredExperiences',
        data: data['featured experience']
      })
    }
  },

  getters: {
    getData(state) {
      return state.data
    },
    getFeaturedExperiences(state) {
      return state.featuredExperiences
    }
  }
}
