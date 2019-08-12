import Vuex from 'vuex'
import auth from './auth'
import core from './core'
import experiences from './experiences'
import blogs from './blogs'
import testimonials from './testimonials'

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      core,
      experiences,
      blogs,
      testimonials
    },
    actions: {
      async nuxtServerInit({ getters, dispatch }, { req }) {
        dispatch('auth/initAuth', req)
        await dispatch('core/fetchExternal', req)
        if (getters['auth/isAuthenticated']) {
          await dispatch('auth/fetchUser')
        }
      }
    }
  })

export default store
