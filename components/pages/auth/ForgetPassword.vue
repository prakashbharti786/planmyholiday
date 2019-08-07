<template>
  <div class="et-login-wrapper">
    <h1 class="md-mt-2 md-mb-1 md-typography-display-1 md-typography-font-bold">
      Forget Password
    </h1>
    <p class="md-mb-2">
      Enter your email here.<br />
      We will send an access code if that email is registered with us.
    </p>
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
      <div class="md-layout md-mt-3">
        <nuxt-link
          to="/signin"
          class="md-d-none md-d-inline-flex-sm md-button md-button--accent"
        >
          Sign in instead
        </nuxt-link>
        <div class="md-d-none md-d-inline-flex-sm md-layout-spacer" />
        <MdButton
          label="Next"
          size="large"
          theme="accent"
          native-type="submit"
          class="md-d-none md-d-inline-flex-sm et-login-button"
          :disabled="!enableSubmit"
          :un-elevated="true"
          :raised="true"
        />
        <MdButton
          label="Next"
          size="large"
          theme="accent"
          native-type="submit"
          class="md-d-none-sm md-button--block"
          :disabled="!enableSubmit"
          :un-elevated="true"
          :raised="true"
        />
      </div>
      <div class="md-mt-2 md-align--center-center md-d-flex md-d-none-sm">
        <nuxt-link to="/auth/signin" class="md-button md-button--accent">
          Sign in instead
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AuthForgetPassword',
  components: {},
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
      return this.inputs.email && this.validEmail(this.inputs.email)
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
    }
  }
}
</script>
