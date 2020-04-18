<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Petagram</div>
    </v-app-bar>

    <v-content class="pb-12">
      <router-view></router-view>
    </v-content>

    <app-footer v-show="showFooter" />
  </v-app>
</template>

<script>
import AppFooter from "@/components/Layout/Footer.vue";

export default {
  name: "App",
  components: {
    AppFooter
  },
  computed: {
    showFooter() {
      return ["Login"].every(viewName => this.$route.name !== viewName);
    }
  }
};
</script>
