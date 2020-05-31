<template>
  <div class="page-container">
    <loader v-if="loading" />
    <div v-else class="publish-titlebar">
      <v-col cols="11" class="page-title">{{event.title}}</v-col>
      <v-col cols="1" class="page-buttons-container">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-dots-vertical</v-icon>
          </template>
          <v-list style="width: 125px">
            <v-list-item link>
              <v-list-item-title class="list-title" @click="openDetail">View Detail</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title
                class="list-title"
                @click="$router.push({name:'AdminEventEdit', params:{eventId: $route.params.eventId}})"
              >Edit</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title class="list-title">Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </div>
    <div class="event-detail">
      <div class="row-container">
        <v-row class="ma-0">
          <v-col cols="6" class="twin-cards" style="padding-right: 50px">
            <v-card class="event-status card">
              <v-row class="ma-0">
                <v-col cols="1" class="pa-0" align-self="center">
                  <img
                    v-if="isEventFinished"
                    :src="require('@/assets/icons/green-tick-filled.png')"
                    alt="green tick"
                    height="40"
                  />
                  <img
                    v-else
                    :src="require('@/assets/icons/ongoing-icon.png')"
                    alt="ongoing"
                    height="40"
                  />
                </v-col>
                <v-col cols="11">
                  <v-row class="ma-0 card-title">{{isEventFinished ? 'Completed':'Remaining'}}</v-row>
                  <v-row
                    class="ma-0 card-subtitle"
                  >{{isEventFinished ? 'Congratulations! The event has been completed':'Event arrangements are still going on'}}</v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="6" class="twin-cards" style="padding-left: 50px">
            <v-card class="event-money card">
              <v-row class="ma-0">
                <v-col cols="1" class="pa-0" align-self="center">
                  <img :src="require('@/assets/icons/rupee.png')" alt="money bag" height="50" />
                </v-col>
                <v-col cols="11">
                  <v-row class="ma-0 card-title">{{totalCostEarned}}</v-row>
                  <v-row class="ma-0 card-subtitle">Total money earned from ticket sale</v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="row-container" style="margin: 20px 0px;">
        <v-row class="ma-0">
          <v-col cols="6" class="twin-cards" style="padding-right: 50px">
            <v-card class="event-stats card">
              <v-row class="ma-0">
                <v-col cols="12" class="seat-progress-stats">
                  <v-row class="card-title ma-0">Tickets Sold</v-row>
                  <v-row class="seats-progress ma-0">
                    <v-progress-linear
                      color="secondary"
                      height="15"
                      :value="percentTicketsSold"
                      striped
                    ></v-progress-linear>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="ma-0" style="padding: 0px 12px 12px 12px;">
                <v-col cols="4" class="seat-count-col">
                  <span>Total Tickets</span>
                  <span class="stats-number">{{event.number_of_seats}}</span>
                </v-col>
                <v-col cols="4" class="seat-count-col">
                  <span>Tickets Sold</span>
                  <span class="stats-number">{{event.number_of_seats - event.available_seats}}</span>
                </v-col>
                <v-col cols="4" class="seat-count-col">
                  <span>Total Views</span>
                  <span class="stats-number">{{event.views_count}}</span>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="6" class="twin-cards" style="padding-left: 50px"></v-col>
        </v-row>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Detail View</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="$router.push({name: 'AdminEventEdit', params:{eventId: eventId}})"
            >Edit</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <event-detail :eventId="this.eventId" class="detail-view" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import Loader from "../../components/Loader";
import { getEventDetail } from "../../apis/event";
import EventDetail from "../User/EventDetail";

export default {
  name: "AdminEventDetail",
  props: ["eventId"],
  components: { Loader, EventDetail },
  data() {
    return {
      loading: true,
      event: null,
      dialog: false
    };
  },
  computed: {
    isEventFinished() {
      if (!this.loading) {
        return moment().diff(moment(this.event.start_time)) >= 0;
      } else return false;
    },
    totalCostEarned() {
      if (!this.loading) {
        return (
          (this.event.number_of_seats - this.event.available_seats) *
          this.event.cost_per_person
        );
      } else return 0;
    },
    percentTicketsSold() {
      if (!this.loading) {
        return (
          (this.event.number_of_seats - this.event.available_seats) /
          this.event.number_of_seats
        );
      } else return 0;
    }
  },
  mounted() {
    this.fetchEventDetail();
  },
  methods: {
    fetchEventDetail() {
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
    openDetail() {
      this.dialog = true;
    }
  }
};
</script>

<style scoped>
.page-container {
  width: 100%;
  overflow: hidden;
}
.publish-titlebar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 16.6px 30px;
  padding-left: 86px;
  background-color: var(--v-accent-lighten4);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  padding: 0px;
}

.page-buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px;
  padding-right: 10px;
}

.list-title:hover {
  text-decoration: underline;
}

.event-detail {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: calc(100vh - 150px);
  padding: 30px;
  padding-left: 86px;
  margin-top: 2.3px;
  overflow: auto;
}

.row-container {
  width: 100%;
  height: fit-content;
}

.card {
  height: fit-content;
  background-color: var(--v-card3-base);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.card-title {
  font-size: 20px;
}

.card-subtitle {
  font-size: 16px;
  color: var(--v-text-lighten5);
}

.event-status {
  width: 100%;
  padding-left: 20px;
}

.event-money {
  width: 100%;
  padding-left: 10px;
}

.twin-cards {
  padding: 0px;
  height: fit-content;
}

.event-stats {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.seat-progress-stats {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.seats-progress {
  padding: 20px 0px;
}

.seat-count-col {
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 0.5px solid #dbdada;
}

.stats-number {
  font-size: 24px;
  font-weight: 600;
  color: var(--v-primary-base);
}

.detail-view {
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>