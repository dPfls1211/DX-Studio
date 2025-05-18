<template>
  <section id="startPage" class="d-flex">
    <div id="mainView-component-components" :class="gridArray" class="f-full w-100 d-flex" style="flex-direction: column">
      <div id="mainView-component-components-top" style="display: flex; height: 14rem; flex-direction: column">
        <div id="components-top" style="display: flex; width: 100%; flex-direction: row; justify-content: space-between; align-items: flex-start">
          <label style="color: #68696a; font-size: 1.07143rem; font-weight: 400">미디어를 활용해 컴포넌트를 제작하고 관리해 보세요 </label>

          <div id="component-top-btn" style="gap: 1rem; display: flex; flex-direction: row">
            <div
              :style="{
                position: 'relative',
                width: 'auto',
                height: '3rem',
                backgroundColor: inputVisible ? '#fff' : '#f3f4f5',
                borderRadius: '0.21429rem',
                display: 'flex',
                cursor: 'pointer',
                border: inputVisible ? '2px solid #7e73fe' : '2px solid #ffffff00',
                transition: 'width 1s ease',
              }"
              tabindex="1"
              class="component-search-name-tag"
              :class="{ openSearch: inputVisible }"
              @click="showInput"
            >
              <div style="width: 3rem; height: 2.8rem; display: flex; justify-content: center; align-items: center">
                <i
                  class="dti-search"
                  :style="{
                    fontSize: '1.5rem',
                    color: inputVisible ? '#7e73fe' : '#000', // Change the icon color based on inputVisible
                  }"
                ></i>
              </div>
              <input
                ref="searchInput"
                v-model="componentsListSearch"
                :style="{
                  width: inputVisible ? '17rem' : '0',
                  paddingRight: inputVisible ? '3rem' : '0',
                  transition: 'width 1s ease, paddingRight 1s ease ',
                }"
                type="text"
                placeholder="이름 혹은 태그를 검색하세요"
                autocomplete="off"
                @blur="handleBlur"
              />
              <div
                v-if="inputVisible == true"
                style="
                  width: 2rem;
                  height: 2rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: absolute;
                  right: 0.5rem;
                  top: 0.5rem;
                  cursor: pointer;
                "
                @click="contentsSearchCancel('componentsListSearch')"
              >
                <v-icon>mdi-window-close</v-icon>
              </div>
            </div>
            <v-btn class="newComponentBtn" depressed style="background-color: rgba(126, 115, 254, 1); color: white" @click="handleNewProjectBtnClick"
              >NEW</v-btn
            >
          </div>
        </div>
        <div class="d-flex justify-content-between f-row" style="height: 8.14rem; margin-top: 2rem">
          <div class="d-flex justify-content-between f-column" style="padding-top: 0.5rem; width: 40rem">
            <div style="display: flex; flex-direction: row; justify-content: space-between">
              <Selectbox3d
                id="selectboxDownloadModal"
                :solution-on="true"
                :get-word="'sss'"
                :type-on="false"
                :tag-on="true"
                :use-tag-list="true"
                :get-tag-list="filteredItems"
                style="width: 20.5rem"
                @selected-option="selectedTag"
              ></Selectbox3d>

              <Selectbox3d
                id="selectboxDownloadModal"
                :solution-on="false"
                :type-on="false"
                :is-filter-icon="true"
                :tag-on="false"
                :use-tag-list="false"
                :get-list="filterStates"
                style="width: 16.85714rem"
              ></Selectbox3d>
            </div>
            <div style="padding: 1.5rem 0 1.64rem 0">
              <!-- 태그 넣을 예정 -->
              <template v-if="selectedOptionsTags">
                <div class="builder-side-box-taglist">
                  <v-chip-group active-class="''" column>
                    <v-chip v-for="(tag, index) in selectedOptionsTags" :key="index" close outlined @click:close="selectTagOption(tag)">
                      {{ tag.label }}
                    </v-chip>
                  </v-chip-group>
                </div>
              </template>
            </div>
          </div>
          <div id="components-bottom-listBtn" style="gap: 1rem; width: 11rem" class="d-flex f-row justify-content-between">
            <v-btn
              class="click-btn-event component-listBtn-view components-bottom-listBtn-remove-btn d-flex justify-content-center align-items-center"
              :style="{ visibility: selectedDeleted.length > 0 ? 'visible' : 'hidden', width: '3rem !important', height: '3rem' }"
              depressed
              @click="viewDeletecheck"
            >
              <!-- <v-icon size="28" style="color: #ff7373">mdi-trash-can-outline</v-icon> -->
              <i class="dti-trashcan" style="font-size: 3rem; color: #ff7373"></i>
            </v-btn>
            <v-btn-toggle v-model="sideboxGridOn" style="gap: 1rem" mandatory>
              <v-btn id="components-bottom-listBtn-viewbox" value="list" class="click-btn-event component-listBtn-view" @click="handleViewListButtonClick">
                <i class="dti-list" style="font-size: 3rem"></i>
              </v-btn>
              <v-btn id="components-bottom-listBtn-viewList" value="grid" class="click-btn-event component-listBtn-view" @click="handleViewBoxButtonClick">
                <i class="dti-card" style="font-size: 3rem"></i></v-btn
            ></v-btn-toggle>
          </div>
        </div>
      </div>
      <div v-if="componentsList.length < 1" class="d-flex justify-content-center align-items-center w-100 h-50" style="flex-direction: column">
        <v-icon color="#5C5D5E" size="90">mdi-folder-open-outline</v-icon>
        <p id="components-list-empty-doc" style="color: #1e1e1e; font-size: 1.42857rem; font-weight: 500; margin: 0.79rem 0 0.57rem 0">비어있습니다.</p>
        <p id="components-list-empty-expl" style="color: #68696a; font-size: 1.14286rem; font-weight: 400">컴포넌트를 제작해 보세요</p>
      </div>
      <div v-if="componentsList.length > 0" class="w-100 f-column align-items-center h-100" style="flex-grow: 0">
        <div id="list-view-index" :style="{ display: contentsArrayIsActive ? 'flex' : 'none', height: '3rem' }">
          <div id="list-view-index-name"><label>이름</label></div>
          <div id="list-view-index-adress"><label>태그</label></div>
          <div id="list-view-index-create"><label>마지막 작업 시간</label></div>
        </div>

        <overlay-scrollbars-vue class="f-full h-100 w-100">
          <div id="components-List" class="f-full w-100">
            <ComponentCard
              v-for="(item, index) in filteredItems"
              :key="item.id"
              :view-type-list="contentsArrayIsActive"
              :card-info="item"
              :array-index="index"
              :components-check="true"
              :input-type-name="'컴포넌트 명'"
              class="components-List-content"
              @click-remove="onClickRemoveCheck(item)"
              @click-favorite="onClickFavoritCheck"
              @click-deleted="handleMenuClickDeleted"
              @click-clone="handleMenuClickClone"
              @click-fixingPopup="handleNewFileButtonClick"
            ></ComponentCard>
          </div>
        </overlay-scrollbars-vue>
      </div>
    </div>
    <!-- <ComponentPropertyTab
      :modal-view.sync="fixedProjectPopDisplay"
      :card-info="selectedComponents"
      :card-number="selectedComponentsIndex"
      :builder-clicked="builderClicked"
      :edit-mode="componentsEditmode"
      @click-cancel="handleCancelFixedButtonClick"
      @click-update="handleNewFileButtonClickCreate"
    /> -->
    <DeleteCheckPop
      :deleted-view-boolean.sync="deletedCheck"
      :deleted-id="selectedDeletedId"
      :deleted-id-list="selectedDeleted"
      @click-cancel="deletedCheck = false"
      @click-delete="removeCheckedItems"
    />
    <v-dialog v-model="overlay" persistent>
      <div class="newProjectBtnPop f-column" :style="{ display: newProjectPop ? 'flex' : 'none' }">
        <div class="newProjectBtnPopPanel w-100 h-100 d-flex justify-content-between align-items-center">
          <div
            style="width: 2rem; height: 2rem; display: flex; justify-content: center; align-items: center; position: absolute; right: 2rem; top: 2rem"
            @click="handleNewProjectBtnClick"
          >
            <v-btn icon color="#434445">
              <v-icon color="#434445">mdi-window-close</v-icon>
            </v-btn>
          </div>
          <v-btn depressed color="#F0EEFF80" class="newProjectBtnPopPanelPageMove" @click="moveTo3Dbuilder">
            <v-icon style="font-size: 5rem" class="dti-background_big" />
            <label>3D builder</label>
          </v-btn>
          <v-btn
            depressed
            color="#F0EEFF80"
            class="newProjectBtnPopPanelPageMove d-flex f-column justify-content-center align-items-center"
            @click="moveToPlaylist"
          >
            <i style="font-size: 5rem" class="dti-playlist_big"></i>
            <label>playlist</label>
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </section>
</template>

<script>
import 'maplibre-gl/dist/maplibre-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

export default {
  components: {
    ComponentCard: () => import('~/components/viewtrack/source/component-card.vue'),
    // ComponentPropertyTab: () => import('~/components/viewtrack/source/component-property-tab.vue'),
    Selectbox3d: () => import('~/components/viewtrack/source/3d-select-box.vue'),
    DeleteCheckPop: () => import('~/components/viewtrack/source/delete-check-popup.vue'),
    OverlayScrollbarsVue: () => import('overlayscrollbars-vue').then(({ OverlayScrollbarsComponent }) => OverlayScrollbarsComponent),
  },
  layout: 'default',
  props: {
    maxBounds: { type: Array, default: () => [] },
    center: { type: Array, default: () => [] },
    filter: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      sideboxGridOn: 'grid',
      items: [
        { text: '최신순', value: 1 },
        { text: '오래된 순', value: 2 },
      ],
      fixedProjectPopDisplay: false,
      newProjectPop: false,

      componentsDotMenu: false,
      fixedProjectPopName: 'project',
      componentsTagList: [],
      componentsList: [],
      contentsViewList: [],
      applyContentsImg: null,
      contentsArrayIsActive: false,
      inputVisible: false,
      componentsListSearch: '',
      overlay: false,
      componentsEditmode: false,
      filterStates: [
        { label: '전체보기', value: 'all' },
        { label: '3D', value: '3D' },
        { label: 'playlist', value: 'playlist' },
      ],
      selectorStates: [
        { label: '전체보기', value: 'all' },
        { label: '즐겨찾기', value: 'fav' },
      ],
      solutionStates: [
        { label: 'FSMS', value: 'FSMS' },
        { label: 'AMI', value: 'AMI' },
        { label: 'Smart home', value: 'Smart home' },
      ],
      tagStates: null,
      selectedOptionsTags: {},
      sortSelected: { label: '전체보기', value: 'all' }, // 현재 선택된 옵션
      selected: { label: '전체보기', value: 'all' }, // 현재 선택된 옵션
      sortIsOpen: false, // 드롭다운 열림 상태
      isOpen: false, // 드롭다운 열림 상태
      solutionOptions: null,
      selectedComponentsIndex: -1,
      modelingList: [],
      selectedComponents: {},
      builderClicked: false,
      selectedDeleted: [], //삭제 체크박스 선택한 컴포넌트
      deletedCheck: false,
      deletedCheckbox: false,
      selectedDeletedId: '',
      selectedTagsArray: [],
    }
  },
  computed: {
    productBaseUrl() {
      return this.$config.viewtrack.productBaseUrl
    },
    gractorBaseUrl() {
      return this.$config.viewtrack.gractorBaseUrl
    },
    gridArray() {
      return {
        emptyActive: true, // 기본 클래스
        'list-view-line': this.contentsArrayIsActive,
        'grid-list-view': !this.contentsArrayIsActive,
      }
    },
    filteredItems() {
      //검색 및 필터 시 정렬될 리스트업
      let viewlist = this.contentsViewList
      if (this.sortSelected.value == 'fav') {
        viewlist = this.contentsViewList.filter(item => item.star == true)
      }
      const validValues = Object.values(this.selectedTagsArray).map(tag => tag.label)
      if (validValues.length > 0) {
        try {
          viewlist = viewlist.filter(project => project.properties.tag.some(tag => validValues.includes(tag)))
        } catch {}
      }

      if (this.componentsListSearch.trim() === '') {
        // 검색어가 비어있을 때는 모든 항목을 반환
        return viewlist
      } else {
        // 검색어가 비어있지 않을 때는 필터링된 항목을 반환
        const query = this.componentsListSearch.toLowerCase()
        return viewlist.filter(item => item.properties.name.toLowerCase().includes(query))
      }
    },
    hasCheckedItems() {
      return this.contentsViewList.some(item => item.remove)
    },
  },
  watch: {
    componentsList: {
      //최신순 정렬이엇던...것..
      deep: true,
      handler(newVal, oldVal) {
        this.contentsViewList = newVal
      },
    },
    selectedOptionsTags(newVal, oldVal) {
      if (this.useTagList) {
        // this.$emit('updateselected-option', newVal)
        // this.$emit('updateselected-option', this.selectedOptionsTags)
      }
    },
  },
  async mounted() {
    document.addEventListener('click', this.handleClickOutside)

    setInterval(this.timeCompare, 1000)
    const sortRadio = document.querySelectorAll('.RecentSorting')
    sortRadio.forEach(radioButton => {
      radioButton.addEventListener('change', this.sortSelectReset)
    })
    const filesSortRadio = document.querySelectorAll('.fileSorting')
    filesSortRadio.forEach(radioButton => {
      radioButton.addEventListener('change', this.FilesortSelectReset)
    })
    const uniqueTags = [...new Set(this.contentsViewList.flatMap(project => project.componentsListTag))]
    this.tagStates = uniqueTags.map((tag, index) => ({
      label: tag,
      value: (index + 1).toString(),
    }))
    const solutionOptionsTag = [...new Set(this.contentsViewList.flatMap(project => project.solution))]
    this.solutionOptions = solutionOptionsTag.map(tag => ({
      label: tag,
      value: tag.substring(0, 3), // (index + 1).toString(),
    }))
    await this.callAPIMedia()

    this.contentsViewList = [...this.componentsList]
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    selectedTag(val) {
      this.selectedTagsArray = val
    },
    moveTo3Dbuilder() {
      this.$router.push('/viewtrack/p/3d-builder')
    },
    moveToPlaylist() {
      this.$router.push('/viewtrack/p/playlist')
    },
    onClickRemoveCheck(removeId) {
      const existCheckId = this.selectedDeleted.find(id => removeId._id === id)
      if (existCheckId == undefined) {
        this.selectedDeleted.push(removeId._id)
      } else {
        this.selectedDeleted.pop(removeId._id)
      }
    },
    onClickFavoritCheck(favoritValue) {
      this.contentsViewList[favoritValue.index].star = favoritValue.star
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.selected = option
      this.isOpen = false // 옵션 선택 후 드롭다운 닫기
    },
    selcetOptionView(option) {
      this.sortSelected = option
      this.sortIsOpen = false
    },
    totalSelectOption(option) {
      if (this.selectedOptionsTags[option.value]) {
        this.$delete(this.selectedOptionsTags, option.value)
      } else {
        this.$set(this.selectedOptionsTags, option.value, {
          label: option.label,
          value: option.value,
        })
      }
    },
    closeDropdown(event) {
      if (this.$refs.dropdownMenu && !this.$refs.dropdownMenu.contains(event.target)) {
        this.isOpen = false
      }
    },

    selectTagOption(option) {
      if (this.selectedOptionsTags[option.value]) {
        this.$delete(this.selectedOptionsTags, option.value)
      } else {
        this.$set(this.selectedOptionsTags, option.value, {
          label: option.label,
          value: option.value,
        })
      }
    },
    async viewDeletecheck() {
      if (!this.deletedCheckbox) this.deletedCheck = !this.deletedCheck
      else {
        try {
          await Promise.all(this.selectedDeleted.map(id => this.$axios.delete(`${this.productBaseUrl}/api/component/${id}`)))

          this.componentsList = this.componentsList.filter(component => !this.selectedDeleted.includes(component._id))
          // 선택된 항목 초기화
          this.selectedDeleted = []
          this.selectedDeletedId = ''
        } catch (error) {
          console.error('Failed to delete components:', error)
        }
      }
    },
    async removeCheckedItems(viewReCheck) {
      if (viewReCheck.checkbox) this.deletedCheckbox = true
      this.deletedCheck = false
      await Promise.all(
        this.selectedDeleted.map(id =>
          this.$axios.delete(`${this.productBaseUrl}/api/component/`, {
            params: { _id: id },
          })
        )
      )

      this.componentsList = this.componentsList.filter(component => !this.selectedDeleted.includes(component._id))
      // 선택된 항목 초기화
      this.selectedDeleted = []

      this.contentsViewList = this.componentsList
    },
    contentsSearchCancel(textContent) {
      this[textContent] = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
    },
    handleBlur() {
      if (this.componentsListSearch.trim() === '') {
        this.inputVisible = false
      }
    },
    reverseItems() {
      // 배열을 복제한 후 역순으로 정렬하여 변경합니다.
      this.contentsViewList = this.componentsList.slice().reverse()
    },
    dontMovePage(event) {
      event.stopPropagation()
    },
    handleClickOutside(event) {
      this.componentsDotMenu = false
      this.componentsList.forEach(item => {
        item.componentsListDotMenu = false
      })
      this.contentsViewList.forEach(item => {
        item.componentsListDotMenu = false
      })
      let clickedElement = event.target

      const listBtnSearchingInput = document.querySelector('#listBtn-searching-input')
    },
    handleNewProjectBtnClick() {
      this.newProjectPop = !this.newProjectPop
      this.overlay = !this.overlay
    },
    handleNewFileButtonClick(_id) {
      const foundItem = this.componentsList.find(item => item._id === _id)

      if (foundItem) {
        this.foundItem = foundItem // foundItem을 컴포넌트의 상태로 저장
      } else {
        this.foundItem = null // 항목을 찾지 못했을 경우 null로 설정
      }

      let name = this.foundItem.properties.name
      this.componentsTagList = this.foundItem.properties.tag

      this.fixedProjectPopDisplay = !this.fixedProjectPopDisplay
      this.fixedProjectPopName = name
      // this.overlay = !this.overlay

      this.componentsEditmode = false

      this.selectedComponents = foundItem
      // this.selectedComponentsIndex = index
    },

    handleCancelFixedButtonClick() {
      this.fixedProjectPopDisplay = !this.fixedProjectPopDisplay
      this.fixedProjectPopName = ''
      this.overlay = false
      this.componentsEditmode = false
      this.selectedComponentsIndex = -1
      if (this.builderClicked) {
        this.builderClicked = false
        this.newProjectPop = false
      }
    },

    handleNewFileButtonClickCreate() {
      this.overlay = false
      this.componentsEditmode = false
      this.fixedProjectPopDisplay = !this.fixedProjectPopDisplay
    },
    async handleMenuClickDeleted(componentsid) {
      this.selectedDeletedId = componentsid
      try {
        await this.$axios.delete(`${this.productBaseUrl}/api/component/`, {
          params: { _id: componentsid },
        })
        // this.viewTrash = false

        this.componentsList = this.componentsList.filter(item => item._id !== componentsid)
        this.selectedDeletedId = ''
      } catch (error) {
        console.error('Failed to delete components:', error)
      }

      this.contentsViewList = this.componentsList

      // 원본 리스트에서 삭제
    },
    async handleMenuClickClone(_id) {
      // 원본 객체를 복제합니다.
      //id같은 거 찾기
      const foundItem = this.componentsList.find(item => item._id === _id)
      //이름 _clone붙이고
      if (foundItem) {
        // properties 객체를 깊은 복사(deep copy)하여 복사본을 생성
        let properties_ = JSON.parse(JSON.stringify(foundItem.properties))
        properties_.name = foundItem.properties.name + '_clone'

        // 서버에 POST 요청 보내기
        try {
          await this.$axios.post('api/component', {
            templateId: foundItem.templateId,
            properties: properties_,
          })

          //넣어준거 다시 호출
          await this.callAPIMedia()
        } catch (error) {
          console.error('Error:', error.response ? error.response : error.message)
        }
      } else {
        console.error('Item not found')
      }
      // 새로 고침 하든가.. 아니면 임의로 넣어주거나 다시 호출하거나 흠..

      // let contentsAdd = { ...this.componentsList[index] }
      // // 복제한 객체의 속성을 수정합니다.
      // contentsAdd.name = contentsAdd.name + '_clone'
      // contentsAdd.createTime = new Date().getTime()
      // // 복제한 객체를 배열의 맨 앞에 추가합니다.
      // this.componentsList.unshift(contentsAdd)
    },
    handleViewBoxButtonClick() {
      this.contentsArrayIsActive = false // 클래스 상태를 토글
    },
    handleViewListButtonClick() {
      this.contentsArrayIsActive = true
    },
    dotMenuOpenClick(event, item) {
      this.dontMovePage(event)
      this.$set(item, 'componentsListDotMenu', !item.componentsListDotMenu)
    },
    handleLngInputBlur() {
      if (this.fixedProjectPopAdressInputLngBorderColor !== 'var(--warining-color)') this.fixedProjectPopAdressInputLngBorderColor = 'var(--defualt-)'

      if (this.fixedProjectPopAdressInputLngBorderColor !== 'var(--warining-color)') this.fixedProjectPopAdressInputLngBorderColor = 'var(--defualt-)'
    },
    handleLatInputBlur() {
      if (this.fixedProjectPopAdressInputLatBorderColor !== 'var(--warining-color)') this.fixedProjectPopAdressInputLatBorderColor = 'var(--defualt-)'

      if (this.fixedProjectPopAdressInputLatBorderColor !== 'var(--warining-color)') this.fixedProjectPopAdressInputLatBorderColor = 'var(--defualt-)'
    },
    handleLngInputFocus() {
      if (this.fixedProjectPopAdressInputLatBorderColor !== 'var(--warining-color)') this.fixedProjectPopAdressInputLatBorderColor = 'var(--defualt-)'
      this.fixedProjectPopAdressInputLngBorderColor = '#F3F4F5'
    },
    handleLatInputFocus() {
      if (this.fixedProjectPopAdressInputLngBorderColor !== 'var(--warining-color)') this.fixedProjectPopAdressInputLngBorderColor = 'var(--defualt-)'
      this.fixedProjectPopAdressInputLatBorderColor = '#F3F4F5'
    },
    onAdressInputBlur(event) {
      // blur 이벤트 처리 로직 추가
      const inputValue = event.target.value
      if (inputValue !== '') {
        $('#fixed-project-pop-adress-input').css('border-color', '#F3F4F5')
      } else {
        $('#fixed-project-pop-adress-input').css('border-color', 'var(--defualt-)')
      }
      $(event.target).css('border-width', '0 0 0.13rem 0')
    },
    onAdressInputFocus(event) {
      // focus 이벤트 처리 로직 추가
      $('#fixed-project-pop-adress-input').css('border-color', '#F3F4F5')
    },
    saveClickedEvent() {
      // localStorage.setItem("startListData", this.startPageListSave());
    },
    handleChangeImgPopApply() {
      let changedImg = this.$refs.changeImgPopInputDragNDropImg.querySelector('img').src
      if (this.isChangeImgPopInputDragNDropImgDisplayed) {
        this.applyContentsImgSrc = changedImg
      }
      this.isChangeImgPopDisplayed = false
      this.isChangeImgPopInputDragNDropImgDisplayed = false
      this.isChangeImgInputDragNDropFiledivDisplayed = false
      this.isChangeImgNewProjectPopImgBytesDisplayed = true

      // 데이터와 상호 작용하는 함수 호출
      this.fixedsaveData(this.applyContentsImg)
    },
    timeCompare() {
      const timeList = this.$el.querySelectorAll('.list-components-time')
      timeList.forEach(timeDiv => {
        const timeParentElements = timeDiv.parentNode.parentNode
        const time = new Date().getTime() - timeParentElements.id
        // 초와 분 단위로 변환
        const elapsedSeconds = Math.floor(time / 1000)
        const elapsedMinutes = Math.floor(elapsedSeconds / 60)
        const elapsedHours = Math.floor(elapsedMinutes / 60)
        const elapsedDays = Math.floor(elapsedHours / 24)
        const elapsedYears = Math.floor(elapsedDays / 365)

        if (elapsedYears === 0) {
          if (elapsedDays === 0) {
            if (elapsedHours === 0) {
              if (elapsedMinutes === 0) {
                if (elapsedSeconds === 0) {
                  timeDiv.innerText = 'now'
                } else {
                  timeDiv.setAttribute('data-value', elapsedSeconds)
                  timeDiv.innerText = elapsedSeconds + ' seconds ago'
                }
              } else {
                timeDiv.setAttribute('data-value', elapsedSeconds)
                timeDiv.innerText = elapsedMinutes + ' minutes ago'
              }
            } else {
              timeDiv.setAttribute('data-value', elapsedSeconds)
              timeDiv.innerText = elapsedHours + ' hours ago'
            }
          } else {
            timeDiv.setAttribute('data-value', elapsedSeconds)
            timeDiv.innerText = elapsedDays + ' days ago'
          }
        } else {
          timeDiv.setAttribute('data-value', elapsedSeconds)
          timeDiv.innerText = elapsedYears + ' years ago'
        }
      })
    },
    generateRandomId() {
      //임의 랜덤 id값
      return Math.random().toString(36).substr(2, 9)
    },
    loadcomponentsList() {
      let startListData = JSON.parse(localStorage.getItem('startListData'))
      let startdata = JSON.parse(localStorage.getItem('startdata'))
    },
    convertBlobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = reject
        reader.onload = () => {
          resolve(reader.result) // 결과는 data:url 형식의 Base64 문자열
        }
        reader.readAsDataURL(blob)
      })
    },
    async fetchImageAsBase64(filename, path) {
      try {
        const response = await this.$axios.get('https://studio-media.incase.link/media', {
          params: {
            filename: filename, // 파일 이름
            path: path, // 파일 경로
          },
          responseType: 'blob', // 중요: 응답을 Blob으로 받기 위해 설정
        })
        // Blob 응답을 Base64로 변환
        return this.convertBlobToBase64(response.data)
      } catch (error) {
        console.error('Error fetching the image:', error)
      }
    },
    parseTags(tags) {
      try {
        return JSON.parse(tags)
      } catch (e) {
        console.error('Error parsing tags:', e)
        return [] // 파싱 실패 시 빈 배열 반환
      }
    },
    async callAPIMedia() {
      this.componentsList = []
      try {
        const response = await this.$axios.get(`/api/component`)
        if (response.headers['content-type'].includes('application/json')) {
          this.modelingList = response.data.rows
        } else {
          console.error('Invalid response type:', response.headers['content-type'])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }

      this.modelingList.forEach(item => {
        this.componentsList.unshift(item)
      })
    },
  },
}
</script>

<style lang="scss">
.component-listBtn-view {
  width: 3rem !important;
  height: 3rem !important;
  border: 0px !important;
  padding: 0 0 !important;
  border-radius: 0.23rem !important;
}
.component-listBtn-view.v-btn--has-bg {
  background-color: #fcfdfe !important;
  color: #7e7e7e !important;
}
.component-listBtn-view.v-btn--active {
  background-color: #7e7e7e !important;
  color: #fcfdfe !important;
}

.theme--dark .component-listBtn-view.v-btn--has-bg {
  background-color: #1f1f1f !important;
  color: #d0d0d0 !important;
}
.theme--dark .component-listBtn-view.v-btn--active {
  background-color: #d0d0d0 !important;
  color: #1f1f1f !important;
}

.component-search-name-tag input:focus-visible {
  border: none;
  outline: none;
}
.newComponentBtn {
  width: 11rem !important;
  height: 3rem !important;
  border-radius: 0.21429rem;
  background: #7e73fe;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 500 !important;
  letter-spacing: normal !important;
  text-transform: none !important;
  cursor: pointer;

  font-size: 1rem !important;
}
.newComponentBtn:hover {
  background-color: #554ad3;
}
.newComponentBtn:active {
  background-color: #221a7e;
}

#components-bottom-listBtn .v-btn-toggle .v-btn.v-btn.v-size--default,
#components-bottom-listBtn .v-btn:not(.v-btn--round).v-size--default {
  min-width: 0 !important;
}

#components-bottom-listBtn .v-item-group {
  background-color: transparent;
}

.components-bottom-listBtn-remove-btn.v-btn--has-bg {
  background-color: rgba(255, 0, 0, 0.1) !important;
}
.components-bottom-listBtn-remove-btn.component-listBtn-view {
  border-radius: 0.21429rem;
  color: #ff7373 !important;
}
.components-List-content {
  cursor: pointer;
  color: #1e1e1e;
}
.list-view-line #list-view-index {
  color: #000;
  font-size: 0.85714rem;
  font-weight: 500;
  height: 2.8514rem;
}
.theme--dark .list-view-line #list-view-index {
  color: #f0f0f0;
}

.emptyActive #list-view-index {
  display: none;
}

#list-view-index-adress {
  font-weight: 400;
  font-size: 0.9375rem;
  width: 38%;
  white-space: nowrap;
}

#list-view-index-name {
  white-space: nowrap;
  margin-left: 5.14rem;
  width: 39%;
}

#list-view-index-create {
  white-space: nowrap;
  width: 23%;
}

.list-view-line .components-List-content {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 7rem;
  align-items: center;
  color: #222;
  font-size: 1.07143rem;
  font-weight: 400;
  line-height: normal;
  border-radius: 0.35714rem;
  padding: 0 1rem;
  box-sizing: border-box;
}

.list-view-line .components-List-content:hover {
  background: rgba(241, 241, 241, 0.35);
}

@keyframes ClickedBtnBackgroundAnimations {
  0% {
    background-color: #f3f4f5;
  }

  100% {
    background-color: #f3f4f5;
  }
}

.newProjectBtnPop {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 0.875rem;
  font-weight: 500;
  width: 61.57143rem;
  height: 37.57143rem;
  border-radius: 0.71429rem;
  background: #fff;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
}
.newProjectBtnPopPanel {
  position: relative;
  padding: 8.79rem 9.434rem;
}

.newProjectBtnPopPanelPageMove {
  width: 19rem;
  height: 20rem !important;
  gap: 0.28571rem;
  border-radius: 0.71429rem;
  background: rgba(240, 238, 255, 0.5);
  color: #554ad3 !important;
  font-family: 'Noto Sans KR';
  font-size: 1.42857rem !important;
  font-weight: 600;
  line-height: normal !important;
  letter-spacing: normal;
  text-transform: lowercase;
}
.newProjectBtnPopPanelPageMove:hover {
  background-color: #f0eeffb2;
}

.newProjectBtnPopPanelPageMove:active {
  background-color: #f0eeff !important;
  border: 3px solid #7e73fe !important;
}

.newProjectBtnPopPanelPageMove .v-btn__content {
  display: flex;
  flex-direction: column !important; /* 내부 콘텐츠를 세로 정렬 */
  justify-content: center;
  align-items: center;
}

.theme--dark .newProjectBtnPop {
  border-radius: 0.71429rem;
  background: #1f1f1f;
  box-shadow: 0px 3px 7px 0px rgba(255, 255, 255, 0.15);
}
.theme--dark .newProjectBtnPopPanel .v-btn,
.theme--dark .newProjectBtnPopPanel .v-icon {
  color: #f0f0f0 !important;
}

.theme--dark .newProjectBtnPopPanelPageMove {
  border-radius: 0.71429rem;
  border: 1.8px solid #353535 !important;
  background: #252525 !important;
  color: #d1cdff !important;
}
.theme--dark .newProjectBtnPopPanelPageMove:active {
  background-color: #252525 !important;
  border: 3px solid #7e73fe !important;
}
//여기부터 다시 확인

.theme--dark .component-search-name-tag {
  background-color: #2a2a2a !important;
  // transition: background-color 0.1s ease !important;
}

.theme--dark .component-search-name-tag i {
  color: #f0f0f0 !important;
}
.theme--dark input {
  color: #f0f0f0 !important;
}
.theme--dark .newComponentBtn {
  color: #1f1f1f !important;
}
</style>
