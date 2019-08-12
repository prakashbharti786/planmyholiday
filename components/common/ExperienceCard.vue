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
      <section class="md-card__primary">
        <h3
          class="font-satisfy md-typography-text-center md-card__title-text md-mb-0"
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
