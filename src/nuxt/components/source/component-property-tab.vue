<template>
  <v-dialog v-model="internalModalView" persistent class="fixed-project-pop" width="61rem">
    <v-card class="fixed-project-pop-content" style="display: flex; flex-direction: row; gap: 3.57rem">
      <div class="d-flex f-column" style="width: 21rem; gap: 2.14rem">
        <TemplateFormFieldVuetify
          v-model="fixedProjectPopName"
          class="me-1"
          style="height: 3.57rem"
          :custom-field="true"
          :field-model="{
            type: 'text',
          }"
          :bind-value="{
            'hide-details': true,
            dense: true,
            outlined: true,
            label: fixedProjectPopNamePlaceholeder,
            disabled: !componentsEditmode,
            clearable: true,
            color: 'deep-purple accent-2',
            'show-size': true,
            'truncate-length': 15,
          }"
        />
        <TemplateFormFieldVuetify
          v-model="fixedProjectPopExplane"
          class="me-1 fixed-project-pop-input"
          :custom-field="true"
          :field-model="{
            type: 'textarea',
          }"
          :bind-value="{
            'hide-details': true,
            dense: true,
            outlined: true,
            label: '메모',
            placeholder: '입력하세요',
            disabled: !componentsEditmode,
            clearable: true,
            color: 'deep-purple accent-2',
            'show-size': true,
            'truncate-length': 15,
          }"
        />
        <div id="fixed-project-pop-tag">
          <TemplateFormFieldVuetify
            v-model="inputTagtxt"
            class="me-1 fixed-project-pop-input"
            :custom-field="true"
            :field-model="{
              type: 'text',
            }"
            :bind-value="{
              'hide-details': true,
              dense: true,
              outlined: true,
              label: '태그',
              placeholder: '태그를 입력한 후 엔터를 쳐주세요',
              disabled: !componentsEditmode,
              clearable: true,
              color: 'deep-purple accent-2',
              'show-size': true,
              'truncate-length': 15,
            }"
            :bind-event="{
              change: onEnter,
            }"
          />
          <section style="margin-top: 1rem; gap: 0.71rem; flex-wrap: wrap; max-height: 8rem; overflow-y: auto" class="d-flex property-tag-section">
            <v-chip
              v-for="(item, index) in taglistFixing"
              :key="index"
              style="background-color: #f8f8f8; color: #1e1e1e; border: none; font-size: 1rem; font-weight: 500"
            >
              {{ item }}<v-icon v-if="componentsEditmode" size="18" @click="selectTagOption(index)">mdi-close</v-icon>
            </v-chip>
          </section>
        </div>
      </div>

      <v-divider vertical style="border-color: #dfdfdf; padding-bottom: 0.75rem"></v-divider>
      <div style="position: relative; width: 40%">
        <div style="gap: 0.81rem; display: flex; flex-direction: column">
          <div id="changeImg-pop-inputDragNDrop" @dragover.prevent @drop="handleDrop">
            <span id="changeImg-pop-inputDragNDrop-name"> 썸네일 이미지 </span>

            <i class="dti-upload" style="font-size: 3rem"></i>
            <label
              >업로드하려면 클릭하거나 <br />
              이 영역으로 드래그하세요</label
            >
            <div id="changeImg-inputDragNDrop-findfile">
              <!-- component-top-btn-import-name import_click-btn-event -->
              <input id="changeImg-inputDragNDrop-findfile-input" style="display: none" type="file" accept="image/*" @change="previewImage" />
            </div>
          </div>
          <div class="align-item-center d-flex justify-content-center" style="flex-direction: row; gap: 0.7rem">
            <v-icon color="#FF7373" style="padding: 0.5rem">mdi-alert-circle</v-icon>
            <label style="color: #7e7e7e; font-size: 0.75rem; font-weight: 500">
              업로드하지 않을 경우, 업로드한 파일 상태가 자동 썸네일화 됩니다. (최대 <span>00mb</span>)
            </label>
          </div>
          <div v-show="!viewThumbnail" class="dragdropChangedImg">
            <div id="changeImg-pop-inputDragNDrop-img">
              <v-img :src="thumbnailImg" contain></v-img>
              <label class="dragdropImgName"> {{ thumbnailImgName }}</label>
            </div>
            <div id="changeImg-pop-inputDragNDrop-mb">
              <label class="dragdropImgSize"> {{ thumbnailImgByte }} </label>
              <v-btn v-if="componentsEditmode" icon @click="deleteThumbnail">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div
          id="fixed-project-pop-btn"
          class="w-100 position-absolute d-flex f-row justify-content-end"
          style="bottom: 0; right: 0; height: 3rem; gap: 0.43rem"
        >
          <v-btn id="fixed-project-pop-close" class="click-btn-event clicked--btn-custom" text @click="handleCancelFixedButtonClick"> 취소 </v-btn>
          <v-btn
            v-if="!componentsEditmode & !newBuild"
            id="fixed-project-pop-create"
            class="click-btn-event fixed-project-pop-create clicked--btn-custom"
            text
            style="color: #fff"
            @click="componentsEditmode = true"
          >
            수정
          </v-btn>
          <v-btn
            v-if="componentsEditmode & !newBuild"
            id="fixed-project-pop-create"
            class="click-btn-event fixed-project-pop-create clicked--btn-custom"
            text
            style="color: #fff"
            @click="handleNewFileButtonClickCreate"
          >
            완료
          </v-btn>

          <v-btn
            v-if="componentsEditmode & newBuild"
            id="fixed-project-pop-create"
            class="click-btn-event fixed-project-pop-create clicked--btn-custom"
            text
            style="color: #fff"
          >
            편집
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {
    TemplateFormFieldVuetify: () => import('~/components/template/template-form-field-vuetify.vue'),
  },
  props: {
    modalView: {
      type: Boolean,
      required: true,
    },
    cardInfo: {
      type: Object,
      default: function () {
        return {}
      },
    },
    inputNameType: { type: String, defalut: '파일 명' },
    cardNumber: { type: Number, default: -1 },
    builderClicked: { type: Boolean, required: false },
    editMode: { type: Boolean, required: false },
    thumbnailUsing: { type: Boolean, defalut: false },
  },

  data() {
    return {
      fixedProjectPopName: '',
      fixedProjectPopExplane: '',
      fixedProjectPopTag: this.cardInfo.properties.tag,
      componentsEditmode: false,
      componentsTagList: [],
      internalModalView: this.modalView,
      fixedProjectPopNamePlaceholeder: this.inputNameType == undefined ? '파일 명' : this.inputNameType,
      newBuild: false,
      taglistFixing: [...this.cardInfo.properties.tag],
      inputTagtxt: '',
      viewThumbnail: this.thumbnailUsing,
      thumbnailImg: this.thumbnailUsing ? '' : `${this.$config.viewtrack.productBaseUrl}/api/media/download?path=${this.cardInfo.properties.thumbnailPath}`,
      thumbnailImgName: '',
      thumbnailImgByte: '',
      thumbnailFile: null,
    }
  },
  computed: {
    productBaseUrl() {
      return this.$config.viewtrack.productBaseUrl
    },
    gractorBaseUrl() {
      return this.$config.viewtrack.gractorBaseUrl
    },
  },
  watch: {
    cardInfo: {
      handler(newVal) {
        this.fixedProjectPopName = newVal.properties?.name ? newVal.properties.name : ''
        this.componentsTagList = newVal.properties?.tag ? newVal.properties.tag : []
        this.taglistFixing = [...this.componentsTagList]

        this.thumbnailImg = this.thumbnailUsing ? '' : `${this.$config.viewtrack.productBaseUrl}/api/media/download?path=${newVal.properties.thumbnailPath}`
      },
      deep: true,
    },
    editMode(val) {
      this.componentsEditmode = val
    },
    builderClicked(val) {
      this.newBuild = val
    },
    modalView(val) {
      this.internalModalView = val
    },
    internalModalView(val) {
      this.$emit('update:modalView', val)
    },
  },
  created() {
    this.fixedProjectPopName = this.cardInfo.properties?.name ? this.cardInfo.properties.name : ''
    this.componentsTagList = this.cardInfo.properties?.tag ? this.cardInfo.properties.tag : []
    // console.log(this.cardInfo)
    this.thumbnailImgName = this.fixedProjectPopName
    try {
      if (this.cardInfo.properties.tag == '') this.taglistFixing = []
      else {
        if (Array.isArray(this.cardInfo.properties.tag)) this.taglistFixing = this.cardInfo.properties.tag
        else {
          this.taglistFixing = JSON.parse(this.cardInfo.properties.tag)
          if (typeof this.taglistFixing === 'string') {
            try {
              this.taglistFixing = [...JSON.parse(this.taglistFixing)]
            } catch (e) {
              console.error('Invalid JSON string', e)
              this.taglistFixing = [] // 기본 값 설정 (필요한 경우)
            }
          }
        }
      }
    } catch (e) {
      // console.error('Failed to parse item.tag:', e)
      this.taglistFixing = []
    }
  },
  methods: {
    onEnter() {
      if (this.inputTagtxt.trim() !== '') {
        this.taglistFixing.push(this.inputTagtxt.trim())
        this.inputTagtxt = '' // 입력 필드를 비웁니다.
      }
      // console.log(this.cardInfo)
    },
    updateTitle() {},
    handleCancelFixedButtonClick() {
      this.taglistFixing = [...this.componentsTagList]
      const dragdropImg = document.querySelector('.dragdropChangedImg')
      // dragdropImg.style.display = 'none'
      this.viewThumbnail = this.thumbnailUsing
      this.componentsEditmode = false
      this.thumbnailImg = this.thumbnailUsing
        ? ''
        : `${this.$config.viewtrack.productBaseUrl}/api/media/download?path=${this.cardInfo.properties.thumbnailPath}`
      this.viewThumbnail = this.thumbnailUsing
      this.thumbnailImgName = this.fixedProjectPopName
      this.thumbnailImgByte = ''
      this.$emit('click-cancel', false)
    },
    async handleNewFileButtonClickCreate() {
      this.componentsTagList = [...this.taglistFixing]

      this.overlay = false
      this.componentsEditmode = false
      this.fixedProjectPopDisplay = !this.fixedProjectPopDisplay

      const updateData = {
        properties: {
          name: this.fixedProjectPopName,
          tag: this.componentsTagList,
          thumbnailPath: this.thumbnailImg,
        },
      }
      try {
        if (this.thumbnailFile == null) {
          const response = await this.$axios.put(`/api/${this.cardInfo?.docType == '' ? 'media' : this.cardInfo?.docType}`, {
            _id: this.cardInfo._id,
            properties: {
              name: this.fixedProjectPopName,
              tag: this.componentsTagList,
            },
          })
        } else {
          if (this.cardInfo?.docType == 'media') {
            const formData = new FormData()
            formData.append('_id', this.cardInfo._id)
            formData.append('templateId', this.cardInfo.templateId)
            formData.append('thumbnailFile', this.thumbnailFile)
            formData.append('properties[name]', this.fixedProjectPopName)
            formData.append('properties[tag]', JSON.stringify(this.componentsTagList))
            // this.componentsTagList.forEach((tag, index) => {
            //   formData.append(`properties[tag][${index}]`, tag)
            // })
            formData.append('properties[userId]', this.cardInfo.properties.userId)

            try {
              const { data = {} } = await this.$axios.put(`${this.productBaseUrl}/api/media`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
            } catch (error) {
              console.error('Error uploading file', error)
            }
          }
          if (this.cardInfo?.docType == 'component') {
            const formData = new FormData()
            formData.append('_id', this.cardInfo._id)
            formData.append('templateId', this.cardInfo.templateId)
            formData.append('thumbnailFile', this.thumbnailFile)
            // formData.append('properties', this.cardInfo.properties)
            formData.append('properties[name]', this.fixedProjectPopName)
            formData.append('properties[tag]', this.componentsTagList)
            try {
              const { data = {} } = await this.$axios.put(
                `${this.productBaseUrl}/api/${this.cardInfo?.docType == '' ? 'component' : this.cardInfo?.docType}`,
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                }
              )
            } catch (error) {
              console.error('Error uploading file', error)
            }
          }
        }
      } catch (error) {
        console.error('API error:', error)
      }
      this.componentsEditmode = false
      this.$emit('click-update', updateData)
    },
    deleteThumbnail() {
      this.viewThumbnail = true
      this.thumbnailImg = ''
    },
    handleDrop(event) {
      event.preventDefault()
      if (this.componentsEditmode) {
        this.viewThumbnail = false
        const files = event.dataTransfer.files
        if (files.length > 0) {
          this.handleFiles(files)
        }
      }
    },
    handleFiles(files) {
      // 파일 처리 로직을 여기에 구현합니다.
      // 예를 들어, 파일 미리보기를 표시하거나 파일을 업로드하는 등의 작업을 수행할 수 있습니다.

      if (files.length && files[0]) {
        const file = files[0]
        if (file.size > 5242880) return

        const dragdropImg = document.querySelector('.dragdropChangedImg')
        // const dragdropImgName = document.querySelector('.dragdropImgName')
        // const dragdropByte = document.querySelector('.dragdropImgSize')

        const reader = new FileReader()
        reader.onload = e => {
          this.thumbnailImg = e.target.result
        }
        reader.readAsDataURL(file)
        this.thumbnailImgName = file.name
        dragdropImg.style.display = 'flex'

        this.thumbnailFile = file
        // dragdropByte.style.display = 'none'
        this.thumbnailImgByte = this.formatBytes(file.size)
      }
    },
    previewImage(event) {
      const input = event.target
      if (input.files && input.files[0]) {
        const file = input.files[0]
        if (file.size > 5242880) return

        const dragdropImg = document.querySelector('.dragdropChangedImg')
        const dragdropImgName = document.querySelector('.dragdropImgName')
        const dragdropByte = document.querySelector('.dragdropImgSize')

        const reader = new FileReader()
        reader.onload = e => {
          dragdropImg.querySelector('img').src = e.target.result
          dragdropImg.style.display = 'flex'
        }

        reader.readAsDataURL(input.files[0])
        dragdropImgName.textContent = input.files[0].name
        dragdropImg.style.display = 'flex'
        dragdropByte.textContent = this.formatBytes(file.size)
      }
    },
    formatBytes(bytes) {
      // 바이트를 특정 단위(KB, MB, GB 등)로 변환하는 로직
      // 예를 들어, MB 단위로 변환하는 코드
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    },
    selectTagOption(index) {
      this.taglistFixing.splice(index, 1)
    },
    addTagEvent() {
      let error = false
      this.componentsTagList.forEach(tag => {
        if (!tag) error = true
      })
      if (error) {
        this.dialogSnackbar = true
        this.dialogSnackbarText = '태그 값을 입력해 주세요.'
        return
      }
      this.componentsTagList.unshift('')
    },
  },
}
</script>

<style lang="scss">
.fixed-project-pop-content {
  display: flex;
  width: 61.57143rem !important;
  height: 37.57143rem;
  border-radius: 0.71429rem;
  padding: 4.13rem 4.388rem 2.87rem 6rem;
  justify-content: space-between;
  color: #1e1e1e;
  font-size: 0.88rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

#changeImg-pop-inputDragNDrop {
  position: relative;
  display: flex;
  flex-direction: row !important;
  gap: 1.06rem;
  border-radius: 0.1875rem;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='3' ry='3' stroke='gray' stroke-width='3' stroke-dasharray='8%2c 11' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7.625rem;
  flex-shrink: 0;
}

#changeImg-pop-inputDragNDrop-name {
  position: absolute;
  top: 0;
  left: 0.37rem;
  width: 4.75rem;
  height: 0.8125rem;
  color: #7e7e7e;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  transform: translateY(-50%);
  background-color: #fff;
  text-align: center;
}
.theme--dark #changeImg-pop-inputDragNDrop-name {
  background-color: #1e1e1e;
  color: #fff;
}

.fixed-project-pop-input textarea {
  resize: none !important;
}

#fixed-project-pop-btn div {
  display: flex;
  width: 9.71429rem;
  padding: 0.78571rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.21429rem;
  background: #f3f4f5;
  cursor: pointer;
}
#fixed-project-pop-close {
  background: #f3f4f5;
  color: #1e1e1e;
}

.fixed-project-pop-create {
  background: #7e73fe;
  color: #fff;
}
#changeImg-pop-inputDragNDrop-img {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
#changeImg-pop-inputDragNDrop-mb {
  display: flex;
  justify-content: center;
  align-items: center;
}
#changeImg-pop-inputDragNDrop-img .v-image {
  width: 3.6875rem;
  height: 2.43475rem;
}

.dragdropChangedImg {
  display: flex;
  width: 100%;
  height: 2.41rem;
  justify-content: space-between;
  margin-top: 1.19rem;
}
.dragdropImgName,
.dragdropImgSize {
  max-width: 9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1e1e1e;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  letter-spacing: -0.00875rem;
  overflow: hidden;
}

.clicked--btn-custom {
  display: flex;
  width: 9.71429rem;
  padding: 0.78571rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.21429rem;
}

.property-tag-section::-webkit-scrollbar {
  width: 0.4rem;
}
.property-tag-section::-webkit-scrollbar-thumb {
  background-color: #d5d5d5;
  border-radius: 10px;
}
.property-tag-section::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 10px;
}
</style>
