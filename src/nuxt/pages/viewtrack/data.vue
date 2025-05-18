<template>
  <v-main>
    <v-container class="f-column w-100 h-100 container" fluid>
      <div class="f-row justify-content-end" style="gap: 0.88rem; height: 2.7rem">
        <v-btn color="deep-purple accent-2" width="5.68rem" dark @click="onClickSave">저장</v-btn>
      </div>
      <div class="f-row mt-2" style="height: calc(100% - 2.7rem)">
        <div class="f-column col-3 h-100" style="gap: 0.5rem">
          <div class="f-row w-100 justify-content-between align-items-center" style="height: 2.7rem">
            <span style="font-weight: 600; color: #4136c0">데이터 목록</span>
            <div class="f-row h-100 align-items-center">
              <v-expand-x-transition>
                <TemplateFormFieldVuetify
                  v-show="expand"
                  v-model="inputValue"
                  class="me-1"
                  :field-model="{ type: 'text' }"
                  :bind-value="{ 'hide-details': true, dense: true, outlined: true, autofocus: true, placeholder: '데이터 명', color: 'deep-purple accent-2' }"
                />
              </v-expand-x-transition>
              <v-btn class="my-1" icon @click="expand = expand ? false : true">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </div>
          </div>
          <TemplateFormFieldVuetify
            :field-model="{ type: 'combo', items: requestType }"
            :bind-value="{
              'hide-details': true,
              'prepend-inner-icon': 'mdi-filter',
              clearable: true,
              flat: true,
              dense: true,
              solo: true,
              autofocus: true,
              placeholder: '전체보기',
              color: 'deep-purple accent-2',
            }"
            :bind-event="{
              change: changeRequestType,
            }"
          />
          <div class="f-row w-100 justify-content-end align-items-center">
            <div class="f-row justify-content-between align-items-center" style="width: 40%">
              <v-btn text color="grey lighten-2" width="0.87rem" @click="viewCardType = true">펼치기</v-btn>
              <div style="border-right: 1px solid #e0e0e0; height: 0.625rem"></div>
              <v-btn text color="grey lighten-2" width="0.87rem" @click="viewCardType = false">접기</v-btn>
            </div>
          </div>
          <div class="f-column h-100 f-full" style="overflow-y: auto; background-color: #fcfdfe">
            <v-list dense>
              <v-list-item-group>
                <v-list-item
                  v-for="(item, i) in sourceLists"
                  :key="i"
                  selectable
                  @click="onClickSource(item._id)"
                  @mouseenter="handleMouseEnter(i)"
                  @mouseleave="handleMouseLeave"
                >
                  <template v-if="viewCardType">
                    <div class="f-column w-100">
                      <div class="f-row">
                        <v-chip class="ma-2" small label :color="transColor('', item.properties.type)" :text-color="transColor('text', item.properties.type)">
                          {{ item.properties.type }}
                        </v-chip>
                        <v-list-item-content>
                          <v-list-item-title style="font-size: 0.93rem; font-weight: 500">{{ item.properties.name }}</v-list-item-title>
                        </v-list-item-content>
                        <v-spacer></v-spacer>
                        <template v-if="hoveredListItemIndex === i">
                          <v-btn icon @click="onClickDeleteDialog(item._id)">
                            <v-icon>mdi-trash-can-outline</v-icon>
                          </v-btn>
                        </template>
                      </div>
                      <div
                        class="f-row m-2 p-2"
                        :style="{
                          'background-color': currentTheme ? '#1F1F1F' : '#FFFFFF',
                          'border-left': viewCardType ? `3px solid ${transColor('', item.properties.type)}` : '',
                        }"
                      >
                        <span style="font-size: 0.875rem; font-weight: 500; color: #7e7e7e">요청</span>
                        <span class="ms-3" style="font-size: 0.875rem; font-weight: 500; color: #1e1e1e">{{ transPath(item.properties.path) }}</span>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <v-chip class="ma-2" small label :color="transColor('', item.properties.type)" :text-color="transColor('text', item.properties.type)">
                      {{ item.properties.type }}
                    </v-chip>
                    <v-list-item-content>
                      <v-list-item-title style="font-size: 0.93rem; font-weight: 500">{{ item.properties.name }}</v-list-item-title>
                    </v-list-item-content>
                    <template v-if="hoveredListItemIndex === i">
                      <v-btn icon @click="onClickDeleteDialog(item._id)">
                        <v-icon>mdi-trash-can-outline</v-icon>
                      </v-btn>
                    </template>
                  </template>
                </v-list-item>
              </v-list-item-group>
              <v-list-item @click="addDataSource">
                <v-list-item-icon>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="font-weight: 400">{{ '새 데이터 추가' }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </div>
        <div class="f-column col-9 h-100 p-2" style="gap: 0.5rem">
          <template v-if="selectedSource">
            <div class="f-row w-100 align-items-center">
              <v-icon icon :color="selectedSource.properties.checkRequest ? 'teal lighten-1' : 'red'" dark>{{
                selectedSource.properties.checkRequest ? 'mdi-check-circle' : 'mdi-alert-circle'
              }}</v-icon>
              <span
                class="ms-2"
                style="font-size: 0.87rem; font-weight: 600"
                :style="{ color: selectedSource.properties.checkRequest ? '#3db8b1' : '#FF7373' }"
                >{{ selectedSource.properties.checkRequest ? '요청성공' : '요청실패' }}</span
              >
            </div>
            <div class="f-row w-100 h-100" style="gap: 0.5rem">
              <div class="f-column col-4 h-100" style="border-right: 1px solid #f0f0f0; gap: 0.5rem">
                <v-form>
                  <label class="mt-3" style="font-weight: 500">데이터 요청</label>
                  <TemplateFormFieldVuetify
                    v-model="selectedSource._id"
                    class="mt-3"
                    :custom-field="true"
                    :field-model="{ type: 'text' }"
                    :bind-value="{
                      'hide-details': true,
                      dense: true,
                      outlined: true,
                      color: 'deep-purple accent-2',
                      label: 'ID',
                    }"
                  />
                  <TemplateFormFieldVuetify
                    v-model="selectedSource.properties.name"
                    class="mt-3"
                    :custom-field="true"
                    :field-model="{ type: 'text' }"
                    :bind-value="{
                      'hide-details': true,
                      dense: true,
                      outlined: true,
                      color: 'deep-purple accent-2',
                      label: '이름',
                    }"
                  />
                  <label class="mt-3 w-100" style="font-weight: 500">데이터 유형</label>
                  <span style="color: red; font-size: 0.625rem; font-weight: 500">[필수]</span>
                  <div class="f-row w-100 mt-2" style="gap: 0.5rem">
                    <TemplateFormFieldVuetify
                      v-model="selectedSource.properties.type"
                      :custom-field="true"
                      :field-model="{
                        type: 'select',
                        items: requestType,
                      }"
                      :bind-value="{
                        'hide-details': true,
                        dense: true,
                        outlined: true,
                        color: 'deep-purple accent-2',
                      }"
                      :bind-event="{ change: onChangeSourceType }"
                    />
                    <TemplateFormFieldVuetify
                      v-model="selectedSource.properties.path"
                      :custom-field="true"
                      :field-model="{
                        type: 'select',
                        items: requestTypeEnums,
                      }"
                      :bind-value="{
                        'hide-details': true,
                        error: sourcePathError,
                        dense: true,
                        outlined: true,
                        color: 'deep-purple accent-2',
                      }"
                      :bind-event="{
                        change: checkPath,
                      }"
                    />
                  </div>
                </v-form>
                <template v-if="selectedSource.properties.path != 'custom'">
                  <span style="font-size: 0.625rem; font-weight: 500">[선택]</span>
                  <MonacoEditor
                    ref="monaco"
                    class="f-full p-2"
                    style="border: 1px solid #d0d0d0; border-radius: 0.187rem"
                    :init-value="JSON.stringify(selectedSource.properties.params)"
                    :index="'123'"
                    @changeModel="updateValue($event)"
                  />
                </template>
                <template v-else>
                  <span style="color: red; font-size: 0.625rem; font-weight: 500">[필수]</span>
                  <TemplateFormFieldVuetify
                    v-model="selectedSource.properties.url"
                    :custom-field="true"
                    :field-model="{
                      type: 'text',
                    }"
                    :bind-value="{
                      'hide-details': true,
                      label: 'Url',
                      dense: true,
                      outlined: true,
                      color: 'deep-purple accent-2',
                    }"
                  />
                </template>
                <v-btn depressed :color="currentTheme ? '#2a2a2a' : '#F8F8F9'" @click="onClickRequest">요청하기</v-btn>
              </div>
              <!-- <div class="f-column col-4 h-100" style="gap: 0.5rem">
                <label class="mt-3" style="height: 1.8rem; font-weight: 500">요청 데이터 선택</label>
                <div class="f-coulmn f-full w-100" style="overflow-y: auto" :style="{ 'background-color': currentTheme ? '#2a2a2a' : '#f8f8f9' }">
                  <div
                    class="f-column position-sticky top-0 w-100 p-2"
                    style="z-index: 10; gap: 0.5rem"
                    :style="{ 'background-color': currentTheme ? '#2a2a2a' : '#f8f8f9' }"
                  >
                    <div class="f-row w-100" style="gap: 0.5rem">
                      <TemplateFormFieldVuetify
                        style="width: 40%"
                        :custom-field="true"
                        :field-model="{
                          type: 'combo',
                          items: ['트리', '데이터'],
                        }"
                        :bind-value="{
                          'hide-details': true,
                          dense: true,
                          outlined: true,
                          placeholder: '',
                          color: 'deep-purple accent-2',
                        }"
                      />
                      <TemplateFormFieldVuetify
                        style="width: 60%"
                        :custom-field="true"
                        :field-model="{ type: 'text' }"
                        :bind-value="{
                          'hide-details': true,
                          dense: true,
                          outlined: true,
                          color: 'deep-purple accent-2',
                          placeholder: '검색',
                        }"
                      />
                    </div>
                    <div class="f-row w-100 justify-content-between">
                      <div class="f-row w-50">
                        <v-btn x-small text @click="openAll">모두 펼치기</v-btn>
                        <v-btn x-small text @click="closeAll">모두 접기</v-btn>
                      </div>
                      <v-btn x-small text @click="selectedDataKey = []">전체 선택 해제</v-btn>
                    </div>
                  </div>
                  <v-treeview
                    v-if="responseData"
                    v-model="selectedDataKey"
                    :open.sync="openNodes"
                    loading-icon
                    selectable
                    :items="responseData"
                    dense
                  ></v-treeview>
                </div>
                <v-btn depressed color="#F8F8F9" @click="onClickProcess">가공하기</v-btn>
              </div> -->
              <div class="f-column col-8 h-100" style="gap: 0.5rem">
                <label class="mt-3" style="height: 1.8rem; font-weight: 500">응답</label>
                <div class="f-column" :style="{ 'background-color': currentTheme ? '#2a2a2a' : '#f8f8f9' }" style="flex: 1; overflow-y: auto">
                  <vue-json-pretty :data="responseData" />
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="f-row w-100 justify-content-center align-items-center" style="height: calc(100% - 5.4rem)">
              <div class="f-column justify-content-center align-items-center" flat>
                <i class="dti-data-model" style="font-size: 5rem" />
                <span class="mt-2" style="font-size: 1.125rem; font-weight: 500">선택한 데이터가 없습니다</span>
                <span class="mt-2" style="font-size: 1.125rem; font-weight: 500">확인하고 싶은 데이터를 선택해 주세요</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <v-snackbar v-model="snackbar" :timeout="2000" color="deep-purple accent-2">
        {{ snackbarText }}
        <template #action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
      <v-dialog v-model="deleteDialog" persistent max-width="15%">
        <v-card class="p-2">
          <v-card-title>데이터 삭제</v-card-title>
          <v-card-text>삭제된 데이터는 복구되지않습니다. 정말 삭제하시겠습니까?</v-card-text>
          <div class="f-row w-100 justify-content-center">
            <v-btn text @click="deleteDialog = false"> 취소 </v-btn>
            <v-btn color="red darken-1" text @click="onClickDelete"> 삭제 </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
export default {
  components: {
    TemplateFormFieldVuetify: () => import('~/components/template/template-form-field-vuetify.vue'),
    MonacoEditor: () => import('~/components/editor/monaco-editor.vue'),
    VueJsonPretty,
  },
  data() {
    return {
      deleteDialog: false,
      deleteItem: {},
      requestType: ['MQTT', 'POST', 'DUMMY', 'GET'],
      typeEnums: [
        { type: 'GET', text: '시설', value: '/api/facilities' },
        { type: 'GET', text: '공간', value: '/api/spaces' },
        { type: 'GET', text: '장치', value: '/api/devices' },
        { type: 'GET', text: '업무', value: '/api/workflows' },
        { type: 'GET', text: '이벤트', value: '/api/events' },
        { type: 'GET', text: '데이터', value: '/api/datas' },
        { type: 'GET', text: '집계', value: '/api/status' },
        { type: 'GET', text: '사용자 정의', value: 'custom' },
        { type: 'POST', text: '사용자 정의', value: 'custom' },
        { type: 'MQTT', text: '이벤트', value: '/event' },
        { type: 'MQTT', text: '권한', value: '/auth' },
        { type: 'MQTT', text: '데이터', value: '/json' },
      ],
      requestTypeColor: [
        { type: 'MQTT', color: '#C3E6FF', textColor: '#0078CD' },
        { type: 'POST', color: '#FFEAB2', textColor: '#EC9126' },
        { type: 'DUMMY', color: '#FFCEDD', textColor: '#C1345F' },
        { type: 'GET', color: '#B2F1DE', textColor: '#2E9072' },
      ],
      inputValue: null,
      viewCardType: false,
      sources: [],
      selectedSource: null,
      selectedRequestType: '',
      snackbar: false,
      snackbarText: '',
      sourcePathError: false,
      hoveredListItemIndex: null,
      expand: false,
      responseData: null,
      count: 0,
      openNodes: [],
      processValue: null,
    }
  },
  computed: {
    productBaseUrl() {
      return this.$config.viewtrack.productBaseUrl
    },
    sourceLists() {
      const sources = this.sources.reduce((acc, { properties: { type = '', name = '', ...propertiesEtc }, ...etc }) => {
        if ((this.inputValue != 0 && !this.inputValue) || name.includes(this.inputValue)) {
          if (!this.selectedRequestType) acc.push({ ...etc, properties: { type, name, ...propertiesEtc } })
          else if (this.selectedRequestType === type) acc.push({ ...etc, properties: { type, name, ...propertiesEtc } })
        }
        return acc
      }, [])
      return sources
    },
    requestTypeEnums() {
      const enums = this.typeEnums.filter(({ type = '' }) => type === this.selectedSource?.properties.type)
      return enums
    },
    currentTheme() {
      return this.$vuetify.theme.dark
    },
  },
  async mounted() {
    await this.getDataList()
  },
  methods: {
    async getDataList() {
      const { data: { rows = [] } = {} } = await this.$axios.get(`${this.productBaseUrl}/api/datasource`, { params: { sort: 'name.keyword:asc' } })
      this.sources = rows
    },
    checkPath(value) {
      if (this.selectedSource.properties.path) this.sourcePathError = false
    },
    getAllNodeIds(items) {
      let ids = []
      items.forEach(item => {
        ids.push(item.id)
        if (item.children) {
          ids = ids.concat(this.getAllNodeIds(item.children))
        }
      })
      return ids
    },
    changeRequestType(value) {
      this.selectedRequestType = value
    },
    updateValue(value) {
      try {
        this.selectedSource.properties.params = JSON.parse(value)
      } catch (error) {
        return null
      }
    },
    updateProcessValue(value) {},
    async onClickDeleteDialog(_id) {
      this.deleteDialog = true
      this.deleteItem = { _id }
    },
    async onClickDelete() {
      const { properties: { temporary = false } = {} } = this.sources.find(({ _id = '' }) => _id === this.deleteItem._id) ?? {}
      if (temporary) {
        const sources = JSON.parse(JSON.stringify(this.sources))
        const index = sources.findIndex(({ _id = '' }) => _id === this.deleteItem._id)
        if (index === -1) return
        sources.splice(index, 1)
        this.$set(this, 'sources', [...sources])
        this.deleteItem = {}
        this.selectedSource = null
        this.deleteDialog = false
      } else {
        await this.$axios.delete(`${window.location.origin}/api/datasource`, { params: { _id: this.deleteItem._id } })
        const sources = JSON.parse(JSON.stringify(this.sources))
        const index = sources.findIndex(({ _id = '' }) => _id === this.deleteItem._id)
        if (index === -1) return
        sources.splice(index, 1)
        this.$set(this, 'sources', [...sources])
        this.deleteItem = {}
        this.selectedSource = null
        this.deleteDialog = false
      }
    },
    async onClickSave() {
      if (!this.selectedSource.properties.type || !this.selectedSource.properties.path) {
        this.snackbar = true
        this.sourcePathError = true
        this.snackbarText = '데이터 유형 필수 값을 입력해주세요'
        return
      }
      try {
        const { _id = '', properties: { type = '', path = '', name = '', params = {}, url = '', checkRequest = false, temporary = false } = {} } =
          this.selectedSource
        if (!checkRequest) {
          this.snackbar = true
          this.snackbarText = '요청확인이 필요합니다.'
          return
        }
        if (temporary) {
          //등록
          if (path != 'custom') {
            const { data: { _id = '' } = {} } = await this.$axios.post(`${window.location.origin}/api/datasource`, {
              properties: { name, type, path, params, checkRequest },
            })
            this.selectedSource._id = _id
          } else {
            const { data: { _id = '' } = {} } = await this.$axios.post(`${window.location.origin}/api/datasource`, {
              properties: { name, type, path, params, checkRequest, url },
            })
            this.selectedSource._id = _id
          }
        } else {
          //수정
          if (path != 'custom') {
            await this.$axios.put(`${window.location.origin}/api/datasource`, { _id, properties: { name, type, path, params, checkRequest } })
          } else {
            await this.$axios.put(`${window.location.origin}/api/datasource`, { _id, properties: { name, type, path, params, checkRequest, url } })
          }
        }
      } catch (error) {
        console.info(error)
        return
      }
    },
    async onClickSource(id) {
      const index = this.sources.findIndex(({ _id = '' }) => _id === id)
      if (index === -1) return
      this.selectedSource = this.sources[index]
      await this.$nextTick()
      this.$refs.monaco?.dispose()
      this.$refs.monaco?.init()
      this.responseData = null
    },
    async onClickRequest() {
      if (
        !this.selectedSource.properties.type ||
        !this.selectedSource.properties.path ||
        (this.selectedSource.properties.path === 'custom' && !this.selectedSource.properties.url)
      ) {
        this.snackbar = true
        this.sourcePathError = true
        this.snackbarText = '데이터 유형 필수 값을 입력해주세요'
        return
      }
      if (this.selectedSource.properties.type === 'GET') {
        if (this.selectedSource.properties.path != 'custom') {
          try {
            const { data = {} } = await this.$axios.get(`${this.selectedSource.properties.path}`, {
              params: { size: 1, from: 0, ...this.selectedSource.properties.params },
            })
            this.responseData = data
            this.selectedSource.properties.checkRequest = true
          } catch (error) {
            this.selectedSource.properties.checkRequest = false
            console.info(error)
          }
        } else {
          try {
            const { data = {} } = await this.$axios.get(`${this.selectedSource.properties.url}`)
            this.responseData = data
            this.selectedSource.properties.checkRequest = true
          } catch (error) {
            this.selectedSource.properties.checkRequest = false
            console.info(error)
          }
        }
      } else if (this.selectedSource.properties.type === 'POST') {
        console.info('test')
      }
    },
    onClickProcess() {
      const selectedNodes = this.extractMultipleNodes(this.responseData[0], this.selectedDataKey)
      this.processValue = selectedNodes.reduce((acc, { name, value }) => {
        acc[name] = value
        return acc
      }, {})
    },
    extractMultipleNodes(tree, selectedIds) {
      let extractedNodes = []
      for (let id of selectedIds) {
        let node = this.findNodeById(tree, id)
        if (node) {
          extractedNodes.push(node)
        }
      }
      return extractedNodes
    },
    findNodeById(tree, id) {
      if (tree.id === id) {
        return tree
      }
      for (let child of tree.children) {
        let result = this.findNodeById(child, id)
        if (result) {
          return result
        }
      }
      return null
    },
    onChangeSourceType() {
      this.selectedSource.path = ''
    },
    async addDataSource() {
      let index = this.sources.length + 1
      let name = `새 데이터 ${index}`
      let checkDup = true
      while (checkDup) {
        checkDup = this.checkDuplicate(name) ? true : false
        if (checkDup) {
          name = `새 데이터 ${index + 1}`
          index += 1
        }
      }
      this.sources.push({
        _id: this.$util.randomize.getGUID({ length: 20 }),
        properties: {
          name,
          type: 'GET',
          path: '',
          params: {},
          checkRequest: false,
          temporary: true,
        },
      })
    },
    convertToTree(data, path = '') {
      // 노드 생성
      this.count += 1
      const node = {
        id: this.count,
        name: path ? path.split('.').pop() : 'root', // 노드 이름 설정
        children: [],
        path: path || 'root',
      }

      if (this.isObject(data)) {
        // 객체의 경우
        for (const key in data) {
          if (Object.hasOwn(data, key)) {
            // 재귀적으로 트리 변환
            node.children.push(this.convertToTree(data[key], path ? `${path}.${key}` : key))
          }
        }
      } else if (this.isArray(data)) {
        // 배열의 경우 첫 번째 요소만 출력
        if (data.length > 0) {
          node.children.push(this.convertToTree(data[0], path))
        }
      } else {
        // 리프 노드의 경우
        node.value = data
      }

      return node
    },
    isObject(data) {
      return data !== null && typeof data === 'object' && !Array.isArray(data)
    },
    isArray(data) {
      return Array.isArray(data)
    },
    checkDuplicate(_name) {
      return this.sources.find(({ properties: { name = '' } }) => name === _name)
    },
    transPath(path) {
      const { text = '' } = this.typeEnums.find(({ value = '' }) => value === path) ?? {}
      return text
    },
    transColor(print, _type) {
      const { color, textColor } = this.requestTypeColor.find(({ type = '' }) => type === _type) ?? {}
      if (print === 'text') return textColor
      else return color
    },
    handleMouseEnter(index) {
      this.hoveredListItemIndex = index
    },
    handleMouseLeave() {
      this.hoveredListItemIndex = null
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
}
</style>
