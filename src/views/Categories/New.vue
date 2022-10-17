<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
export default {
  name: "New-Camp",
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
          placeholder: this.$i18n.t("Name"),
          error: null,
          value_text: "name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      card: {
        title: this.$i18n.t("NewCategory"),
        loading: true,
        sub_title: this.$i18n.t("Category info"),
      },
    };
  },
  methods: {
    set_data() {
      this.$store.commit("SET_COLLECTION", "category");
      this.$store.commit("SET_FUNCTION", "add_category");
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_CARD_LOADING", false);
    },
  },
  mounted() {
    this.set_data();
    document.title = this.$i18n.t("NewCategory");
  },
};
</script>
