<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import QuestionCategoryService from "@/services/question_category.service";
import AssignFormService from "@/services/assign_form.service";

export default {
  name: "QuestionCategoryEdit",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("QuestionCategoryUpdateTitle"),
        loading: true,
        sub_title: this.$i18n.t("QuestionCategoryUpdateInfoHeader"),
      },
      id: this.$route.params.id,
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("QuestionCategoryName"),
          placeholder: this.$i18n.t("QuestionCategoryName"),
          value_text: "name",
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "autocomplete",
          type_select: "multiple",
          title_select: "title",
          label: this.$i18n.t("question"),
          error: null,
          value_text: "question_ids",
          items: [],
          value: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
    };
  },
  methods: {
    async get_category(id) {
      function handleError(error) {
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

      this.$store.commit("SET_CARD_LOADING", true);

      try {

        const questionsCategoryRes =
          await QuestionCategoryService.get_question_category(id);
        const { name, get_question: selectedQuestions } =
          questionsCategoryRes.data.data;

        // const questionsRes = await QuestionCategoryService.get_data();
        const questions = questionsCategoryRes.data.questions;

        this.style_form[0].value = name;
        this.style_form[1].items = questions;

        selectedQuestions.forEach((question) => {
          this.style_form[1].value.push(question.id);
        });
        this.$store.commit("SET_CARD_LOADING", false);
      } catch (e) {
        handleError(e);
      }
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "question_category");
      this.$store.commit("SET_FUNCTION", "update_question_category");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.get_category(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("QuestionCategoryEdit");
  },
};
</script>
