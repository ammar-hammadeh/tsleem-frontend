<template>
  <div>
    <Card></Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("question_category");
export default {
  name: "Question-Category-Page",
  components: {
    Card,
  },
  data() {
    return {
      btns: [
        {
          type: "icon",
          text: "Update",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          url: "/question-category/update/",
          item: true,
          permission: "question_category-update",
        },
        {
          type: "icon",
          text: "delete_question_category",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "question_category-delete",
          swal: true,
        },
      ],
      header: [
        { text: this.$i18n.t("QuestionCategoryName"), align: "center", value: "name" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("QuestionCategoryPage"),
        add_url: "/question-category/create",
        permission: "question_category-create",
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
      this.$store.commit("SET_COLLECTION", "question_category");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
    get_data() {
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
    this.get_data();
    this.set_data();
    document.title = this.$i18n.t("QuestionCategory");
  },
};
</script>
