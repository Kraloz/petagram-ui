<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <app-footer/>
  </v-app>
</template>

<script>
import AppFooter from "@/components/Layout/Footer.vue"
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    AppFooter
  }
};
</script>
