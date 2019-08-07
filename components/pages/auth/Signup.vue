<template>
  <div class="et-login-wrapper">
    <h1 class="md-mt-2 md-mb-1 md-typography-display-1 md-typography-font-bold">
      Sign up
    </h1>
    <p class="md-mb-2">
      Welcome back, Please sign up to your account
    </p>
    <AuthSocial class="md-mb-2" />
    <form class="md-form" @submit.prevent="onSubmit">
      <div class="md-form__row">
        <MdTextField
          ref="email"
          class="md-flex--grow"
          :required="true"
          :value="inputs.name"
          :autofocus="true"
          :error-text="errors.name"
          :invalid="!!errors.name"
          uid="name"
          label="Name"
          name="name"
          @input="onInput($event, 'name')"
        />
      </div>
      <div class="md-form__row">
        <MdTextField
          ref="email"
          class="md-flex--grow"
          :required="true"
          :value="inputs.email"
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
      <div class="md-form__row">
        <MdTextField
          class="md-flex--grow"
          :required="true"
          :value="inputs.confirm_password"
          :error-text="errors.confirm_password"
          :invalid="!!errors.confirm_password"
          :minlength="6"
          type="password"
          uid="confirm_password"
          label="Confirm Password"
          name="confirm_password"
          @input="onInput($event, 'confirm_password')"
        />
      </div>
      <div class="md-layout md-mt-3">
        <nuxt-link
          to="/signin"
          class="md-d-none md-d-inline-flex-sm md-button md-button--accent"
        >
          Sign in instead
        </nuxt-link>
        <div class="md-d-none md-d-inline-flex-sm md-flex-grow-1" />
        <MdButton
          label="Sign up"
          size="large"
          theme="accent"
          native-type="submit"
          class="md-d-none md-d-inline-flex-sm et-login-button"
          :disabled="!enableSubmit"
          :un-elevated="true"
          :raised="true"
        />
        <MdButton
          label="Sign up"
          size="large"
          theme="accent"
          native-type="submit"
          class="md-d-none-sm md-button--block"
          :disabled="!enableSubmit"
          :un-elevated="true"
          :raised="true"
        />
      </div>
    </form>
  </div>
</template>

<script>
import AuthSocial from '@/components/common/auth/social'

export default {
  name: 'Signup',
  components: {
    AuthSocial
  },
  data: () => ({
    inputs: {
      name: null,
      email: '',
      password: '',
      confirm_password: ''
    },
    errors: {
      name: null,
      email: null,
      password: null,
      confirm_password: null
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
        this.inputs.password.length > 5 &&
        this.inputs.confirm_password
      )
    }
  },
  watch: {
    'inputs.confirm_password': function() {
      // eslint-disable-next-line no-console
      this.validatePassword()
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
    validatePassword() {
      if (
        this.inputs.password &&
        this.inputs.confirm_password &&
        this.inputs.password !== this.inputs.confirm_password
      ) {
        this.$set(
          this.errors,
          'confirm_password',
          "Those passwords didn't match. Try again."
        )
        return false
      } else {
        this.$set(this.errors, 'confirm_password', null)
      }
      return true
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
      this.$set(this.errors, 'confirm_password', null)
      this.$set(this.errors, 'email', null)
    },
    async onSubmit() {
      this.resetErrors()
      this.validatePassword()
      if (this.loading || !this.validatePassword()) {
        return false
      }

      this.loading = true
      this.$store.commit('core/setAppLoading', true)
      try {
        await this.$store.dispatch('auth/signUp', {
          email: this.inputs.email.trim(),
          password: this.inputs.password
        })
        setTimeout(() => {
          this.$emit('signupCompleted')
        }, 300)
      } catch (e) {
        this.handleError(e)
      }
      this.loading = false
      this.$store.commit('core/setAppLoading', false)
    },
    handleError(errorResponse) {
      // eslint-disable-next-line no-console
      console.log(errorResponse)
      if (errorResponse && errorResponse.status === 400) {
        const errors = errorResponse.data
        errors.forEach(item => {
          this.errors[item.field] = item.message
          this.$refs[item.field].$el
            .querySelector('.md-text-field__input')
            .focus()
        })
      }
    }
  }
}
</script>
