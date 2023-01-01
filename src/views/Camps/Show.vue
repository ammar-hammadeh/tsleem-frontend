<template>
  <div>
    <Card></Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
// import CampService from "../../services/camp_city.service";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("camp");
export default {
  name: "Camp-Page",
  components: {
    Card,
  },
  data() {
    return {
      btns: [
        {
          type: "icon",
          text: "status_camp",
          color: "bg-gradient-success",
          icon: "mdi-arrow-up-bold-box-outline",
          swal: true,
          permission: "camp-status",
        },
        {
          type: "icon",
          text: "edit_camp",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          url: "/camps/update/",
          item: true,
          permission: "camp-update",
        },
        {
          type: "icon",
          text: "delete_camp",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "camp-delete",
          swal: true,
        },
      ],
      header: [
        { text: this.$i18n.t("Camp"), align: "center", value: "name" },
        { text: this.$i18n.t("square"), value: "square.name", align: "center" },
        { text: this.$i18n.t("developed_name"), value: "developed_name", align: "center" },
        // { text: this.$i18n.t("gate"), value: "gate", align: "center" },
        // { text: this.$i18n.t("street"), value: "street", align: "center" },
        { text: this.$i18n.t("is_developed"), value: "is_developed_text", align: "center" },
        // { text: this.$i18n.t("Location"), value: "location.name", align: "center" },
        { text: this.$i18n.t("status"), value: "status_text", align: "center" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("CampPage"),
        add_url: "/camps/create",
        permission: "camp-create",
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
      this.$store.commit("SET_COLLECTION", "camp");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
    get_camps() {
      this.getData({ reset: true });
    },
  },
  created() {
    console.log(this.$route.params.message);
    if (this.$route.params.message) {
      this.$store.commit("form/SET_NOTIFY", this.$route.params.message);
    }
  },
  mounted() {
    this.get_camps();
    this.set_data();
    document.title = this.$i18n.t("CampPage");
  },
};
</script>
