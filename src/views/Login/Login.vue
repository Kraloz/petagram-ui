<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="username"
        :rules="[rules.required]"
        name="input-username"
        label="Username"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required]"
        :type="show1 ? 'text' : 'password'"
        name="input-password"
        label="Password"
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="logIn">Log In</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      username: "taprile",
      password: "gordo42069",
      valid: true,
      rules: {
        required: value => !!value || "Required."
        // min: v => v.length >= 8 || "Min 8 characters",
        // emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    logIn() {
      this.$refs.form.validate();

      if (this.valid) {
        this.$store
          .dispatch("logIn", {
            username: this.username,
            password: this.password
          })
          .then(_ => this.$router.push("/home/"));
      }
    }
  }
};
</script>
