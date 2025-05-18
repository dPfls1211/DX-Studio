<template>
  <section>
    <div class="f-column w-100 h-100">
      <div
        :id="`file-drop-zon-${divId}`"
        class="d-flex w-100 justify-content-center align-items-center custom-border"
        role="button"
        style="gap: 1.21rem; min-height: 6.93rem"
      >
        <v-icon v-if="!imgUrl" class="dti-upload" style="font-size: 2.5rem"></v-icon>
        <span v-if="!imgUrl" class="ms-2" style="width: 9.5rem; font-size: 0.85714rem; font-weight: 500; line-height: 1.28571rem"
          >업로드하려면 클릭하거나 이 영역으로 드래그하세요</span
        >
        <v-img v-if="imgUrl" contain height="100%" width="100%" :src="imgUrl" />
        <input :id="`file-input-${divId}`" type="file" class="hidden-input" />
      </div>
      <span
        :style="{ backgroundColor: isDark ? '#1E1E1E' : '#fff', color: isDark ? '#fff' : '#7E7E7E' }"
        style="position: absolute; top: -0.5rem; left: 0.9rem; font-size: 0.71429rem; font-weight: 500; padding: 0 0.64rem"
        >{{ title }}</span
      >
    </div>
  </section>
</template>

<script>
export default {
  props: {
    divId: {
      type: String,
      default: '',
    },
    divStyle: {
      type: [Object],
      default: () => {},
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imgUrl: '',
    }
  },
  computed: {
    computedDivStyle() {
      if (!this.divStyle) return { border: '1px dashed', height: '5.5rem' }
      const style = Object.keys(this.divStyle).length === 0 ? { border: '1px dashed', height: '5.5rem' } : this.divStyle
      return style
    },
    isDark() {
      return this.$vuetify.theme.dark
    },
  },
  beforeDestroy() {
    const dropZone = document.getElementById(`file-drop-zon-${this.divId}`)
    const fileInputElement = document.getElementById(`file-input-${this.divId}`)
    if (dropZone) {
      dropZone.removeEventListener('dragover', this.eventBlock)
      dropZone.removeEventListener('dragenter', this.eventBlock)
      dropZone.removeEventListener('dragleave', this.eventBlock)
      dropZone.removeEventListener('drop', this.dropEvent)
      dropZone.removeEventListener('click', this.clickEvent)
    }
    if (fileInputElement) fileInputElement.removeEventListener('change', this.changeFileEvent)
  },
  async mounted() {
    const dropZone = document.getElementById(`file-drop-zon-${this.divId}`)
    dropZone.addEventListener('dragover', this.eventBlock)
    dropZone.addEventListener('dragenter', this.eventBlock)
    dropZone.addEventListener('dragleave', this.eventBlock)
    dropZone.addEventListener('drop', this.dropEvent)
    dropZone.addEventListener('click', this.clickEvent)
  },
  methods: {
    eventBlock(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    dropEvent(e) {
      this.eventBlock(e)
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.imgUrl = reader.result
      }
      reader.readAsDataURL(file)
      this.$emit('fileUpload', file)
      e.target.value = ''
    },
    clickEvent() {
      const fileInputElement = document.getElementById(`file-input-${this.divId}`)
      fileInputElement.click()
      fileInputElement.addEventListener('change', this.changeFileEvent)
    },
    changeFileEvent(e) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          this.imgUrl = reader.result
        }
        reader.readAsDataURL(file)

        this.$emit('fileUpload', file)
        e.target.value = ''
      }
    },
  },
}
</script>

<style>
.hidden-input {
  display: none;
}
.custom-border {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='3' ry='3' stroke='gray' stroke-width='3' stroke-dasharray='8%2c 11' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 3px;
  height: 5.5rem;
}
</style>
