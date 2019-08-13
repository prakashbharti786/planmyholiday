<template>
  <section class="rx-section md-my-1">
    <div
      class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
    >
      <div class="md-row">
        <div
          class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
        >
          <div
            class="md-mt-1 pm-work-font md-text-accent cp-animate cp-animate--fade nt-tag-line"
          >
            Get in touch
          </div>
          <h2
            class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline5 md-typography-font-light md-oh"
          >
            <span class="cp-animate cp-animate--slide md-d-inline-block">
              Contact us
            </span>
          </h2>
          <p class="pm-work-font md-typography-subtitle1 md-oh">
            <span class="cp-animate cp-animate--slide md-d-inline-block">
              Have a question? Fell free to contact us. Our team will be happy
              to help you
            </span>
          </p>
        </div>
      </div>
      <div class="md-row cp-animate cp-animate--fade">
        <div class="md-col md-col--4-md">
          <div class="">
            <h3 class="md-mb-3 md-typography-headline5">
              Contact Information
            </h3>
            <ul class="md-footer__link-list">
              <li class="md-footer__link md-footer__link--with-icon md-mb-2">
                <i class="material-icons">location_on</i>
                Address:&nbsp;&nbsp; 9, India Exchange Place,<br />
                <span class="bigGap">
                  3rd Floor, Suite No 869,<br />700001, Kolkata, India
                </span>
              </li>
              <li class="md-footer__link md-footer__link--with-icon">
                <i class="material-icons">email</i>
                General Enquiries<br />
                <a href="mailto:contact@planmyholiday.co.in">
                  contact@planmyholiday.co.in
                </a>
                <div class="md-mt-1">
                  Quotes and Reservation<br />
                  <a href="mailto:escape@planmyholiday.co.in">
                    escape@planmyholiday.co.in
                  </a>
                </div>
                <div class="md-mt-1">
                  Trade Partners Enquiries<br />
                  <a href="mailto:ops@planmyholiday.co.in">
                    ops@planmyholiday.co.in
                  </a>
                </div>
                <div class="md-mt-1">
                  Contracting<br />
                  <a href="mailto:contracting@planmyholiday.co.in">
                    contracting@planmyholiday.co.in
                  </a>
                </div>
              </li>
            </ul>
            <div class="md-border md-mt-4"></div>
            <h3 class="md-mb-3 md-mt-3 md-typography-headline5">
              Need Help?
            </h3>
            <ul class="md-footer__link-list">
              <li class="md-footer__link md-footer__link--with-icon md-mb-2">
                <i class="material-icons">phone</i>
                Phone:
                <a href="tel:+918232097526"> +91 823 2097 526(PLAN)</a>
              </li>
              <li class="md-footer__link md-footer__link--with-icon md-mb-2">
                <i class="material-icons">phone</i>
                Phone:
                <a href="tel:+919831297526"> +91 983 1297 526(PLAN)</a>
                <div class="bigGap md-mt-1">
                  Monday to Friday 9:30 AM - 7:30 PM<br />Saturday 10:30 AM -
                  4:00 PM
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="md-col md-col--6-md md-col--offset-1-md">
          <div class="">
            <h3 class="md-mb-1 md-typography-headline5">Drop us message</h3>
            <form class="md-form" @submit.prevent="onSubmit">
              <div class="md-form__row md-my-1">
                <MdTextField
                  class="md-flex--grow"
                  :required="true"
                  :value="inputs.fname"
                  :autofocus="true"
                  :error-text="errors.fname"
                  :invalid="!!errors.fname"
                  uid="fname"
                  label="First name"
                  name="fname"
                  @input="onInput($event, 'fname')"
                />
                <MdTextField
                  class="md-flex--grow"
                  :required="true"
                  :value="inputs.lname"
                  :autofocus="true"
                  :error-text="errors.lname"
                  :invalid="!!errors.lname"
                  uid="lname"
                  label="Last name"
                  name="lname"
                  @input="onInput($event, 'lname')"
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
                <MdTextField
                  ref="mobile"
                  class="md-flex--grow"
                  :required="true"
                  :value="inputs.mobile"
                  :error-text="errors.mobile"
                  :invalid="!!errors.mobile"
                  type="tel"
                  uid="mobile"
                  label="Mobile"
                  name="tel"
                  @input="onInput($event, 'mobile')"
                />
              </div>
              <div class="md-form__row">
                <MdTextField
                  class="md-flex--grow"
                  :required="true"
                  :value="inputs.message"
                  :error-text="errors.message"
                  :invalid="!!errors.message"
                  :minlength="6"
                  :row="3"
                  type="textarea"
                  uid="message"
                  label="Message"
                  name="message"
                  @input="onInput($event, 'message')"
                />
              </div>
              <div class="md-layout md-mt-2">
                <MdButton
                  label="Submit"
                  theme="accent"
                  native-type="submit"
                  size="large"
                  :un-elevated="true"
                  :raised="true"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.md-footer__link--with-icon {
  position: relative;
  padding-left: 30px;
}
.md-footer__link--with-icon .material-icons {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 18px;
}
.et-map-wrapper {
  height: 240px;
  background: #7f828b;
}
</style>

<script>
export default {
  data: () => ({
    inputs: {
      email: '',
      mobile: '',
      fname: '',
      lname: '',
      message: ''
    },
    errors: {
      email: null,
      mobile: null,
      fname: null,
      lname: null,
      message: null
    },
    loading: false,
    mpaTimeOut: null
  }),
  mounted() {
    this.$store.commit('core/setData', {
      name: 'topAppBarTitle',
      data: 'Contact us'
    })
  },
  methods: {
    async onSubmit() {}
  }
}
</script>
