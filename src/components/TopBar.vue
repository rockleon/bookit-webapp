<template>
  <div class="topbar">
    <img src="../assets/logo.jpg" alt="Bookit Logo" width="250" />

    <!-- Settings Icon -->
    <v-menu open-on-hover bottom offset-y>
      <template v-slot:activator="{ on }">
        <img
          v-on="on"
          src="../assets/icons/settings.png"
          alt="Settings"
          height="40"
          class="settings-icon"
        />
      </template>
      <v-list class="list">
        <v-list-item v-if="!$route.meta.requiresAuth" class="list-item" @click="dialog = true">
          <span>Login as Admin</span>
        </v-list-item>
        <v-list-item v-if="!$route.meta.requiresAuth" class="list-item" @click="handlePublishEvent">
          <span>Publish an Event</span>
        </v-list-item>
        <!-- <v-list-item class="list-item">
          <span>View Dark Mode</span>
        </v-list-item>-->
        <v-list-item class="list-item" @click="handleFeedback">
          <span>Give Feedback</span>
        </v-list-item>
        <v-list-item v-if="$route.meta.requiresAuth" class="list-item" @click="handleLogout">
          <span>Logout</span>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- Settings Icon end -->

    <!-- Login Modal -->
    <v-dialog v-model="dialog" max-width="400" @click:outside="$refs.login.resetForm()">
      <v-card>
        <login-form ref="login" @closeModal="dialog = false" />
      </v-card>
    </v-dialog>
    <!-- Login Modal end -->

    <!-- Contact Modal -->
    <v-dialog v-model="dialog2" max-width="400">
      <v-card class="contact-modal">
        <v-row class="card-head ma-0">{{ dialogText }}</v-row>
        <v-row class="card-row ma-0">
          <a href="mailto:ameyphantom07@gmail.com" target="_blank">ameyphantom07@gmail.com</a>
        </v-row>
        <v-row class="card-row ma-0">
          <a href="mailto:srijan.ramavat@gmail.com" target="_blank">srijan.ramavat@gmail.com</a>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- Contact Modal end -->
  </div>
</template>

<script>
import LoginForm from "./LoginForm";
import { mapActions } from "vuex";

export default {
  name: "TopBar",
  components: { LoginForm },
  data() {
    return {
      dialog: false,
      dialog2: false,
      dialogText: ""
    };
  },
  methods: {
    ...mapActions(["deleteUserData"]),
    handlePublishEvent() {
      this.dialogText = "Contact us at...";
      this.dialog2 = true;
    },
    handleFeedback() {
      this.dialogText = "Send feedback at...";
      this.dialog2 = true;
    },
    handleLogout() {
      this.deleteUserData();
      localStorage.removeItem("BOOKIT_TOKEN");
      this.$router.replace({ name: "Events" });
    }
  }
};
</script>

<style scoped>
.topbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--v-primary-base);
}

.settings-icon {
  cursor: pointer;
}

.list {
  background-color: var(--v-accent-lighten4) !important;
}

.list-item {
  cursor: pointer;
}

.list-item span:hover {
  text-decoration: underline;
}

.contact-modal {
  padding: 15px;
}

.card-head {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 24px;
  padding-bottom: 5px;
}

.card-row {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px;
}
</style>