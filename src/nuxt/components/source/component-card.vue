<template>
  <div
    v-if="viewTrash"
    style="position: relative"
    :class="gridArray"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @click="componetClickedEvent"
  >
    <div class="list-component-img-checkbox-remove custom-checkbox" :class="{ visible: stateRem }">
      <!-- <input id="c1" v-model="stateRem" type="checkbox" /> -->
      <v-checkbox
        :id="'remove-checkbox-' + cardInfo._id"
        v-model="stateRem"
        class="custom-v-checkbox"
        color="#7e73fe"
        @click.stop="onClickRemoveCheck"
      ></v-checkbox>
    </div>
    <div class="list-component-img justify-content-center d-flex" :style="{ background: imgView || mimetype == 'model' ? '#f8f8f9' : '#252525' }">
      <i v-if="imgView" :class="imgIcon"></i>
      <!-- <img v-if="mimetype !== 'model' && !imgView" :src="srcPathImg" class="img-fluid h-100" @error="handleImageError" /> -->
      <v-img v-if="mimetype !== 'model' && !imgView" :src="srcPathImg" class="img-fluid h-100" contain @error="handleImageError"></v-img>
      <model-viewer
        v-if="mimetype === 'model' && !imgView"
        :id="'model-viewer-' + cardInfo._id"
        :ref="`modelViewer`"
        class="model-viewer"
        reveal="auto"
        :src="srcPath"
        style="display: block; width: 100%; height: 100%"
        camera-controls
      >
      </model-viewer>

      <div class="list-component-img-checkIconbox dontNextScene" @click.stop="dontMovePage">
        <v-checkbox
          :id="'star-checkbox-' + cardInfo._id"
          v-model="stateFav"
          class="list-component-img-checkbox dontNextScene"
          style="display: none"
          @click.stop="onClickFavoritCheck"
        ></v-checkbox>
        <label :for="'star-checkbox-' + cardInfo._id" class="list-component-img-checkbox-star" :class="{ visible: stateFav }" @click.stop="dontMovePage">
          <!-- <v-icon class="btnIcon" style="color: #fff">mdi-star-outline</v-icon> -->
          <v-icon class="btnIcon" :style="{ color: stateFav ? '#ffc700' : '#fff' }">{{ stateFav ? `mdi-star` : `mdi-star-outline` }}</v-icon>
        </label>
      </div>
      <div v-show="runTime !== ''" class="running-time-view">{{ runTime }}</div>
    </div>

    <div class="list-components-dot-func dontNextScene saveClickedEvent">
      <div class="list-components-dot-func-icon dontNextScene saveClickedEvent" :class="{ 'is-visible': dotIconMenu }">
        <!-- @click="dotMenuOpenClick($event, item)" -->

        <v-btn icon @click.stop="dotMenuOpenClick">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
      <div
        class="list-components-dot-func-div dontNextScene saveClickedEvent"
        :style="{ visibility: dotIconMenu ? 'visible' : 'hidden' }"
        @click.stop="dontMovePage"
      >
        <div class="list-components-dot-func-div-delete dontNextScene saveClickedEvent" @click="menuClickedDeleteBtn">
          <!-- handleMenuClickDeleted -->
          <label class="dontNextScene">삭제하기</label>
        </div>
        <div
          v-if="builderInfo && builderInfo.toUpperCase() !== 'MEDIA'"
          class="list-components-dot-func-div-duplication dontNextScene saveClickedEvent"
          @click="handleMenuClickClone"
        >
          <label class="dontNextScene">복제하기</label>
        </div>
        <div class="list-components-dot-func-div-changeprojectimage dontNextScene saveClickedEvent" @click="handleNewFileButtonClick">
          <label class="dontNextScene">속성</label>
        </div>
      </div>
    </div>
    <!-- @click="toBuilderPage" -->
    <div class="components-contents" style="display: flex; flex-grow: 1">
      <div class="components-title">
        <div
          v-if="builderInfo && builderInfo.toUpperCase() !== 'MEDIA'"
          class="components-title-builderTag"
          :style="{
            background:
              builderInfo.toUpperCase() == '3D'
                ? '#92D1FF'
                : builderInfo.toUpperCase() == 'PLAYLIST'
                ? '#AAE895'
                : builderInfo.toUpperCase() == 'DASHBOARD'
                ? '#F8D592'
                : builderInfo.toUpperCase() == 'LAYOUT'
                ? '#F89CA1'
                : '#fff',
          }"
        >
          {{ builderInfo.toUpperCase() }}
        </div>
        <label class="list-components-title list-view-component" data-value="0">{{ cardName }}</label>
      </div>
      <div class="list-components-tags dontNextScene">
        <div class="list-components-tagList dontNextScene">
          <div class="dontNextScene" style="display: flex; gap: 0.79rem">
            <v-chip v-for="(items, index) in !componentsCheck ? cardTag : componentsListTag" :key="index" class="tagTye">
              {{ items }}
            </v-chip>
          </div>
          <v-btn
            icon
            :style="{ display: isTagOverflow ? 'block' : 'none', position: 'absolute' }"
            @click="
              {
                taglistOpen = !taglistOpen
              }
            "
            ><v-icon>mdi-dots-horizontal</v-icon>
            <div class="tag-box" :style="{ display: taglistOpen ? 'block' : 'none', top: '3rem' }">
              <v-chip-group ref="tagListContainer" active-class="''" column>
                <v-chip v-for="(items, index) in cardTag" :key="index" class="tagTye">
                  {{ items }}
                </v-chip>
              </v-chip-group>
              <div class="w-100" style="position: relative">
                <p
                  class="tag-blox-close-btn mb-0"
                  style="font-size: 1rem"
                  @click="
                    {
                      taglistOpen = false
                    }
                  "
                >
                  접기
                </p>
              </div>
            </div>
          </v-btn>
        </div>
      </div>
      <!-- 마지막 작업시간 -->
      <div class="list-components-timer">
        {{ timeAgo }}
      </div>
    </div>
    <ComponentPropertyTab
      :modal-view.sync="fixedProjectPopDisplay"
      :card-info="cardInfo"
      :input-name-type="inputNameType"
      :thumbnail-using="imgView"
      @click-cancel="handleCancelFixedButtonClick"
      @click-update="handleNewFileButtonClickCreate"
    />
    <DeleteCheckPop
      :deleted-view-boolean.sync="deletedChecked"
      :deleted-id="cardInfo._id"
      @click-cancel="deletedChecked = false"
      @click-delete="removeCheckedItems"
    />
  </div>
</template>

<script>
import TypecheckMixins from '~/components/viewtrack/source/divide-types-mixin'
export default {
  components: {
    ComponentPropertyTab: () => import('~/components/viewtrack/source/component-property-tab.vue'),
    DeleteCheckPop: () => import('~/components/viewtrack/source/delete-check-popup.vue'),
  },
  mixins: [TypecheckMixins],
  props: {
    cardInfo: {
      type: Object,
      default: function () {
        return {
          templateId: '',
          mediaId: '',
          dataId: '',
          docType: '',
          createdAt: '',
          _id: Math.random().toString(36).substr(2, 9), //임시 아이디로 생성 날짜 삽입.
          properties: {
            filename: '',
            mimetype: 'model', // 실제 속성에 들어간 mimetype 값,
            name: '', //이름
            originalname: '', //이름
            path: '',
            size: 0,
            tag: '',
            thumbnailname: '',
            uploadDate: '',
            favorites: false,
            userId: '',
            runningTime: '',
          },
        }
      },
    },
    arrayIndex: { type: Number, default: 0 },
    viewTypeList: { type: Boolean, default: false }, //true면 list타입 *필수
    componentsCheck: { type: Boolean, default: false }, //true면 컴포넌트..
    inputTypeName: { type: String, defalut: '파일명' },
    deleteCheck: { type: Boolean, defalut: false }, //삭제 모달 체크박스 (기본값 false : 모달창 보임)
  },
  data() {
    return {
      inputNameType: this.inputTypeName,
      viewTrash: true,
      stateFav: false,
      stateRem: false,
      dotIconMenu: false,
      interval: null, // interval 변수를 선언
      currentTimeData: new Date().getTime(),
      srcPathImg: '',
      isDragging: false,

      srcPath: '', //썸네일정보 require('~/assets/images/viewtrack/p/componentManage/Frame11645.svg')
      componentsListTag: [], //태그 리스트
      builderInfo: '', // 연결할 빌더 정보, [3D,PLAYLIST,LAYOUT,DASHBOARD] +MEDIA //
      extension: '', //확장명 [이미지, 영상, 소리 , 3D]
      runTime: '',

      imgView: true,
      imgIcon: 'dti-background_big',
      mimetype: '',
      deletedCheck: false,
      deletedCheckbox: false,
      fixedProjectPopDisplay: false, //속성창 띄우기 변수

      cardName: this.cardInfo.properties?.name,
      cardTag: this.cardInfo.properties?.tag,
      deletedChecked: false,

      isTagOverflow: false,
      taglistOpen: false,
    }
  },
  computed: {
    productBaseUrl() {
      return this.$config.viewtrack.productBaseUrl
    },
    gractorBaseUrl() {
      return this.$config.viewtrack.gractorBaseUrl
    },
    stateDtTemplateMap() {
      return this.$store.state.dtStudio.templateMap
    },
    gridArray() {
      return {
        emptyActive: true, // 기본 클래스
        'components-List-content': true,
        mediaView: !this.componentsCheck,
        'list-view-line': this.viewTypeList,
        'grid-list-view': !this.viewTypeList,
      }
    },
    timeAgo() {
      const now = this.currentTimeData
      let timestamp = 0
      if (this.cardInfo.updatedAt != undefined) timestamp = new Date(this.cardInfo.updatedAt).getTime()
      else timestamp = new Date(this.cardInfo.createdAt).getTime()

      const difference = now - timestamp
      const minutes = Math.floor(difference / (1000 * 60))
      const hours = Math.floor(difference / (1000 * 60 * 60))
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7))
      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30))
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365))

      if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`
      } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`
      } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`
      } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
      } else {
        return `just now`
      }
    },
  },
  watch: {
    cardInfo: {
      handler() {
        this.cardThumbnail()
        this.componentsListTag = this.cardInfo.properties.tag
        this.stateFav = this.cardInfo.properties.favorites ? this.cardInfo.properties.favorites : false
        this.stateRem = false
        this.cardName = this.cardInfo.properties.name
        this.mimetype = this.cardInfo.properties.mimetype == undefined ? '' : this.checkType(this.cardInfo.properties.mimetype)
        this.checkOverflow()
      },
      deep: true, // 객체 내부의 변화를 감시
    },
  },
  created() {
    this.stateFav = this.cardInfo.properties.favorites ? this.cardInfo.properties.favorites : false
    this.stateRem = false
    this.createdAt = new Date(this.cardInfo.createdAt).getTime()
    this.mimetype = this.cardInfo.properties.mimetype == undefined ? '' : this.checkType(this.cardInfo.properties.mimetype)

    this.cardThumbnail()

    const templateMap = JSON.parse(JSON.stringify(this.stateDtTemplateMap))
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)

    // await this.callAPIMedia()
    this.cardThumbnail()
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
    clearInterval(this.interval)
  },
  methods: {
    formatTime() {
      if (this.cardInfo.properties?.runningTime !== undefined) {
        const timeStr = this.cardInfo.properties?.runningTime
        const timeParts = timeStr?.split(':')

        if (timeParts.length !== 3) {
          this.formattedTime = 'Invalid format'
          return
        }

        const hours = parseInt(timeParts[0], 10)
        const minutes = parseInt(timeParts[1], 10)
        const seconds = parseFloat(timeParts[2])

        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
          this.formattedTime = 'Invalid format'
          return
        }

        const totalMinutes = hours * 60 + minutes
        const formattedMinutes = totalMinutes.toString().padStart(2, '0')
        const formattedSeconds = Math.floor(seconds).toString().padStart(2, '0')

        this.runTime = `${formattedMinutes}:${formattedSeconds}`
      }
    },
    onMouseDown() {
      this.isDragging = false
    },
    onMouseMove() {
      this.isDragging = true
    },
    onMouseUp() {
      // 드래그가 끝나면 상태를 초기화
      setTimeout(() => {
        this.isDragging = false
      }, 0)
    },
    dontMovePage(event) {
      event.stopPropagation()
    },
    onClickRemoveCheck() {
      //삭제 했을때, 휴지통 뜨게 하기 위해 + 해당 카드에 대한 인덱스 전달,,
      this.$emit('click-remove', this.cardInfo._id)
    },
    onClickFavoritCheck() {
      let obj = {
        star: this.stateFav,
        index: this.arrayIndex,
      }
      this.$emit('click-favorite', obj)
    },
    dotMenuOpenClick() {
      this.dotIconMenu = true
    },
    menuClickedDeleteBtn() {
      //삭제 모달창 켜기
      this.deletedChecked = true
    },
    removeCheckedItems(viewReCheck) {
      // 삭제 모달창 확인 버튼 눌렀을 때 호출
      this.deletedChecked = false //모달창 닫기
      this.$emit('check-confirm-delete', viewReCheck) // Props로 받은 값 (체크박스 반영해주기)
      this.handleMenuClickDeleted() //삭제 함수 호출
    },
    handleMenuClickDeleted() {
      this.$emit('click-deleted', this.cardInfo._id)
      // if componets
      this.dotIconMenu = false
    },
    handleMenuClickClone() {
      this.$emit('click-clone', this.cardInfo._id)
      this.dotIconMenu = false
    },
    handleNewFileButtonClick() {
      this.fixedProjectPopDisplay = !this.fixedProjectPopDisplay
      this.dotIconMenu = false
    },
    handleClickOutside(event) {
      let clickedElement = event.target
      if (!clickedElement.closest('.list-components-dot-func')) {
        this.dotIconMenu = false
      }
    },
    handleCancelFixedButtonClick() {
      this.fixedProjectPopDisplay = !this.fixedProjectPopDisplay
    },
    handleNewFileButtonClickCreate(_cardinfoProperties) {
      this.cardName = _cardinfoProperties.properties.name
      this.cardTag = [..._cardinfoProperties.properties.tag]
      //썸네일
      if (_cardinfoProperties.properties.thumbnailPath == '') {
        this.imgView = false
        this.srcPath = `${this.gractorBaseUrl}/api/${this.cardInfo.docType}/download?path=${this.cardInfo.properties.path}`
      } else {
        this.srcPath = _cardinfoProperties.properties.thumbnailPath
        this.imgView = false
      }
      if (this.extension == '3D' && this.cardInfo.docType == 'media') {
        this.imgView = false
        this.srcPath = `${this.gractorBaseUrl}/api/${this.cardInfo.docType}/download?path=${this.cardInfo.properties.path}&filename=${this.cardInfo.properties.filename}`
      }
      if (this.cardInfo.properties.thumbnailPath == undefined || this.cardInfo.properties.filename == undefined) {
        this.imgView = true
        this.srcPath = ''
      }
      this.srcPathImg = this.srcPath

      this.fixedProjectPopDisplay = !this.fixedProjectPopDisplay
    },
    cardThumbnail() {
      switch (this.mimetype) {
        case 'photo':
          this.extension = '이미지'
          this.builderInfo = 'PLAYLIST'
          this.imgIcon = 'dti-background_big'
          break
        case 'video':
          this.extension = '영상'
          this.builderInfo = 'PLAYLIST'
          this.imgIcon = 'dti-video_big'
          break
        case 'sound':
          this.extension = '소리'
          this.builderInfo = 'PLAYLIST'
          this.imgIcon = 'dti-video_big'
          break
        case 'model':
          this.extension = '3D'
          this.builderInfo = '3D'
          this.imgIcon = 'dti-background_big'
          break
        default:
          if (this.cardInfo.properties?.builder?.toUpperCase() == 'PLAYLIST') this.extension = '영상'
          else this.extension = '3D'

          this.builderInfo = this.cardInfo.properties.builder
          this.mimetype = this.cardInfo.properties.builder

          break
      }
      if (!this.componentsCheck) if (this.cardInfo.docType == 'media') this.builderInfo = 'MEDIA'
      try {
        this.srcPath = ''
        if (this.cardInfo.properties.thumbnailPath == '') {
          this.imgView = false
          this.srcPath = `${this.gractorBaseUrl}/api/media/download?path=${this.cardInfo.properties.path}`
        } else {
          this.imgView = false
          this.srcPath = `${this.gractorBaseUrl}/api/media/download?path=${this.cardInfo.properties.thumbnailPath}`
        }

        if (this.extension == '3D' && this.cardInfo.docType == 'media') {
          this.imgView = false
          this.srcPath = `${this.gractorBaseUrl}/api/media/download?path=${this.cardInfo.properties.path}&filename=${this.cardInfo.properties.filename}`
        }
        if (!this.componentsCheck && (this.cardInfo.properties.thumbnailPath == undefined || this.cardInfo.properties.filename == undefined)) {
          this.imgView = true
          this.srcPath = ''
        }
        this.srcPathImg = this.srcPath
      } catch {
        this.srcPath = ''
        this.imgView = true
      }
      try {
        if (this.cardInfo.properties.tag == '') this.componentsListTag = []
        else {
          if (Array.isArray(this.cardInfo.properties.tag)) this.componentsListTag = this.cardInfo.properties.tag
          else {
            this.componentsListTag = JSON.parse(this.cardInfo.properties.tag)
            if (typeof this.componentsListTag === 'string') {
              try {
                this.componentsListTag = [...JSON.parse(this.componentsListTag)]
              } catch (e) {
                console.error('Invalid JSON string', e)
                this.componentsListTag = [] // 기본 값 설정 (필요한 경우)
              }
            }
          }
        }
        this.cardTag = [...this.componentsListTag]
      } catch (e) {
        // console.error('Failed to parse item.tag:', e)
        this.componentsListTag = []
      }
      try {
        if (this.cardInfo.properties.runningTime !== '') this.formatTime()
      } catch {
        this.runTime = ''
      }
    },
    handleImageError(event) {
      this.imgView = true
    },
    componetClickedEvent(event) {
      if (!this.isDragging) {
        // 특정 요소를 클릭했는지 확인하여 페이지 이동을 방지
        // 체크박스와, 즐겨찾기, 점3개, 메뉴 클릭했을 때를 제외하고 넘겨주기
        if (event.target.closest('.dontNextScene') || event.target.closest('.custom-checkbox') || event.target.closest('.saveClickedEvent')) {
          return
        }
        //먼저 미디어인지 컴포넌트인지 파악
        if (!(this.builderInfo.toUpperCase() == 'MEDIA' || this.builderInfo.toUpperCase() == '')) {
          //빌더뭔지 파악
          //미디어 아이디값 넘겨주기 this.$router.push({ path: '/target', query: { id } });
          if (this.builderInfo.toUpperCase() == '3D') {
            this.$router.push({ path: '/viewtrack/p/3d-builder', query: { _id: this.cardInfo._id } })
          } else if (this.builderInfo.toUpperCase() == 'PLAYLIST') {
            this.$router.push({ path: '/viewtrack/p/playlist', query: { _id: this.cardInfo._id } })
          }
        }
      }
    },
    checkOverflow() {
      if (this.cardTag.length > 2) {
        this.isTagOverflow = true
      } else {
        this.isTagOverflow = false
      }
    },
  },
}
</script>
<style lang="scss">
.running-time-view {
  position: absolute;
  right: 0.79rem;
  bottom: 0.79rem;
  display: flex;
  padding: 0.14286rem 0.64286rem;
  justify-content: center;
  align-items: center;
  gap: 0.71429rem;
  border-radius: 3.57143rem;
  background: #1e1e1e;

  color: var(--DT-light-dt_bg_1, #fff);
  text-align: center;

  /* DT-text/Button1_medi_14 */
  font-family: 'Noto Sans';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.list-view-line .running-time-view {
  width: 2.6875rem;
  height: 1.25rem;
  bottom: 0.29rem;
  right: 0.29rem;
  font-size: 0.75rem;
}

.list-components-dot-func-icon {
  visibility: hidden;
}
.components-List-content:hover .list-component-img-checkbox-star,
.components-List-content:hover .list-component-img-checkbox-remove,
.components-List-content:hover .list-components-dot-func-icon {
  visibility: visible;
}

.list-components-dot-func-icon.is-visible {
  visibility: visible;
}

.components-List-content:hover .list-component-img-checkIconbox {
  background-color: var(--box-favoritebtn-icon-);
  border-radius: 0.19rem;
}

.components-List-content:hover svg circle {
  fill: #000;
}

.grid-list-view .components-List-content .list-components-dot-func,
.grid-list-view.components-List-content .list-components-dot-func {
  position: absolute;
  right: -1.15rem;
  top: calc(100% * (11.78571 / 18));
  // bottom: 1.5rem;
  fill: #000;
}

.grid-list-view .components-List-content,
.grid-list-view.components-List-content {
  width: calc(18em + (1vw * 1));
  height: calc(17.64286rem + (1vw * 1));
  // flex: 1 1 calc((100% / 6) - (4rem + (1vw * 0.5))); /* 기본 크기를 1/6로 설정하고 gap 만큼을 뺀 값 */
  // aspect-ratio: 18 / 17.6426; /* 비율을 유지합니다 */
  // width: 18rem;
  // height: 17.64286rem;
}
.mediaView.grid-list-view.components-List-content {
  //자동 조절
  // width: calc(18em + (1vw * 1));
  // height: calc(17.64286rem + (1vw * 1));
  width: 18.7rem;
  height: 17.64286rem;
}

.grid-list-view #components-List {
  display: flex;
  flex-wrap: wrap;
  gap: calc(4.8571rem + (1vw * 0.5)) calc(6rem + (1vw * 0.38));
  //height: 40rem;
  // display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  // grid-auto-rows: calc(17.64286rem + (1vw * 1));
  // gap: calc(4.8571rem + (1vw * 0.5)) calc(4.14rem + (1vw * 0.5));
  // width: 100%;
  // min-height: 40rem;

  overflow-x: hidden;
  overflow-y: hidden;

  padding-bottom: 8rem;
}

.list-component-img-checkIconbox {
  width: 3rem;
  height: 3rem;
  margin: 0.71rem 0.79rem;
  top: 0;
  position: absolute;
  right: 0;
}

.list-component-img-checkbox-star {
  visibility: hidden;
  padding: 0;
  background-color: #2f2f2fb2;
  -webkit-appearance: none;
  outline: none !important;
  width: 3rem;
  height: 3rem;
  border-radius: 0.19rem;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mediaView.list-view-line.components-List-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 7rem;
}
.components-contents {
  flex-direction: column;
}
.list-view-line .components-contents {
  flex-direction: row;
  align-items: center;
}
.list-view-line .list-component-img-checkIconbox {
  right: 1rem !important;
}
.list-component-img-checkbox-remove {
  z-index: 2;
}
.list-component-img-checkbox-star.visible,
.list-component-img-checkbox-remove.visible {
  visibility: visible;
  padding: 0;
}
.list-component-img-checkbox-remove {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
}

.custom-v-checkbox {
  margin: 0;
  padding: 0.71rem 0.93rem;
  color: #7e73fe !important;
  & .v-input__slot {
    margin: 0;
  }
  & .v-messages {
    display: none;
  }
}
.custom-checkbox .theme--light.v-icon {
  color: #7e73fe !important;
}
.grid-list-view .list-component-img {
  position: relative;
  width: 100%;
  // height: 11.78571rem;
  height: calc(100% * (11.78571 / 18));
  border: 2px solid #f0f0f0;
  border-radius: 0.21429rem;
}

.grid-list-view .list-component-img img,
.list-view-line .list-component-img img,
.grid-list-view .list-component-img .model-viewer {
  width: auto;
  height: 100%;
  border-radius: 0.1875rem;
}
.components-title-builderTag {
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  min-width: 2.5rem; /* 최소 너비 지정 */
  width: auto; /* 너비를 자동으로 조정 */
  height: 1.42857rem;
  padding: 0.14286rem 0.5rem;
  border-radius: 0.21429rem;
  background: #fff; /* 배경색은 따로 지정 */
  color: #fff;
  font-family: 'Noto Sans KR';
  font-size: 0.85714rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.04286rem;
  box-sizing: border-box; /* padding과 border를 포함하여 요소의 실제 너비 계산 */
}

.grid-list-view .components-title {
  width: 16.0743rem;
  height: 3em;
  padding: 0.64286rem 0.71429rem 0.57143rem 0rem;
  margin-top: 0.29rem;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.57rem;
  cursor: pointer;
}
.list-components-timer {
  display: none;
}
.grid-list-view .list-components-title {
  width: 12rem;
  color: #000;
  font-family: 'Noto Sans';
  font-size: 1.28571rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  cursor: pointer;
}

.grid-list-view .list-components-times-date {
  width: 16.6875rem;
  height: 1rem;
  margin-top: 0.19rem;
}

.grid-list-view .list-components-time {
  color: var(--sub-font-color-);

  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.list-components-tagList {
  width: 13.5rem;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  flex-direction: row;
  position: relative;
  gap: 0.79rem;
  margin-top: 0.57rem;
}

.tagTye {
  display: flex;
  height: 2rem;
  width: auto;
  padding: 0.28571rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 3.57143rem;
  background-color: #f9fafb !important;
}

.tagTye .v-chip__content {
  height: 1.1875rem;
  width: auto;
  color: #1e1e1e;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.list-view-line .list-components-delete {
  display: none;
}
.list-view-line .list-components-tagList,
.list-view-line .list-components-tags {
  width: 45%;
}
.mediaView.list-view-line .list-components-timer {
  width: 25%;
}
.list-view-line .list-components-timer {
  display: flex;
  color: #1e1e1e;
  font-family: 'Noto Sans KR';
  font-size: 1.07143rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.delete-components .list-components-delete {
  display: flex;
}

.grid-list-view .list-components-creat,
.grid-list-view .list-components-delete {
  display: none;
}

.list-view-line .components-List-content .list-components-dot-func,
.list-view-line.components-List-content .list-components-dot-func {
  z-index: 5;
  position: absolute;
  right: 3.38rem;
  top: 50%;
  fill: #fff;
  transform: translateY(-50%) translateX(1.25rem);
}
.list-component-img i {
  display: flex;
  font-size: 5rem;
  color: #cccccc;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.list-view-line .list-component-img i {
  font-size: 2rem;
}

.list-view-line .list-component-img-checkIconbox {
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  margin: 0.25rem;
}

.list-view-line .list-component-img-checkbox-remove {
  position: static;
}

.list-view-line #components-List {
  width: 100%;
  height: 100%;
  gap: 1rem;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  padding-bottom: 6rem;
  overflow-y: hidden;
}

.grid-list-view #components-List #list-components-creat {
  display: none;
}

.grid-list-view .components-adrees {
  display: none;
  padding: 0 2rem;
  width: 29.6rem;
}

.list-view-line .list-component-img {
  position: relative;
  width: 8.07143rem;
  height: 5.28486rem;
  border-radius: 0.09607rem;
  margin: 0 1.43rem;
  border: 2px solid #f0f0f0;
}

.list-view-line img {
  width: 100%;
  height: 100%;
}
.list-view-line .components-title {
  width: 30%;
  height: 3em;
  padding: 0.64286rem 0.71429rem 0.57143rem 0rem;
  margin-top: 0.29rem;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.57rem;
  cursor: pointer;
}
.list-view-line .list-components-title {
  display: flex;
  align-items: center;
  width: 80%;
  height: 3rem;
  margin: 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 1.28571rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
}

.list-view-line .list-components-creat {
  display: flex;
  align-items: center;
  width: 14.56rem;
  height: 3.375rem;
  margin: 0 0.5rem;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
}

.list-view-line .list-components-time {
  width: auto;
}

.list-view-line .list-components-times-date {
  display: flex;
  align-items: center;
  width: 9.5rem;
  height: 53.25%;
  margin: 0 2rem;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
}

.list-view-line .delete-components .list-components-time {
  display: none;
}

.list-components-dot-func-icon {
  padding: 1.25rem;
}

.list-components-dot-func-div {
  z-index: 2;
  visibility: hidden;
  position: absolute;
  right: 0;
  transform: translateX(-1.25rem) translateY(-1rem);

  padding: 0.28751rem;
  background-color: #fff;
  border-radius: 0.21429rem;
  overflow: hidden;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
}

.list-components-dot-func-div div {
  width: 14rem;
  height: 3rem;
  padding: 0.78571rem 1rem;
  color: #1e1e1e;

  font-size: 1.07143rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.list-components-dot-func-div div:hover {
  background-color: #f3f4f5;
}

.list-components-dot-func-div div:active {
  animation-name: ClickedBtnBackgroundAnimations;
  animation-duration: 2s;
}

@keyframes ClickedBtnBackgroundAnimations {
  0% {
    background-color: #f3f4f5;
  }

  100% {
    background-color: #f3f4f5;
  }
}

.theme--dark .components-title-builderTag {
  color: #1f1f1f;
}
.theme--dark .list-components-title,
.theme--dark .tagTye .v-chip__content {
  color: #f0f0f0;
}
.theme--dark .tagTye {
  background-color: #2a2a2a !important;
}
.theme--dark .list-component-img {
  border: 2px solid #353535;
  background: #252525 !important;
}

.theme--dark .running-time-view {
  color: #1f1f1f;
  background-color: #f0f0f0;
}

.theme--dark .list-component-img-checkbox-star {
  background-color: #f0f0f0a9;
}

.theme--dark .list-components-timer {
  color: #f0f0f0;
}

.theme--dark .list-components-dot-func-div {
  background-color: #1f1f1f;
}

.theme--dark .list-components-dot-func-div div {
  color: #f0f0f0;
}
.theme--dark .list-components-dot-func-div div:hover {
  background-color: #3b3b3b;
}

.list-components-dot-func-div div:active {
  animation-name: none;
}
</style>
