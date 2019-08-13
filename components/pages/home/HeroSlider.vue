<template>
  <section class="rx-section md-py-0">
    <div
      v-if="enableList"
      v-swiper:mySwiper="swiperOptionBlog"
      class="swiper-container cp-hero-slider"
    >
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in itemList"
          :key="'partner' + index"
          class="swiper-slide swiper-slide--rex"
        >
          <img
            :alt="item.alt"
            :data-src="item.image"
            class="swiper-lazy cp-hero-slider__img"
          />
          <div
            :style="{
              backgroundImage: 'url(' + item.image + ')'
            }"
            class="swiper-lazy cp-hero-slider__bg"
          ></div>
          <div
            class="swiper-lazy cp-hero-slider__content md-d-flex md-align-items-center md-justify-content-center"
          >
            <div class="md-d-flex md-flex-column md-typography-center">
              <h2
                class="md-text-light md-typography-headline3-md md-typography-headline5 md-oh"
              >
                <span
                  class="cp-animate cp-animate--slide md-d-inline-block"
                  v-html="item.title"
                ></span>
              </h2>
              <p
                class="md-text-light md-typography-headline5-md md-typography-body1 md-oh"
              >
                <span
                  class="cp-animate cp-animate--slide md-d-inline-block"
                  v-html="item.caption"
                ></span>
              </p>
            </div>
          </div>
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </div>
      </div>
      <div slot="pagination" class="swiper-pagination md-d-none-sm"></div>
      <div
        slot="button-next"
        class="md-d-none swiper-button-next swiper-button-white"
      ></div>
      <div
        slot="button-prev"
        class="md-d-none swiper-button-prev swiper-button-white"
      ></div>
    </div>
    <div v-if="isFetching || !enableList" class="md-shimmer md-layout-rel">
      <div class="cp-hero-slider-shimmer md-bg-white"></div>
      <div
        class="cp-hero-slider__content md-d-flex md-align-items-center md-justify-content-center"
      >
        <div
          class="md-flex-grow-1 md-d-flex md-flex-column md-typography-center"
        >
          <div
            style="transition-delay: 250ms; height: 48px"
            class="md-shimmer__item md-layout-center-block md-mb-2 md-shimmer__item--headline"
          ></div>
          <div
            style="transition-delay: 500ms; height: 24px;"
            class="md-shimmer__item md-layout-center-block md-shimmer__item--paragraph"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    disableHeading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    assetsUrl: process.env.assetsUrl,
    swiperOptionBlog: {
      lazy: true,
      slidesPerView: 1,
      spaceBetween: 0,
      effect: 'fade',
      autoplay: true,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      isFetching: true
    },
    partnerList: [
      {
        alt: 'VITA',
        image: 'img/VITA_plaque2.png',
        link: 'https://www.lhw.com'
      },
      {
        alt: 'VITA',
        image: 'img/private-luxury-circle.png',
        link: 'http://www.privateluxuryforums.com'
      },
      {
        alt: 'VITA',
        image: 'img/luxperience.png',
        link: 'http://www.luxperience.com.au'
      }
    ],
    isFetching: true
  }),
  computed: {
    ...mapGetters({
      itemList: 'core/getHomeSlider'
    }),
    enableList() {
      return this.itemList.length
    }
  },
  mounted() {
    if (!(this.itemList && this.itemList.length)) {
      this.fetchHomeSlider()
    } else {
      this.isFetching = false
    }
  },
  beforeDestroy() {
    this.$store.commit('core/setObjData', {
      name: 'scroll',
      key: 'startScroll',
      data: 64
    })
    this.$store.commit('core/setObjData', {
      name: 'scroll',
      key: 'endScroll',
      data: 64
    })
  },
  methods: {
    async fetchHomeSlider() {
      this.isFetching = true
      try {
        await this.$store.dispatch('core/fetchHomeSlider')
        this.$store.commit('core/setObjData', {
          name: 'scroll',
          key: 'startScroll',
          data: 420
        })
        this.$store.commit('core/setObjData', {
          name: 'scroll',
          key: 'endScroll',
          data: 420
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.isFetching = false
    }
  }
}
</script>
