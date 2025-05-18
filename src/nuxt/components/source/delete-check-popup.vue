<template>
  <v-dialog v-model="ViewBoolean" persistent max-width="27rem">
    <v-card style="padding: 0.93rem 1.21rem">
      <div
        class="d-flex align-items-center justify-content-center"
        style="flex-direction: column; gap: 0.57rem; font-weight: 500; line-height: 1.125rem; height: 8.43rem"
      >
        <i class="dti-trashcan" style="font-size: 3rem; color: #7e73fe"></i>
        <span style="font-size: 1rem; letter-spacing: -0.00875rem">해당 파일을 삭제하겠습니까?</span>
        <span style="font-size: 0.85714rem">이 동작은 실행 취소할 수 없으며 즉시 삭제됩니다.</span>
      </div>
      <v-divider></v-divider>
      <div class="d-flex" style="flex-direction: row; justify-content: space-between">
        <div class="d-flex align-items-center" style="flex-direction: row">
          <v-checkbox v-model="viewReCheck" class="custom-v-checkbox" color="#7e73fe" style="padding: 0 !important; margin-left: 1rem"></v-checkbox>
          다시 보지 않기
        </div>
        <div class="d-flex" style="flex-direction: row; gap: 0.57rem">
          <v-btn
            class="newComponentBtn"
            depressed
            style="background-color: rgba(126, 115, 254, 1); color: white; width: 4.42857rem !important; height: 3rem !important"
            @click="cancleBtn"
            >취소</v-btn
          >
          <v-btn class="newComponentBtn" style="width: 4.42857rem !important; height: 3rem !important" depressed @click="removeConfirmBtn">삭제</v-btn>
          <!-- removeCheckedItems -->
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    deletedViewBoolean: { type: Boolean, required: true },
    deletedId: { type: String, default: '' },
    deletedIdList: { type: Array, default: () => [] },
  },
  data() {
    return {
      ViewBoolean: this.deletedViewBoolean,
      viewReCheck: false,
    }
  },
  watch: {
    deletedViewBoolean(val) {
      this.ViewBoolean = val
    },
  },
  methods: {
    cancleBtn() {
      this.viewReCheck = false
      this.$emit('click-cancel', false)
    },
    async removeCheckedItems() {
      if (this.deletedIdList.length > 0)
        try {
          await Promise.all(this.deletedIdList.map(id => this.$axios.delete(`/api/component/${id}`)))

          // 삭제된 항목을 componentsList에서 제거합니다.
          const deleteObj = {
            checkbox: this.viewReCheck,
            type: 'list',
          }
          this.$emit('click-delete', deleteObj)
        } catch (error) {
          console.error('Failed to delete components:', error)

          this.$emit('click-cancel', false)
        }
      if (this.deletedId !== '') {
        try {
          await this.$axios.delete(`/api/component/${this.deletedId}`)
          const deleteObj = {
            checkbox: this.viewReCheck,
            type: 'id',
            id: this.deletedId,
          }
          // 삭제된 항목을 componentsList에서 제거합니다.
          this.$emit('click-delete', deleteObj)
        } catch (error) {
          console.error('Failed to delete components:', error)
          this.$emit('click-cancel', false)
        }
      }
    },
    removeConfirmBtn() {
      this.$emit('click-delete', this.viewReCheck)
    },
  },
  //체크박스 체크했을 때의 함수 생성
}
</script>
