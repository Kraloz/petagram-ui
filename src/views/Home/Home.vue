<template>
  <v-container>
    <post-card class="mb-4" v-for="(post, i) in PostList" :post="post" :key="i" />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import PostCard from "@/components/Common/PostCard.vue";
export default {
  components: {
    PostCard
  },
  data() {
    return {
      page: 1
    };
  },
  computed: {
    ...mapState({
      PostList: state => state.post.PostList
    })
  },
  created() {
    this.$store
      .dispatch("getPosts", { page: this.page })
      .then(_ => this.page++);
  }
};
</script>