<template>
  <div class="dashboard">
    <loader v-if="loading" />
    <div v-else>
      <div class="row-container">
        <v-row class="ma-0">
          <v-col cols="6" style="padding-right: 50px;">
            <v-card class="card" style="height: 100%;">
              <v-row class="card-title ma-0">Event Overall Stats</v-row>
              <v-row class="card-stats ma-0">
                <span class="stats-title">Total Events</span>
                <span class="stats-value">12</span>
              </v-row>
              <v-row class="card-stats ma-0">
                <span class="stats-title">Total Bookings Made</span>
                <span class="stats-value">100</span>
              </v-row>
              <v-row class="card-stats ma-0">
                <span class="stats-title">Percentage of Bookings Made</span>
                <span class="stats-value">75%</span>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="6" style="padding-left: 50px">
            <v-card class="card">
              <v-row class="card-title ma-0">Tickets Sold as per Registration Type</v-row>
              <pie-chart :chartData="pieChartData" />
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="row-container" style="padding: 12px;">
        <v-card class="card">
          <v-row class="card-title ma-0">Tickets Sold as per Registration Type</v-row>
          <column-chart :chartData="columnChartData" />
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../../components/Loader";
import PieChart from "../../components/PieChart";
import ColumnChart from "../../components/ColumnChart";
import { allBookingTypeStats, monthlyBookingStats } from "../../apis/stats";

export default {
  name: "Dashboard",
  components: { Loader, PieChart, ColumnChart },
  data() {
    return {
      loading: true,
      pieChartData: [["Registration Type", "Seats Count"]],
      columnChartData: [["Month", "Seats Count"]],
    };
  },
  created() {
    this.fetchStats();
  },
  methods: {
    fetchStats() {
      allBookingTypeStats()
        .then(async response => {
          let data = [...this.pieChartData];
          response.data.map(obj => {
            data.push([obj.registration_type, obj.type_count]);
          });
          this.pieChartData = data;
          await this.fetchColumnStats();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchColumnStats() {
      monthlyBookingStats()
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  padding: 30px;
  padding-left: 86px;
}

.row-container {
  width: 100%;
  height: fit-content;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: fit-content;
  width: 100%;
  background-color: var(--v-card3-base);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 20px;
}

.card-subtitle {
  font-size: 16px;
  color: var(--v-text-lighten5);
}

.card-stats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  widows: 100%;
  padding-bottom: 10px;
}

.stats-value {
  color: var(--v-primary-base);
  font-size: 20px;
}
</style>