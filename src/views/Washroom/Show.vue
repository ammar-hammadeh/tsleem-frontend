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
  name: "Washroom-Page",
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
          url: "/washrooms/update/",
          item: true,
          permission: "gis-washroom-update",
        },
        {
          type: "icon",
          text: "delete",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "gis-washroom-delete",
          swal: true,
          api:"gis/washrooms/destroy/"
        },
      ],
      header: [
        { text: this.$i18n.t("wc_number"), align: "center", value: "wc_number" },
        { text: this.$i18n.t("portable_wc_count"), align: "center", value: "portable_wc_count" },
        { text: this.$i18n.t("wc_category"), align: "center", value: "wc_category" },
        { text: this.$i18n.t("toilets_count"), align: "center", value: "toilets_count" },
        { text: this.$i18n.t("internal_water_tapes_count"), align: "center", value: "internal_water_tapes_count" },
        { text: this.$i18n.t("external_water_tapes_count"), align: "center", value: "external_water_tapes_count" },
        { text: this.$i18n.t("total_water_tapes_count"), align: "center", value: "total_water_tapes_count" },
        { text: this.$i18n.t("seated_toilets_count"), align: "center", value: "seated_toilets_count" },
        { text: this.$i18n.t("urinal_tapes_count"), align: "center", value: "urinal_tapes_count" },
        { text: this.$i18n.t("showers_count"), align: "center", value: "showers_count" },
        { text: this.$i18n.t("upper_water_tank"), align: "center", value: "upper_water_tank" },
        { text: this.$i18n.t("Location"), align: "center", value: "location.name" },
        { text: this.$i18n.t("Camps"),value: "data-table-expand",align: "center" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("WashroomPage"),
        add_url: "/washrooms/create",
        permission: "gis-washroom-create",
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
      this.$store.commit("SET_URL", "gis/washrooms");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
      this.$store.commit("table/SET_DATA_EXTEND", this.data_extend);
      this.$store.commit("table/SET_DATA_EXPAND", this.data_expand);
    },
    get_washrooms() {
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
    this.get_washrooms();
    document.title = this.$i18n.t("WashroomPage");
  },
};
</script>
