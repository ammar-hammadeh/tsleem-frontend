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
  name: "Establishment-Page",
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
          url: "/establishments/update/",
          item: true,
          permission: "gis-establishments-update",
        },
        {
          type: "icon",
          text: "delete",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "gis-establishments-delete",
          swal: true,
          api:"gis/establishments/destroy/"
        },
      ],
      header: [
        { text: this.$i18n.t("Establishment"), align: "center", value: "name" },
        { text: this.$i18n.t("Color"), align: "center", value: "color" },
        { text: this.$i18n.t("Plots"),value: "data-table-expand",align: "center" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("EstablishmentsPage"),
        add_url: "/establishments/create",
        permission: "gis-establishments-create",
      },
      data_expand: { singleExpand: true, expanded: [], show: true },
      data_extend: {
        title: 'plot',
        name: "plot_number",
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
      this.$store.commit("SET_URL", "gis/establishments");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
      this.$store.commit("table/SET_DATA_EXTEND", this.data_extend);
      this.$store.commit("table/SET_DATA_EXPAND", this.data_expand);
    },
    get_establishments() {
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
    this.get_establishments();
    document.title = this.$i18n.t("EstablishmentsPage");
  },
};
</script>
