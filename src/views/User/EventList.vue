<template>
  <v-row class="event-list ma-0">
    <v-col xs="12" sm="12" md="4" class="card-col" >
      <event-card :event="eventData" />
    </v-col>
    <v-col xs="12" sm="12" md="4" class="card-col">
      <event-card :event="eventData" />
    </v-col>
    <v-col xs="12" sm="12" md="4" class="card-col">
      <event-card :event="eventData" />
    </v-col>
    <v-col xs="12" sm="12" md="4" class="card-col">
      <event-card :event="eventData" />
    </v-col>
    <v-col xs="12" sm="12" md="4" class="card-col">
      <event-card :event="eventData" />
    </v-col>
  </v-row>
</template>

<script>
import EventCard from "../../components/EventCard";

export default {
  name: "EventList",
  components: { EventCard },
  data() {
    return {
      eventData: {
        title: "My First Full Stack Hackathon",
        date: "23 May, 2020",
        city: "Mumbai",
        image: "../../assets/event-concert.jpg"
      }
    };
  }
};
</script>

<style scoped>
.event-list {
  width: 100%;
  padding: 40px;
}
.card-col {
  padding: 2% 2% 2%;
}
</style>