<template>
  <div class="">
    <HeroSlider class="cp-animate cp-animate--fade" style="margin-top: -64px" />
    <section class="rx-section md-my-1">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div
            class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
          >
            <div
              class="md-mt-1 cp-animate cp-animate--fade pm-work-font md-text-accent nt-tag-line"
            >
              Many reasons to choose us
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Why us
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <WhyUs />
      </div>
      <div class="md-d-flex md-mt-3 md-justify-content-center">
        <router-link to="/about" class="md-button md-button--outlined">
          Know more
        </router-link>
      </div>
    </section>
    <section class="rx-section md-my-1">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div
            class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
          >
            <div
              class="md-mt-1 cp-animate cp-animate--fade pm-work-font md-text-accent nt-tag-line"
            >
              Discover travel that stirs your soul
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Discover your experience
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div class="md-container md-container--box md-container--gutter">
        <ExperienceBlock />
      </div>
      <div class="md-d-flex md-mt-3 md-justify-content-center">
        <router-link to="/explore" class="md-button md-button--outlined">
          Explore our experiences
        </router-link>
      </div>
    </section>
    <div class="md-bg-white rx-section md-my-1">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div
            class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
          >
            <div
              class="cp-animate cp-animate--fade md-mt-1 pm-work-font md-text-accent nt-tag-line"
            >
              Thoughts &amp; Ideas
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Our Blog
              </span>
            </h2>
            <p class="pm-work-font md-typography-subtitle1 md-oh">
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Find inspiration for your next trip and get advice from
                travelers who have been there before.
              </span>
            </p>
          </div>
        </div>
        <BlogSlider />
        <div class="md-d-flex md-justify-content-center">
          <router-link to="/blogs" class="md-button md-button--outlined">
            Check our blog
          </router-link>
        </div>
      </div>
    </div>
    <div class="rx-section md-my-1">
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <div class="md-row">
          <div
            class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
          >
            <div
              class="md-mt-1 cp-animate cp-animate--fade pm-work-font md-text-accent nt-tag-line"
            >
              Exclusive Member
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                Preferred Partners
              </span>
            </h2>
            <p class="pm-work-font md-typography-subtitle1 md-oh">
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                We are proud to be part of the most prestigious global forums
                for premium travel service providers around the world.
                <span class="md-d-none md-d-inline-sm">
                  This ensures that our guests always get the best in class
                  services and extra privileges when they book these brands
                  through us.
                </span>
              </span>
            </p>
          </div>
        </div>
        <PartnerSlider class="cp-animate cp-animate--fade" />
        <div
          class="md-d-flex md-justify-content-center cp-animate cp-animate--fade"
        >
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
            class="md-col md-col--8-md md-col--offset-2-md md-typography-center"
          >
            <div
              class="md-mt-1 pm-work-font md-text-accent nt-tag-line cp-animate cp-animate--fade"
            >
              Many reasons to choose us
            </div>
            <h2
              class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                What others say
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div
        class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
      >
        <Testimonial class="cp-animate cp-animate--fade" />
        <div
          class="md-mt-3 cp-animate cp-animate--fade md-d-flex md-justify-content-center"
        >
          <router-link to="/testimonials" class="md-button md-button--outlined">
            See all testimonials
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PartnerSlider from '../components/pages/home/PartnerSlider'
import HeroSlider from '../components/pages/home/HeroSlider'
import WhyUs from '@/components/pages/home/WhyUs'
import BlogSlider from '@/components/pages/home/BlogsSlider'
import Testimonial from '@/components/pages/home/Testimonial'
import ExperienceBlock from '@/components/pages/home/ExperienceBlock'

export default {
  components: {
    ExperienceBlock,
    HeroSlider,
    PartnerSlider,
    Testimonial,
    WhyUs,
    BlogSlider
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
