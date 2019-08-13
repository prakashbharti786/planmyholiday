<template>
  <div>
    <div
      v-if="enableCard"
      class="md-card md-d-none-sm"
      style="max-width: 480px"
    >
      <div class="md-d-flex md-flex-row">
        <div class="md-card__primary-action">
          <section class="md-card__primary">
            <div
              class="md-card__title-text font-satisfy md-card__title-text--large"
            >
              {{ whyUs.title }}
            </div>
          </section>
          <section class="md-card__supporting-text">
            <span
              class="md-d-inline-flex hide-img"
              style="height: 72px;overflow-y: hidden"
              v-html="whyUs.body"
            ></span>
            <span>...</span>
          </section>
        </div>
        <div
          :style="{
            backgroundImage:
              'url(' + whyUs.image.replace(/^http:\/\//i, 'https://') + ')'
          }"
          style="height:120px;width:120px;"
          class="md-my-2 md-mr-2 md-card__media md-flex-shrink-0 md-card__media--square"
        ></div>
        <router-link
          to="/about"
          class="cp-click-area"
          style="z-index: 2"
        ></router-link>
      </div>
    </div>
    <div
      class="md-row md-align-items-center-md"
      :class="{
        'md-flex-row-reverse-md': index % 2 === 0,
        'md-d-none md-d-flex-sm': enableCard,
        'md-d-flex': !enableCard
      }"
    >
      <div
        class="why-us-slider-image-wrapper cp-card__media--16-9 md-col md-col--12 md-col--6-md"
      >
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
            class="appearContainer  md-typography-justify md-mb-2 md-mt-1 md-mt-0-md md-typography-headline5"
          >
            {{ whyUs.title }}
          </h3>
          <div
            v-html="whyUs.body"
            class="appearContainer md-typography-justify"
          ></div>
        </div>
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
    },
    enableCard: {
      type: Boolean,
      default: false
    }
  }
}
</script>
