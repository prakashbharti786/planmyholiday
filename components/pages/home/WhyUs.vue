<template>
  <div class="cp-width-100 md-bg-white">
    <div v-if="enableWhyUs && !isFetching">
      <div v-swiper:mySwiper="swiperOption" class="swiper-container">
        <div class="swiper-wrapper">
          <template v-for="(item, index) in whyUsItems">
            <WhyUsCard
              :key="'slides-' + index"
              :why-us="item"
              class="swiper-slide swiper-slide--rex md-border why-us-slider-card"
            />
          </template>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>
    <div v-if="isFetching || !enableWhyUs" class="md-shimmer">
      <div class="md-row md-align-items-center-md">
        <div class="md-mb-2 md-col md-col--12 md-col--6-md">
          <div
            class="cp-img-background md-shimmer__item"
            :style="{ minHeight: '380px' }"
          ></div>
        </div>
        <div class="md-col md-col--12 md-col--6-md">
          <div class="md-flex-column md-justify-content-center">
            <div class="appearContainer">
              <div
                style="margin-left: 0"
                class="appearContainer md-mb-2 md-mt-1 md-mt-0-md md md-shimmer__item md-mb-2 md-shimmer__item--headline"
              ></div>
            </div>
            <div class="appearContainer">
              <div class="md-shimmer__item md-shimmer__item--paragraph"></div>
              <div class="md-shimmer__item md-shimmer__item--paragraph"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WhyUsCard from '@/components/common/WhyUsCard'

export default {
  components: { WhyUsCard },
  props: {
    disableHeading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    assetsUrl: process.env.assetsUrl,
    swiperOption: {
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: false,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    },
    isFetching: true
  }),
  computed: {
    ...mapGetters({
      whyUsItems: 'core/getWhyUs'
    }),
    enableWhyUs() {
      return this.whyUsItems.length
    }
  },
  mounted() {
    if (!(this.whyUsItems && this.whyUsItems.length)) {
      this.fetchWhyUs()
    } else {
      this.isFetching = false
    }
  },
  methods: {
    async fetchWhyUs() {
      this.isFetching = true
      try {
        await this.$store.dispatch('core/fetchWhyUs')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.isFetching = false
    }
  }
}
</script>
