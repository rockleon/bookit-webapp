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
        <v-list-item class="list-item">
          <span>Publish an Event</span>
        </v-list-item>
        <v-list-item class="list-item" @click="dialog = true">
          <span>Login as Admin</span>
        </v-list-item>
        <v-list-item class="list-item">
          <span>View Dark Mode</span>
        </v-list-item>
        <v-list-item class="list-item">
          <span>Give Feedback</span>
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
  </div>
</template>

<script>
import LoginForm from "./LoginForm";

export default {
  name: "TopBar",
  components: { LoginForm },
  data() {
    return {
      dialog: false
    };
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
  background-color: var(--v-secondary-lighten2) !important;
}

.list-item {
  cursor: pointer;
}

.list-item span:hover {
  text-decoration: underline;
}
</style>