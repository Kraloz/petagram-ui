<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
    </v-app-bar>

    <v-content class="pb-12">
      <router-view></router-view>
    </v-content>

    <app-footer v-show="showFooter" />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import AppFooter from "@/components/Layout/Footer.vue";

export default {
  name: "App",
  components: {
    AppFooter
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["isLoggedIn"]),
    showFooter() {
      return ["Login"].every(viewName => this.$route.name !== viewName);
    }
  },
  watch: {
    isLoggedIn: async (newVal, oldVal) => {
      if (!newVal) {
        await this.$store.dispatch("logOut");
        this.$router.push({ name: "Login" });
      }
    }
  }
};
</script>
