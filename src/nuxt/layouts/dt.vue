<template>
  <v-app class="f-column vw-100 vh-100">
    <dt-topbar-nav class="f-noshrink" @settingDrawerStatus="settingDrawer = !settingDrawer" />
    <div class="f-row" style="height: calc(100vh - 48px)">
      <v-navigation-drawer permanent :expand-on-hover="false">
        <v-list style="border-bottom: 1px solid rgba(146, 146, 146, 0.25)">
          <v-list-item class="px-4">
            <v-list-item-avatar size="2.625rem">
              <v-icon size="2.25rem" color="var(--g-dt-primary)">mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle style="font-size: 0.625rem; font-weight: 400"> {{ authUserName }} </v-list-item-subtitle>
              <v-list-item-title style="font-weight: 600"> {{ authUserUserName }} </v-list-item-title>
            </v-list-item-content>
            <v-btn class="mx-2 logout" fab small :elevation="1" @click="onClickLogout">
              <i class="dti-logout" style="font-size: 2.3rem" />
            </v-btn>
          </v-list-item>
        </v-list>
        <v-list v-for="{ menu, name, type } in menus" :key="type" dense class="py-4" style="border-bottom: 1px solid rgba(146, 146, 146, 0.25)">
          <v-list-item-title class="px-7 mb-2" style="font-size: 0.625rem; font-weight: 600"> {{ name }} </v-list-item-title>
          <v-list-item-group :value="selectItem[type]" color="var(--g-dt-primary)">
            <v-list-item
              v-for="(prop, index) in menu"
              :key="index"
              class="px-7 dt-side-menu"
              :style="selectItem[type] === index ? { 'border-right': 'solid', padding: '0.4rem 0' } : { padding: '0.4rem 0' }"
              @click="itemClick(prop)"
            >
              <i class="me-3" :class="prop.icon" style="color: var(--g-dt-primary)" />
              <v-list-item-title>{{ prop.text }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <dt-setting-nav :setting-drawer="settingDrawer"></dt-setting-nav>
      <div class="f-full f-column h-100 overflow-hidden">
        <overlay-scrollbars-vue class="f-full h-100" :options="contentOverlayScrollbarsOptions">
          <div class="f-column h-100" style="padding: 3.5rem 5.5rem 0 5.7rem">
            <section v-if="!currentPageFluid" class="f-noshrink ms-2" :style="{ height: '3rem' }">
              <div class="h-100 f-row align-items-center">
                <h5 v-if="selectMenu.linkPath !== '/viewtrack/p/home'" class="m-0 fw-bold" :style="{ fontSize: '1.5rem' }">
                  {{ $util.i18n.translate({ text: selectMenu.text }) }}
                </h5>
              </div>
            </section>
            <nuxt class="f-full px-2" style="height: calc(100% - 3rem)" />
          </div>
        </overlay-scrollbars-vue>
      </div>
    </div>
  </v-app>
</template>

<script>
import { AuthLayoutMixins } from '~/plugins/mixins/auth-layout.js'

import 'overlayscrollbars/css/OverlayScrollbars.css'
import OverlayScrollbars from 'overlayscrollbars'

export default {
  components: {
    DtTopbarNav: () => import('~/components/viewtrack/source/cms/nav/dt-topbar-nav'),
    DtSettingNav: () => import('~/components/viewtrack/source/cms/nav/dt-setting-nav'),
    OverlayScrollbarsVue: () => import('overlayscrollbars-vue').then(({ OverlayScrollbarsComponent }) => OverlayScrollbarsComponent),
  },
  mixins: [...AuthLayoutMixins],
  data() {
    return {
      settingDrawer: false,
      menus: [
        {
          type: 'home',
          name: '',
          menu: [
            {
              text: '홈',
              linkPath: '/viewtrack/p/home',
              icon: 'dti-home',
            },
          ],
        },
        {
          type: 'sourceManageMenu',
          name: '소스 관리',
          menu: [
            {
              text: '파일 관리',
              linkPath: '/viewtrack/p/media',
              icon: 'dti-media',
            },
            {
              text: '데이터 요청 목록',
              linkPath: '/viewtrack/p/data',
              icon: 'dti-data',
            },
            // {
            //   text: '컴포넌트',
            //   linkPath: '/viewtrack/p/component',
            //   icon: 'dti-component',
            // },
          ],
        },
        {
          type: 'etcManageMenu',
          name: '빌더',
          menu: [
            {
              text: '위젯 관리',
              linkPath: '/viewtrack/p/widget',
              icon: 'dti-widget',
            },
            {
              text: '화면 관리',
              linkPath: '/viewtrack/p/screen',
              icon: 'dti-screen',
            },
            // {
            //   text: '스케줄 관리',
            //   linkPath: '/viewtrack/p/schedule',
            // },
          ],
        },
        {
          type: 'setting',
          name: '설정',
          menu: [
            {
              text: '외부스키마 관리',
              linkPath: '/viewtrack/p/template',
              icon: 'dti-data-model',
            },
            // { text: '사용자 관리' },
            // { text: '이력(버전) 관리' },
            // { text: '로그인 관리' },
            // { text: '감사로그 관리' },
            // { text: '현황' },
          ],
        },
      ],
    }
  },
  head() {
    const t = document.createElement('div')

    t.innerHTML = 'DX STUDIO'
    let title = t.textContent
    const head = { title }
    Object.assign(head, { link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon-dt.svg' }] })
    return head
  },
  computed: {
    selectMenu() {
      return this.menus.reduce((acc, { menu, type }) => {
        const selectMenu = menu.find(({ linkPath }) => linkPath === this.$route.path)
        if (selectMenu) Object.assign(acc, { ...selectMenu, type })
        return acc
      }, {})
    },
    selectItem() {
      return this.menus.reduce(
        (acc, { type, menu }) => {
          if (type === this.selectMenu?.type) acc[type] = menu?.findIndex(({ linkPath }) => linkPath === this.selectMenu?.linkPath)
          return acc
        },
        {
          home: undefined,
          sourceManageMenu: undefined,
          etcManageMenu: undefined,
          setting: undefined,
        }
      )
    },
    currentPageFluid() {
      return this.$store.state.viewtrack.currentPage?.properties?.fluid
    },
    sidenavOverlayScrollbarsOptions() {
      const defaultOptions = OverlayScrollbars.defaultOptions()
      return {
        ...defaultOptions,
        resize: 'h',
        overflowBehavior: {
          ...defaultOptions.overflowBehavior,
          x: 'hidden',
        },
        scrollbars: { autoHide: 'move' },
      }
    },
    contentOverlayScrollbarsOptions() {
      const defaultOptions = OverlayScrollbars.defaultOptions()
      return {
        ...defaultOptions,
        overflowBehavior: {
          ...defaultOptions.overflowBehavior,
          x: 'hidden',
        },
        scrollbars: { autoHide: 'move' },
      }
    },
    currentServiceUi() {
      return this.$store.state.viewtrack.currentServiceUi
    },
    authUserName() {
      return this.$auth.user?.properties?.name || ''
    },
    authUserUserName() {
      return this.$auth.user?.properties?.username || ''
    },
    // stateDefaultsTheme() {
    //   const { colorsets, themeName } = this.$store.state.defaults.theme
    //   return colorsets[themeName]
    // },
  },
  // watch: {
  //   stateDefaultsTheme: { handler: 'themeset', deep: true },
  // },
  async mounted() {
    await this.$nextTick()
    // this.$vuetify.theme.currentTheme.primary = this.theme?.colorset?.dt-primary
    // this.$vuetify.theme.currentTheme.primary = '#FF0000'
  },
  methods: {
    onClickLogout() {
      this.$nuxt.$emit('logout')
    },
    itemClick(prop) {
      this.$router.push(prop.linkPath)
    },
    // themeset() {
    //   this.$vuetify.theme.currentTheme.primary = this.theme?.colorset?.['dt-primary']
    // },
  },
}
</script>
<style lang="scss" scoped>
.logout.theme--light.v-btn.v-btn--has-bg {
  background-color: #fff;
}
.dt-side-menu.v-list-item--active {
  i {
    color: var(--g-dt-secondary) !important;
  }
  .v-list-item__title {
    color: var(--g-dt-secondary);
    font-weight: 600 !important;
  }
}
</style>
