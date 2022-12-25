<template>
  <div>
    <div>
      <v-row>
        <v-col md="12">
          <h5 class="text-h5 text-typo font-weight-bold mb-0">
            {{ $t("General Statistic") }}
          </h5>
        </v-col>
      </v-row>
      <div
        v-if="loading_card"
        class="position-relative my-4"
        style="width: 100%; height: 268px"
      >
        <Loading></Loading>
      </div>
      <v-row v-else>
        <v-col lg="3" cols="6">
          <custom-card
            :title="$t('total camps')"
            :count="statistic_card.total_camps"
            icon="mdi-tent"
          />
        </v-col>

        <v-col lg="3" cols="6">
          <custom-card
            :title="$t('ready camps')"
            :count="statistic_card.ready_camps"
            icon="mdi-tent"
          />
        </v-col>

        <v-col lg="3" cols="6">
          <custom-card
            :title="$t('total square')"
            :count="statistic_card.total_square"
            icon="mdi-vector-square"
          />
        </v-col>

        <v-col lg="3" cols="6">
          <custom-card
            :title="$t('assignations')"
            :count="statistic_card.assignations"
            icon="mdi-account-switch-outline"
          />
        </v-col>

        <v-col lg="3" cols="6">
          <custom-card
            :title="$t('total user')"
            :count="statistic_card.total_user"
            icon="mdi-account-group-outline"
          />
        </v-col>

        <v-col lg="3" cols="6">
          <custom-card
            :title="$t('pending user')"
            :count="statistic_card.pending_user"
            icon="mdi-account-clock-outline"
          />
        </v-col>

        <v-col lg="3" cols="6">
          <custom-card
            :title="$t('total company')"
            :count="statistic_card.total_company"
            icon="mdi-domain"
          />
        </v-col>

        <v-col lg="3" cols="6">
          <custom-card
            :title="$t('appointments')"
            :count="statistic_card.appointments"
            icon="mdi-calendar-clock"
          />
        </v-col>
      </v-row>
    </div>
    <div
      v-if="loading_chart"
      class="position-relative my-4"
      style="width: 100%; height: 464px"
    >
      <Loading></Loading>
    </div>
    <v-row v-else>
      <v-col sm="12" cols="12" class="grid">
        <h5 class="text-h5 text-typo font-weight-bold mb-0">
          {{ $t("General Charts") }}
        </h5>
      </v-col>
      <v-col sm="6" cols="12" class="grid position-relative">
        <Loading v-if="loading_chart_user"></Loading>
        <CustomDoughnutChart
          v-if="chart_user"
          ref="userChart"
          :title="$t('user status')"
          :id_chart="'user_status'"
          :type="'user_statue'"
          :data-values="this.usersChartData.dataValues"
          :labels="this.usersChartData.lables"
          :color="usersChartData.color"
        >
          <template #sub-title>
            <div class="mr-7">
              <v-autocomplete
                v-model="typeUser"
                :items="types"
                :item-text="'name'"
                class="pt-0 mt-0"
                :item-value="'id'"
                :placeholder="$t('general.choose')"
                @change="filter_type"
              ></v-autocomplete>
            </div>
          </template>
        </CustomDoughnutChart>
      </v-col>
      <v-col sm="6" cols="12" class="grid" v-if="statistic">
        <CustomDoughnutChart
          :title="$t('appointmets status')"
          :id_chart="'appointmets_status'"
          :data-values="this.appointmentsChartData.dataValues"
          :labels="this.appointmentsChartData.lables"
        />
      </v-col>
      <v-col sm="6" cols="12" class="grid" v-if="statistic">
        <CustomDoughnutChart
          :title="$t('assignations status')"
          :id_chart="'assignations_status'"
          :data-values="this.assignationsChartData.dataValues"
          :labels="this.assignationsChartData.lables"
        />
      </v-col>
      <v-col sm="6" cols="12" class="grid" v-if="statistic">
        <CustomDoughnutChart
          :title="$t('assignations status')"
          :id_chart="'camp_status'"
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
import { ChartsUserServiceColors } from "@/views/Dashboard/Components/PartialComponents/data";
import DashboardService from "../../../services/dashboard.service";
import Loading from "../../Components/Loading";
export default {
  components: { CustomDoughnutChart, Loading, CustomCard },
  props: {
    data: {},
  },
  data: function () {
    return {
      typeUser: "",
      types: [],
      statistic: null,
      chart_user: null,
      statistic_card: null,
      loading_card: true,
      loading_chart: true,
      loading_chart_user: true,
    };
  },
  computed: {
    assignationsChartData() {
      const assignations = this.statistic.assignations_chart;
      var self = this;
      return {
        lables: assignations.lables.map((v) =>
          self.$i18n.t(`status_assign.${v}`)
        ),
        dataValues: assignations.count.map((cnt) => parseInt(cnt)),
      };
    },

    appointmentsChartData() {
      const appointments = this.statistic.appointments_chart;
      var self = this;
      return {
        lables: appointments.lables.map((v) =>
          self.$i18n.t(`status_appontment.${v}`)
        ),
        dataValues: appointments.count.map((cnt) => parseInt(cnt)),
      };
    },

    campsChartData() {
      const camps = this.statistic.camps_chart;
      var self = this;
      return {
        lables: camps.lables.map((v) => self.$i18n.t(`status_camp.${v}`)),
        dataValues: camps.count.map((cnt) => parseInt(cnt)),
      };
    },

    usersChartData() {
      // if (this.chart_user != null) {
      const users = this.chart_user;
      var self = this;
      var color = [];
      users.lables.map((v) => {
        for (let i = 0; i < ChartsUserServiceColors.length; i++) {
          const element = ChartsUserServiceColors[i];
          if (v === element.type) return color.push(element.color);
        }
      });
      return {
        color: color,
        lables: users.lables.map((v) => self.$i18n.t(`status_user.${v}`)),
        dataValues: users.count.map((cnt) => parseInt(cnt)),
      };
      // }
    },
  },
  methods: {
    filter_type() {
      this.filter_chart_user();
    },
    get_data() {
      axios.get("/general/types").then(
        (res) => {
          var result = res.data.data;
          this.types = result;
          this.typeUser = result.filter(
            (v) => v.code == "service_provider"
          )[0].id;
          this.filter_chart_user();
          this.get_statistic_card();
          this.get_statistic_chart();
        },
        (error) => {
          this.errorHandler();
        }
      );
    },
    errorHandler(error) {
      console.log(error);
      this.$store.commit("form/SET_NOTIFY", {
        msg: this.$i18n.t("general.there is problem"),
        type: "Danger",
      });
    },
    get_statistic_card() {
      this.loading_card = true;
      return DashboardService.get_statistics_card().then(
        (response) => {
          this.statistic_card = response.data.data;
          this.loading_card = false;
        },
        (error) => {
          this.errorHandler();
        }
      );
    },
    get_statistic_chart() {
      this.loading_chart = true;
      return DashboardService.get_statistics_chart().then(
        (response) => {
          this.statistic = response.data.data;
          this.loading_chart = false;
        },
        (error) => {
          this.errorHandler();
        }
      );
    },
    filter_chart_user() {
      this.loading_chart_user = true;
      return DashboardService.filter_chart_user({
        type_id: this.typeUser,
      }).then(
        (response) => {
          this.chart_user = response.data.data;
          this.loading_chart_user = false;
        },
        (error) => {
          this.errorHandler();
        }
      );
    },
  },
  mounted() {
    this.get_data();
    //
  },
};
</script>

<style scoped>
</style>
