<template>
  <section class="md-layout-rel">
    <section class="md-container md-container--box md-layout-rel">
      <div
        class="rx-slider-section md-layout--column md-layout md-align md-align--center-center md-my-3"
      >
        <div
          id="start"
          class="md-row md-align md-align--start-center"
          style="width: 100%"
        >
          <div
            class="rx-slider__cell md-col md-d-none md-d-flex-sm md-col--12-sm md-col--6 md-align md-align--center-center"
          >
            <AuthOnboard />
          </div>
          <div class="rx-slider__cell md-col md-col--12-sm md-col--6">
            <AuthForgetPassword @signinSuccess="onSigninSuccess" />
          </div>
          <div class="md-layout-spacer"></div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  middleware: 'guest',
  head() {
    return {
      title: 'Forget Password',
      script: [
        {
          async: true,
          defer: true,
          src: 'https://apis.google.com/js/platform.js'
        }
      ]
    }
  },
  layout: 'auth',
  components: {
    AuthOnboard: () => import('../../components/pages/auth/Onboard'),
    AuthForgetPassword: () =>
      import('../../components/pages/auth/ForgetPassword')
  },
  data: () => ({
    signup: true,
    actionText: 'OK',
    bannerMsg: '',
    bannerIcon: 'error_outline',
    showIcon: true,
    asyncTab: false,
    currentTab: 'Signup',
    progressId: 'signup-progress',
    banner: '',
    loading: false,
    email: ''
  }),
  mounted() {
    this.$nextTick(() => {
      this.initGoogleAuth()
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', document.getElementById('google-btn'))
    this.$store.commit('core/setAppLoading', false)
  },
  methods: {
    async successHandler(googleUser) {
      const profile = googleUser.getBasicProfile()
      if (this.loading) {
        return false
      }
      this.loading = true
      this.$store.commit('core/setAppLoading', true)
      try {
        await this.$store.dispatch('auth/authGoogle', {
          email: profile.getEmail()
        })
        this.onSigninSuccess()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.loading = false
      this.$store.commit('core/setAppLoading', false)
    },
    failedHandler(error) {
      // eslint-disable-next-line no-console
      console.log(error)
    },
    onSigninSuccess() {
      const redirectUrl = this.$route.query.continue
      if (!redirectUrl) {
        this.$router.push('/services')
      } else {
        window.location.href = decodeURIComponent(redirectUrl)
      }
    },
    initGoogleAuth() {
      if (!window.gapi) {
        setTimeout(() => {
          this.initGoogleAuth()
        }, 300)
        return
      }
      const this_ = this
      window.gapi.load('auth2', function() {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        // eslint-disable-next-line no-undef
        const auth2 = gapi.auth2.init({
          client_id: document.head.querySelector(
            "[name='google-signin-client_id']"
          ).content,
          cookiepolicy: 'single_host_origin'
        })
        const successHandler = this_.successHandler.bind(this)
        const failedHandler = this_.failedHandler.bind(this)
        auth2.attachClickHandler(
          document.getElementById('google-btn'),
          {},
          successHandler,
          failedHandler
        )
      })
    }
  }
}
</script>
