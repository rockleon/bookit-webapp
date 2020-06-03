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
        // chartArea: {
        //   height: "100%",
        //   width: "100%"
        // }
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