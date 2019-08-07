import Vue from 'vue'

const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

// eslint-disable-next-line no-unused-vars
const dateDiffDays = (date1, date2) => {
  const dt1 = new Date(date1)
  const dt2 = new Date(date2)
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  )
}

export default {
  namespaced: true,

  state: {
    user: {},
    token: {
      token: null,
      refreshToken: null,
      expiresIn: null
    }
  },

  mutations: {
    setData(state, obj) {
      state[obj.name] = obj.data
    },
    addData(state, obj) {
      state[obj.name].push(obj.data)
    },
    setObjData(state, obj) {
      Vue.set(state[obj.name], obj.key, obj.data)
    },
    deleteData(state, obj) {
      state[obj.key].splice(obj.index, 1)
    }
  },

  actions: {
    authenticateUser({ commit, state }, obj) {
      // const expires = dateDiffDays(new Date().getTime(), obj.expires)
      const date = new Date()
      date.setDate(date.getDate() + 7)
      const expiresIn = date.getTime()
      commit('setObjData', { name: 'token', key: 'token', data: obj.token })
      commit('setObjData', {
        name: 'token',
        key: 'refreshToken',
        data: obj.refreshToken
      })
      localStorage.setItem('token', obj.token)
      localStorage.setItem('refreshToken', obj.refreshToken)
      Cookie.set('jwt', obj.token, {
        domain: process.env.domain,
        expires: expiresIn
      })
      Cookie.set('refreshToken', obj.refreshToken, {
        domain: process.env.domain,
        expires: expiresIn
      })
    },

    async signIn({ commit, state, dispatch }, obj) {
      const data = await this.$axios.$post('signin', obj)
      dispatch('authenticateUser', data.token)
      delete data.token
      commit('setData', { data: data, name: 'user' })
    },

    async signUp({ commit, state, dispatch }, obj) {
      const data = await this.$axios.$post('signup', obj)
      dispatch('authenticateUser', data.token)
      delete data.token
      commit('setData', { data: data, name: 'user' })
    },

    async authGoogle({ commit, state, dispatch }, obj) {
      const data = await this.$axios.$post('google', obj)
      dispatch('authenticateUser', data.token)
      delete data.token
      commit('setData', { data: data, name: 'user' })
    },

    initAuth({ state, commit, dispatch }, req) {
      // eslint-disable-next-line no-unused-vars
      let token, refreshToken, expiresIn
      if (process.client) {
        // fill the localStorage if token avaialble in store
        if (state.token.token) {
          localStorage.setItem('token', state.token.token)
          localStorage.setItem('refreshToken', state.token.refreshToken)
          localStorage.setItem('expiresIn', state.token.expiresIn)
        }
      }

      if (req) {
        if (!req.headers.cookie) {
          dispatch('logout')
          return
        }
        const Cookie = cookieparser.parse(req.headers.cookie)
        if (!Cookie) {
          dispatch('logout')
          return
        }
        token = Cookie.jwt
        refreshToken = Cookie.refreshToken
      } else if (process.client) {
        token = localStorage.getItem('token')
        refreshToken = localStorage.getItem('refreshToken')
        expiresIn = localStorage.getItem('expiresIn')
      }
      if (!token) {
        dispatch('logout')
        return
      }
      commit('setObjData', { name: 'token', key: 'token', data: token })
      commit('setObjData', {
        name: 'token',
        key: 'refreshToken',
        data: refreshToken
      })
    },

    logout({ commit, dispatch }) {
      commit('setObjData', { name: 'token', key: 'token', data: null })
      if (process.client) {
        Cookie.remove('jwt', { domain: process.env.domain })
        Cookie.remove('refreshToken', { domain: process.env.domain })
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        dispatch('resetAll')
      }
    },

    async updatePassword(vuexContext, inputs) {
      await this.$axios.put(`update-password`, inputs).catch(error => {
        return Promise.reject(error)
      })
    },

    async resetPassword(vuexContext, params) {
      await this.$axios.put(`reset-password`, params).catch(error => {
        return Promise.reject(error)
      })
    },

    async generatePasswordRestOTP(vuexContext, params) {
      await this.$axios.$post('generate-password-otp', params).catch(error => {
        return Promise.reject(error)
      })
    },

    async verifyPasswordRestOTP(vuexContext, params) {
      await this.$axios.$post('verify-password-otp', params).catch(error => {
        return Promise.reject(error)
      })
    },

    async fetchUser({ commit }) {
      const data = await this.$axios.$get('me')
      commit('setData', { data: data, name: 'user' })
    },

    resetAll() {}
  },

  getters: {
    isAuthenticated(state) {
      return state.token.token != null
    },
    token(state) {
      return state.token.token
    },
    getUser(state) {
      return state.user
    }
  }
}
