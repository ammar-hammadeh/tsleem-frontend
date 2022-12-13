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
  name: "Location-Page",
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
          url: "/locations/update/",
          item: true,
          permission: "gis-location-update",
        },
        {
          type: "icon",
          text: "delete",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "gis-location-delete",
          swal: true,
          api:"gis/locations/destroy/"
        },
      ],
      header: [
        { text: this.$i18n.t("Location"), align: "center", value: "name" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("LocationPage"),
        add_url: "/locations/create",
        permission: "gis-location-create",
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
      this.$store.commit("SET_URL", "gis/locations");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
    get_locations() {
      this.getData({});
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
    this.get_locations();
    document.title = this.$i18n.t("LocationPage");
  },
};
</script>
