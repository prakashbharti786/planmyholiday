<template>
  <div class="">
    <HeroSlider style="margin-top: -64px" />
    <section class="rx-section md-my-1">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div
            class="md-col md-mb-3 md-col--8-md md-col--offset-2-md md-typography-text-center"
          >
            <div class="md-mt-1 pm-work-font md-text-accent nt-tag-line">
              Many reasons to choose us
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-display-2 md-typography-font-light"
            >
              Why us
            </h2>
          </div>
        </div>
      </div>
      <div class="md-container md-container--box">
        <WhyUs />
      </div>
      <div class="md-d-flex md-mt-3 md-justify-content-center">
        <router-link to="/about" class="md-button md-button--outlined">
          Know more
        </router-link>
      </div>
    </section>
    <div class="md-bg-white rx-section md-my-1">
      <div class="md-container md-container--box">
        <div class="md-row">
          <div
            class="md-col md-mb-3 md-col--8-md md-col--offset-2-md md-typography-text-center"
          >
            <div class="md-mt-1 pm-work-font md-text-accent nt-tag-line">
              Thoughts &amp; Ideas
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-display-2 md-typography-font-light"
            >
              Our Blog
            </h2>
            <p class="pm-work-font md-typography-subhead">
              Find inspiration for your next trip and get advice from travelers
              who have been there before.
            </p>
          </div>
        </div>
        <BlogSlider :blog-list="blogList" />
        <div class="md-d-flex md-justify-content-center">
          <router-link to="/blogs" class="md-button md-button--outlined">
            Check our blog
          </router-link>
        </div>
      </div>
    </div>
    <div class="rx-section md-my-1">
      <div class="md-container md-container--box">
        <div class="md-row">
          <div
            class="md-col md-mb-3 md-col--8-md md-col--offset-2-md md-typography-text-center"
          >
            <div class="md-mt-1 pm-work-font md-text-accent nt-tag-line">
              Exclusive Member
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-display-2 md-typography-font-light"
            >
              Preferred Partners
            </h2>
            <p class="pm-work-font md-typography-subhead">
              We are proud to be part of the most prestigious global forums for
              premium travel service providers around the world. This ensures
              that our guests always get the best in class services and extra
              privileges when they book these brands through us.
            </p>
          </div>
        </div>
        <PartnerSlider />
        <div class="md-d-flex md-justify-content-center">
          <router-link to="/testimonials" class="md-button md-button--outlined">
            Check our exclusive offer
          </router-link>
        </div>
      </div>
    </div>
    <section class="md-bg-white rx-section md-my-1">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div
            class="md-col md-col--8-md md-col--offset-2-md md-typography-text-center"
          >
            <div class="md-mt-1 pm-work-font md-text-accent nt-tag-line">
              Many reasons to choose us
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-display-2 md-typography-font-light"
            >
              What others say
            </h2>
          </div>
        </div>
      </div>
      <div class="md-container md-container--box">
        <Testimonial />
        <div class="md-mt-3 md-d-flex md-justify-content-center">
          <router-link to="/testimonials" class="md-button md-button--outlined">
            See all testimonials
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PartnerSlider from '../components/pages/home/PartnerSlider'
import HeroSlider from '../components/pages/home/HeroSlider'
import WhyUs from '@/components/pages/home/WhyUs'
import BlogSlider from '@/components/pages/home/BlogsSlider'
import Testimonial from '@/components/pages/home/Testimonial'

export default {
  components: {
    HeroSlider,
    PartnerSlider,
    Testimonial,
    WhyUs,
    BlogSlider
  },
  computed: {
    ...mapGetters({
      blogList: 'blogs/getData'
    })
  },
  async fetch({ store, error }) {
    if (process.client) {
      const item_ = store.state.blogs.data
      if (item_.length) {
        return
      }
    }
    try {
      await store.dispatch('blogs/index')
    } catch (e) {
      return error({ statusCode: 404, message: 'Not found' })
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById('cp-navbar').classList.add('header-light')
    })
    this.$store.commit('core/setData', { name: 'topAppBarTitle', data: '' })
  },
  beforeDestroy() {
    document.getElementById('cp-navbar').classList.remove('header-light')
  }
}
</script>
