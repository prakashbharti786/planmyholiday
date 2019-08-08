<template>
  <div>
    <AppHeader @drawerToggle="drawerToggle" />
    <nuxt class="main-layout" />
    <AppFooter />
    <MdOverlay v-if="appLoading" :fixed="true" :show="true" :cover="true">
      <MdCircularProgress theme="accent" :size="48" />
    </MdOverlay>
    <AppDrawer :show.sync="show" />
  </div>
</template>

<style>
.main-layout {
  min-height: calc(100vh - 120px);
}
.rx-section {
  padding: 32px 0;
  max-width: 100vw;
  overflow-x: hidden;
}

@media (max-width: 599px) {
  .rx-section {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}
.rx-list-text li {
  padding-left: 24px;
  position: relative;
  line-height: 1.6;
}
.rx-list-text li:before {
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
.rx-list-text li:before {
  content: 'send';
  position: absolute;
  top: 0;
  left: 0;
  font-family: Material Icons;
  width: 24px;
  height: 24px;
}
.rx-list-text--primary li:before {
  color: RGB(var(--color-primary));
}
/*
process
*/
.et-process {
  width: 258px;
  display: flex;
  flex-direction: column;
  margin: 12px auto;
  background: rgba(255, 255, 255, 1);
  border: 1px solid var(--color-app-divider);
  border-radius: 8px;
  padding: 16px 16px;
}
.et-container--narrow {
  max-width: 520px;
}

.et-process__icon {
  width: 56px;
  height: 56px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
}
.et-process__icon .material-icons {
  line-height: 56px;
  font-size: 28px;
}
.rx-slider-section {
  height: calc(80vh - 64px);
  max-height: 520px;
  min-height: 480px;
  position: relative;
}

@media (max-width: 600px) {
  .rx-slider-section {
    height: auto;
    max-height: none;
  }
}
.et-banner {
  padding-right: 32px;
}
@media (max-width: 960px) {
  .et-banner {
    padding-right: 0;
  }
  .rt-text-center-sm {
    text-align: center;
  }
  .rt-justify-center-sm {
    justify-content: center;
  }
}
@media (max-width: 599px) {
  .et-process {
    max-width: 100%;
    padding: 12px;
  }
  .et-process__icon {
    width: 48px;
    height: 48px;
  }
  .et-process__icon .material-icons {
    line-height: 48px;
  }
  .et-process-wrapper {
    justify-content: flex-start;
  }
}
.md-color-primary-gradient {
  position: absolute;
}
.nt-tag-line {
  font-weight: 400;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  font-size: 12px;
}
:root {
  --font-family-base: 'Work Sans', sans-serif;
  --button-font-family: 'Work Sans', sans-serif;
  --button-border-radius: 2px;
}
.pm-work-font {
  font-family: 'Work Sans', sans-serif;
}
.img-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  transition: all 0.7s ease-in;
  background-position: center;
  overflow: hidden;
  transform: scale(1);
}
.tile:hover .img-box,
.pmh-blog__posts .md-card__primary-action:hover .img-box {
  transition: all 3s ease-out;
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
}
.pmh-blog__posts > .md-card {
  transition: all 0.3s;
  --card-border-radius: 0;
}

.pmh-blog__posts > .md-card:hover {
  transform: translateY(-10px);
  box-shadow: -2px 11px 24px -8px rgba(0, 0, 0, 0.15);
}
.cp-img-background {
  background-size: cover;
}
.cp-small-img {
  width: auto;
  display: inline-block;
  height: 72px;
}
.rtejustify.diffWhy img {
  width: auto;
  display: inline-block;
  height: 72px;
}
.appearContainer p {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
.md-footer__link--with-icon {
  position: relative;
  padding-left: 30px;
}

.md-footer__link--with-icon .material-icons {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 18px;
}

.et-map-wrapper {
  height: 240px;
  background: #7f828b;
}

.pages .page {
  position: relative;
}

.pages .page .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 380px;
  background-size: cover;
}

.pages .page.page-right .image {
  left: auto;
  right: 0;
}

.pages .page .text {
  margin-left: 50%;
  line-height: 380px;
  overflow: hidden;
  background-color: #fff;
}

.pages .page.page-right .text {
  margin-left: auto;
  margin-right: 50%;
}

.pages .page .text .middle {
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  line-height: 24px;
  padding: 24px;
  box-sizing: border-box;
}

.signContainer img {
  max-width: 72px;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: auto;
}
.cp-width-100 {
  width: 100%;
}
@media (min-width: 599px) {
  .appearContainer {
    max-width: 456px;
    margin: 0 auto;
  }
  .cp-content-surface {
    height: 480px;
  }
  .cp-content-image {
    height: 380px;
  }
}
.font-satisfy {
  font-family: 'Satisfy', cursive;
}
.why-us-slider-card .why-us-slider-image-wrapper {
  padding-bottom: 8px;
  padding-top: 8px;
}
.cp-bg-grey {
  background: #f9f9f9;
}
.cp-hero-slider__img {
  height: 647px;
  opacity: 0;
}
.cp-hero-slider-shimmer {
  height: 647px;
}
@media (max-width: 599px) {
  .cp-hero-slider__img {
    height: 420px;
  }
  .cp-hero-slider-shimmer {
    height: 420px;
  }
}
.cp-hero-slider__content,
.cp-hero-slider__bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
}
.cp-hero-slider__bg {
  background-size: cover;
  z-index: 2;
}
.cp-click-area {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.pm-blog p {
  font-size: inherit;
}
.pm-blog p img {
  width: 100%;
}
.cp-hero-slider__bg::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
}
</style>
<script>
import { mapGetters } from 'vuex'
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'
import AppDrawer from '@/components/layout/AppDrawer'
// import AppBreadcrumb from '../components/ui/AppBreadcrumb'

export default {
  components: {
    AppHeader,
    AppFooter,
    AppDrawer
  },
  data: () => ({
    assetsUrl: 'test',
    show: false
  }),
  head: () => ({
    bodyAttrs: {
      class: 'has-fixed-header'
    }
  }),
  computed: {
    ...mapGetters({
      appLoading: 'core/appLoading'
    })
  },
  mounted() {},
  methods: {
    drawerToggle() {
      this.show = !this.show
    }
  }
}
</script>
