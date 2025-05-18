<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">다른이름으로 저장</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field v-model="inputTitle" label="페이지 명"></v-text-field>
          <v-text-field v-model="tagText" label="태그 추가" hint="태그를 입력 후 엔터를 누르세요"></v-text-field>
          <div class="mt-3">
            <v-chip v-for="(tag, index) in tags" :key="index" class="m-1" close outlined close-icon="mdi-close" @click:close="deleteTagEvent(index)">
              {{ tag }}
            </v-chip>
          </div>
          <file-upload
            ref="thumbFileUpload"
            class="p-2"
            div-id="2"
            :div-style="{ border: '1px dashed', height: '5.5rem' }"
            title="썸네일 이미지"
            @fileUpload="uploadThumb"
          />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="onClickSave"> Save </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="dialogSnackbar" color="red accent-2" :timeout="3000">
      {{ dialogSnackbarText }}
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="dialogSnackbar = false"> 닫기 </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
export default {
  components: {
    FileUpload: () => import('~/components/file-upload/file-upload'),
  },
  props: {
    page: { type: Object, default: () => {} },
  },
  data() {
    return {
      dialog: false,
      title: '',
      tagText: '',
      tags: [],
      thumbnailFile: null,
      dialogSnackbar: false,
      dialogSnackbarText: '',
    }
  },
  computed: {
    inputTitle: {
      get() {
        return `${this.page.properties.name} - copy`
      },
      set(value) {
        this.title = value
      },
    },
    // inputTags() {
    //   return [...this.page.properties.tag, ...this.tags]
    // },
  },
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    uploadThumb(file) {
      const imageMimeType = ['image/jpeg', 'image/webp', 'image/png']
      if (!imageMimeType.includes(file.type)) {
        this.dialogSnackbar = true
        this.dialogSnackbarText = '썸네일은 이미지 파일만 가능합니다'
        this.thumbnailFile = null
        return
      }
      this.thumbnailFile = file
    },
    handleKeyDown(event) {
      if (event.key === 'Enter') {
        this.tags.push(this.tagText)
        this.tagText = ''
      }
    },
    async openDialog() {
      this.dialog = true
    },
    onClickSave() {
      this.$emit('onClickSave', { name: this.title ? this.title : this.inputTitle, tag: this.tags })
      this.dialog = false
    },
    deleteTagEvent(index) {
      this.tags.splice(index, 1)
    },
  },
}
</script>

<style></style>
