<template>
  <div class="page-container">
    <loader v-if="loading" />
    <div v-else>
      <div class="publish-titlebar">
        <span cols="11" class="page-title">{{event.title}}</span>
        <span cols="1" class="page-buttons-container">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <!-- <v-icon v-on="on" color="black">mdi-menu</v-icon> -->
              <v-icon v-on="on" color="black">mdi-dots-vertical</v-icon>
            </template>
            <v-list style="width: 125px">
              <v-list-item link @click="openDetail">
                <v-list-item-title class="list-title">View Detail</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
                @click="$router.push({name:'AdminEventEdit', params:{eventId: $route.params.eventId}})"
              >
                <v-list-item-title class="list-title">Edit</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="handleDeleteEvent">
                <v-list-item-title class="list-title">Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </span>
      </div>
      <div class="event-detail">
        <div class="row-container">
          <v-row class="ma-0">
            <v-col cols="6" style="padding-right: 50px">
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
                    <v-row
                      class="ma-0 card-title"
                    >{{isEventFinished ? 'Completed':'Arrangements Ongoing'}}</v-row>
                    <v-row
                      class="ma-0 card-subtitle"
                    >{{isEventFinished ? 'Congratulations! The event has been completed':'Event arrangements are still going on'}}</v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="6" style="padding-left: 50px;">
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
            <v-col cols="6" style="padding-right: 50px;">
              <v-card class="event-stats card" style="padding: 8px;">
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
            <v-col cols="6" style="padding-left: 50px">
              <v-card class="event-stats card" style="padding: 20px;">
                <v-row
                  class="card-title ma-0"
                  style="padding-bottom: 20px;"
                >Tickets Sold as per Registration Type</v-row>
                <pie-chart :chartData="chartData" />
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div class="row-container" style="padding: 12px;">
          <v-card class="event-bookings card">
            <v-row class="card-title ma-0">Bookings made</v-row>
            <v-row class="ma-0" style="padding-top: 20px;">
              <v-data-table
                :headers="headers"
                :items="bookings"
                :options.sync="options"
                :server-items-length="totalItems"
                :loading="tableLoading"
                :footer-props="{ 'items-per-page-options': [5, 10, 15, 20] }"
                class="elevation-1"
                style="width: 100%"
              >
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-if="!items.length && !loading && !tableLoading">
                      <td class="table-message" colspan="5">No Results</td>
                    </tr>
                    <tr v-for="item in items" :key="item.id">
                      <td
                        class="td table-name"
                        style="width: 28%;"
                        @click="showBookingDetail(item)"
                      >{{ getFullName(item.user_details) }}</td>
                      <td class="td" style="width: 25%;">{{ formatDate(item.created) }}</td>
                      <td class="td" style="width: 18%">{{item.registration_type}}</td>
                      <td class="td" style="width: 14%;">{{ item.number_of_tickets }}</td>
                      <td class="td" style="width: 15%;">{{ item.total_amount }}</td>
                    </tr>
                  </tbody>
                </template>
                <template v-slot:progress>
                  <v-progress-linear color="primary" indeterminate></v-progress-linear>
                  <div class="table-message">Loading...</div>
                </template>
              </v-data-table>
            </v-row>
          </v-card>
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
      <v-dialog v-model="dialog2" width="600">
        <booking-detail :booking="activeBooking" />
      </v-dialog>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Loader from "../../components/Loader";
import EventDetail from "../User/EventDetail";
import PieChart from "../../components/PieChart";
import BookingDetail from "../../components/BookingDetail";
import { getEventDetail, deleteEvent } from "../../apis/event";
import { getBookings } from "../../apis/booking";
import { eventBookingTypeStats } from "../../apis/stats";

export default {
  name: "AdminEventDetail",
  props: ["eventId"],
  components: { Loader, EventDetail, PieChart, BookingDetail },
  data() {
    return {
      loading: true,
      dialog: false,
      dialog2: false,
      event: null,
      chartData: [["Registration Type", "Seats Count"]],
      bookings: [],
      totalItems: 0,
      tableLoading: false,
      activeBooking: null,
      options: {
        page: 1,
        itemsPerPage: 10,
        groupBy: [],
        groupDesc: [],
        sortBy: 1,
        sortDesc: 1,
        multiSort: false,
        mustSort: false
      },
      headers: [
        {
          text: "Client Name",
          align: "start",
          sortable: false,
          class: "table-header"
        },
        {
          text: "Booking Date",
          align: "start",
          sortable: false,
          class: "table-header"
        },
        {
          text: "Type",
          align: "start",
          sortable: false,
          class: "table-header"
        },
        {
          text: "Tickets",
          align: "start",
          sortable: false,
          class: "table-header"
        },
        {
          text: "Price Paid",
          align: "start",
          sortable: false,
          class: "table-header"
        }
      ]
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
        let avg =
          (this.event.number_of_seats - this.event.available_seats) /
          this.event.number_of_seats;
        avg *= 100;
        return Math.floor(avg);
      } else return 0;
    }
  },
  watch: {
    options: {
      handler(oldVal, newVal) {
        if (
          oldVal.itemsPerPage !== newVal.itemsPerPage ||
          oldVal.page !== newVal.page
        ) {
          this.fetchBookings();
        }
      },
      deep: true
    },
    ordering: function() {
      this.fetchEvents();
    }
  },
  mounted() {
    this.fetchEventDetail();
  },
  methods: {
    fetchEventDetail() {
      getEventDetail(this.eventId, { is_admin: true })
        .then(async response => {
          this.event = response.data;
          await this.fetchBookings();
          await this.fetchStats();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchBookings() {
      this.tableLoading = true;
      const { page, itemsPerPage } = this.options;
      let params = {
        event: this.eventId,
        limit: itemsPerPage,
        offset: itemsPerPage * (page - 1)
      };
      getBookings(params)
        .then(response => {
          this.bookings = response.data.results;
          this.totalItems = response.data.count;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    fetchStats() {
      eventBookingTypeStats(this.eventId)
        .then(response => {
          let data = [...this.chartData];
          response.data.map(obj => {
            data.push([obj.registration_type, obj.type_count]);
          });
          this.chartData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    openDetail() {
      this.dialog = true;
    },
    handleDeleteEvent() {
      deleteEvent(this.eventId).then(() => {});
    },
    showBookingDetail(item) {
      this.activeBooking = item;
      this.dialog2 = true;
    },
    getFullName(user_details) {
      let name = "";
      if (user_details.first_name && user_details.first_name.length)
        name += `${user_details.first_name} `;
      if (user_details.last_name && user_details.last_name.length)
        name += user_details.last_name;
      return name;
    },
    formatDate(dateTime) {
      let date = moment(dateTime).format("DD/MM/YYYY");
      if (date === moment().format("DD/MM/YYYY")) {
        return `Today, ${moment(dateTime).format("hh:mm A")}`;
      } else return moment(dateTime).format("DD MMMM YYYY, hh:mm A");
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
  /* justify-content: space-between; */
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
  padding-left: 20px;
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
  font-weight: 600;
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

.event-bookings {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.table-message {
  text-align: center;
  font-size: 16px;
  padding: 10px;
}

.td {
  font-size: 16px;
}

.table-name {
  cursor: pointer;
  font-size: 16px;
}

.table-name:hover {
  text-decoration: underline;
}

.detail-view {
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>