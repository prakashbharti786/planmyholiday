<template>
  <div class="md-bg-white">
    <div
      class="md-container md-container--box md-container--gutter md-container--gutter-40-md"
      data-ready="true"
    >
      <main
        class="nt-active md-layout md-align-items-center md-justify-content-center cp-height-100"
      >
        <nuxt class="md-flex-grow-1" />
      </main>
    </div>
    <MdOverlay v-if="appLoading" :fixed="true" :show="true" :cover="true">
      <MdCircularProgress theme="accent" :size="48" />
    </MdOverlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      asyncComp: false,
      menuId: 'breadCrumb-project-menu',
      dialogId: 'feedback-dialog',
      unid: 'app-auth-universal',
      assetsUrl: process.env.assetsUrl,
      show: false
    }
  },
  computed: {
    ...mapGetters({
      appLoading: 'core/appLoading'
    })
  },
  watch: {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
