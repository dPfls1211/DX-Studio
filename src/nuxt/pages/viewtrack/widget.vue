<template>
  <main class="w-100 h-100">
    <section class="f-row align-items-center justify-content-between mb-5">
      <label style="color: #797979; font-size: 1.07143rem; font-weight: 400">{{ pageDescription }}</label>
      <div>
        <v-btn :elevation="0" width="3.14rem" min-width="3.14rem" large color="g-bg-dt-bg-03" class="me-2 p-0">
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
        <v-btn :elevation="0" width="11rem" large color="g-bg-dt-primary" class="white--text" @click="clickRow({ uri: newBtnUrl })"> NEW </v-btn>
      </div>
    </section>

    <section class="f-row align-items-center justify-content-between mb-5">
      <v-form>
        <TemplateFormFieldVuetify
          :field-model="{ type: 'combo', items: filterList }"
          :bind-value="{
            'hide-details': true,
            'prepend-inner-icon': 'mdi-filter',
            clearable: true,
            flat: true,
            dense: true,
            solo: true,
            autofocus: true,
            placeholder: '전체보기',
            color: 'deep-purple',
          }"
        />
      </v-form>
      <div>
        <v-btn
          v-if="selected.length > 0"
          :elevation="0"
          width="3.14rem"
          min-width="3.14rem"
          large
          color="g-bg-dt-point-red-opacity-0_2"
          class="ms-2 p-0"
          @click="onClickDeleteBtn()"
        >
          <i class="dti-trashcan" style="font-size: 2.6rem" :style="{ color: 'var(--g-dt-point-red)' }" />
        </v-btn>
        <v-btn
          v-for="selectedBtnName in ['list', 'card']"
          :key="selectedBtnName"
          :elevation="0"
          width="3.14rem"
          min-width="3.14rem"
          large
          :color="selectedBtn === selectedBtnName ? 'g-bg-dt-text-assistant' : 'g-bg-dt-bg-01'"
          class="ms-2 p-0"
          @click="onClickBtn(selectedBtnName)"
        >
          <i
            :class="`dti-${selectedBtnName}`"
            style="font-size: 2.6rem"
            :style="{ color: selectedBtn === selectedBtnName ? 'var(--g-dt-bg-01)' : 'var(--g-dt-text-assistant)' }"
          />
        </v-btn>
      </div>
    </section>
    <section class="mt-3">
      <v-data-table
        v-model="selected"
        :single-select="singleSelect"
        show-select
        :headers="headers"
        :items="rows"
        :items-per-page="10"
        class="elevation-1"
        item-key="name"
        loading-text="로딩중입니다."
        :footer-props="{
          'items-per-page-text': '페이지당 행 수:',
          'items-per-page-all-text': '모두',
          'items-per-page-items': [5, 10, 15, -1],
        }"
      >
        <template #[`footer.page-text`]="items">{{ items.pageStart }}부터 {{ items.pageStop }}까지 (전체 {{ items.itemsLength }}개 중)</template>

        <template #item="{ item }">
          <tr @click="clickRow({ uri: `${newBtnUrl}?_id=${item._id}` })">
            <td>
              <v-simple-checkbox :value="selected.includes(item)" @input="toggleSelection(item)"></v-simple-checkbox>
            </td>
            <td v-for="{ value } in headers" :key="value">
              {{ itemValue({ value, item }) }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </section>
  </main>
</template>

<script>
import 'overlayscrollbars/css/OverlayScrollbars.css'
import { CmsComponentMixins } from '~/plugins/mixins/cms-component'

export default {
  components: {
    TemplateFormFieldVuetify: () => import('~/components/template/template-form-field-vuetify.vue'),
  },
  mixins: [...CmsComponentMixins],
  props: {
    pageDescription: { type: String, default: '위젯을 배치하고 원하는 스타일을 적용해서 페이지를 제작하고 관리해 보세요' },
    baseurl: { type: String, default: '/api/widget' },
    newBtnUrl: { type: String, default: '/viewtrack/p/widget-builder' },
    params: { type: Object, default: () => {} },
    templateCode: { type: String, default: 'dt-page' },
  },
  data() {
    return {
      selectedBtn: 'card',
      filterList: [
        { text: 'dashboard', builder: 'page-builder', icon: 'dti-dashboard_big', link: '/viewtrack/p/page-builder' },
        { text: 'layout', builder: 'layout', icon: 'dti-layout_big', link: '/viewtrack/p/layout' },
      ],
      rows: [],
      singleSelect: false,
      selected: [],
    }
  },
  computed: {
    stateDtTemplateMap() {
      return this.$store.state.dtStudio.templateMap
    },
    dtPageTemplate() {
      return Object.entries(this.stateDtTemplateMap)?.filter(([, { properties: { type = '' } = {} } = {}]) => type === 'widget') || []
    },
    dtTemplateInfo() {
      return this.dtPageTemplate?.reduce((acc, [, { properties: { info = {} } = {} } = {}]) => {
        acc = { ...acc, ...info }
        return acc
      }, {})
    },
    headers() {
      return Object.keys(this.dtTemplateInfo)?.length
        ? Object.entries(this.dtTemplateInfo)
            .map(([key, { name, order }]) => ({ text: name, value: key, order }))
            .sort((a, b) => a.order - b.order)
        : [
            { text: '화면명', value: 'name' },
            { text: '태그', value: 'tag' },
          ]
    },
  },
  async mounted() {
    const { data: { rows = [] } = {} } = await this.$axios.get(`${this.baseurl}`)
    this.rows = rows
  },
  methods: {
    itemValue({ value: key, item }) {
      const enums = this.changedKeyValue(this.dtTemplateInfo[key]?.enums)
      return enums?.[item?.properties?.[key]] || item?.properties?.[key]
    },
    changedKeyValue(enums) {
      return enums ? Object.entries(enums).map(([text, value]) => ({ text, value })) : {}
    },
    toggleSelection(item) {
      if (this.selected.includes(item)) {
        this.selected.splice(this.selected.indexOf(item), 1)
      } else {
        this.selected.push(item)
      }
    },
    clickRow({ uri } = {}) {
      document.activeElement?.blur()
      this.$router.push({ path: uri })
    },
    onClickBtn(selectedBtn) {
      this.selectedBtn = selectedBtn
    },
    async onClickDeleteBtn() {
      this.$messager.confirm({
        title: '삭제 확인',
        icon: 'warning',
        msg: '선택한 위젯을 삭제하시겠습니까?',
        panelCls: 'messager confirm',
        result: async r => {
          if (!r) return
          const ids = this.selected.map(({ _id }) => _id)
          this.postDelete(ids)
          this.rows = this.rows.filter(({ _id }) => !ids.includes(_id))
          this.selected = []
        },
      })
    },
    async postDelete(ids) {
      try {
        await this.$axios.post(`${this.baseurl}/delete`, { id: ids })
        this.$messager.alert({ title: '성공', icon: 'info', msg: '데이터가 삭제되었습니다.', panelCls: 'messager alert' })
      } catch (error) {
        console.error('Error:', error.response ? error.response : error.message)
      }
    },
  },
}
</script>

<style></style>
