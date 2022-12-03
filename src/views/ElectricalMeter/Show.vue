<template>
  <div>
    <Card></Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("gis");
export default {
  name: "ElectricalMeters-Page",
  components: {
    Card,
  },
  data() {
    return {
      btns: [
        {
          type: "icon",
          text: "edit",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          url: "/electrical-meters/update/",
          item: true,
          permission: "washroom-update",
        },
        {
          type: "icon",
          text: "delete",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "washroom-delete",
          swal: true,
          api:"gis/electrical_meters/destroy/"
        },
      ],
      header: [
        { text: this.$i18n.t("name"), align: "center", value: "name" },
        { text: this.$i18n.t("type"), align: "center", value: "type" },
        { text: this.$i18n.t("subscription_number"), align: "center", value: "subscription_number" },
        { text: this.$i18n.t("metric_capacity"), align: "center", value: "metric_capacity" },
        { text: this.$i18n.t("closest_cabin"), align: "center", value: "closest_cabin" },
        { text: this.$i18n.t("Location"), align: "center", value: "location.name" },
        { text: this.$i18n.t("Camps"),value: "data-table-expand",align: "center" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("ElectricalMetersPage"),
        add_url: "/electrical-meters/create",
        permission: "electrical-meter-create",
      },
      data_expand: { singleExpand: true, expanded: [], show: true },
      data_extend: {
        title: 'camp',
        name: "name",
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },
  methods: {
    ...mapActions(["getData"]),
    set_data() {
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_COLLECTION", "gis");
      this.$store.commit("SET_URL", "gis/electrical_meters");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
      this.$store.commit("table/SET_DATA_EXTEND", this.data_extend);
      this.$store.commit("table/SET_DATA_EXPAND", this.data_expand);
    },
    get_electrical_meters() {
      this.getData({ });
    },
  },
  created() {
    console.log(this.$route.params.message);
    if (this.$route.params.message) {
      this.$store.commit("form/SET_NOTIFY", this.$route.params.message);
    }
  },
  mounted() {
    this.set_data();
    this.get_electrical_meters();
    document.title = this.$i18n.t("ElectricalMetersPage");
  },
};
</script>
