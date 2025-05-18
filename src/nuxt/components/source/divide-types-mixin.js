export default {
  props: {},
  data() {},
  methods: {
    checkType(getFileType) {
      if (getFileType.includes("image") || getFileType.includes("svg")) {
        return "photo";
      } else if (getFileType === "mp4" || getFileType === "video/mp4") {
        return "video";
      } else if (
        getFileType === "glb" ||
        getFileType === "model/gltf-binary" ||
        getFileType === "application/octet-stream"
      ) {
        return "model";
      } else {
        return;
      }
    },
    calVideoTime(getVideo) {
      console.info(getVideo);
    },
  },
};
