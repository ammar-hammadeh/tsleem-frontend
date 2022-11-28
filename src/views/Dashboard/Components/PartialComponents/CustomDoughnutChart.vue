<template>
  <v-card class="card-shadow border-radius-xl z-index-2">
    <div class="pa-4 pb-0">
      <h6 class="text-h6 text-typo font-weight-bold">{{ this.title }}</h6>
    </div>
    <div class="card-padding">
      <div class="chart">
        <vue-apex-charts :series="this.series" :options="chartOptions" />
      </div>
    </div>
  </v-card>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import { ChartsColors } from "@/views/Dashboard/Components/PartialComponents/data";
export default {
  name: "custom-doughnut-chart",
  components: { VueApexCharts },
  props: {
    title: { required: true },
    dataValues: { required: true, type: Array },
    labels: { required: true, type: Array },
  },
  data: function () {
    return {
      doughnutChartId: this.title + "doughnut-chart",
      series: this.dataValues,
      chartOptions: {
        chart: {
          type: "donut",
          height: 300,
        },
        labels: this.labels,
        colors: ChartsColors,
        legend:{
          show: true,
          fontSize: "14px",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "100%",
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
};
</script>
<style>
.apexcharts-legend-series{
  display: flex;
  align-items: center;
  column-gap: 3px;
}
</style>