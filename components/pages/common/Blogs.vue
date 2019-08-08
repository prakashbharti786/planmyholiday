<template>
  <div class="pmh-blog">
    <BlogCard
      v-for="item in blogs"
      :key="item.nid"
      :blog="item"
      class="md-col md-col--4"
    />
  </div>
</template>

<script>
import BlogCard from '../../common/BlogCard'
export default {
  components: { BlogCard },
  props: {
    blogs: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
