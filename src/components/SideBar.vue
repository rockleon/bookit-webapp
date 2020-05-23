<template>
  <v-navigation-drawer class="drawer" permanent expand-on-hover>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="pa-0">
          <v-list-item-title class="title">Sandra Adams</v-list-item-title>
          <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link @click="$router.push({name: 'Dashboard'})">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push({name: 'AdminEvents'})">
        <v-list-item-icon>
          <v-icon>mdi-format-list-text</v-icon>
        </v-list-item-icon>
        <v-list-item-title>View Events</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push({name: 'PublishEvent'})">
        <v-list-item-icon>
          <v-icon>mdi-book-plus-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Publish Event</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      drawer: true
    };
  }
};
</script>

<style scoped>
.drawer {
  /* color: var(--v-accent-lighten5) !important; */
  /* background-color: var(--v-background-darken2) !important; */
  /* background-color: rgb(0, 0, 0, 0.7) !important; */
}
</style>