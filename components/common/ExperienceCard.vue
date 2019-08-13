<template>
  <div class="pmh-blog__posts">
    <div class="md-card md-border md-card--no-shadow">
      <div class="md-card__primary-action">
        <div
          :style="{ backgroundImage: 'url(' + adminUrl + item.image + ')' }"
          class="md-card__media md-card__media--16-9"
        ></div>
        <div
          :style="{ backgroundImage: 'url(' + adminUrl + item.image + ')' }"
          class="img-box"
        ></div>
        <router-link to="/" class="cp-click-area"></router-link>
      </div>
      <section class="md-card__primary md-py-1 md-py-2-sm">
        <h3
          class="font-satisfy md-typography-center md-card__title-text md-typography-subtitle1-sm md-typography-subtitle2 md-mb-0"
        >
          {{ item.name }}
        </h3>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperienceCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    adminUrl: process.env.adminUrl
  })
}
</script>
