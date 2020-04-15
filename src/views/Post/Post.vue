<template>
  <v-container>
    <v-file-input chips multiple accept="image/*" @change="uploadFile" label="File input"  prepend-icon="mdi-camera"></v-file-input>
  </v-container>
</template>

<script>
export default {
  methods: {
    uploadFile(files) {
      files.forEach(file => {
        this.$store.dispatch('uploadFile', file)
      })
    }
  }
};
</script>

<style>
</style>