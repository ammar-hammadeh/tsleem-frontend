<template>
  <div>
    <Notify></Notify>
    <v-container fluid class="px-6 py-6">
      <admin v-if="typeUser == 'admin'" :data="statistic"></admin>
    </v-container>
  </div>
</template>

<script>
import admin from "./Components/admin.vue";
import Notify from "../../views/Components/Notify.vue";
import DashboardService from "../../services/dashboard.service";
export default {
  name: "Dashboard",
  components: {
    Notify,
    admin,
  },
  data: function () {
    return {
      typeUser: "",
      statistic: {},
      salesChartID: "salesChart",
      ordersChartID: "ordersChart",
    };
  },
  methods: {
    get_data() {
      return DashboardService.get_statistics().then(
        (response) => {
          // console.log(response);
          this.statistic = response.data.data;
          this.typeUser = response.data.user.type.code;
        },
        (error) => {
          console.log(error);
          this.$store.commit("form/SET_NOTIFY", {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          });
        }
      );
    },
  },
  mounted() {
    this.get_data();
    document.title = this.$i18n.t("Default");
  },
};
</script>
