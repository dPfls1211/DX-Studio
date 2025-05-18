<template>
  <Dialog
    ref="dialog"
    modal
    panel-cls="dialog-v2"
    header-cls="d-none"
    body-cls="h-100 g-brd-0"
    footer-cls="dialog-button d-none"
    :closed="isDialogClosed"
    :closable="false"
    :dialog-style="computedDialogStyle"
  >
    <div class="f-column h-100">
      <div class="custom-header f-row w-100" :class="headerCls" :style="headerStyle">
        <!-- header -->
        <slot name="header">
          <div class="default-header f-row w-100">
            <h6 class="fw-bold my-auto px-4">{{ headerText }}</h6>
          </div>
        </slot>
        <!-- close button -->
        <div class="close-btn position-absolute">
          <LinkButton class="fw-bold h-100 w-100" :class="headerBtnCls" :style="headerBtnStyle" @click="close">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.7201 1.28143C20.0277 1.58897 20.0277 2.08759 19.7201 2.39513L11.6143 10.5008L19.7201 18.6064C20.0084 18.8948 20.0265 19.351 19.7742 19.6603L19.7201 19.7201C19.4126 20.0277 18.914 20.0277 18.6064 19.7201L10.5008 11.6143L2.39513 19.7201C2.08759 20.0277 1.58897 20.0277 1.28143 19.7201C0.973897 19.4126 0.973897 18.914 1.28143 18.6064L9.38726 10.5008L1.28143 2.39513C0.993118 2.10681 0.975098 1.65055 1.22738 1.34124L1.28143 1.28143C1.58897 0.973897 2.08759 0.973897 2.39513 1.28143L10.5008 9.38726L18.6064 1.28143C18.914 0.973897 19.4126 0.973897 19.7201 1.28143Z"
                fill="white"
              />
            </svg>
          </LinkButton>
        </div>
      </div>

      <!-- body -->
      <div class="custom-body f-full" :class="bodyCls" :style="bodyStyle">
        <overlay-scrollbars-vue class="f-full h-100">
          <slot name="body"> </slot>
        </overlay-scrollbars-vue>
      </div>

      <!-- footer -->
      <div v-if="!disableFooter" class="custom-footer" :class="footerCls" :style="footerStyle">
        <slot name="footer">
          <div class="default-buttons f-row align-items-center justify-content-center position-relative">
            <div class="border position-absolute"></div>
            <LinkButton :disabled="disableCloseBtn" class="close-btn fw-bold me-2" style="" @click="close"> {{ closeBtnText }} </LinkButton>
            <LinkButton :disabled="disableSaveBtn" class="save-btn fw-bold" style="" @click="save"> {{ saveBtnText }} </LinkButton>
          </div>
        </slot>
      </div>
    </div>
  </Dialog>
</template>

<script>
import 'overlayscrollbars/css/OverlayScrollbars.css'
export default {
  components: {
    OverlayScrollbarsVue: () => import('overlayscrollbars-vue').then(({ OverlayScrollbarsComponent }) => OverlayScrollbarsComponent),
  },
  props: {
    dialogStyle: { type: Object, default: () => ({}) },
    headerText: { type: String, default: '디폴트 헤더' },
    headerBtnCls: { type: String, default: '' },
    headerBtnStyle: { type: Object, default: () => ({}) },
    headerCls: { type: String, default: '' },
    headerStyle: { type: Object, default: () => ({}) },
    bodyCls: { type: String, default: '' },
    bodyStyle: { type: Object, default: () => ({}) },
    footerCls: { type: String, default: '' },
    footerStyle: { type: Object, default: () => ({}) },
    disableSaveBtn: { type: Boolean, default: false },
    disableCloseBtn: { type: Boolean, default: false },
    saveBtnText: { type: String, default: '등록' },
    closeBtnText: { type: String, default: '닫기' },
    disableFooter: { type: Boolean, default: false },
  },
  data() {
    return {
      isDialogClosed: true,
      loginInfo: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
    computedDialogStyle() {
      return Object.assign(this.dialogStyle)
    },
  },
  methods: {
    close() {
      this.isDialogClosed = true
      this.$emit('close')
    },
    open() {
      this.isDialogClosed = false
    },
    save() {
      this.$emit('save')
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-v2 {
  .custom-header {
    background-color: transparent !important;
    height: 4.2rem;

    .default-header {
      background: #f2f4f8;
    }

    .close-btn {
      height: 4.2rem;
      width: 4.2rem;
      right: 0rem;
      z-index: 1;
      .l-btn {
        border-radius: 0px 0px 0px 20px;
        background: #50575e !important;
        border-color: #50575e !important;
        &:hover {
          background: #373e45 !important;
          border-color: #373e45 !important;
        }
      }
    }
  }
  .custom-body {
    background-color: transparent !important;
    padding: 0px !important;
  }
  .custom-footer {
    .default-buttons {
      height: 90px;
      background: #ffffff;
      .border {
        width: 90%;
        height: 1px;
        background: #c1c7cd;
        top: 0%;
        left: 50%;
        transform: translateX(-50%);
      }
      .close-btn {
        width: 100px;
        height: 40px;
        font-size: 16px !important;
        background: #50575e;
        border-color: #50575e;
        border-radius: 3px;
        &:hover {
          background: #373e45;
          border-color: #373e45;
        }
      }
      .save-btn {
        width: 100px;
        height: 40px;
        font-size: 16px !important;
        background: #0270d6;
        border-color: #0270d6;
        border-radius: 3px;
        &:hover {
          background: #0057bd;
          border-color: #0057bd;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.dialog-v2.window {
  .panel-body {
    padding: 0px !important;
    background-color: #eeeeee !important;
  }
}
</style>
