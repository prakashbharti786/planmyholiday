<template>
  <div>
    <div class="md-card md-d-none-sm" style="max-width: 480px">
      <div class="md-d-flex md-flex-row">
        <div class="md-card__primary-action">
          <section class="md-card__primary">
            <div
              class="md-card__title-text font-satisfy md-card__title-text--large"
            >
              {{ getCountryNameByCode(testimonial['country']) }}
            </div>
          </section>
          <section
            style="height: 72px;overflow-y: hidden"
            class="md-card__supporting-text"
            v-html="testimonial.description"
          ></section>
        </div>
        <div
          style="height:120px;width:120px;background-image: url(https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg)"
          class="md-mt-2 md-mr-2 md-card__media md-flex-shrink-0 md-card__media--square"
        ></div>
      </div>
      <section class="md-card__supporting-text">
        {{ testimonial['client name'] }}
        {{
          testimonial['user location']
            ? ', ' + testimonial['user location']
            : ''
        }}
      </section>
    </div>
    <div
      class="md-row md-align-items-center-md cp-bg-grey md-d-none md-d-flex-sm"
      :class="{ 'md-flex-row-reverse-md': index % 2 === 0 }"
    >
      <div class="why-us-slider-image-wrapper md-col md-col--12 md-col--6-md">
        <div
          v-swiper:mySwiper="swiperOptionFadeImages"
          class="swiper-container"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(item, index_) in testimonial.images"
              :key="'inner-image' + index_"
              class="swiper-slide swiper-slide--rex"
            >
              <img
                :alt="item.caption"
                :data-src="item.url.replace(/^http:\/\//i, 'https://')"
                class="swiper-lazy cp-testimonial-slider__img"
              />
              <div
                class="cp-testimonial-slider__bg swiper-lazy"
                :style="{
                  backgroundImage:
                    'url(' + item.url.replace(/^http:\/\//i, 'https://') + ')'
                }"
              ></div>
              <div
                class="swiper-lazy-preloader swiper-lazy-preloader-white"
              ></div>
              <router-link
                :to="
                  'testimonials' +
                    '/' +
                    testimonial.nid +
                    testimonial.alias.substring(11)
                "
                class="cp-click-area"
                style="z-index: 2"
              ></router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="md-col md-col--12 md-col--6-md">
        <div class="md-flex-column md-justify-content-center">
          <h3
            class="appearContainer md-typography-justify md-mb-2 md-mt-1 md-mt-0-md md-typography-headline5"
          >
            {{ testimonial.title }}
          </h3>
          <h3
            class="appearContainer font-satisfy md-typography-center md-mb-2 md-mt-1 md-mt-0-md md-typography-headline5"
          >
            {{ getCountryNameByCode(testimonial['country']) }}
          </h3>
          <div class="appearContainer md-typography-justify">
            <i class="material-icons cp-testimonial-slider__icon"
              >format_quote</i
            >
            <span v-html="testimonial.description"></span>
            <router-link
              :to="
                'testimonials' +
                  '/' +
                  testimonial.nid +
                  testimonial.alias.substring(11)
              "
              class="md-button md-button--primary md-button--dense"
              >read more</router-link
            >
            <div class="md-d-flex md-my-1">
              <div class="md-list-content">
                <div class="md-list-content__title">
                  {{ testimonial['client name'] }}
                </div>
                <div
                  class="md-list-content__subtitle md-list-content__subtitle--contrast"
                >
                  {{ testimonial['user location'] }},
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.cp-testimonial-slider__icon {
  transform: scale(1.5) rotate(180deg);
}
.cp-testimonial-slider__img {
  height: 380px;
  opacity: 0;
}
.cp-testimonial-slider-shimmer {
  height: 380px;
}
.cp-testimonial-slider__content,
.cp-testimonial-slider__bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
}
.cp-testimonial-slider__bg {
  background-size: cover;
  z-index: 2;
}
.cp-testimonial-slider__bg::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    index: {
      type: Number,
      default: 1
    },
    testimonial: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    assetsUrl: process.env.assetsUrl,
    swiperOptionFadeImages: {
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
    }
  }),
  computed: {
    ...mapGetters({
      countryList: 'core/getCountryList'
    })
  },
  methods: {
    getCountryNameByCode(code) {
      const country = this.countryList.find(item => {
        return item.number === parseInt(code)
      })
      return country.name
    }
  }
}
</script>
