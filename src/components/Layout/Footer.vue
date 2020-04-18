<template>
  <v-bottom-navigation fixed>
    <v-btn to="/home/">
      <span>Home</span>
      <v-icon>mdi-home-outline</v-icon>
    </v-btn>

    <v-btn to="/post/">
      <span>Post</span>
      <v-icon>mdi-camera-outline</v-icon>
    </v-btn>

    <v-btn to="/profile/">
      <span>Profile</span>
      <v-icon>mdi-paw</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {}
</script>
