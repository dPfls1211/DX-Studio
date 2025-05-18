<template>
  <section
    class="d-flex align-items-center"
    style="font-family: Noto Sans KR; display: flex; flex-direction: column; justify-content: center; transform: translateY(-3.5rem)"
  >
    <!-- <v-img
      style="position: fixed; top: -3.5rem; left: -5.7rem; width: calc(100% + 11.2rem); height: calc(100% + 3.5rem)"
      :src="require('~/assets/images/viewtrack/p/home/totalbackgroundpattern.svg')"
    /> -->

    <v-img class="home-lefttop-img" :src="require('~/assets/images/viewtrack/p/home/backgroundpattern2.svg')" />
    <v-img class="home-bgImg" :src="require('~/assets/images/viewtrack/p/home/backgroundpattern1.svg')" />
    <v-img class="home-leftbot-img" :src="require('~/assets/images/viewtrack/p/home/backgroundpattern3.svg')" />
    <div
      class="home-main-contents"
      style="font-size: 2.14286rem; font-weight: 600; align-items: center; justify-content: center; display: flex; flex-direction: column"
    >
      <div
        class="svg-container"
        style="gap: 0.37rem; line-height: 170%; position: relative; align-items: center; justify-content: center; display: flex; z-index: 2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="234" height="29" viewBox="0 0 234 29" fill="none">
          <path
            d="M27.4269 16.3472C27.4269 18.0181 27.1351 19.5576 26.555 20.9621C25.9749 22.3667 25.1724 23.5742 24.1545 24.5884C23.133 25.6026 21.9218 26.3979 20.5173 26.9707C19.1128 27.5434 17.5878 27.8316 15.9425 27.8316H2.50629C2.14877 27.8316 1.81679 27.7696 1.51034 27.6419C1.20389 27.5142 0.937579 27.3391 0.71504 27.1166C0.492502 26.894 0.317389 26.6277 0.189703 26.3213C0.0620176 26.0148 0 25.6828 0 25.3253V2.8891C0 2.54618 0.0620176 2.21784 0.189703 1.91139C0.317389 1.60495 0.492502 1.33863 0.71504 1.1088C0.937579 0.878963 1.20389 0.700203 1.51034 0.572517C1.81679 0.444832 2.14877 0.382812 2.50629 0.382812H15.9425C17.5878 0.382812 19.1128 0.671018 20.5173 1.24378C21.9218 1.81654 23.133 2.61184 24.1545 3.62603C25.176 4.64022 25.9749 5.85506 26.555 7.26326C27.1351 8.6751 27.4269 10.2073 27.4269 11.8672V16.3472ZM22.4508 11.8672C22.4508 10.8968 22.294 10.0103 21.9802 9.20773C21.6665 8.40513 21.225 7.71928 20.6486 7.15016C20.0759 6.58105 19.39 6.14327 18.5911 5.82953C17.7921 5.51578 16.9093 5.35891 15.9388 5.35891H4.97245V22.8555H15.9388C16.9093 22.8555 17.7921 22.6987 18.5911 22.3849C19.39 22.0712 20.0759 21.6334 20.6486 21.0643C21.2214 20.4952 21.6665 19.813 21.9802 19.014C22.294 18.2151 22.4508 17.3249 22.4508 16.3435V11.8636V11.8672Z"
            fill="#6666FF"
          />
          <path
            d="M44.0748 10.1815L52.4583 0.378906H59.2512L47.442 14.1434L59.1745 27.8314H52.4181L44.0748 18.1054L35.7679 27.8314H28.9933L40.7039 14.1434L28.9531 0.378906H35.6913L44.0748 10.1815Z"
            fill="#6666FF"
          />
          <path
            d="M96.8923 19.7571C96.8923 20.7384 96.7682 21.6249 96.5202 22.4093C96.2721 23.1936 95.9438 23.8868 95.5352 24.4851C95.1266 25.0834 94.6487 25.5941 94.1014 26.0173C93.5542 26.4405 92.9851 26.7834 92.3977 27.0497C91.8104 27.3161 91.2157 27.5167 90.6101 27.6444C90.0045 27.7721 89.4318 27.8341 88.8991 27.8341H69.7025V22.858H88.8991C89.855 22.858 90.5992 22.5771 91.1282 22.0153C91.6572 21.4534 91.9235 20.7019 91.9235 19.7571C91.9235 19.2974 91.8542 18.8778 91.7119 18.4948C91.5696 18.1117 91.369 17.7797 91.1099 17.4988C90.8473 17.2179 90.5299 16.999 90.1541 16.8495C89.7784 16.6962 89.3588 16.6196 88.8991 16.6196H77.4548C76.6523 16.6196 75.784 16.4773 74.8537 16.1891C73.9234 15.9009 73.0588 15.4413 72.2599 14.8028C71.4609 14.1644 70.8006 13.329 70.268 12.2965C69.739 11.2641 69.4727 9.9982 69.4727 8.5061C69.4727 7.014 69.739 5.75174 70.268 4.7266C70.7969 3.69782 71.4609 2.86239 72.2599 2.22031C73.0588 1.57458 73.9234 1.11127 74.8537 0.823062C75.784 0.534856 76.6523 0.392578 77.4548 0.392578H94.3933V5.36868H77.4548C76.51 5.36868 75.773 5.65688 75.2441 6.22965C74.7151 6.80241 74.4488 7.56488 74.4488 8.5061C74.4488 9.44733 74.7151 10.2207 75.2441 10.7753C75.773 11.3298 76.51 11.607 77.4548 11.607H88.9393C89.4756 11.6216 90.041 11.6946 90.643 11.8259C91.2413 11.9609 91.8396 12.1689 92.4342 12.4498C93.0289 12.7307 93.5907 13.0846 94.127 13.5114C94.6633 13.9382 95.1375 14.4526 95.5534 15.0509C95.9693 15.6492 96.2976 16.3387 96.5384 17.1194C96.7792 17.8965 96.9032 18.7793 96.9032 19.7607L96.8923 19.7571Z"
            :fill="$vuetify.theme.dark ? '#ffffff' : '#040000'"
          />
          <path d="M125.54 5.36282H114.574V27.8355H109.598V5.36282H98.6133V0.386719H125.54V5.36282Z" :fill="$vuetify.theme.dark ? '#ffffff' : '#040000'" />
          <path
            d="M156.082 25.3292C156.082 25.6868 156.016 26.0187 155.892 26.3252C155.765 26.6316 155.586 26.8979 155.356 27.1205C155.126 27.343 154.86 27.5181 154.554 27.6458C154.247 27.7735 153.922 27.8355 153.576 27.8355H142.361C141.303 27.8355 140.231 27.7224 139.147 27.4926C138.064 27.2628 137.013 26.9089 135.999 26.431C134.985 25.9531 134.029 25.3438 133.139 24.6033C132.245 23.8627 131.464 22.9871 130.793 21.9729C130.122 20.9587 129.596 19.7986 129.213 18.4889C128.83 17.1792 128.641 15.7236 128.641 14.1148V0.386719H133.617V14.1111C133.617 15.5157 133.81 16.7013 134.2 17.6717C134.591 18.6421 135.083 19.452 135.685 20.1014C136.287 20.7508 136.94 21.2615 137.655 21.6336C138.37 22.0021 139.049 22.2794 139.695 22.4581C140.34 22.6369 140.906 22.75 141.398 22.7938C141.891 22.8375 142.212 22.8594 142.365 22.8594H151.11V0.386719H156.086V25.3292H156.082Z"
            :fill="$vuetify.theme.dark ? '#ffffff' : '#040000'"
          />
          <path
            d="M189.251 16.3511C189.251 18.022 188.959 19.5615 188.379 20.966C187.799 22.3706 186.997 23.5781 185.979 24.5923C184.957 25.6065 183.746 26.4018 182.342 26.9746C180.937 27.5473 179.412 27.8355 177.767 27.8355H164.331C163.973 27.8355 163.641 27.7735 163.335 27.6458C163.028 27.5181 162.762 27.343 162.539 27.1205C162.317 26.8979 162.142 26.6316 162.014 26.3252C161.886 26.0187 161.824 25.6868 161.824 25.3292V2.89301C161.824 2.55008 161.886 2.22175 162.014 1.9153C162.142 1.60886 162.317 1.34254 162.539 1.1127C162.762 0.882869 163.028 0.704109 163.335 0.576424C163.641 0.448738 163.973 0.386719 164.331 0.386719H177.767C179.412 0.386719 180.937 0.674924 182.342 1.24769C183.746 1.82045 184.957 2.61575 185.979 3.62994C187 4.64413 187.799 5.85897 188.379 7.26716C188.959 8.67535 189.251 10.2112 189.251 11.8712V16.3511ZM184.275 11.8712C184.275 10.9007 184.118 10.0142 183.804 9.21164C183.491 8.40904 183.049 7.72318 182.473 7.15407C181.9 6.58495 181.214 6.14717 180.415 5.83343C179.616 5.51969 178.733 5.36282 177.763 5.36282H166.797V22.8594H177.763C178.733 22.8594 179.616 22.7026 180.415 22.3888C181.214 22.0751 181.9 21.6373 182.473 21.0682C183.046 20.4991 183.491 19.8169 183.804 19.0179C184.118 18.219 184.275 17.3288 184.275 16.3475V11.8675V11.8712Z"
            :fill="$vuetify.theme.dark ? '#ffffff' : '#040000'"
          />
          <path d="M199.148 27.8355H194.172V0.386719H199.148V27.8392V27.8355Z" :fill="$vuetify.theme.dark ? '#ffffff' : '#040000'" />
          <path
            d="M233.765 16.7324C233.765 18.4033 233.476 19.9428 232.904 21.3474C232.331 22.7519 231.532 23.9631 230.51 24.9846C229.489 26.0061 228.281 26.8014 226.884 27.3669C225.487 27.936 223.966 28.2169 222.32 28.2169H215.582C213.937 28.2169 212.412 27.9323 211.007 27.3669C209.603 26.7977 208.392 26.0061 207.37 24.9846C206.349 23.9631 205.55 22.7519 204.97 21.3474C204.39 19.9428 204.098 18.407 204.098 16.7324V11.4864C204.098 9.82647 204.386 8.29424 204.97 6.8824C205.55 5.47056 206.352 4.25936 207.37 3.24517C208.392 2.23098 209.603 1.43568 211.007 0.862921C212.412 0.290159 213.937 0.00195312 215.582 0.00195312H222.32C223.966 0.00195312 225.487 0.290159 226.884 0.862921C228.281 1.43568 229.489 2.23098 230.51 3.24517C231.532 4.25936 232.327 5.47056 232.904 6.8824C233.476 8.29424 233.765 9.82647 233.765 11.4864V16.7324ZM228.788 11.4864C228.788 10.505 228.632 9.61487 228.318 8.81593C228.004 8.01698 227.566 7.33477 226.997 6.7693C226.428 6.20019 225.746 5.76241 224.951 5.44867C224.152 5.13492 223.276 4.97805 222.32 4.97805H215.582C214.612 4.97805 213.729 5.13492 212.934 5.44867C212.135 5.76241 211.449 6.20019 210.876 6.7693C210.303 7.33842 209.858 8.02063 209.544 8.81593C209.231 9.61487 209.074 10.505 209.074 11.4864V16.7324C209.074 17.7138 209.231 18.604 209.544 19.4029C209.858 20.2019 210.3 20.8841 210.876 21.4495C211.449 22.0186 212.135 22.4564 212.934 22.7702C213.729 23.0839 214.615 23.2408 215.582 23.2408H222.28C223.251 23.2408 224.133 23.0839 224.929 22.7702C225.724 22.4564 226.413 22.0186 226.986 21.4495C227.559 20.8804 228.004 20.1982 228.318 19.4029C228.632 18.604 228.788 17.7138 228.788 16.7324V11.4864Z"
            :fill="$vuetify.theme.dark ? '#ffffff' : '#040000'"
          />
        </svg>
        를 경험해 보세요
      </div>
      <div style="position: relative; z-index: 2; color: #7e7e7e; font-size: 1.42857rem; font-weight: 500; margin: 1.3rem 0 2.43rem 0">
        데이터를 시각화하고, 콘텐츠를 편집하는 등 사용자가 직접 커스텀하며 생성해 보세요
      </div>
      <div style="position: relative; z-index: 2">
        <v-btn-toggle v-model="builderName" group mandatory style="gap: 1rem 2.57rem; flex-wrap: wrap; max-width: 75rem" class="home-btn-toggle-class">
          <v-btn value="File"> File </v-btn>
          <v-btn value="Dashboard"> Dashboard </v-btn>
          <v-btn value="Layout"> Layout </v-btn>
          <v-btn value="Widget"> Widget </v-btn>
          <v-btn value="Builder3D"> 3D </v-btn>
          <v-btn value="Playlist"> Playlist </v-btn>
          <v-btn value="Map"> Map </v-btn>
        </v-btn-toggle>
      </div>
      <div
        style="
          position: relative;
          z-index: 3;
          margin-top: 3rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 9rem;
          width: 100%;
          min-width: 90rem;
          letter-spacing: -0.01143rem;
        "
      >
        <div style="width: 49.5rem; height: 29.85714rem">
          <v-img
            :src="explain[builderName].src"
            style="border-radius: 1.33336rem; border: 2.8px solid var(--DT-light-dt_border_main, #f0f0f0); background: var(--DT-light-dt_bg_3, #f8f8f9)"
          />
        </div>

        <div style="display: flex; flex-direction: column; font-weight: 600">
          <label
            :style="{
              color: $vuetify.theme.dark ? '#8A80FF' : '#7e73fe',
              fontSize: '1.14286rem',
              marginBottom: '0.36rem',
            }"
          >
            {{ explain[builderName].type }}
          </label>
          <label
            :style="{
              color: $vuetify.theme.dark ? '#D1CDFF' : '#4136c0',
              fontSize: '1.85714rem',
              lineHeight: '2.63579rem',
              marginBottom: '1.93rem',
              letterSpacing: 'normal',
            }"
          >
            {{ explain[builderName].title }}
          </label>
          <label :style="{ color: $vuetify.theme.dark ? '#F0F0F0' : '#1e1e1e', fontSize: '1.14286rem', marginBottom: '0.57rem' }">
            {{ explain[builderName].subtitle }}
          </label>
          <div
            :style="{
              color: $vuetify.theme.dark ? '#F0F0F0' : '#1e1e1e',
              fontSize: '1.14286rem',
              fontWeight: '500',
              lineHeight: '2rem',
              marginBottom: '4.64rem',
            }"
            v-html="formattedContent"
          ></div>
          <v-btn
            class="move-to-builder-btn"
            style="
              width: 11.30307rem !important;
              letter-spacing: -0.01rem !important;
              text-transform: none !important;
              border-radius: 0.19771rem;
              font-size: 1rem;
              font-weight: 500;
              line-height: 1.28571rem; /* 128.571% */
              height: 3rem !important;
            "
            :style="{
              background: $vuetify.theme.dark ? '#1e1e1e' : 'var(--dsb_equal-bg, #fff)',
              color: $vuetify.theme.dark ? '#F0F0F0' : 'var(--DT-light-dt_text_main, #1e1e1e)',
              boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.08)',
            }"
            @click="clickedMoveBuilder(explain[builderName].builderUrl)"
          >
            {{ explain[builderName].btn }} →</v-btn
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  layout: 'default',
  props: {},
  data() {
    return {
      builderName: 'File',
      explain: {
        Dashboard: {
          src: require('~/assets/images/viewtrack/p/home/dashboardExplainImg.svg'),
          type: '화면',
          title: 'Dashboard Builder',
          subtitle: '위젯을 활용해 커스텀보드 제작',
          contents: '빌더에서 만든 혹은 DX Studio에서 제공하는 위젯들을 <br>직접 배치하여 대시보드를 구성하고, 관리할 수 있습니다.',
          btn: 'Dashboard',
          builderUrl: '/viewtrack/p/screen',
        },
        Layout: {
          src: require('~/assets/images/viewtrack/p/home/layoutExplainImg.svg'),
          type: '화면',
          title: 'Layout Builder',
          subtitle: '스마트 사이니지 화면 제작',
          contents: '다양한 파일과 플레이리스트를 활용해<br>스마트 사이니지 화면을 제작할 수 있습니다.',
          btn: 'Layout',
          builderUrl: '/viewtrack/p/screen',
        },
        Widget: {
          src: require('~/assets/images/viewtrack/p/home/widgetExplainImg.svg'),
          type: '위젯',
          title: 'Widget',
          subtitle: '컴포넌트를 활용해 위젯 생성',
          contents: '빌더에서 제작한 컴포넌트를 조합해<br>사용자 맞춤 위젯을 생성할 수 있습니다.',
          btn: 'Widget',
          builderUrl: '/viewtrack/p/widget',
        },
        Playlist: {
          src: require('~/assets/images/viewtrack/p/home/map.svg'),
          type: '컴포넌트',
          title: 'Playlist Builder',
          subtitle: '플레이리스트 영상 제작',
          contents: '파일들을 활용해 Layout에서 사용할 <br>플레이리스트를 직접 제작할 수 있습니다.',
          btn: 'Playlist',
          builderUrl: '/viewtrack/p/playlist',
        },
        Builder3D: {
          src: require('~/assets/images/viewtrack/p/home/3dexplainImg.svg'),
          type: '컴포넌트',
          title: '3D Builder',
          subtitle: '시설 및 장치 디지털 전환',
          contents: 'DX Studio에서 제공하는 3D에 IoT기술을 <br>결합해 데이터를 연계할 수 있습니다.',
          btn: '3D',
          builderUrl: '/viewtrack/p/3d-builder',
        },
        File: {
          src: require('~/assets/images/viewtrack/p/home/mediaExplainImg.svg'),
          type: '소스 관리',
          title: 'File',
          subtitle: '다양한 파일 관리',
          contents: 'DX Studio에서 이미지, 영상, 오디오, 3D를 제공하며,<br>사용자는 3D를 제외하고 업로드해 사용할 수 있습니다.',
          btn: 'File',
          builderUrl: '/viewtrack/p/media',
        },
        Map: {
          src: require('~/assets/images/viewtrack/p/home/map.svg'),
          type: '컴포넌트',
          title: 'Map Builder',
          subtitle: '커스텀 맵 제작',
          contents: '원하는 맵을 제작해 맵 스타일을 <br> Json으로 추출해 보세요.',
          btn: 'Map',
          builderUrl: '/viewtrack/p/map-builder',
        },
      },
    }
  },
  computed: {
    formattedContent() {
      return this.explain[this.builderName].contents
    },
  },
  methods: {
    clickedMoveBuilder(url) {
      this.$router.push(url)
    },
  },
}
</script>

<style lang="scss">
.home-btn-toggle-class .v-btn.v-btn {
  height: 3.42857rem !important;
  min-width: 11.21429rem !important;
  padding: 0.35714rem 1.42857rem 0.42857rem 1.42857rem !important;
  color: #2d20be;
  font-family: Noto Sans KR;
  font-size: 1.42857rem;
  font-weight: 600;
  letter-spacing: normal;
  background-color: #fff !important;

  border-radius: 0.71429rem !important;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1) !important;
  text-transform: none !important;
}
.home-btn-toggle-class .v-btn.v-btn--active:before,
.home-btn-toggle-class .v-btn.v-btn--has-bg.v-btn--active {
  background-color: rgba(126, 115, 254, 0.8) !important;
  color: #fff;
}
.theme--dark .home-btn-toggle-class .v-btn {
  background-color: #121212 !important;
  color: #d1cdff;
  box-shadow: 0px 2px 3px 0px rgba(255, 255, 255, 0.1) !important;
}
.theme--dark .home-btn-toggle-class .v-btn.v-btn--active:before,
.theme--dark .home-btn-toggle-class .v-btn.v-btn--has-bg.v-btn--active {
  background-color: #8a80ff !important;
  color: #1f1f1f;
}
.move-to-builder-btn.v-size--default {
  height: 3rem !important;
}

.svg-container svg {
  width: 16rem;
  height: auto;
}
.home-bgImg {
  position: fixed;
  right: -5.5rem;
  bottom: -3.5rem;
  ///width: calc(100% + 5.5rem);
  width: 60%;
  height: auto;

  // height: 100vh;
  background-size: cover; /* 배경 이미지 크기 조절 */
  background-repeat: no-repeat; /* 배경 이미지 반복 금지 */
  z-index: -1;
}
.home-bgImg .v-image__image {
  background-position: bottom !important; /* 배경 이미지 위치 설정 */
}
.home-lefttop-img {
  position: fixed;
  left: -5.7rem;
  top: -3.5rem;
  z-index: -1;
  width: 24%;
  height: 15%;
  background-size: cover; /* 배경 이미지 크기 조절 */
  background-repeat: no-repeat; /* 배경 이미지 반복 금지 */
}

.home-leftbot-img {
  position: fixed;
  left: 2.09rem;
  bottom: 1.14rem;
  z-index: -2;
  height: auto;
  width: 6.57%;
  background-size: cover; /* 배경 이미지 크기 조절 */
  background-repeat: no-repeat; /* 배경 이미지 반복 금지 */
}
// .home-main-contents {
//   transform: scale(90%) translateY(-6%);
// }

@media (max-width: 3840px) {
  .home-main-contents {
    transform: scale(130%) translateY(-3%);
  }
}
@media (max-width: 2560px) {
  .home-main-contents {
    transform: scale(115%) translateY(-4%);
  }
}
@media (max-width: 1920px) {
  .home-main-contents {
    transform: scale(89%) translateY(-0.5%);
  }
}
</style>
