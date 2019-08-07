<template>
  <section class="md-layout-rel">
    <section class="md-container md-container--box md-layout-rel">
      <div
        class="rx-slider-section md-layout--column md-layout md-align md-align--center-center md-my-3"
      >
        <div
          id="start"
          class="md-row login-adjust-padding md-layout--nowrap md-align md-align--start-center"
          style="width: 100%"
        >
          <div
            class="rx-slider__cell md-col md-col--12-sm md-col--6 md-align md-align--center-center"
          >
            <AuthOnboard />
          </div>
          <div class="rx-slider__cell md-col md-col--12-sm md-col--6">
            <AuthEMailOtp
              @verifiedSuccess="onVerifiedSuccess"
              @skipVerification="onVerifiedSuccess"
            />
          </div>
          <div class="md-layout-spacer"></div>
        </div>
      </div>
    </section>
  </section>
</template>
<style>
.et-login-button {
  min-width: 128px;
}
</style>
<script>
export default {
  middleware: ['auth', 'email-verify'],

  head() {
    return {
      title: 'Sign in'
    }
  },

  layout: 'auth',

  components: {
    AuthOnboard: () => import('../../components/pages/auth/Onboard'),
    AuthEMailOtp: () => import('../../components/pages/auth/EmailOtp')
  },

  data: () => ({
    signup: true,
    actionText: 'OK',
    bannerMsg: '',
    bannerIcon: 'error_outline',
    showIcon: true,
    currentTab: 'Signup',
    progressId: 'signup-progress',
    banner: '',
    loading: false,
    email: ''
  }),

  methods: {
    showOffline() {
      this.bannerIcon = 'wifi_off'
      this.bannerMsg =
        'Something went wrong or unable to connect server. Please try again!'
      this.actionText = 'Try Again'
      const b = $('#collapse-signup-auth-banner')
      b.MaterialCollapse('show')
    },

    onVerifiedSuccess() {
      this.$router.push('/')
    }
  }
}
</script>
