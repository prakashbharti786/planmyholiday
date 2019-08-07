<template>
  <div
    class="md-row md-align-items-center-md"
    :class="{ 'md-flex-row-reverse-md': index % 2 === 0 }"
  >
    <div class="why-us-slider-image-wrapper md-col md-col--12 md-col--6-md">
      <div
        class="cp-content-image cp-img-background"
        :style="{
          backgroundImage:
            'url(' + whyUs.image.replace(/^http:\/\//i, 'https://') + ')'
        }"
      ></div>
    </div>
    <div class="md-col md-col--12 md-col--6-md">
      <div class="md-flex-column md-justify-content-center">
        <h3
          class="appearContainer md-typography-text-justify md-mb-2 md-mt-1 md-mt-0-md md-typography-headline"
        >
          {{ whyUs.title }}
        </h3>
        <div
          v-html="whyUs.body"
          class="appearContainer md-typography-text-justify"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 1
    },
    whyUs: {
      type: Object,
      required: true
    }
  }
}
</script>
