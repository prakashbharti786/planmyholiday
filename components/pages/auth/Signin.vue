<template>
  <div class="et-login-wrapper">
    <h1 class="md-mt-2 md-mb-1 md-typography-display-1 md-typography-font-bold">
      Sign in
    </h1>
    <p class="md-mb-2">
      Welcome back, Please sign in to your account
    </p>
    <AuthSocial class="md-mb-2" />
    <form class="md-form" @submit.prevent="onSubmit">
      <div class="md-form__row">
        <MdTextField
          ref="email"
          class="md-flex--grow"
          :required="true"
          :value="inputs.email"
          :autofocus="true"
          :error-text="errors.email"
          :invalid="!!errors.email"
          type="email"
          uid="email"
          label="Email"
          name="email"
          @input="onInput($event, 'email')"
        />
      </div>
      <div class="md-form__row">
        <MdTextField
          ref="password"
          class="md-flex--grow"
          :required="true"
          :value="inputs.password"
          :persistent="true"
          :type="passwordType"
          :trailing-icon="icon"
          :trailing-icon-clickable="true"
          :error-text="errors.password"
          :invalid="!!errors.password"
          :minlength="6"
          helper-text="Use 6 characters or more for your password"
          uid="password"
          label="Password"
          name="password"
          @trailingIconClick="changeType"
          @input="onInput($event, 'password')"
        />
      </div>
      <div class="md-layout md-mt-3">
        <nuxt-link
          :to="'resetpassword' + getQueryString"
          class="md-d-none md-d-inline-flex-sm md-button md-button--accent"
        >
          Forget Password?
        </nuxt-link>
        <div class="md-d-none md-d-inline-flex-sm md-flex-grow-1" />
        <MdButton
          label="Sign in"
          size="large"
          theme="accent"
          native-type="submit"
          class="md-d-none md-d-inline-flex-sm et-login-button"
          :disabled="!enableSubmit"
          :un-elevated="true"
          :raised="true"
        />
        <MdButton
          label="Sign in"
          size="large"
          theme="accent"
          native-type="submit"
          class="md-d-none-sm md-button--block"
          :disabled="!enableSubmit"
          :un-elevated="true"
          :raised="true"
        />
      </div>
      <div
        class="md-mt-2 md-align-items-center md-justify-content-center md-d-flex md-d-none-sm"
      >
        <nuxt-link
          :to="'resetpassword' + getQueryString"
          class="md-button md-button--accent"
        >
          Forget Password?
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import AuthSocial from '@/components/common/auth/social'

export default {
  name: 'AuthSignin',
  components: {
    AuthSocial
  },
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
