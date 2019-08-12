<template>
  <div class="md-mt-2-md">
    <div class="md-container md-px-0 md-px-3-md md-container--box">
      <TestimonialHeroSlider v-if="false" />
    </div>
    <div class="rx-section">
      <div class="md-container md-container--box">
        <div class="md-row">
          <div
            class="md-col md-mb-3 md-col--8-md md-col--offset-2-md md-typography-text-center"
          >
            <div class="md-mt-1 pm-work-font md-text-accent nt-tag-line">
              Thoughts &amp; Ideas
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline4 md-typography-font-light"
            >
              What others say
            </h2>
            <p class="pm-work-font md-typography-subtitle1">
              Find inspiration for your next trip and get advice from travelers
              who have been there before.
            </p>
          </div>
        </div>
      </div>
      <div v-if="enableList" class="md-container md-container--box">
        <template v-for="(item, index) in testimonialList">
          <TestimonialCard
            :key="'testimonial-' + index"
            :testimonial="item"
            class="swiper-slide swiper-slide--rex md-my-2 md-border why-us-slider-card"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TestimonialHeroSlider from '@/components/pages/home/TestimonialHeroSlider'
import TestimonialCard from '@/components/common/TestimonialCard'

export default {
  components: { TestimonialCard, TestimonialHeroSlider },
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
      testimonialList: 'testimonials/getTestimonials'
    }),
    enableList() {
      return this.testimonialList.length
    }
  },
  mounted() {
    if (!(this.testimonialList && this.testimonialList.length)) {
      this.fetchTestimonials()
    } else {
      this.isFetching = false
    }
  },
  methods: {
    async fetchTestimonials() {
      this.isFetching = true
      try {
        await this.$store.dispatch('testimonials/fetchTestimonials')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.isFetching = false
    }
  }
}
</script>
