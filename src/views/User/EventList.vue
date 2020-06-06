<template>
  <div class="event-container">
    <loader v-if="loading" />
    <v-row class="search-filter ma-0">
      <v-col cols="5" class="filter-cols" align-self="end">
        <v-card class="filter-card">
          <v-text-field
            placeholder="Search by Name or City"
            class="input-slot"
            v-model="searchVal"
            @input="debounceSearch"
            hide-details
            clearable
          >
            <v-icon slot="prepend" color="green">mdi-magnify</v-icon>
          </v-text-field>
        </v-card>
      </v-col>
      <v-col cols="4" class="filter-cols">
        <v-row class="ma-0 filter-text">Filter by tags</v-row>
        <v-select
          v-model="filtertags"
          :items="tagList"
          item-value="id"
          item-text="title"
          solo
          chips
          label="Filter by Tags"
          multiple
          hide-details
          deletable-chips
        ></v-select>
      </v-col>
      <v-col cols="3" class="filter-cols">
        <v-row class="ma-0 filter-text">Order by</v-row>
        <v-select
          solo
          v-model="ordering"
          :items="orderList"
          label="Order By"
          item-value="id"
          item-text="text"
          hide-details
        ></v-select>
      </v-col>
    </v-row>
    <v-divider></v-divider>
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
import _debounce from "lodash.debounce";
import { getEvents } from "../../apis/event";
import { getTags } from "../../apis/tag";

export default {
  name: "EventList",
  components: { EventCard, Loader },
  data() {
    return {
      events: [],
      loading: true,
      searchVal: "",
      filtertags: [],
      ordering: "start_time",
      tagList: [],
      orderList: [
        {
          id: "start_time",
          text: "Upcoming Events"
        },
        {
          id: "-views_count",
          text: "Most Viewd Events"
        },
        {
          id: "-views_count",
          text: "Most Recently Added"
        },
        {
          id: "cost_per_person",
          text: "Price Low to High"
        },
        {
          id: "-cost_per_person",
          text: "Price High to Low"
        }
      ]
    };
  },
  created() {
    this.fetchEvents();
    this.fetchTags();
  },
  watch: {
    filtertags: function() {
      this.fetchEvents();
    },
    ordering: function() {
      this.fetchEvents();
    }
  },
  methods: {
    fetchEvents() {
      this.loading = true;
      let params = {
        search: this.searchVal,
        ordering: this.ordering
      };
      // if (this.filtertags.length) params["tags"] = this.filtertags;
      if (this.filtertags.length) {
        let taglist = this.filtertags.map(tag => {
          return tag;
        });
        taglist = JSON.stringify(taglist);
        // taglist = taglist.replace("%22", '"');
        params["tags"] = taglist;
      }

      getEvents(params)
        .then(response => {
          this.events = response.data.results;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchTags() {
      getTags()
        .then(response => {
          this.tagList = response.data.results;
        })
        .catch(error => {
          console.log(error);
        });
    },
    debounceSearch: _debounce(function() {
      this.fetchEvents();
    }, 800)
  }
};
</script>

<style scoped>
.event-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.event-list {
  width: 100%;
  height: calc(100vh - 196px);
  padding: 40px;
  padding-top: 0px;
  overflow: auto;
}

.card-col {
  padding: 2% 2% 2%;
}

.search-filter {
  padding: 0px 40px;
  /* border-bottom: 1px solid #979797; */
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
}

.filter-cols {
  padding: 2%;
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

@media only screen and (max-width: 600px) {
  .event-list {
    padding: 15px;
  }
}
</style>