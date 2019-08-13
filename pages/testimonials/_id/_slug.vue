<template>
  <div class="">
    <TestimonialHeroSlider style="margin-top: -64px" />
    <div class="rx-section">
      <div class="md-container md-container--box">
        <div class="md-row">
          <div
            class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
          >
            <h3
              class="appearContainer font-satisfy md-typography-center md-mb-2 md-mt-1 md-mt-0-md md-typography-headline5"
            >
              {{ getCountryNameByCode(testimonial['country']) }}
            </h3>
            <h2
              class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline4 md-typography-font-light"
            >
              {{ testimonial.node_title }}
            </h2>
          </div>
        </div>
        <div class="md-row">
          <div class="md-mb-4 md-col md-col--12 md-typography-center">
            <div class="md-typography-justify md-typography-subtitle1">
              <i class="material-icons cp-testimonial-slider__icon"
                >format_quote</i
              >
              <span v-html="testimonial.body"></span>
            </div>
          </div>
          <div class="md-col md-border-top md-border-bottom md-col--12">
            <div class="md-py-3 md-d-flex">
              <div class="md-flex-grow-1"></div>
              <div>- {{ testimonial['client name'] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rx-section">
      <div class="md-container md-container--box">
        <h3 class="md-typography-center md-typography-headline5">
          Other testimonials
        </h3>
        <Testimonial />
        <div class="md-mt-3 md-d-flex md-justify-content-center">
          <router-link to="/testimonials" class="md-button md-button--outlined">
            See all testimonials
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Testimonial from '@/components/pages/home/Testimonial'
import TestimonialHeroSlider from '@/components/pages/home/TestimonialHeroSlider'

export default {
  components: { TestimonialHeroSlider, Testimonial },
  props: {
    disableHeading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    assetsUrl: process.env.assetsUrl,
    isFetching: true
  }),
  computed: {
    ...mapGetters({
      allTestimonials: 'testimonials/getData',
      countryList: 'core/getCountryList'
    }),
    testimonial() {
      return this.allTestimonials.find(item => {
        return this.$route.params.id === item.nid
      })
    }
  },
  async fetch({ store, error, params }) {
    if (process.client) {
      const item_ = store.state.testimonials.data.find(function(item) {
        return params.id === parseInt(item.nid)
      })
      if (item_) {
        return
      }
    }
    try {
      await store.dispatch('testimonials/show', { id: params.id })
    } catch (e) {
      return error({ statusCode: 404, message: 'Not found' })
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById('cp-navbar').classList.add('header-light')
    })
    if (!(this.testimonialList && this.testimonialList.length)) {
      this.fetchTestimonials()
    } else {
      this.isFetching = false
    }
  },
  beforeDestroy() {
    document.getElementById('cp-navbar').classList.remove('header-light')
  },
  methods: {
    async fetchTestimonials() {
      this.isFetching = true
      try {
        await this.$store.dispatch('testimonials/fetchTestimonials')
        this.$store.commit('core/setData', {
          name: 'topAppBarTitle',
          data: this.testimonial.node_title
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.isFetching = false
    },
    getCountryNameByCode(code) {
      const country = this.countryList.find(item => {
        return item.number === parseInt(code)
      })
      return country.name
    }
  }
}
</script>
