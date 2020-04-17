<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item>
      <v-list-item-avatar class="avatar" size="32" color="white">
        <v-icon>mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title font-weight-regular">{{ post.profile.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <post-image v-for="(img, i) in post.images" :key="i" :url="img.url" height="194"></post-image>

    <v-card-text class="pb-1">{{ post.description }}</v-card-text>

    <v-card-actions>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-chat-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex"
import PostImage from "@/components/Common/PostImage.vue"

export default {
  components: {
    PostImage
  },
  props: {
    post: Object
  },
  computed: {
    ...mapGetters(['imgSrc'])
  }
}
</script>

<style lang="scss" scoped>
  .v-avatar {
  border: 1px solid black;
  }
</style>
