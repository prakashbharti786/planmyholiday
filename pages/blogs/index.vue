<template>
  <div class="rx-section md-my-1">
    <div
      class="md-container md-container--box md-container--gutter md-container--gutter-24-md"
    >
      <div class="md-row">
        <div
          class="md-col md-mb-2 md-mb-3-sm md-col--8-md md-col--offset-2-md md-typography-center"
        >
          <div
            class="md-mt-1 pm-work-font md-text-accent nt-tag-line cp-animate cp-animate--fade"
          >
            Thoughts &amp; Ideas
          </div>
          <h2
            class="md-mb-2 pm-work-font cp-animate cp-animate--fade md-typography-headline3-md md-typography-headline4 md-typography-font-light md-oh"
          >
            <span class="cp-animate cp-animate--slide md-d-inline-block">
              Our Blog
            </span>
          </h2>
          <p class="pm-work-font md-typography-subtitle1 md-oh md-d-block">
            <span class="cp-animate cp-animate--slide md-d-inline-block">
              Find inspiration for your next trip and get advice from travelers
              who have been there before.
            </span>
          </p>
        </div>
      </div>
      <Blogs
        v-if="enableList && !isFetching"
        :blogs="itemList"
        blog-class="md-col--12 md-col md-col--6-sm md-col--4-md md-my-1 md-my-0-sm"
        class="md-row cp-animate cp-animate--fade"
      />
      <div
        v-if="isFetching || !enableList"
        class="md-row cp-animate cp-animate--fade"
      >
        <BlogCardShimmer
          v-for="i in 3"
          :key="'blog-shimmer' + i"
          class="md-col--12 md-col md-col--6-sm md-col--4-md md-my-1 md-my-0-sm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Blogs from '@/components/pages/common/Blogs'
import BlogCardShimmer from '@/components/common/BlogCardShimmer'

export default {
  components: { BlogCardShimmer, Blogs },
  data: () => ({
    assetsUrl: process.env.assetsUrl,
    isFetching: true
  }),
  computed: {
    ...mapGetters({
      itemList: 'blogs/getBlogs'
    }),
    enableList() {
      return this.itemList.length
    }
  },
  mounted() {
    if (!(this.itemList && this.itemList.length)) {
      this.fetchBlogs()
    } else {
      this.isFetching = false
    }
  },
  methods: {
    async fetchBlogs() {
      this.isFetching = true
      try {
        await this.$store.dispatch('blogs/fetchBlogs')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.isFetching = false
    }
  }
}
</script>
