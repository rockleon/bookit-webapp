<template>
  <div class="events">
    <loader v-if="pageLoading" />
    <v-row class="events-row ma-0">
      <v-col cols="5" class="filter-cols" align-self="end">
        <v-card class="filter-card">
          <v-text-field
            placeholder="Search by Name or City"
            v-model="searchVal"
            @input="debounceSearch"
            hide-details
            clearable
          >
            <v-icon slot="prepend" color="green">mdi-magnify</v-icon>
          </v-text-field>
        </v-card>
      </v-col>
      <v-col cols="2" class="filter-cols"></v-col>
      <v-col cols="3" class="filter-cols" style="padding-right: 20px;">
        <v-row class="ma-0 filter-text">Order by</v-row>
        <v-select
          solo
          v-model="ordering"
          :items="orderList"
          label="Order By"
          item-value="id"
          item-text="text"
          hide-details
          prepend-inner-icon="mdi-format-align-bottom"
        ></v-select>
      </v-col>
      <v-col cols="2" align-self="end" align="end" class="filter-cols" style="padding-left: 20px;">
        <v-btn
          color="secondary"
          height="48"
          style="font-size: 16px; font-weight: 600"
          @click="$router.push({name: 'PublishEvent'})"
        >+ Publish Event</v-btn>
      </v-col>
    </v-row>
    <v-row class="events-row ma-0">
      <v-data-table
        :headers="headers"
        :items="events"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        :footer-props="{ 'items-per-page-options': [5, 10, 15, 20] }"
        class="elevation-1"
        style="width: 100%"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-if="!items.length && !loading && !pageLoading">
              <td class="table-message" colspan="5">No Results</td>
            </tr>
            <tr v-for="item in items" :key="item.id">
              <td
                class="td table-name"
                style="width: 28%;"
                @click="$router.push({name:'AdminEventDetail', params:{eventId: item.id}})"
              >{{ item.title }}</td>
              <td class="td" style="width: 21%;">{{ formatDate(item.start_time) }}</td>
              <td
                class="td"
                style="width: 14%"
              >{{(item.number_of_seats - item.available_seats)}}/{{item.number_of_seats}}</td>
              <td class="td" style="width: 22%;">{{ getTags(item.tags_details) }}</td>
              <td class="td" style="width: 15%;">{{ item.city }}</td>
            </tr>
          </tbody>
        </template>
        <template v-slot:progress>
          <v-progress-linear color="primary" indeterminate></v-progress-linear>
          <div class="table-message">Loading...</div>
        </template>
      </v-data-table>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import _debounce from "lodash.debounce";
import Loader from "../../components/Loader";
import { getEvents } from "../../apis/event";

export default {
  name: "Events",
  components: { Loader },
  data() {
    return {
      events: [],
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
      totalItems: 0,
      pageLoading: true,
      loading: true,
      searchVal: null,
      ordering: "start_time",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          class: "table-header"
        },
        {
          text: "Date",
          align: "start",
          sortable: false,
          class: "table-header"
        },
        {
          text: "Bookings",
          align: "start",
          sortable: false,
          class: "table-header"
        },
        {
          text: "Tags",
          align: "start",
          sortable: false,
          class: "table-header"
        },
        {
          text: "City",
          align: "start",
          sortable: false,
          class: "table-header"
        }
      ],
      orderList: [
        {
          id: "start_time",
          text: "Upcoming Events"
        },
        {
          id: "-created",
          text: "Most Recently Added"
        },
        {
          id: "created",
          text: "Oldest Events"
        }
      ]
    };
  },
  watch: {
    options: {
      handler(oldVal, newVal) {
        if (
          oldVal.itemsPerPage !== newVal.itemsPerPage ||
          oldVal.page !== newVal.page
        ) {
          this.fetchEvents();
        }
      },
      deep: true
    },
    ordering: function() {
      this.fetchEvents();
    }
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    debounceSearch: _debounce(function() {
      this.fetchEvents();
    }, 800),
    fetchEvents() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      const params = {
        limit: itemsPerPage,
        offset: itemsPerPage * (page - 1),
        search: this.searchVal,
        ordering: this.ordering
      };
      getEvents(params)
        .then(response => {
          this.events = response.data.results;
          this.totalItems = response.data.count;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            this.pageLoading = false;
          }, 1000);
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        });
    },
    formatDate(dateTime) {
      let date = moment(dateTime).format("DD/MM/YYYY");
      if (date === moment().format("DD/MM/YYYY")) {
        return `Today, ${moment(dateTime).format("hh:mm A")}`;
      } else return moment(dateTime).format("DD MMMM YYYY, hh:mm A");
    },
    getTags(tagList) {
      let tagNames = "";
      if (tagList.length) {
        for (const [index, obj] of tagList.entries()) {
          tagNames += `${obj.title}, `;
          if (index === 1 && tagList.length > 2) {
            tagNames = tagNames.trim();
            tagNames += ".....";
            break;
          }
        }
      }
      return tagNames.slice(0, tagNames.length - 2);
    }
  }
};
</script>

<style scoped>
.events {
  width: 100%;
  padding: 30px;
  padding-left: 86px;
}

.events-row {
  width: 100%;
  padding: 20px 40px;
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

.filter-cols {
  padding: 0;
}

.filter-card {
  display: flex;
  align-items: flex-end;
  padding: 2%;
  padding-top: 0px;
}

.filter-text {
  color: #8a8a8a;
  font-size: 14px;
}
</style>