<template>
  <div class="rx-section md-my-1">
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
      <Blogs :blogs="blogs" class="md-row" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Blogs from '@/components/pages/common/Blogs'

export default {
  components: { Blogs },
  computed: {
    ...mapGetters({
      blogs: 'blogs/getData'
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
  }
}
</script>
