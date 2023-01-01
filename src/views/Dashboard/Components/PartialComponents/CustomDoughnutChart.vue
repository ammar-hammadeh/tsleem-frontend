<template>
  <v-card class="card-shadow border-radius-xl z-index-2">
    <div class="pa-4 pb-0 d-flex">
      <h6 class="text-h6 text-typo font-weight-bold">{{ title }}</h6>
      <slot name="sub-title"></slot>
    </div>
    <div class="card-padding">
      <div class="chart" style="max-width: 450px" :id="`div-chartPie-${title}`">
        <vue-apex-charts
          v-if="chartOptions"
          :series="dataValues"
          :id="`chartPie-${title}`"
          :options="chartOptions"
        />
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
    id_chart: { required: true },
    type: { type: String },
    dataValues: { required: true, type: Array },
    labels: { required: true, type: Array },
    color: {
      type: Array,
      default: function () {
        return ChartsColors;
      },
    },
  },
  data: function () {
    return {
      doughnutChartId: this.id_chart + "doughnut-chart",
      chartOptions: null,
    };
  },
  mounted() {
    this.chartOptions = this.makeOptions();
  },
  methods: {
    makeOptions() {
      return {
        chart: {
          id: this.id_chart + "doughnut-chart",
          events: {
            dataPointSelection: function (event, chartContext, config) {
              if (this.type == "user_statue") {
                let label = config.w.config.labels[config.dataPointIndex];
                let val = this.ConvertEn(label);
                this.$router.push({ path: `/users?status=${val}` });
              }else if (this.type == "assign_camp") {
                let label = config.w.config.labels[config.dataPointIndex];
                let val = this.ConvertEnAssign(label);
                this.$router.push({ path: `/appointments?status=${val}` });
              }
            }.bind(this),
          },
          type: "donut",
        },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          minAngleToShowLabel: 0,
          offsetX: 10,
          offsetY: 5,
        },
        labels: this.labels,
        colors: this.color,
        legend: {
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
      };
    },
    ConvertEn(type) {
      switch (type) {
        case "انتظار":
          return "pending";
        case "معطل":
          return "disabled";
        case "مراجعة":
          return "review";
        case "مرفوض":
          return "rejected";
        case "مفعل":
          return "active";
      }
    },
    ConvertEnAssign(type){
      switch (type) {
        case "انتظار":
          return "pending";
        case "تم ارجاعه":
          return "returned";
        case "تم تحديد موعد":
          return "appointment";
        case "لم يتم توقيعها":
          return "answered";
        case "تم التسليم":
          return "deliverd";
      }
    }
  },
  watch: {
    $props: {
      handler() {
        this.chartOptions = this.makeOptions();
      },
      deep: true,
    },
  },
};
</script>
<style>
.apexcharts-legend-series {
  display: flex;
  align-items: center;
  column-gap: 3px;
}
.apexcharts-legend-text {
  font-family: Tajawal !important;
}
</style>
