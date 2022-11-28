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
        {
          col: "12",
          type: "select",
          label: this.$i18n.t("Type"),
          error: null,
          value_text: "type_id",
          items: [],
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
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_CARD_LOADING", false);
    },
    get_data() {
      this.$store.commit("SET_CARD_LOADING", true);

      axios.get("general/categories/get-data").then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);

          console.log(response.data);
          this.style_form[1].items = response.data.data;
          this.$store.commit("form/SET_FORM_STYLE", this.style_form);
        },
        (error) => {
          console.log(error);
          this.$store.commit("SET_CARD_LOADING", false);

          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push({
            name: "FormPage",
            params: { message: message },
          });
        }
      );
    },
  },
  mounted() {
    this.get_data();
    this.set_data();
    document.title = this.$i18n.t("NewCategory");
  },
};
</script>
