<template>
  <header
    id="cp-navbar"
    role="banner"
    class="md-top-app-bar md-top-app-bar--transparent md-top-app-bar--fixed"
  >
    <div class="header-background"></div>
    <div class="md-container md-container--gutter-24-md md-container--gutter">
      <div class="md-top-app-bar__row">
        <div class="md-top-app-bar__section md-justify-content-start">
          <MdIconButton
            class="md-top-app-bar__navigation-icon md-d-none-sm"
            icon="menu"
            @click="$emit('drawerToggle')"
          />
          <nuxt-link to="/" class="md-top-app-bar__brand md-align-self-start">
            <img
              class="gb_0a gb_Fe md-d-none md-d-block-sm"
              alt="Planmyholiday logo"
              aria-hidden="true"
              :src="assetsUrl + 'img/planmyholiday-logo.png'"
              style="height: 40px;"
            />
          </nuxt-link>
          <div v-if="topAppBarTitle" class="md-top-app-bar__title">
            {{ topAppBarTitle }}
          </div>
        </div>
        <div class="md-d-flex md-flex-grow-1" />
        <div
          class="md-top-app-bar__section md-justify-content-end md-align-self-start"
        >
          <app-nav :navs="navs" class="md-nav--hidden-tablet" />
          <div v-if="isAuthenticated" class="md-top-app-bar__toolbar">
            <MdButton
              label="My orders"
              theme="primary"
              @click="$router.push('/account/orders')"
            />
            <MdButton label="Log out" theme="primary" @click="logout" />
          </div>
          <div v-else class="md-d-none md-d-flex-sm">
            <MdButton
              label="Sign in"
              :outlined="true"
              @click="$router.push('/auth/signin')"
            />
            <MdButton
              label="Sign up"
              class="md-ml-2"
              theme="accent"
              :un-elevated="true"
              :raised="true"
              @click="$router.push('/auth/signup')"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<style>
body.has-fixed-header {
  /*  padding-top: 128px;*/
}
.md-top-app-bar.transition-on .header-background {
  transition: transform 400ms ease-in-out;
}
.md-top-app-bar .header-background {
  transform: translateY(-80px);
}
.md-top-app-bar .md-top-app-bar__title {
  opacity: 0;
  transition: opacity 400ms ease-in-out;
}
.md-top-app-bar.header-top .header-background {
  transform: translateY(0);
}
.md-top-app-bar.header-top .md-top-app-bar__title {
  opacity: 1;
}
@media screen and (min-width: 768px) {
  .header-background {
    background-color: #fff;
    box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.13);
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
}
.header-light.md-top-app-bar {
  color: var(--color-app-text);
}
.header-light.md-top-app-bar:not(.header-top) {
  --color-app-text: rgba(var(--color-light-text));
  --color-app-text-secondary: rgba(var(--color-light-secondary-text));
}
.header-light.md-top-app-bar:not(.header-top) .md-button--outlined {
  --button-color: var(--color-app-text);
}
</style>
<script>
import { mapGetters } from 'vuex'
import AppNav from '../ui/AppNav'

export default {
  components: { AppNav },
  head() {
    return {
      bodyAttrs: {
        'data-shimmer': true
      }
    }
  },
  data: () => ({
    navs: [
      {
        link: '/',
        title: 'Home',
        type: 'nuxtLink',
        auth: 'common'
      },
      {
        link: '/explore',
        title: 'Explore',
        type: 'nuxtLink',
        auth: 'common'
      },
      {
        link: '/blog',
        title: 'Blog',
        type: 'nuxtLink',
        auth: 'common'
      },
      {
        link: '/about',
        title: 'About us',
        type: 'nuxtLink',
        auth: 'common'
      },
      {
        link: '/contact',
        title: 'Contact us',
        type: 'nuxtLink',
        auth: 'common'
      }
    ],
    assetsUrl: process.env.assetsUrl,
    lastScrollTop: 0,
    prominentElement: null
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      topAppBarTitle: 'core/getTopAppBarTitle',
      scroll: 'core/getScroll'
    }),
    getQueryString() {
      return this.$route.fullPath.substring(this.$route.path.length)
    },
    startScroll() {
      return this.scroll.startScroll
    },
    endScroll() {
      return this.scroll.endScroll
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
      this.prominentElement = this.$el
      this.prominentElement.classList.add('transition-on')
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/signin' + this.getQueryString)
    },
    handleScroll(e) {
      const currentScrollTop = window.scrollY
      if (currentScrollTop > this.lastScrollTop) {
        this.handleScrollDown(e)
      } else {
        this.handleScrollUp(e)
      }
      this.lastScrollTop = currentScrollTop
    },
    handleScrollDown(e) {
      const currentScrollTop = window.scrollY
      if (currentScrollTop >= this.startScroll) {
        this.prominentElement.classList.add('header-top')
      }
    },
    handleScrollUp(e) {
      const currentScrollTop = window.scrollY
      if (currentScrollTop <= this.endScroll) {
        this.prominentElement.classList.remove('header-top')
      }
    }
  }
}
</script>
