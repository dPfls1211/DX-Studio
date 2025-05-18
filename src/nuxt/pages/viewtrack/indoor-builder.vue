<template>
  <v-app class="v-app-class" style="overflow: hidden">
    <dt-sub-nav class="f-noshrink" home-link="/viewtrack/p/home" page="실내공간 빌더" :title="title" :tag="tagData">
      <template v-if="isDialog" #goBack>
        <v-icon cursor @click="$emit('goBack')">dti-back</v-icon>
      </template>
    </dt-sub-nav>
    <div style="display: flex; flex-direction: column; flex: 1">
      <v-dialog v-model="finishDialog" style="width: 20% !important" max-width="27rem">
        <div class="finishDialog-main dialog-set-main">
          <v-icon color="#FF6060" style="margin-bottom: 0.44rem; width: 2.625rem; height: 2.625rem">mdi-alert-circle</v-icon>
          <p class="m-0" style="text-align: center">
            홈으로 가기 전에 에 대한<br />
            변경 사항을 저장하시겠습니까?
          </p>
          <!-- {{ getDownloadModeling ? getDownloadModeling.properties.name : '' }} -->
          <div class="finishDialog-line"></div>
          <div class="finishDialog-btn-group">
            <v-btn depressed>취소</v-btn>
            <v-btn depressed>다른 이름으로 저장</v-btn>
            <v-btn depressed style="background-color: rgba(126, 115, 254, 1); color: white">저장</v-btn>
          </div>
        </div>
      </v-dialog>
      <div class="builder-class h-100 d-flex justify-content-between position-relative" :style="`${darkMode ? 'background: #2A2A2A' : 'background: #f8f8f9'}`">
        <div class="h-100 d-flex">
          <v-btn-toggle
            v-model="sideboxSelected"
            class="side-box-select-checkbtn flex-column d-flex gap-4 py-4 px-3"
            mandatory
            style="background-color: rgba(0, 0, 0, 0) !important"
          >
            <v-btn class="side-box-select-checkbtn-btn border-0" value="media" large icon>
              <i class="dti-media" style="font-size: 2.6rem" :style="{ color: 'var(--g-dt-primary)' }" />
            </v-btn>
            <v-btn class="side-box-select-checkbtn-btn border-0" value="layer" large icon>
              <i class="dti-layer" style="font-size: 2.6rem" :style="{ color: 'var(--g-dt-primary)' }" />
            </v-btn>
          </v-btn-toggle>
          <div class="builder-side-box" :style="`${darkMode ? 'background: #1F1F1F' : 'background: #fff'}`">
            <!-- <mediaList
              ref="mediaListClickCom"
              :content-title="sideboxSelected === 'layer' ? '레이어' : 'DT 미디어'"
              :sidebox-selected="sideboxSelected"
              :setting-modeling-list="settingModelingList"
              :is-model-down-need="sideboxSelected === 'layer' ? false : true"
              :media-set="mediaSet"
              @resetting-moedling-list="resettingModelingList"
              @click-component="clickComponent"
              @tree-click-id="gettreeClickId"
            ></mediaList> -->
          </div>
        </div>
        <div class="canvas-control-btn-group position-absolute translate-middle-x d-flex gap-3">
          <v-btn depressed elevation="2" icon style="background-color: rgba(255, 255, 255, 1)" class="btn-size3" @click="buttonClicked(true)"
            ><v-icon color="#000">mdi-plus</v-icon></v-btn
          >
          <v-btn depressed elevation="2" icon style="background-color: rgba(255, 255, 255, 1)" class="btn-size3" @click="buttonClicked(false)"
            ><v-icon color="#000">mdi-minus</v-icon></v-btn
          >
          <v-btn depressed elevation="2" icon style="background-color: rgba(255, 255, 255, 1)" class="btn-size3" @click="gridVisible = !gridVisible"
            ><v-icon color="#000">mdi-grid</v-icon></v-btn
          >
        </div>
        <div
          class="d-flex h-100"
          style="position: absolute; right: 0; transition: all 0.5s ease-in-out; align-items: flex-start; pointer-events: none"
          :style="{ right: dataBoxClose ? '0' : '-26.57143rem' }"
        >
          <div class="h-100" style="display: flex; align-items: center; pointer-events: all">
            <div class="data-template-box-right-btn" :style="{ backgroundColor: darkMode ? '#1F1F1F' : '#fff' }" @click="dataBoxClose = !dataBoxClose">
              <div>
                <v-icon style="width: 2rem; height: 2rem">{{ dataBoxClose ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
              </div>
            </div>
            <div style="width: 26.57143rem; height: 100%">
              <div
                v-show="sideboxSelected === 'media'"
                class="h-100 bg-white"
                style="
                  padding: 1.93rem 1.43rem;
                  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
                "
              >
                <span style="font-weight: 600; color: #4136c0; height: 2.42857rem; display: flex; align-items: center">환경 설정</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <BabylonCanvas ref="babylonCanvas" :get-item="getDownloadModeling" :grid-visible="true"> </BabylonCanvas> -->
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  components: {
    // BabylonCanvas: () => import('~/components/viewtrack/source/indoor-canvas.vue'),
  },
  data() {
    return {
      sideboxSelected: 'media',
      gridVisible: false,
      dataBoxClose: true, //오른쪽 box onoff

      getDownloadModeling: {}, //현재 다운받은 모델링 정보
      tagData: [],
    }
  },
  computed: {
    darkMode() {
      return this.$vuetify.theme.dark
    },
  },
  watch: {},
  methods: {
    buttonClicked(gettype) {
      this.$refs.babylonCanvas.handleParentClick(gettype)
    },
    inputTitle(title) {
      this.title = title
    },
  },
}
</script>

<style></style>
