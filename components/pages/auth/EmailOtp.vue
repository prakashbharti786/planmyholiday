<template>
  <div class="et-login-wrapper">
    <h1 class="md-mt-2 md-mb-1 md-typography-headline4 md-typography-font-bold">
      Verify your email
    </h1>
    <p class="md-mb-2">
      We&apos;ve sent a {{ otpType.toLowerCase() }} code to
      <span style="font-style: italic">{{ user.email }}</span>
    </p>
    <form class="md-form" action="" @submit.prevent="verifyOTP">
      <hr class="hide-on-reset" />
      <div
        style="flex-wrap: nowrap"
        class="md-form__row md-layout md-align md-align--center"
      >
        <MdTextField
          ref="OTP"
          class="md-flex--grow"
          :required="true"
          :value="inputs.OTP"
          :autofocus="true"
          :error-text="errors.OTP"
          :invalid="!!errors.OTP"
          :max="9999"
          :label="otpType + ' code'"
          :persistent="true"
          type="number"
          helper-text="Use 6 characters or more for your password"
          uid="otp"
          name="otp"
          @input="onInput($event, 'OTP')"
        />
        <div
          v-if="showAlreadyVerified"
          class="md-layout md-align--center-center"
        >
          <MdButton
            label="Already verified?"
            theme="accent"
            size="compact"
            uid="otp-submit"
            title="Click here if you already verified by link"
            @click="alreadyVerified"
          />
        </div>
      </div>
      <div style="background-color: #f5bd00" class="md-banner md-mt-3 md-mb-1">
        <div class="md-banner__wrapper">
          <div class="md-banner__body md-typo--body-2 md-flex--grow">
            In case you haven&apos;t received mail in your inbox, please check
            your spam or promotions folder.
          </div>
        </div>
      </div>
      <div class="md-layout md-flex--grow md-align--center md-my-3">
        <MdButton
          :label="skipText"
          theme="accent"
          uid="otp-submit"
          @click="skipVerification"
        />
        <div class="md-layout-spacer" />
        <MdButton
          label="Verify"
          size="large"
          theme="accent"
          native-type="submit"
          class="et-login-button"
          uid="otp-submit"
          :disabled="!enableSubmit"
          :un-elevated="true"
          :raised="true"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AuthEmailOtp',
  props: {
    skipText: {
      type: String,
      default: 'Verify later'
    },
    otpError: {
      type: String,
      default: ''
    },
    heading: {
      type: String,
      default: 'Verify your email'
    },
    otpType: {
      type: String,
      default: 'Confirmation'
    }
  },
  data: () => ({
    inputs: {
      OTP: ''
    },
    errors: {
      OTP: null
    },
    loading: false,
    showAlreadyVerified: false,
    error: {
      OTP: ''
    },
    otpErrorDefault: 'Please enter 4 digit confirmation code'
  }),
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    }),
    enableSubmit() {
      return this.inputs.OTP.toString().length === 4
    }
  },
  mounted() {
    this.generateOTP()
  },
  methods: {
    onInput(val, key) {
      this.$set(this.inputs, key, val)
    },

    skipVerification() {
      this.$emit('skipVerification')
    },

    async alreadyVerified() {
      this.resetErrors()
      if (this.loading) {
        return false
      }
      this.loading = true
      this.$store.commit('core/setAppLoading', true)
      try {
        const { data } = await this.$axios.$post('auth/check-email-verify')
        if (data && data.emailVerified) {
          this.showAlreadyVerified = false
          /* this.$store.commit('core/setSnackbar', {
            message: 'Email already verified.',
            body: ''
          }) */
          this.$store.dispatch('auth/fetchUser')
        } else {
          this.showAlreadyVerified = false
          setTimeout(() => {
            this.showAlreadyVerified = true
          }, 10000)
          /* this.$store.commit('core/setSnackbar', {
            message: 'Email not verified yet. Please verify your email.',
            body: ''
          }) */
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        this.handleError(e)
      }
      this.loading = false
      this.$store.commit('core/setAppLoading', false)
    },

    async verifyOTP() {
      this.resetErrors()
      if (this.loading) {
        return false
      }
      this.loading = true
      this.$store.commit('core/setAppLoading', true)
      try {
        await this.$axios.$post('auth/verify-email-otp', {
          OTP: this.inputs.OTP
        })
        this.$store.dispatch('auth/fetchUser')
        setTimeout(() => {
          this.$emit('verifiedSuccess')
        }, 300)
      } catch (e) {
        this.handleError(e)
      }
      this.loading = false
      this.$store.commit('core/setAppLoading', false)
    },

    async generateOTP() {
      this.loading = true
      this.$store.commit('core/setAppLoading', true)
      try {
        await this.$axios.$post('auth/generate-email-otp')
        setTimeout(() => {
          this.showAlreadyVerified = true
        }, 10000)
      } catch (e) {
        this.handleError(e)
      }
      this.loading = false
      this.$store.commit('core/setAppLoading', false)
    },

    resetErrors() {
      this.$set(this.errors, 'OTP', null)
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
