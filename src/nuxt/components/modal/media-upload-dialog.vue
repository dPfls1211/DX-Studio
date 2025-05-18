<template>
  <v-dialog v-model="openUploadMediaDialogSts" max-width="61.57143rem" @click:outside="closeDialog">
    <v-card>
      <div class="f-row p-3">
        <div class="f-column w-50" style="padding: 3rem; border-right: 1px solid #f8f8f9">
          <file-upload
            ref="mediaFileUpload"
            div-id="1"
            :div-style="{ border: '1px dashed', height: '5.5rem' }"
            title="파일 업로드"
            @fileUpload="uploadFile"
          ></file-upload>
          <template v-if="!mediaFile">
            <span class="mt-3" style="font-size: 0.85rem; font-weight: 500; color: #7e7e7e; margin-bottom: 2.86rem"
              >최소 한 개의 미디어를 업로드하세요 (최대 00mb)</span
            >
          </template>
          <template v-else>
            <TemplateFormFieldVuetify
              v-model="mediaFile"
              class="mt-3"
              :custom-field="true"
              :field-model="{
                type: 'file',
              }"
              :bind-value="{
                'hide-details': true,
                dense: true,
                color: 'g-bg-dt-primary',
                'show-size': true,
                'truncate-length': 15,
              }"
              :bind-event="{
                'click:clear': clearMediaFile,
              }"
              style="margin-bottom: 2.86rem"
            />
          </template>
          <TemplateFormFieldVuetify
            v-model="mediaName"
            class="mt-3"
            :custom-field="true"
            :field-model="{
              type: 'text',
            }"
            :bind-value="{
              'hide-details': true,
              dense: true,
              outlined: true,
              label: '미디어 명',
              clearable: true,
              color: 'var(--g-dt-primary)',
            }"
            style="margin-bottom: 2.14rem"
          />
          <TemplateFormFieldVuetify
            v-model="tagName"
            class="mt-3"
            :custom-field="true"
            :field-model="{
              type: 'text',
            }"
            :bind-value="{
              'hide-details': true,
              dense: true,
              outlined: true,
              label: '태그',
              clearable: true,
              color: 'var(--g-dt-primary)',
              placeholder: '태그를 입력한 후 엔터를 쳐주세요',
            }"
            :bind-event="{
              keydown: addTagEvent,
            }"
          />
          <div
            class="f-row w-100 media-upload-dialog"
            style="flex-wrap: wrap; gap: 0.5rem; min-height: 5rem; max-height: 6rem; overflow-y: auto; margin-top: 1rem"
          >
            <!-- <v-chip v-for="(tag, index) in mediaTag" :key="index" close outlined close-icon="mdi-close-outline" @click:close="deleteTagEvent(index)">{{
              tag
            }}</v-chip> -->
            <v-chip
              v-for="(tag, index) in mediaTag"
              :key="index"
              :style="{ backgroundColor: isDark ? '#2a2a2a' : '#f8f8f8', color: isDark ? '#fff' : '#1e1e1e' }"
              style="border: none; font-size: 1rem; font-weight: 500"
            >
              {{ tag }}<v-icon size="18" style="margin-left: 0.5rem" @click="deleteTagEvent(index)">mdi-close</v-icon>
            </v-chip>
          </div>
        </div>
        <div class="f-column w-50 justify-content-between" style="padding: 3rem; height: 35rem">
          <div class="f-column w-100">
            <file-upload
              ref="thumbFileUpload"
              div-id="2"
              :div-style="{ border: '1px dashed', height: '5.5rem' }"
              title="썸네일 이미지"
              @fileUpload="uploadThumb"
            />
            <div style="margin-top: 0.71rem; height: 2.5rem; gap: 0.5rem" class="align-item-center d-flex justify-content-center">
              <v-icon color="#FF7373" style="padding: 0 0.5rem">mdi-alert-circle</v-icon>
              <span style="font-size: 0.75rem; font-weight: 500; color: #7e7e7e">
                업로드하지 않을 경우, 업로드한 파일 상태가 자동 썸네일화 됩니다. (최대 00mb)
              </span>
            </div>

            <TemplateFormFieldVuetify
              v-if="thumbnailFile"
              v-model="thumbnailFile"
              class="mt-3"
              :custom-field="true"
              :field-model="{
                type: 'file',
              }"
              :bind-value="{
                'hide-details': true,
                dense: true,
                color: 'g-bg-dt-primary',
                'show-size': true,
                'truncate-length': 15,
              }"
              :bind-event="{
                'click:clear': clearThumbFile,
              }"
            />
          </div>
          <div class="f-row w-100 justify-content-end" style="gap: 0.3rem">
            <v-btn width="8.5rem" elevation="0" style="background-color: transparent" @click="closeDialog">취소</v-btn>
            <v-btn color="g-bg-dt-primary" width="8.5rem" dark @click="sendMediaData">업로드</v-btn>
          </div>
        </div>
      </div>
    </v-card>
    <v-snackbar v-model="dialogSnackbar" color="red accent-2" :timeout="timeout">
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
    TemplateFormFieldVuetify: () => import('~/components/template/template-form-field-vuetify.vue'),
  },
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      openUploadMediaDialogSts: false,
      mediaFile: null,
      mediaName: '',
      tagName: '',
      mediaTag: [],
      thumbnailFile: null,
      dialogSnackbar: false,
      dialogSnackbarText: '',
      timeout: 4000,
    }
  },
  computed: {
    authUser() {
      return this.$auth.user
    },
    authUserId() {
      return this.authUser?._id
    },
    stateDtTemplateMap() {
      return this.$store.state.dtStudio.templateMap
    },
    imgMediaTemplateId() {
      const templateId = Object.entries(this.stateDtTemplateMap).find(
        ([, { properties: { type = '', name = '' } } = {}]) => name.includes('image') && type === 'media'
      )
      if (!templateId) return ''
      else return templateId[0]
    },
    videoMediaTemplateId() {
      const templateId = Object.entries(this.stateDtTemplateMap).find(
        ([, { properties: { type = '', name = '' } } = {}]) => name.includes('video') && type === 'media'
      )
      if (!templateId) return ''
      else return templateId[0]
    },
    glbMediaTemplateId() {
      const templateId = Object.entries(this.stateDtTemplateMap).find(
        ([, { properties: { type = '', name = '' } } = {}]) => name.includes('glb') && type === 'media'
      )
      if (!templateId) return ''
      else return templateId[0]
    },
    isDark() {
      return this.$vuetify.theme.dark
    },
  },
  methods: {
    async openDialog() {
      this.openUploadMediaDialogSts = true
    },
    closeDialog() {
      this.mediaFile = null
      this.thumbnailFile = null
      this.mediaName = ''
      this.mediaTag = []
      this.openUploadMediaDialogSts = false
      this.$refs.mediaFileUpload.imgUrl = ''
      this.$refs.thumbFileUpload.imgUrl = ''
    },
    async sendMediaData() {
      const formData = new FormData()
      let templateId = this.glbMediaTemplateId
      if (this.mediaFile?.type.includes('image')) templateId = this.imgMediaTemplateId
      if (this.mediaFile?.type.includes('video')) templateId = this.videoMediaTemplateId
      formData.append('originalFile', this.mediaFile)
      formData.append('templateId', templateId)
      formData.append('thumbnailFile', this.thumbnailFile)
      formData.append('properties[name]', this.mediaName)
      formData.append('properties[tag]', JSON.stringify(this.mediaTag))
      formData.append('properties[userId]', this.authUserId)
      try {
        const { data = {} } = await this.$axios.post(`${this.url}/api/media`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.closeDialog()
        this.$emit('closeDialog', data)
      } catch (error) {
        console.error('Error uploading file', error)
      }
    },
    uploadFile(file) {
      this.mediaFile = file
    },
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
    clearMediaFile() {
      this.$refs.mediaFileUpload.imgUrl = ''
    },
    clearThumbFile() {
      this.$refs.thumbFileUpload.imgUrl = ''
    },
    addTagEvent({ key = '' }) {
      if (key === 'Enter') {
        if (!this.tagName) {
          this.dialogSnackbar = true
          this.dialogSnackbarText = '태그 값을 입력해 주세요.'
          return
        } else {
          this.mediaTag.push(this.tagName)
          this.tagName = ''
        }
      }
    },
    deleteTagEvent(index) {
      this.mediaTag.splice(index, 1)
    },
  },
}
</script>

<style scoped lang="scss">
.media-upload-dialog::-webkit-scrollbar {
  width: 0.4rem;
}
.media-upload-dialog::-webkit-scrollbar-thumb {
  background-color: #d5d5d5;
  border-radius: 10px;
}
</style>
