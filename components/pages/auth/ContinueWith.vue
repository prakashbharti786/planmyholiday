<template>
  <div class="et-login-wrapper">
    <div class="md-mb-2">
      <div style="height: 32px" class="md-d-flex md-align-items-center">
        <img
          class="md-img-fluid"
          style="max-height: 100%"
          :src="client.app_logo"
        />
      </div>
    </div>
    <h1 class="md-mt-2 md-mb-1 md-typography-display-1 md-typography-font-bold">
      Sign in
    </h1>
    <p class="md-mb-3-sm md-mb-2 md-typography-subhead">
      to continue to <a href="">Fitmetix</a>
    </p>
    <div class="md-d-flex md-mb-2 md-align-items-center">
      <MdAvatar class="md-flex-grow-0" them size="dense">P</MdAvatar>
      <div class="md-ml-1">prakashbharti786@gmail.com</div>
    </div>
    <div class="md-layout md-align md-align--start-center md-layout--nowrap">
      <button
        class="md-button md-button--block md-button--large md-button--unelevated md-button--raised md-button--accent"
        type="button"
      >
        <div class="md-d-flex md-align-items-center md-flex-wrap">
          <span class="md-button__label">Continue as Prakash</span>
        </div>
      </button>
    </div>
    <div class="md-d-flex md-flex-column">
      <div class="md-mt-2">
        <MdButton
          label="Sign in with different account"
          size="large"
          theme="light"
          class="et-login-button md-button--block"
          :un-elevated="true"
          :raised="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AuthContinueWith',
  data: () => ({
    inputs: {
      email: '',
      password: ''
    },
    errors: {
      email: null,
      password: null
    },
    icon: 'visibility',
    passwordType: 'password',
    loading: false
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      client: 'oauth/getClient'
    }),
    enableSubmit() {
      return (
        this.inputs.email &&
        this.validEmail(this.inputs.email) &&
        this.inputs.password.length > 5
      )
    },
    getQueryString() {
      return this.$route.fullPath.substring(this.$route.path.length)
    }
  },
  beforeDestroy() {
    this.loading = false
    this.$store.commit('core/setAppLoading', false)
  },
  methods: {
    onInput(val, key) {
      this.$set(this.inputs, key, val)
    },

    changeType() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
        this.icon = 'visibility_off'
      } else {
        this.passwordType = 'password'
        this.icon = 'visibility'
      }
    },

    validEmail(email) {
      // eslint-disable-next-line no-useless-escape
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },

    resetErrors() {
      this.$set(this.errors, 'password', null)
      this.$set(this.errors, 'email', null)
    },

    async onSubmit() {
      this.resetErrors()
      if (this.loading) {
        return false
      }
      this.loading = true
      this.$store.commit('core/setAppLoading', true)
      try {
        await this.$store.dispatch('auth/signIn', {
          email: this.inputs.email.trim(),
          password: this.inputs.password
        })
        this.$emit('signinSuccess')
      } catch (e) {
        this.handleError(e)
      }
      this.loading = false
      this.$store.commit('core/setAppLoading', false)
    },

    handleError(errorResponse) {
      if (errorResponse && errorResponse.status === 400) {
        const errors = errorResponse.data
        errors.forEach(item => {
          this.errors[item.field] = item.message
          this.$nextTick(() => {
            this.$refs[item.field].$el
              .querySelector('.md-text-field__input')
              .focus()
          })
        })
      }
    },

    testIn() {
      const domain = 'http://dev.fitmetix.com/'
      try {
        // eslint-disable-next-line no-console
        console.log(window.opener)
        window.opener.postMessage(
          { meow: true, name: 'Prakash Bharti' },
          domain
        )
      } catch (err) {
        alert(err)
      }
      // window.close()
    }
  }
}
</script>
