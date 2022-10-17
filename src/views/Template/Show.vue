<template>
  <div>
    <Card></Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
// import CampService from "../../services/question_city.service";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("question");
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
          text: "edit_question",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          url: "/questions/update/",
          item: true,
          permission: "question-update",
        },
        {
          type: "icon",
          text: "delete_question",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "question-delete",
          swal: true,
        },
      ],
      header: [
        { text: this.$i18n.t("Name"), align: "center", value: "title" },
        {
          text: this.$i18n.t("input type"),
          value: "inputs.name",
          align: "center",
        },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("questions"),
        add_url: "/questions/create",
        permission: "question-create",
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
      this.$store.commit("SET_COLLECTION", "question");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
    get_questions() {
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
    this.get_questions();
    this.set_data();
    document.title = this.$i18n.t("questions");
  },
};
</script>
