<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
export default {
  name: "New-Plot",
  components: {
    CardForm,
  },
  data() {
    return {
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("plot_number"),
          placeholder: this.$i18n.t("plot_number"),
          error: null,
          value_text: "plot_number",
          value: "",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "autocomplete",
          label: this.$i18n.t("Zone"),
          error: null,
          value_text: "zone_id",
          items: [],
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "autocomplete",
          label: this.$i18n.t("Establishment"),
          error: null,
          value_text: "establishments",
          type_select:'multiple',
          items: [],
          value: [],
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      card: {
        title: this.$i18n.t("create plot"),
        loading: true,
        sub_title: this.$i18n.t("Plot info"),
      },
    };
  },
  methods: {
    set_data() {
      this.$store.commit("SET_COLLECTION", "gis");
      this.$store.commit("SET_FUNCTION", "add");
      this.$store.commit("SET_URL", "gis/plots/store-with-establishments");
      this.$store.commit("SET_PARENT_PAGE", "PlotPage");
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_CARD_LOADING", false);
    },
    get_data() {
      this.$store.commit("SET_CARD_LOADING", true);
      return axios.get('gis/plots/get-data').then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          this.style_form[1].items = response.data.zones;
          this.style_form[2].items = response.data.establishments;
        },
        (error) => {
          console.log(error);
          this.$store.commit("SET_CARD_LOADING", false);
          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push({
            name: "PlotPage",
            params: { message: message },
          });
        }
      );
    },
  },
  mounted() {
    this.set_data();
    this.get_data();
    document.title = this.$i18n.t("create plot");
  },
};
</script>
