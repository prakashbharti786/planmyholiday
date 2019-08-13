<template>
  <div class="md-row">
    <div class="md-col md-col--12 md-col--6-md">
      <div class="md-row">
        <div class="md-col md-col--6 md-col--12-sm md-col--6-md">
          <ExperienceCard
            :key="itemList[0].name"
            class="md-mb-2"
            :item="itemList[0]"
          />
        </div>
        <div class="md-col md-col--6 md-col--12-sm md-col--6-md">
          <ExperienceCard
            :key="itemList[1].name"
            class="md-mb-2"
            :item="itemList[1]"
          />
        </div>
      </div>
      <div class="md-row md-d-none md-d-flex-sm">
        <div class="md-col md-col--12">
          <ExperienceCard
            :key="itemList[2].name"
            class="md-mb-2"
            :item="itemList[2]"
          />
        </div>
      </div>
    </div>
    <div class="md-col md-col--12 md-col--6-md md-d-none-sm">
      <div class="md-row">
        <div class="md-col md-col--6 md-col--12-sm md-col--6-md">
          <ExperienceCard
            :key="itemList[3].name"
            class="md-mb-2"
            :item="itemList[3]"
          />
        </div>
        <div class="md-col md-col--6 md-col--12-sm md-col--6-md">
          <ExperienceCard
            :key="itemList[0].name"
            class="md-mb-2"
            :item="itemList[2]"
          />
        </div>
      </div>
    </div>
    <div class="md-col md-col--12 md-col--6-md">
      <div class="md-row md-d-none md-d-flex-sm">
        <div class="md-col md-col--12">
          <ExperienceCard
            :key="itemList[3].name"
            class="md-mb-2"
            :item="itemList[3]"
          />
        </div>
      </div>
      <div class="md-row">
        <div class="md-col md-col--6 md-col--12-sm md-col--6-md">
          <ExperienceCard
            :key="itemList[4].name"
            class="md-mb-2"
            :item="itemList[4]"
          />
        </div>
        <div class="md-col md-col--6 md-col--12-sm md-col--6-md">
          <ExperienceCard
            :key="itemList[5].name"
            class="md-mb-2"
            :item="itemList[5]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ExperienceCard from '@/components/common/ExperienceCard'
export default {
  name: 'ExperienceBlock',
  components: { ExperienceCard },
  props: {
    disableHeading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    assetsUrl: process.env.assetsUrl,
    adminUrl: process.env.adminUrl,
    isFetching: false
  }),
  computed: {
    ...mapGetters({
      itemList: 'experiences/getFeaturedExperiences'
    }),
    enableList() {
      return this.itemList.length
    }
  },
  mounted() {
    this.shuffle()
  },
  methods: {
    async fetchFeaturedExperiences() {
      this.isFetching = true
      try {
        await this.$store.dispatch('experiences/fetchExperiences')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.isFetching = false
    },
    shuffle() {
      this.itemList.sort(() => Math.random() - 0.5)
    }
  }
}
</script>
