<template>
  <div class="">
    <section class="rx-section md-my-1">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div
            class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
          >
            <div
              class="md-mt-1 pm-work-font md-text-accent nt-tag-line cp-animate cp-animate--fade"
            >
              WHO WE ARE?
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                About us
              </span>
            </h2>
            <p class="pm-work-font md-typography-subtitle1 md-oh">
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Plan My Holiday is a leisure travel company that specializes in
                luxury tailor-made holidays.<br />
                For us, your no request is too great and no detail is too
                small.<br />
                We aim to offer you nothing but the best holiday experience
                ever.
              </span>
            </p>
          </div>
        </div>
        <div class="md-row cp-animate cp-animate--fade">
          <div class="md-col md-col--12 md-col--6-md">
            <div
              class="cp-img-background"
              style="background-image: url(http://planmyholiday.co.in/assets/img/why-us/imgpngRishi.png); min-height: 380px;"
            ></div>
          </div>
          <div class="md-col md-col--12 md-col--6-md">
            <div class="content md-mt-2 md-mt-0-md">
              <div class="md-typography-justify">
                <p class="md-typography-subtitle1">Dear Traveller,</p>
                <p class="md-typography-subtitle1">
                  Welcome. Plan My Holiday offers you bespoke vacations to the
                  world’s most exclusive hotels and exotic destinations. For us,
                  travel is a never ending learning experience. We are
                  constantly exploring new destinations, attending travel
                  industry events and upgrading our destination knowledge
                  through various webinars and travel modules. We have built a
                  strong network of reliable and experienced travel partners to
                  offer you nothing but the globe's finest hotels, luxury villas
                  and cruises for that unforgettable journey.
                </p>
                <p class="md-typography-subtitle1">
                  We strive to be a unique “Globally Local” company by offering
                  you an unparalleled combination of a Global Portfolio with
                  rich and unique local expertise. We aim to satisfy you with
                  the highest level of consultation services and would
                  definitely go an extra mile to satisfy all the travel needs.
                </p>
                <p class="md-typography-subtitle1">
                  So, whether you require to book a hotel or plan a trip, we
                  will work closely with you to provide a service that’s
                  unmatched.
                </p>
              </div>
              <div class="attributor hidden-th-down text-left">
                <div class="signContainer">
                  <img
                    src="http://planmyholiday.co.in/assets/img/why-us/sign.png"
                  />
                </div>
                <h3 class="m-a-0 mdl-typography--subhead font-pref name">
                  Rishi Dakalia
                </h3>
                <p>
                  Founder &amp; CEO of Planmyholiday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="rx-section md-my-1 md-bg-white">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div class="md-col">
            <div class="md-flex-column md-justify-content-center">
              <h3 class="md-mb-2 md-typography-headline md-typography-center">
                Why book with us
              </h3>
              <div
                style="max-width: 200px;margin-left: auto;margin-right: auto"
                class="md-border md-mt-2"
              ></div>
            </div>
          </div>
        </div>
        <template v-for="(item, index) in whyUsItems">
          <WhyUsCard
            class="md-mt-4"
            :key="'feature-' + index"
            :index="index"
            :why-us="item"
          />
        </template>
      </div>
    </section>
    <section class="rx-section">
      <div class="md-container md-container--box">
        <div class="md-row">
          <div
            class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
          >
            <div class="md-flex-column md-justify-content-center">
              <h3 class="md-mb-2 md-typography-headline md-typography-center">
                Pricing Guarantee
              </h3>
              <div
                class="md-border md-mt-1"
                style="max-width: 200px;margin-left: auto;margin-right: auto"
              ></div>
            </div>
            <p class="md-mt-3 pm-work-font md-typography-subtitle1">
              Not only do we offer our client Best price guarantee, we also
              offer complete transparency in our pricing. Most of the travel
              companies today offer one price for your entire tour. We don't
              think that is fair to the traveller. With our pricing
              transparency, we always try to offer you breakdown of costs
              wherever wherever possible. That way you always know where your
              money is going and can ultimately get a much higher value for
              money.
            </p>
            <div class="md-mt-4 md-flex-column md-justify-content-center">
              <h3 class="md-mb-2 md-typography-headline md-typography-center">
                Special Offers
              </h3>
              <div
                class="md-border md-mt-2"
                style="max-width: 200px;margin-left: auto;margin-right: auto"
              ></div>
            </div>
            <p class="md-mt-3 pm-work-font md-typography-subtitle1 md-mb-0">
              We always have some offers that you cannot refuse. Check them out
              <a href="explore?what=13">here</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WhyUsCard from '@/components/common/WhyUsCard'

export default {
  components: { WhyUsCard },
  data: () => ({
    mpaTimeOut: null
  }),
  computed: {
    ...mapGetters({
      whyUsItems: 'core/getWhyUs'
    })
  },
  async fetch({ store, error }) {
    if (process.client) {
      const item_ = store.state.core.whyUs
      if (item_.length) {
        return
      }
    }
    try {
      await store.dispatch('core/fetchWhyUs')
    } catch (e) {
      return error({ statusCode: 404, message: 'Not found' })
    }
  },
  mounted() {
    this.$store.commit('core/setData', {
      name: 'topAppBarTitle',
      data: 'About us'
    })
  },
  methods: {
    async onSubmit() {}
  }
}
</script>
