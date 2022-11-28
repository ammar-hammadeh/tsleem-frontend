x<template>
  <div>
    <v-row>
      <v-col md="12">
        <h5 class="text-h5 text-typo font-weight-bold mb-0">
          {{ $t("General Statistic") }}
        </h5>
      </v-col>
    </v-row>
    <v-row>

      <v-col lg="3" cols="6">
        <custom-card
            :title="$t('total camps')"
            :count="data.total_camps"
            icon="mdi-tent"
        />
      </v-col>

      <v-col lg="3" cols="6">
        <custom-card
          :title="$t('ready camps')"
          :count="data.ready_camps"
          icon="mdi-tent"
        />
      </v-col>

      <v-col lg="3" cols="6">
        <custom-card
          :title="$t('total square')"
          :count="data.total_square"
          icon="mdi-vector-square"
        />
      </v-col>

      <v-col lg="3" cols="6">
        <custom-card
            :title="$t('assignations')"
            :count="data.assignations"
            icon="mdi-account-switch-outline"
        />
      </v-col>


      <v-col lg="3" cols="6">
        <custom-card
            :title="$t('total user')"
            :count="data.total_user"
            icon="mdi-account-group-outline"
        />
      </v-col>

      <v-col lg="3" cols="6">
        <custom-card
            :title="$t('pending user')"
            :count="data.pending_user"
            icon="mdi-account-clock-outline"
        />
      </v-col>

      <v-col lg="3" cols="6">
        <custom-card
          :title="$t('total company')"
          :count="data.total_company"
          icon="mdi-domain"
        />
      </v-col>





      <v-col lg="3" cols="6">
        <custom-card
          :title="$t('appointments')"
          :count="data.appointments"
          icon="mdi-calendar-clock"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" cols="12" class="grid">
        <h5 class="text-h5 text-typo font-weight-bold mb-0">
          {{ $t("General Charts") }}
        </h5>
      </v-col>
      <v-col sm="4" cols="12" class="grid">
        <CustomDoughnutChart
          :title="$t('appointmets status')"
          :data-values="this.appointmentsChartData.dataValues"
          :labels="this.appointmentsChartData.lables"
        />
      </v-col>
      <v-col sm="4" cols="12" class="grid">
        <CustomDoughnutChart
            :title="$t('assignations status')"
            :data-values="this.assignationsChartData.dataValues"
            :labels="this.assignationsChartData.lables"
        />
      </v-col>
      <v-col sm="4" cols="12" class="grid">
        <CustomDoughnutChart
            :title="$t('assignations status')"
            :data-values="this.campsChartData.dataValues"
            :labels="this.campsChartData.lables"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CustomCard from "@/views/Dashboard/Components/PartialComponents/CustomCard";
import CustomDoughnutChart from "@/views/Dashboard/Components/PartialComponents/CustomDoughnutChart";
export default {
  components: { CustomDoughnutChart, CustomCard },
  props: {
    data: {},
  },
  computed:{
    assignationsChartData(){
      const assignations = this.data.assignations_chart; 
      return{
        lables: assignations.lables,
        dataValues: assignations.count.map(cnt=>parseInt(cnt))
      }
    },

    appointmentsChartData(){
      const appointments = this.data.appointments_chart; 
      return{
        lables: appointments.lables,
        dataValues: appointments.count.map(cnt=>parseInt(cnt))
      }
    },

    campsChartData(){
      const camps = this.data.camps_chart; 
      return{
        lables: camps.lables,
        dataValues: camps.count.map(cnt=>parseInt(cnt))
      }
    }
  }
};
</script>

<style scoped>

</style>
