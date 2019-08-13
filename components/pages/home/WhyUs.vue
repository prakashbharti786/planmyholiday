<template>
  <div class="cp-width-100 md-bg-white">
    <div v-if="enableList && !isFetching">
      <div v-swiper:mySwiper="swiperOption" class="swiper-container">
        <div class="swiper-wrapper">
          <template v-for="(item, index) in itemList">
            <WhyUsCard
              :key="'slides-' + index"
              :why-us="item"
              :enable-card="true"
              class="swiper-slide swiper-slide--rex md-border why-us-slider-card"
            />
          </template>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>
    <div v-if="isFetching || !enableList" class="md-shimmer">
      <div class="md-d-none md-d-flex-sm md-row md-align-items-center-md">
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
      <div class="md-card md-d-none-sm" style="max-width: 480px;">
        <div class="md-d-flex md-flex-row">
          <div class="md-card__primary-action md-flex-grow-1">
            <section class="md-card__primary">
              <div
                class="md-card__title-text font-satisfy md-card__title-text--large"
              >
                <div class="md-shimmer__item md-shimmer__item--paragraph"></div>
              </div>
            </section>
            <section class="md-card__supporting-text">
              <div
                class="md-d-flex md-flex-grow-1 hide-img"
                style="height: 72px; overflow-y: hidden;"
              >
                <div class="md-shimmer__item md-shimmer__item--paragraph"></div>
                <div class="md-shimmer__item md-shimmer__item--paragraph"></div>
              </div>
            </section>
          </div>
          <div
            class="md-my-2 md-mr-2 md-card__media md-shimmer__item md-flex-shrink-0 md-card__media--square"
            style="height: 120px; width: 120px;"
          ></div>
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
      itemList: 'core/getWhyUs'
    }),
    enableList() {
      return this.itemList.length
    }
  },
  mounted() {
    if (!(this.itemList && this.itemList.length)) {
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
