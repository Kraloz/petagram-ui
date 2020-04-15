<template>
  <v-img :src="src" height="194"></v-img>
</template>

<script>
import Interceptor from "@/plugins/interceptor.js";
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      src: ""
    };
  },
  created() {
    this.getImgSrc()
  },
  methods: {
    async getImgSrc() {
      const res = await Interceptor.get(
        `${process.env.VUE_APP_URL_API}${this.url}`
      )
      const b64 = `data:image/png;base64, ${res.data.image}`
      this.src = b64
      return b64
    }
  }
};
</script>
