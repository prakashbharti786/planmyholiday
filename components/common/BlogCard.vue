<template>
  <div class="pmh-blog__posts">
    <div class="md-card md-border md-card--no-shadow">
      <div class="md-card__primary-action">
        <div
          :style="{ backgroundImage: 'url(' + blog.image + ')' }"
          class="md-card__media md-card__media--16-9"
        >
          <div class="md-layout-abs" style="bottom: 0;left: 0;right: 0;">
            <section class="md-text-light md-card__primary">
              <div class="md-typography-font-light md-typography-headline5">
                {{ blog.node_title }}
              </div>
            </section>
          </div>
        </div>
        <div
          :style="{ backgroundImage: 'url(' + blog.image + ')' }"
          class="img-box"
        ></div>
        <router-link
          :to="'/blogs' + '/' + blog.nid + '/' + blog.alias.substring(5)"
          class="cp-click-area"
        ></router-link>
      </div>
      <section
        class="md-card__primary md-typography-left-sm md-typography-center"
      >
        <h3
          class="font-satisfy md-typography-center md-card__title-text md-mb-0"
        >
          {{ country[parseInt(blog.nid)] }}
        </h3>
        <div
          style="width: 300px"
          class="md-card__title-text text-overflow md-card__title-text--large"
        >
          {{ blog.node_title }}
        </div>
      </section>
      <section class="md-card__supporting-text md-d-none md-d-flex-sm">
        <span class="">
          {{ summery[parseInt(blog.nid)] }}
        </span>
      </section>
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
  },
  data: () => ({
    country: {
      262: 'Namale, Fiji',
      14: 'LHW, India',
      13: 'Bali, Indonesia'
    },
    summery: {
      262: 'It would be a cliché to call Fiji the perfect island paradise...',
      14: 'Plan My Holiday has recently received a prestigious recognition by The Leading...',
      13: 'Bulgari Resort Bali is located in one of the most exclusive destinations in the world'
    },
    actionText: ''
  })
}
</script>
