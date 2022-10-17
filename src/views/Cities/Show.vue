<template>
  <div>
    <Card></Card>
  </div>
</template>
<script>
import Card from "../Components/Card";
import CityService from "../../services/city.service";
import { mapMutations } from "vuex";

export default {
  name: "City-Page",
  components: {
    Card,
  },
  data() {
    return {
      btns: [
        {
          type: "icon",
          text: "edit_city",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          url: "/city/update/",
          item: true,
          permission: "city-update",
        },
      ],
      header: [
        { text: this.$i18n.t("Name"), align: "center", value: "name" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("cities"),
        add_url: "/city/create",
        permission: "city-create",
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },
  methods: {
    ...mapMutations(["SET_CARD_LOADING", "SET_CARD", "SET_COLLECTION"]),
    ...mapMutations("table", [
      "SET_LOADING",
      "SET_HEADERS",
      "SET_BTNS",
      "SET_ITEMS",
    ]),
    ...mapMutations("form", ["SET_NOTIFY"]),
    set_data() {
      this.SET_CARD(this.card);
      this.SET_COLLECTION("city");
      this.SET_LOADING(true);
      this.SET_HEADERS(this.header);
      this.SET_BTNS(this.btns);
    },
    get_cities() {
      // for filter
      // this.getData({ reset: true });
      // this.getData({});
      this.SET_LOADING(true);
      return CityService.get_cities().then(
        (response) => {
          this.SET_LOADING(false);
          this.SET_ITEMS(response.data.data);
        },
        (error) => {
          console.log(error);
          this.SET_LOADING(false);
          this.SET_NOTIFY({
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          });
        }
      );
    },
  },
  created() {
    if (this.$route.params.message) {
      this.$store.commit("form/SET_NOTIFY", this.$route.params.message);
    }
  },
  mounted() {
    this.get_cities();
    this.set_data();
    document.title = this.$i18n.t("cities");
  },
};
</script>
