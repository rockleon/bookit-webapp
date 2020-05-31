<template>
  <v-card
    class="event-card"
    @click="$router.push({name: 'EventDetail', params: {eventId: event.id}})"
  >
    <div class="image-div">
      <v-img :src="event.image_details.path" :alt="event.title" class="event-image" contain></v-img>
    </div>
    <div class="event-content">
      <div class="event-info">
        <div class="event-title">{{ event.title }}</div>
        <div class="event-location">{{ event.city }}</div>
      </div>
      <div class="event-date">
        <div class="date">{{getDate}}</div>
        <div class="month">{{getMonth}}</div>
      </div>
    </div>
    <div class="floater-count">
      <v-icon>mdi-eye</v-icon>
      <span>{{event.views_count}}</span>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "EventCard",
  props: ["event"],
  computed: {
    getDate() {
      let date = moment(this.event.start_time).format("DD");
      return date;
    },
    getMonth() {
      let month = moment(this.event.start_time).format("MMMM");
      return month;
    }
  }
};
</script>

<style scoped>
.event-card {
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.event-card:hover {
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.event-card:hover .event-image {
  transform: scale(1.2);
}

.image-div {
  height: 200px;
  width: 100%;
  overflow: hidden;
}

.event-image {
  width: 100%;
  /* height: 100%; */
  transition: transform 0.2s;
}

.event-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  background-color: var(--v-card2-base);
}

.event-info {
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 5px;
}

.event-title {
  display: flex;
  width: 100%;
  padding-bottom: 5px;
  font-size: 20px;
}

.event-location {
  width: 100%;
  font-size: 16px;
  color: var(--v-text-lighten5);
}

.event-date {
  width: 20%;
  padding: 5px;
}

.date {
  font-size: 20px;
  text-align: center;
  color: var(--v-error-darken2);
}

.month {
  text-align: center;
  color: var(--v-error-darken2);
}

.floater-count {
  display: flex;
  width: fit-content;
  padding: 5px 10px;
  color: white;
  font-size: 14px;
  background-color: var(--v-error-darken2);
  border-radius: 4px;
  position: absolute;
  top: 10px;
  right: 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
}

.floater-count .v-icon {
  color: white;
  margin-right: 5px;
  font-size: 16px;
}
</style>