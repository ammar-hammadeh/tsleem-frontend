<template>
  <div>
    <Card></Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
// import SquareService from "../../services/square_city.service";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("square");
export default {
  name: "Square-Page",
  components: {
    Card,
  },
  data() {
    return {
      btns: [
        {
          type: "icon",
          text: "edit_square",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          url: "/squares/update/",
          item: true,
          permission: "square-update",
        },
        {
          type: "icon",
          text: "delete_square",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "square-delete",
          swal: true,
        },
      ],
      header: [
        { text: this.$i18n.t("Name"), align: "center", value: "name" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("SquarePage"),
        add_url: "/squares/create",
        permission: "square-create",
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
      this.$store.commit("SET_COLLECTION", "square");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
    get_squares() {
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
    this.get_squares();
    this.set_data();
    document.title = this.$i18n.t("SquarePage");
  },
};
</script>
