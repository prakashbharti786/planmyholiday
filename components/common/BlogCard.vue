<template>
  <div class="pmh-blog__posts">
    <div class="md-card md-border md-card--no-shadow">
      <div class="md-card__primary-action">
        <div
          :style="{ backgroundImage: 'url(' + blog.image + ')' }"
          class="md-card__media md-card__media--square"
        >
          <div class="md-layout-abs" style="bottom: 0;left: 0;right: 0;">
            <section class="md-text-light md-card__primary">
              <div class="md-typography-font-light md-typography-headline">
                {{ blog.node_title }}
              </div>
            </section>
          </div>
        </div>
        <div
          :style="{ backgroundImage: 'url(' + blog.image + ')' }"
          class="img-box"
        ></div>
      </div>
      <div class="md-card__header md-align-items-center">
        <div class="md-avatar">P</div>
        <div class="md-ml-1 md-card__subtitle-text">
          {{ blog.author }}, <span v-html="blog['publish date']"></span> ago
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  }
}
</script>
