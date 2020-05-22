<template>
  <div class="event-container">
    <loader v-if="loading" />
    <v-row class="search-filter ma-0"></v-row>
    <!-- Events List -->
    <v-row class="event-list ma-0">
      <v-col v-for="event in events" :key="event.id" xs="12" sm="12" md="4" class="card-col">
        <event-card :event="event" />
      </v-col>
    </v-row>
  </div>
  <!-- Events List -->
</template>

<script>
import EventCard from "../../components/EventCard";
import Loader from "../../components/Loader";
import { getEvents } from "../../apis/event";

export default {
  name: "EventList",
  components: { EventCard, Loader },
  data() {
    return {
      events: [],
      loading: true
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      getEvents()
        .then(response => {
          console.log(response.data);
          this.events = response.data.results;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          // this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.event-container {
  width: 100%;
  height: 100%;
}
.event-list {
  width: 100%;
  padding: 40px;
}

.card-col {
  padding: 2% 2% 2%;
}

@media only screen and (max-width: 600px) {
  .event-list {
    padding: 15px;
  }
}
</style>