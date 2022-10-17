<template>
  <div>
    <CardForm>
      <template slot="form"> </template>
    </CardForm>
  </div>
</template>
<script>
import Input from "../Components/Input.vue";
import { mapMutations } from "vuex";
import CardForm from "../Components/CardForm.vue";
import { map } from "d3";
export default {
  name: "Create-Employee",
  components: {
    CardForm,
    Input,
  },
  data() {
    return {
      style_form: [
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("Name"),
          placeholder: this.$i18n.t("Name"),
          error: null,
          value_text: "name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("company"),
          placeholder: this.$i18n.t("company"),
          error: null,
          value_text: "company_name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("PossName"),
          placeholder: this.$i18n.t("PossName"),
          error: null,
          value_text: "owner_name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("Commercial Register num"),
          placeholder: this.$i18n.t("Commercial Register num"),
          error: null,
          value_text: "commercial",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("ID No"),
          placeholder: this.$i18n.t("ID No"),
          error: null,
          value_text: "owner_hardcopyid",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "email",
          label: this.$i18n.t("auth.Email Address"),
          placeholder: this.$i18n.t("auth.Email Address"),
          error: null,
          value_text: "email",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("mobile"),
          placeholder: this.$i18n.t("mobile"),
          error: null,
          value_text: "phone",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],

      card: {
        title: this.$i18n.t("UpdateUser"),
        loading: true,
        sub_title: this.$i18n.t("user info"),
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
      this.SET_COLLECTION("user");
      this.SET_FUNCTION("update_user");
      this.SET_FORM_STYLE(this.style_form);
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(false);
    },
  },
  mounted() {
    this.set_data();
    this.get_data();
    document.title = this.$i18n.t("UpdateUser");
  },
};
</script>
