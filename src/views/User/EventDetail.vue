<template>
  <div class="event-detail">
    <loader v-if="loading" />
    <!-- Event Main Card -->
    <div v-else>
      <div class="event-main-card card">
        <div class="image-div">
          <img
            :src="require('@/assets/events/concert.jpg')"
            alt="event.title"
            height="400"
            class="event-image"
          />
        </div>
        <div class="info-row">
          <div class="event-basic-info">
            <div class="event-title">{{event.title}}</div>
            <div class="event-subtitle">{{event.description}}</div>
          </div>
          <div class="event-button">
            <v-btn block color="secondary" height="50" @click="dialog = true">REGISTER</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
        <v-row class="ma-0">
          <v-col cols="3" style="padding-left: 0px">{{event.date}}</v-col>
          <v-col cols="2" class="rupee-col">
            <img :src="require('@/assets/icons/rupee.png')" alt="Rupees" height="24" />
            <span>999</span>
          </v-col>
          <v-col cols="4">
            <v-icon>mdi-map-marker</v-icon>
            <span>{{event.city}}</span>
          </v-col>
        </v-row>
      </div>
      <!-- Event Main Card end -->

      <v-row class="event-content">
        <!-- Left Content -->
        <div class="content-left">
          <div class="views-entries card">
            <v-row class="count-row ma-0">
              <span>Views:</span>
              <span>10</span>
            </v-row>
            <v-row class="count-row ma-0">
              <span>Registered:</span>
              <span>10/20</span>
            </v-row>
            <v-row class="count-row text-important ma-0">
              <span style="padding-right: 5px">Last date to register:</span>
              <span>{{event.date}}</span>
            </v-row>
          </div>
          <div class="event-map card">
            <span>Check location on map</span>
          </div>
          <div class="event-share card">
            <v-row class="ma-0">Share this Event</v-row>
            <v-row class="ma-0" style="padding-top: 15px">
              <a href="https://www.facebook.com/" target="blank">
                <img src="https://i.imgur.com/lR0VyDO.png" alt="facebook" srcset width="25" />
              </a>
              <a href="https://twitter.com/" target="blank" style="margin-left: 15px;">
                <img src="https://i.imgur.com/6rKoUJ7.png" width="30" alt="twitter" srcset />
              </a>
            </v-row>
          </div>
        </div>
        <!-- Left Content end -->

        <!-- Right Content -->
        <div class="content-right">
          <div class="event-detail-info card" style="padding-bottom: 0px">
            <div class="description">
              <div class="title1">Description</div>
              <div class="text-area">{{event.description}}</div>
            </div>
            <v-divider style="margin-bottom: 10px"></v-divider>
            <div class="description">
              <div class="title1">Terms & Conditions</div>
              <div class="text-area">{{event.description}}</div>
            </div>
          </div>
        </div>
        <!-- Right Content end -->
      </v-row>

      <!-- Event Registration Form Modal -->
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
          <event-registration-form
            :eventId="eventId"
            :title="event.title"
            @closeModal="dialog = false"
          />
        </v-card>
      </v-dialog>
      <!-- Event Registration Form Modal end -->
    </div>
  </div>
</template>

<script>
import EventRegistrationForm from "../../components/EventRegistrationForm";
import Loader from "../../components/Loader";
import { getEventDetail } from "../../apis/event";

export default {
  name: "EventDetail",
  props: ["eventId"],
  components: { EventRegistrationForm, Loader },
  data() {
    return {
      event: null,
      dialog: false,
      loading: true
    };
  },
  mounted() {
    this.getEvent();
  },
  methods: {
    getEvent() {
      getEventDetail(this.eventId)
        .then(response => {
          this.event = response.data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.event-detail {
  width: 100%;
  height: fit-content;
  padding: 0px 12%;
}

.card {
  width: 100%;
  height: fit-content;
  padding: 10px 20px;
  background-color: var(--v-card2-lighten1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.event-main-card {
  padding-bottom: 0px;
  padding-top: 20px;
  margin-top: 10px;
}

.image-div {
  width: 100%;
}

.event-image {
  width: 100%;
  object-fit: cover;
}

.info-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 0px;
}

.event-basic-info {
  display: flex;
  flex-direction: column;
  width: 85%;
}

.event-title {
  width: 100%;
  word-break: normal;
  font-size: 24px;
  font-weight: 700;
}

.event-subtitle {
  width: 100%;
  padding: 10px 0px;
  font-size: 18px;
  color: var(--v-text-lighten5);
}

.event-button {
  display: flex;
  align-items: center;
  width: 15%;
  padding-left: 10px;
}

.divider {
  width: 100%;
  padding: 0px 20px;
}

.rupee-col {
  display: flex;
  align-items: center;
}

.event-content {
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
}

.content-left {
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  padding-right: 2%;
  width: 30%;
}

.views-entries {
  font-size: 16px;
}

.count-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 5px;
}

.event-map {
  margin-top: 20px;
}

.event-share {
  margin-top: 20px;
}

.content-right {
  display: flex;
  flex-direction: column;
  padding-right: 0px;
  padding-right: 0px;
  width: 70%;
}

.description1 {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.title1 {
  width: 100%;
  font-size: 20px;
  font-weight: 500;
}

.text-area {
  white-space: pre-wrap;
  padding: 10px 0px;
  color: var(--v-text-base);
}

.text-important {
  color: var(--v-error-darken2);
}
</style>