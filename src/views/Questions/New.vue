<template>
  <div>
    <Input v-model="commercial_text" :item="commercial"></Input>
    {{ commercial_text }}
    <CardForm></CardForm>
  </div>
</template>
<script>
import Input from "../Components/Input.vue";
import { mapMutations } from "vuex";
import CampService from "../../services/question.service";
import CardForm from "../Components/CardForm.vue";
export default {
  name: "New-Camp",
  components: {
    CardForm,
    Input,
  },
  data() {
    return {
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
      card: {
        title: this.$i18n.t("NewQuestion"),
        loading: true,
        sub_title: this.$i18n.t("question info"),
      },
    };
  },
  methods: {
    ...mapMutations([
      "SET_COLLECTION",
      "SET_FUNCTION",
      "SET_FORM_STYLE",
      "SET_CARD",
      "SET_CARD_LOADING",
    ]),
    ...mapMutations("form", ["SET_FORM_STYLE"]),
    set_data() {
      this.SET_COLLECTION("question");
      this.SET_FUNCTION("add_question");
      this.SET_FORM_STYLE(this.style_form);
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(false);
    },
    get_data() {
      this.SET_CARD_LOADING(true);
      axios.get("general/questions/inputs").then(
        (response) => {
          this.SET_CARD_LOADING(false);
          console.log(response.data);
          this.style_form[0].items = response.data.inputs;
        },
        (error) => {
          console.log(error);
          this.SET_CARD_LOADING(false);
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
  },
  mounted() {
    this.set_data();
    this.get_data();
    document.title = this.$i18n.t("NewQuestion");
  },
};
</script>
