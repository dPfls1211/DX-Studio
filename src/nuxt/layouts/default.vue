<template>
  <component :is="layoutClass" ref="layoutInstance" />
</template>

<script>
import { AuthLayoutMixins } from '~/plugins/mixins/auth-layout.js'

export default {
  mixins: [...AuthLayoutMixins],
  head() {
    const t = document.createElement('div')
    t.innerHTML = this.currentServiceUiBrandTitle

    let title = t.textcontent

    const head = { title }

    if (this.currentServiceUiBrandFavicon) {
      const [protocol] = this.currentServiceUiBrandFavicon.split(';base64,')
      const [, type] = protocol.split('data:')

      if (type) Object.assign(head, { link: [{ rel: 'icon', type, href: this.currentServiceUiBrandFavicon }] })
    }

    return head
  },
  computed: {
    authLoggedIn() {
      return this.$auth.loggedIn
    },
    stateDefaultsTheme() {
      const { colorsets, themeName } = this.$store.state.defaults.theme
      return colorsets[themeName]
    },
    currentPageLayout() {
      // return this.$store.state.viewtrack.currentPage?.properties?.layout
      return 'dt'
    },
    currentServiceUi() {
      return this.$store.state.viewtrack.currentServiceUi
    },
    currentServiceUiLayout() {
      return this.currentServiceUi?.layout
    },
    currentServiceUiBrandTitle() {
      return this.currentServiceUi?.brand?.title?.text
    },
    currentServiceUiBrandFavicon() {
      return this.currentServiceUi?.brand?.favicon
    },
    layoutClass() {
      const {
        query: { __layout__: queryLayout },
      } = this.$route

      let layout = queryLayout || this.currentPageLayout || this.currentServiceUiLayout || 'default'
      if ('default' === layout) layout = 'viewtrack'

      return require(`~/layouts/${layout}`).default
    },
  },
}
</script>
