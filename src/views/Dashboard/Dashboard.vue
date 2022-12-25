<template>
  <div>
    <Notify></Notify>
    <v-container fluid class="px-6 py-6">
      <!-- <admin @filter_type="filter_types" v-if="typeUser == 'admin'"  :data="data"></admin> -->
      <admin v-if="type.code == 'admin'"></admin>
    </v-container>
  </div>
</template>

<script>
import admin from "./Components/admin.vue";
import Notify from "../../views/Components/Notify.vue";
import DashboardService from "../../services/dashboard.service";
import { mapState } from "vuex";
export default {
  name: "Dashboard",
  components: {
    Notify,
    admin,
  },
  data: function () {
    return {
      typeUser: "",
      data:{
        statistic: {},
        types:[],
        selection_type :"",
      },
      salesChartID: "salesChart",
      ordersChartID: "ordersChart",
    };
  },
  computed:{
    ...mapState("auth", ["type"]),
  },
  methods: {
    filter_types(){
      this.get_statistic()
      // return DashboardService.get_statistics({type_id:this.selection_type}).then(
      //   (response) => {
      //     this.data.statistic.users_chart = response.data.data
      //   },
      //   (error) => {}
      // );
    },
    get_data() {
        axios.get("/general/types")
        .then((res)=>{
          var result = res.data.data
          this.data.types = result;
          this.data.selection_type = result.filter(v=> v.code == 'service_provider')[0].id
          this.get_statistic()
          },
          (error) => {this.errorHandler()})

      
    },
    errorHandler(error) {
      console.log(error);
      this.$store.commit("form/SET_NOTIFY", {
        msg: this.$i18n.t("general.there is problem"),
        type: "Danger",
      });
    },
    get_statistic(){
      return DashboardService.get_statistics({type_id:this.data.selection_type}).then(
          (response) => {
            // console.log(response);
            this.data.statistic = response.data.data;
            this.typeUser = response.data.user.type.code;
          },
          (error) => {this.errorHandler()}
          )
    }
  },
  mounted() {
    // this.get_data();
  //   var self = this
  //   this.$nextTick(function () {

  //   console.log(self.$refs.adminSection)
  // })
  //   console.log(this.$refs)
    document.title = this.$i18n.t("Default");
  },
};
</script>
<style scoped>
@import "@/assets/css/dashboard.scss";
</style>
