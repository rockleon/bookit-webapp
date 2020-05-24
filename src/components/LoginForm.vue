<template>
  <v-form ref="loginForm" v-model="valid" class="login-form" @submit.prevent>
    <v-row class="event-title ma-0">Admin Sign In</v-row>
    <v-row class="form-row ma-0" style="padding-top: 20px;">
      <v-col
        cols="12"
        class="form-col error--text"
        style="text-align: center"
      >{{ incorrectCreds ? 'Incorrect Username or Password':''}}</v-col>
      <v-col cols="12" class="form-col">
        <v-text-field
          v-model="username"
          label="Username"
          :rules="[rules.required]"
          validate-on-blur
          class="pa-0"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="form-row ma-0">
      <v-col cols="12" class="form-col">
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          :rules="[rules.required]"
          validate-on-blur
          class="pa-0"
          @keypress.enter="handleSubmit"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="form-row ma-0">
      <v-col cols="12" class="form-col" style="margin-bottom: 10px">
        <v-btn
          large
          block
          class="form-button text-capitalize pa-0"
          color="secondary"
          :loading="submitLoading"
          :disabled="submitLoading"
          @click="handleSubmit"
        >Submit</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { login } from "../apis/auth";

export default {
  name: "LoginForm",
  data() {
    return {
      valid: false,
      username: null,
      password: null,
      submitLoading: false,
      incorrectCreds: false,
      rules: {
        required: value => !!value || "required"
      }
    };
  },
  methods: {
    async handleSubmit() {
      this.incorrectCreds = false;
      this.submitLoading = true;
      await this.$refs.loginForm.validate();
      if (!this.valid) {
        this.submitLoading = false;
      } else {
        let payload = {
          username: this.username,
          password: this.password
        };
        login(payload)
          .then(response => {
            console.log(response.data);
            this.$emit("closeModal");
            this.submitLoading = false;
          })
          .catch(error => {
            console.log(error);
            this.submitLoading = false;
            this.incorrectCreds = true;
          });
      }
    },
    resetForm() {
      this.$refs.loginForm.reset();
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 100%;
  height: 100%;
}

.event-title {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  font-size: 26px;
  color: var(--v-accent-lighten5);
  background-color: var(--v-primary-base);
}

.form-row {
  display: flex;
  align-items: baseline;
  padding: 0px 10px;
}

.form-col {
  padding: 10px 20px;
}

.form-button {
  font-size: 16px !important;
}
</style>