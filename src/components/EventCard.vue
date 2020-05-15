<template>
  <v-card class="event-card">
    <div class="image-div">
      <img :src="require('@/assets/events/concert.jpg')" :alt="event.title" class="event-image" />
    </div>
    <div class="event-title">{{ event.title }}</div>
    <div class="event-subtitle">
      <v-row class="ma-0" style="padding: 5px 0px;">
        <v-col cols="4" class="pa-0"></v-col>
        <v-col cols="8" class="pa-0" align="right">{{ event.date }}</v-col>
      </v-row>
      <v-row class="ma-0" style="padding: 5px 0px;">
        <v-col cols="4" class="pa-0"></v-col>
        <v-col cols="8" class="pa-0" align="right">{{ event.city }}</v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "EventCard",
  props: ["event"]
};
</script>

<style scoped>
.event-card {
  width: 100%;
  height: 370px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.event-card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.image-div {
  height: 200px;
  width: 100%;
  background-color: lavender;
  overflow: hidden;
}

.event-title {
  display: flex;
  width: 100%;
  height: 170px;
  padding: 25px;
  font-size: 20px;
  color: var(--v-text-base);
  background-color: var(--v-card1-base);
}

.event-subtitle {
  top: 297.4px;
  z-index: 2;
  height: 72.6px;
  width: 100%;
  padding: 5px 10px;
  position: absolute;
  font-size: 14px;
  color: var(--v-text-lighten1);
  background-color: var(--v-card2-base);
  border-top: 1px solid var(--v-card1-darken1);
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.event-card:hover .event-image {
  transform: scale(1.2);
}
</style>