<template>
  <div class="event-detail">
    <loader v-if="loading" />
    <!-- Event Main Card -->
    <div v-else>
      <div class="event-main-card card">
        <div class="image-div">
          <v-img
            :src="event.image_details.image_url"
            :alt="event.title"
            height="400"
            class="event-image"
            contain
          ></v-img>
        </div>
        <div class="info-row">
          <div class="event-basic-info">
            <div class="event-title">{{event.title}}</div>
            <div class="event-subtitle">
              <v-row class="ma-0">{{getString(event.tags_details)}}</v-row>
              <v-row class="ma-0">
                <span class="subtitle-span" style="padding-left: 0px">{{event.duration}}</span>
                <v-divider vertical />
                <span class="subtitle-span">{{event.age_limit}}+</span>
                <v-divider vertical />
                <span class="subtitle-span">{{getString(event.languages_details)}}</span>
              </v-row>
            </div>
          </div>
          <div class="event-button">
            <v-btn
              v-if="$route.name === 'EventDetail'"
              block
              color="secondary"
              height="50"
              @click="showBookingForm"
            >REGISTER</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
        <v-row class="ma-0">
          <v-col cols="3" style="padding-left: 0px">{{getDate}}</v-col>
          <v-col cols="2" class="rupee-col">
            <img :src="require('@/assets/icons/rupee.png')" alt="Rupees" height="24" />
            <span>{{event.cost_per_person}}</span>
          </v-col>
          <v-col cols="7">
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
              <span>{{event.views_count}}</span>
            </v-row>
            <v-row class="count-row ma-0">
              <span>Available Seats:</span>
              <span>{{event.available_seats}}/{{event.number_of_seats}}</span>
            </v-row>
            <v-row class="count-row ma-0">
              <span style="padding-right: 5px">Last date to register:</span>
              <span class="text-important">{{getLastDate}}</span>
            </v-row>
          </div>
          <div class="event-share card">
            <v-row class="ma-0">Lost Your Pass?</v-row>
            <v-row class="ma-0" style="padding-top: 5px">
              <span
                class="text-in-progress"
              >Enter your registration Id to receive a copy of your event pass</span>
            </v-row>
            <v-form ref="lostForm" v-model="valid" @submit.prevent>
              <v-row class="ma-0">
                <v-col cols="9" style="padding-left: 0px">
                  <v-text-field
                    solo
                    dense
                    v-model="bookingId"
                    placeholder="Registration Id"
                    hide-details="auto"
                    :rules="[rules.required, rules.invalidId]"
                    @focus="isIdInvalid = false"
                    @keypress.enter="handleLostRegistration"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" style="padding-right: 0px">
                  <v-btn
                    block
                    color="secondary"
                    :loading="submitLoading"
                    :disabled="submitLoading"
                    @click="handleLostRegistration"
                  >GO</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </div>
          <div class="event-map card">
            <span>Check location on map</span>
            <v-row class="ma-0" style="padding-top: 10px;">
              <span class="text-in-progress">Work in Progress</span>
              <v-icon style="padding-left: 5px" size="20">mdi-progress-clock</v-icon>
            </v-row>
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
              <div class="title1" style="white-space: pre-line">Venue</div>
              <div class="text-area">{{event.venue}}</div>
            </div>
            <v-divider style="margin-bottom: 10px; margin-top: 10px"></v-divider>
            <div class="description">
              <div class="title1">Description</div>
              <div class="text-area" v-html="event.description"></div>
            </div>
            <v-divider style="margin-bottom: 10px; margin-top: 10px"></v-divider>
            <div class="description">
              <div class="title1">Terms & Conditions</div>
              <div class="text-area" v-html="event.terms_and_conditions"></div>
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
            :seatsAvailable="event.available_seats"
            @closeModal="dialog = false"
          />
        </v-card>
      </v-dialog>
      <!-- Event Registration Form Modal end -->

      <!-- House Full Modal -->
      <v-dialog v-model="dialog2" max-width="400">
        <v-card class="full-modal">
          <v-row class="card-head ma-0">All Tickets were Sold!</v-row>
          <v-row class="card-row ma-0">
            <img :src="require('@/assets/house_full.jpg')" alt="House Full" />
          </v-row>
        </v-card>
      </v-dialog>
      <!-- House Full Modal end -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
import EventRegistrationForm from "../../components/EventRegistrationForm";
import Loader from "../../components/Loader";
import { getEventDetail } from "../../apis/event";
import { getBookingDetail } from "../../apis/booking";

export default {
  name: "EventDetail",
  props: ["eventId"],
  components: { EventRegistrationForm, Loader },
  data() {
    return {
      event: null,
      dialog: false,
      dialog2: false,
      loading: true,
      valid: true,
      bookingId: null,
      isIdInvalid: false,
      submitLoading: false,
      rules: {
        required: value => !!value || "required",
        invalidId: () => !this.isIdInvalid || "Invalid Id"
      }
    };
  },
  mounted() {
    this.getEvent();
  },
  computed: {
    getDate() {
      let date = moment(this.event.start_time).format("DD/MM/YYYY");
      if (date === moment().format("DD/MM/YYYY")) {
        return `Today, ${moment(this.event.start_time).format("hh:mm A")}`;
      } else
        return moment(this.event.start_time).format("DD MMMM YYYY, hh:mm A");
    },
    getLastDate() {
      let date = moment(this.event.start_time);
      date = date.subtract(this.event.booking_closes_before, "days");
      date = date.format("DD MMMM, YYYY");
      return date;
    }
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
    },
    getString(list) {
      let listLength = list.length;
      if (!listLength) return "";
      else {
        let names = "";
        list.forEach((obj, index) => {
          if (index === listLength - 1) names += obj.title;
          else names += `${obj.title}, `;
        });
        return names;
      }
    },
    showBookingForm() {
      if (this.event.available_seats > 0) this.dialog = true;
      else this.dialog2 = true;
    },
    async handleLostRegistration() {
      this.submitLoading = true;
      await this.$refs.lostForm.validate();
      if (!this.valid) {
        this.submitLoading = false;
      } else {
        getBookingDetail(this.bookingId, { event: this.eventId })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
            this.isIdInvalid = true;
          })
          .finally(() => {
            this.submitLoading = false;
          });
      }
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
  background-color: #efefef;
}

.event-image {
  width: 100%;
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
  padding-top: 10px;
  font-size: 18px;
  color: var(--v-text-lighten5);
}

.subtitle-span {
  padding: 0px 15px;
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

.full-modal {
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

.text-area {
  white-space: pre-wrap;
  padding: 10px 0px;
  color: var(--v-text-base);
}

.text-important {
  color: var(--v-error-darken2);
}

.text-in-progress {
  color: var(--v-text-lighten5);
}
</style>