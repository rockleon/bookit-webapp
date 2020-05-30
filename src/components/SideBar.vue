<template>
  <v-navigation-drawer class="drawer" permanent expand-on-hover>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img v-if="avatar !== null" :src="avatar"></v-img>
          <v-icon v-else color="primary">mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="pa-0">
          <v-list-item-title class="title">{{fullName}}</v-list-item-title>
          <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item
        link
        :class="activeList === 0 ? 'list-active':''"
        @click="$router.push({name: 'Dashboard'})"
      >
        <v-list-item-icon>
          <v-icon color="primary">mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :class="activeList === 1 ? 'list-active':''"
        @click="$router.push({name: 'AdminEvents'})"
      >
        <v-list-item-icon>
          <v-icon color="primary">mdi-format-list-text</v-icon>
        </v-list-item-icon>
        <v-list-item-title>View Events</v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :class="activeList === 2 ? 'list-active':''"
        @click="$router.push({name: 'PublishEvent'})"
      >
        <v-list-item-icon>
          <v-icon color="primary">mdi-book-plus-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Publish Event</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list style="padding-bottom: 20px;">
        <v-list-item link @click="handleLogout">
          <v-list-item-icon>
            <v-icon color="primary">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SideBar",
  data() {
    return {
      drawer: true,
      activeList: 0
    };
  },
  computed: mapState(["avatar", "fullName", "email"]),
  created() {
    this.setActiveNav();
  },
  watch: {
    $route: {
      handler() {
        this.setActiveNav();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["deleteUserData"]),
    setActiveNav() {
      let pathName = this.$route.path.split("/")[2];
      if (pathName === "dashboard") this.activeList = 0;
      else if (pathName === "events") this.activeList = 1;
      else this.activeList = 2;
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
.drawer {
  /* color: var(--v-accent-lighten5) !important; */
  /* background-color: var(--v-background-darken2) !important; */
  background-color: var(--v-accent-lighten4) !important;
}

.list-active {
  background-color: var(--v-accent-lighten1);
}
</style>