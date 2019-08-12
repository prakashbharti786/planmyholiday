<template>
  <div class="breadcrumb-surface">
    <div
      class="breadcrumb-wrapper md-border-bottom md-border-top md-align md-align--start-center md-layout md-layout--wrap"
    >
      <div class="md-container md-container--box">
        <div class="breadcrumb">
          <button class="md-flex-shrink-0 md-icon-button">
            <i class="material-icons md-icon-button__icon">
              arrow_back
            </i>
          </button>
          <button
            class="md-button md-button--dense rx-button--project breadcrumb__item"
          >
            <span class="md-button__lable">
              Home
            </span>
            <i
              style="margin-left: 0"
              class="material-icons md-button__icon--right md-button__icon"
            >
              chevron_right
            </i>
          </button>
          <div class="breadcrumb__item">
            Privacy policy
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.breadcrumb-surface {
  height: 56px;
}
.breadcrumb-wrapper {
  position: fixed;
  top: 72px;
  background: var(--color-app-background);
  z-index: 10;
  left: 0;
  right: 0;
  height: 56px;
  padding-top: 4px;
  padding-bottom: 4px;
}
.breadcrumb {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.breadcrumb__item {
  margin-right: 8px;
  font-size: 13px;
  text-transform: none;
}
</style>

<script>
export default {
  name: 'AppBreadcrumb'
}
</script>
