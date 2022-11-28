<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import QuestionCategoryService from "@/services/question_category.service";

export default {
  name: "NewQuestionCategory",
  components: {
    CardForm,
  },
  data() {
    return {
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("QuestionCategory"),
          placeholder: this.$i18n.t("QuestionCategoryName"),
          error: null,
          value_text: "name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "autocomplete",
          type_select: "multiple",
          label: this.$i18n.t("question"),
          error: null,
          value_text: "question_ids",
          items: [],
          title_select: "title",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      card: {
        title: this.$i18n.t("QuestionCategoryCreateTitle"),
        loading: true,
        sub_title: this.$i18n.t("QuestionCategoryCreateInfoHeader"),
      },
    };
  },
  methods: {
    set_data() {
      this.$store.commit("SET_COLLECTION", "question_category");
      this.$store.commit("SET_FUNCTION", "add_question_category");
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_CARD_LOADING", false);
    },
    get_data() {
      this.$store.commit("SET_CARD_LOADING", true);
      return QuestionCategoryService.get_data().then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          this.style_form[1].items = response.data.questions;
        },
        (error) => {
          console.log(error);
          this.$store.commit("SET_CARD_LOADING", false);
          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push({
            name: "QuestionCategoryPage",
            params: { message: message },
          });
        }
      );
    },
  },
  mounted() {
    this.get_data();
    this.set_data();
    document.title = this.$i18n.t("QuestionCategoryCreateTitle");
  },
};
</script>
