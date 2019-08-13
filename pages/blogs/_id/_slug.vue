<template>
  <div class="">
    <BlogHeroSlider
      class="cp-animate cp-animate--fade"
      :blog="blog"
      :is-fetching="false"
      style="margin-top: -64px"
    />
    <div class="rx-section">
      <div class="md-container md-container--box">
        <div class="md-row">
          <div
            class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
          >
            <h3
              class="appearContainer cp-animate cp-animate--fade font-satisfy md-typography-center md-mb-2 md-mt-1 md-mt-0-md md-typography-headline5"
            >
              {{ blog.places }}, {{ getCountryNameByCode(blog['country']) }}
            </h3>
            <h2
              class="md-mb-2 pm-work-font md-typography-headline3-md md-typography-headline5 md-typography-font-light md-oh"
            >
              <span class="cp-animate cp-animate--slide md-d-inline-block">
                {{ blog.title }}
              </span>
            </h2>
          </div>
        </div>
        <div class="md-row cp-animate cp-animate--fade">
          <div class="md-col md-mb-4 md-col--12 md-typography-center">
            <div class="md-typography-justify md-typography-subtitle1 pm-blog">
              <div v-html="blog.description"></div>
            </div>
            <div class="md-d-flex">
              <div
                v-for="(theme, _index) in blog.theme.split(',')"
                :key="'theme' + _index"
                class="md-chip md-chip--light"
              >
                <img
                  style="filter: invert(1)"
                  :src="assetsUrl + getImage(theme)"
                  class="md-chip__icon md-chip__icon--leading md-img-fluid"
                />
                <div class="md-chip__text font-satisfy">{{ theme }}</div>
              </div>
              <div class="md-ml-1"></div>
              <div class="md-flex-grow-1"></div>
            </div>
          </div>
          <div class="md-col md-border-top md-border-bottom md-col--12">
            <div class="md-py-3 md-d-flex">
              <div class="md-d-flex md-align-items-center">
                <i class="material-icons">person</i>
                <span class="cp-ml-1 md-list-content__title">
                  {{ blog.author }}
                </span>
              </div>
              <div class="md-flex-grow-1"></div>
              <div
                class="md-d-flex md-align-items-center md-list-content__title"
              >
                <i class="material-icons">date_range</i>
                <span class="cp-ml-1">{{ blog['publish date'] }} ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rx-section">
      <div class="md-container md-container--box">
        <h3 class="md-typography-center md-typography-headline5">
          Other blogs
        </h3>
        <BlogSlider />
        <div class="md-mt-3 md-d-flex md-justify-content-center">
          <router-link to="/testimonials" class="md-button md-button--outlined">
            See all blogs
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BlogSlider from '@/components/pages/home/BlogsSlider'
import BlogHeroSlider from '@/components/pages/blogs/BlogHeroSlider'

export default {
  components: { BlogHeroSlider, BlogSlider },
  props: {
    disableHeading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    assetsUrl: process.env.assetsUrl,
    themeImgs: [
      {
        alt: 'Adventure',
        name: 'Adventure',
        imgSrc: 'img/explore/adventure.png'
      },
      {
        alt: 'Art',
        name: 'Art',
        imgSrc: 'img/explore/art.png'
      },
      {
        alt: 'Babymoon',
        name: 'Babymoon',
        imgSrc: 'img/explore/babymoon.png'
      },
      {
        alt: 'Cafes',
        name: 'Cafes',
        imgSrc: 'img/explore/cafes.png'
      },
      {
        alt: 'Cruise',
        name: 'Cruise',
        imgSrc: 'img/explore/cruise.png'
      },
      {
        alt: 'Culture',
        name: 'Culture',
        imgSrc: 'img/explore/culture.png'
      },
      {
        alt: 'Hotel',
        name: 'Hotel',
        imgSrc: 'img/explore/hotel.png'
      },
      {
        alt: 'Islands',
        name: 'Islands',
        imgSrc: 'img/explore/islands.png'
      },
      {
        alt: 'Nightlife',
        name: 'Nightlife',
        imgSrc: 'img/explore/nightlife.png'
      },
      {
        alt: 'Romantic',
        name: 'Romantic',
        imgSrc: 'img/explore/romantic.png'
      },
      {
        alt: 'Spa',
        name: 'Spa',
        imgSrc: 'img/explore/spa.png'
      },
      {
        alt: 'Wildlife',
        name: 'Wildlife',
        imgSrc: 'img/explore/wildlife.png'
      },
      {
        alt: 'special offer',
        name: 'special offer',
        imgSrc: 'img/explore/special offer.png'
      },
      {
        alt: 'exclusive',
        name: 'exclusive',
        imgSrc: 'img/explore/exclusive.png'
      },
      {
        alt: 'signature',
        name: 'signature',
        imgSrc: 'img/explore/signature.png'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      allBlogs: 'blogs/getData',
      countryList: 'core/getCountryList'
    }),
    blog() {
      return this.allBlogs.find(item => {
        return this.$route.params.id === item.nid
      })
    }
  },
  async fetch({ store, error, params }) {
    if (process.client) {
      const item_ = store.state.blogs.data.find(function(item) {
        return params.id === parseInt(item.nid)
      })
      if (item_) {
        return
      }
    }
    try {
      await store.dispatch('blogs/show', { id: params.id })
    } catch (e) {
      return error({ statusCode: 404, message: 'Not found' })
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById('cp-navbar').classList.add('header-light')
    })
    if (!(this.testimonialList && this.testimonialList.length)) {
      this.fetchTestimonials()
    } else {
      this.isFetching = false
    }
    this.$store.commit('core/setData', {
      name: 'topAppBarTitle',
      data: this.blog.title
    })
  },
  beforeDestroy() {
    document.getElementById('cp-navbar').classList.remove('header-light')
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
    },
    getCountryNameByCode(code) {
      const country = this.countryList.find(item => {
        return item.number === parseInt(code)
      })
      return country.name
    },
    getImage(theme) {
      const imgObj = this.themeImgs.find(function(item) {
        return item.name === theme.trim()
      })
      return imgObj ? imgObj.imgSrc : ''
    }
  }
}
</script>
