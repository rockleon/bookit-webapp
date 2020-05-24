<template>
  <div class="events">
    <v-row class="ma-0"></v-row>
    <v-data-table
      :headers="headers"
      :items="events"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      :footer-props="{ 'items-per-page-options': [5, 10, 15, 20] }"
      class="elevation-1"
    />
  </div>
</template>

<script>
export default {
  name: "Events",
  components: {},
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start"
        },
        {
          text: "Date",
          align: "start"
        },
        {
          text: "City",
          align: "start"
        },
        {
          text: "Seats Booked",
          align: "start"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
</style>