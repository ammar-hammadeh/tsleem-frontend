<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import QuestionService from "../../services/question.service";
export default {
  name: "Edit-Question",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("EditQuestion"),
        loading: true,
        sub_title: this.$i18n.t("question info"),
      },
      id: this.$route.params.id,
      style_form: [
        {
          col: "12",
          type: "select",
          label: this.$i18n.t("input type"),
          error: null,
          value_text: "input_id",
          items: [],
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("question"),
          placeholder: this.$i18n.t("question"),
          error: null,
          value_text: "title",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
    };
  },
  methods: {
    get_question(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return QuestionService.get_question(id).then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          this.style_form[0].items = response.data.inputs;
          for (let i = 0; i < this.style_form.length; i++) {
            const element = this.style_form[i];
            element.value = response.data.question[element.value_text];
          }
        },
        (error) => {
          console.log(error);
          this.$store.commit("SET_CARD_LOADING", false);
          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push({
            name: "QuestionPage",
            params: { message: message },
          });
        }
      );
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "question");
      this.$store.commit("SET_FUNCTION", "update_question");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.get_question(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("EditQuestion");
  },
};
</script>
