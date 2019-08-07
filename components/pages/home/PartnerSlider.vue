<template>
  <section class="rx-section md-my-1">
    <div class="md-container md-container--box">
      <div
        v-swiper:mySwiper="swiperOptionBlog"
        class="swiper-container"
        style="margin-left: -16px;margin-right: -16px"
      >
        <div class="swiper-wrapper md-px-2">
          <div
            v-for="(item, index) in partnerList"
            :key="'partner' + index"
            class="swiper-slide swiper-slide--rex"
          >
            <a :href="item.link" target="_blank" rel="noopener">
              <img
                :alt="item.alt"
                :src="assetsUrl + item.image"
                class="md-layout-center-block md-img-fluid"
              />
            </a>
          </div>
        </div>
        <div
          style="bottom: -2px"
          class="swiper-pagination md-d-none-sm"
          slot="pagination"
        ></div>
      </div>
    </div>
  </section>
</template>

<style>
.pmh-blog__posts.swiper-slide {
  margin-top: 16px;
  margin-bottom: 32px;
}
</style>

<script>
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
      slidesPerView: 3,
      spaceBetween: 24,
      autoplay: true,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        // when window width is <= 480px
        768: {
          slidesPerView: 1,
          spaceBetween: 16,
          autoplay: true
        },
        // when window width is <= 640px
        959: {
          slidesPerView: 2,
          spaceBetween: 24
        }
      }
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
    ]
  })
}
</script>
