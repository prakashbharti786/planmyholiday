<template>
  <div
    v-swiper:mySwiper="swiperOptionBlog"
    class="swiper-container"
    style="margin-left: -16px;margin-right: -16px"
  >
    <div class="swiper-wrapper md-px-2">
      <template v-for="(item, index) in blogList">
        <BlogCard
          :key="'blog-slide-' + index"
          :blog="item"
          class="swiper-slide swiper-slide--rex"
        />
      </template>
    </div>
    <div
      style="bottom: -2px"
      class="swiper-pagination md-d-none-sm"
      slot="pagination"
    ></div>
  </div>
</template>

<style>
.pmh-blog__posts.swiper-slide {
  margin-top: 16px;
  margin-bottom: 32px;
}
</style>

<script>
import BlogCard from '../../common/BlogCard'

export default {
  components: { BlogCard },
  props: {
    disableHeading: {
      type: Boolean,
      default: false
    },
    blogList: {
      type: Array,
      required: true
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
    }
  })
}
</script>
