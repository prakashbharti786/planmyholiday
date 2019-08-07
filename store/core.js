import Vue from 'vue'

const defaultCoreState = () => {
  return {
    snackbar: {
      actionText: '',
      message: ''
    },
    alert: {
      title: '',
      defaultTitle: 'Something went wrong or unable to connect',
      body: '',
      disableDismissive: false,
      show: false
    },
    appLoading: false,
    feedback: false,
    breadCrumbs: [],
    whyUs: [],
    homeSlider: [],
    scroll: {
      startScroll: 72,
      endScroll: 72
    },
    topAppBarTitle: '',
    continentList: [],
    currencyList: [],
    countryList: [],
    themeList: []
  }
}

export default {
  namespaced: true,

  state: defaultCoreState,

  mutations: {
    setData(state, obj) {
      state[obj.name] = obj.data
    },
    setObjData(state, obj) {
      Vue.set(state[obj.name], obj.key, obj.data)
    },
    setSnackbar(state, obj) {
      for (const key in obj) {
        Vue.set(state.snackbar, key, obj[key])
      }
    },
    setAlert(state, obj) {
      for (const key in obj) {
        Vue.set(state.alert, key, obj[key])
      }
    },
    setAppLoading(state, val) {
      state.appLoading = val
    },
    setBreadCrumbs(state, val) {
      state.breadCrumbs = val
    },
    resetState(state) {
      Object.assign(state, defaultCoreState())
    }
  },

  actions: {
    async fetchWhyUs({ commit }) {
      const { data } = await this.$axios.get(`why-us`)
      commit('setData', { name: 'whyUs', data: data })
    },
    async fetchHomeSlider({ commit }) {
      const { data } = await this.$axios.get(`home-slider`)
      commit('setData', { name: 'homeSlider', data: data.slideshow })
    },
    async fetchExternal({ commit }) {
      const { data } = await this.$axios.get(`external`)
      commit('setData', { name: 'continentList', data: data.continentList })
      commit('setData', { name: 'currencyList', data: data.currencyList })
      commit('setData', { name: 'countryList', data: data.countryList })
      commit('setData', { name: 'themeList', data: data.themeList })
    }
  },

  getters: {
    snackbar(state) {
      return state.snackbar
    },
    alert(state) {
      return state.alert
    },
    appLoading(state) {
      return state.appLoading
    },
    breadCrumbs(state) {
      return state.breadCrumbs
    },
    feedback(state) {
      return state.feedback
    },
    getWhyUs(state) {
      return state.whyUs
    },
    getHomeSlider(state) {
      return state.homeSlider
    },
    getScroll(state) {
      return state.scroll
    },
    getTopAppBarTitle(state) {
      return state.topAppBarTitle
    },
    getCountryList(state) {
      return state.countryList
    },
    getContinentList(state) {
      return state.continentList
    },
    getCurrencyList(state) {
      return state.currencyList
    },
    getThemeList(state) {
      return state.themeList
    }
  }
}
