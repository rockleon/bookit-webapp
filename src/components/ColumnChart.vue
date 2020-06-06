<template>
  <div class="graph-container">
    <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "ColumnChart",
  props: ["chartData"],
  components: { GChart },
  data() {
    return {
      chartOptions: {
        backgroundColor: "transparent",
        height: 400,
        width: 1000,
        chartArea: {
          // height: "100%",
          // width: "100%"
        },
        vAxis: { textPosition: "in", title: "Number of bookings" },
        hAxis: {
          title: "Month"
        },
        legend: { position: "bottom", maxLines: 3 }
      }
    };
  }
};
</script>

<style scoped>
.graph-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>