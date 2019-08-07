<template>
  <div
    class="md-jumbotron md-jumbotron--light md-jumbotron--casting-border md-layout-rel"
  >
    <div class="md-container md-container--box md-container--gutter-24">
      <h4
        style="margin-top: 0;margin-bottom: 4px"
        class="md-jumbotron__title md-typo--font-light"
        v-html="title"
      />
      <p
        class="rex-color-contrast layout-m-b-3 layout-m-t-1 md-typo--font-light"
        v-html="subTitle"
      />
      <slot name="body" />
    </div>
  </div>
</template>
<style>
.md-jumbotron--rax {
  min-height: 80px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
<script>
export default {
  props: {
    isImg: {
      type: Boolean,
      default: false
    },
    imgSrc: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    }
  }
}
</script>
