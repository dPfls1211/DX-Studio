<template>
  <div class="full-screen-modal">
    <button class="close-button" @click="close">닫기</button>
    <div class="content">
      <div id="video-container"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoModule: {
      type: HTMLVideoElement,
      default: null,
    },
  },
  mounted() {
    if (!this.videoModule) return

    let targetElement = this.$el.querySelector('#video-container')

    if (targetElement) {
      const videoModule = this.videoModule
      videoModule.width = ''
      videoModule.height = ''
      videoModule.style.width = '100%'
      videoModule.style.height = '100%'
      videoModule.style['object-fit'] = 'cover'
      targetElement.appendChild(videoModule)
    } else {
      console.warn('video-container 엘리먼트를 찾을 수 없습니다.')
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style>
.close-button:hover {
  background-color: #e8414a; /* 마우스 호버시 배경색 */
}

.close-button:focus {
  box-shadow: 0 0 8px rgba(255, 71, 87, 0.5); /* 포커스시 쉐도우 */
}
.full-screen-modal {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.full-screen-modal .close-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #ff4757; /* 버튼의 배경색 */
  color: white; /* 글자색 */
  padding: 8px 16px; /* 패딩 */
  border: none; /* 테두리 제거 */
  border-radius: 4px; /* 모서리 둥글게 */
  cursor: pointer; /* 마우스 호버시 손 모양 */
  transition: background-color 0.3s; /* 배경색 변경 애니메이션 */
  font-weight: bold; /* 글자 굵게 */
  outline: none; /* 포커스 아웃라인 제거 */
}
.full-screen-modal .content {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  overflow: hidden;
  height: 88%;
  width: 80%;
}
</style>
