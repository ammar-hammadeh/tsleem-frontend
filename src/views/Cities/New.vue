<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import CardForm from "../Components/CardForm.vue";
export default {
  name: "New-City",
  components: {
    CardForm,
  },
  data() {
    return {
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("Name"),
          placeholder: "تبوك",
          error: null,
          value_text: "name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      card: { title: "New City", loading: true, sub_title: "City info" },
    };
  },
  methods: {
    ...mapMutations([
      "SET_CARD_LOADING",
      "SET_CARD",
      "SET_COLLECTION",
      "SET_FUNCTION",
    ]),
    ...mapMutations("form", ["SET_FORM_STYLE"]),
    set_data() {
      this.SET_COLLECTION("city");
      this.SET_FUNCTION("add_city");
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(false);
      this.SET_FORM_STYLE(this.style_form);
    },
  },
  mounted() {
    this.set_data();
    document.title = this.$i18n.t("create city");
  },
};
</script>
