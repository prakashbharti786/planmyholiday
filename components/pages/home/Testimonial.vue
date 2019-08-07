<template>
  <div class="">
    <div v-if="enableList && !isFetching">
      <div
        v-swiper:mySwiper="swiperOption"
        class="swiper-container fadeIn md-my-2"
      >
        <div class="swiper-wrapper">
          <template v-for="(item, index) in testimonialList">
            <TestimonialCard
              :key="'testimonial-' + index"
              :testimonial="item"
              class="swiper-slide swiper-slide--rex md-border why-us-slider-card"
            />
          </template>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>
    <div v-if="isFetching || !enableList" class="md-shimmer">
      <div class="md-row md-align-items-center-md">
        <div class="md-mb-2 md-col md-col--12 md-col--6-md">
          <div class="cp-testimonial-slider-shimmer md-shimmer__item"></div>
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

<style>
.md-card--testimonial {
  max-width: 100%;
  width: 520px;
  overflow: visible;
  margin-top: 44px;
  border: 1px solid var(--color-app-divider);
}
.et-card--price {
  border: 1px solid var(--color-app-divider);
}
.et-icon-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.md-card--testimonial .et-process__icon {
  background-color: #fafafa;
}
</style>

<script>
import { mapGetters } from 'vuex'
import TestimonialCard from '../../common/TestimonialCard'

export default {
  components: { TestimonialCard },
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
      spaceBetween: 24,
      autoplay: false,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        // when window width is <= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          autoplay: true
        },
        // when window width is <= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
          autoplay: true
        },
        // when window width is <= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 30
        }
      }
    },
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
