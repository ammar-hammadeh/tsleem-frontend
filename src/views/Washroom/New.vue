<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
export default {
  name: "New-Washroom",
  components: {
    CardForm,
  },
  data() {
    return {
      style_form: [
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("wc_number"),
          placeholder: this.$i18n.t("wc_number"),
          error: null,
          value_text: "wc_number",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("portable_wc_count"),
          placeholder: this.$i18n.t("portable_wc_count"),
          error: null,
          value_text: "portable_wc_count",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("wc_category"),
          placeholder: this.$i18n.t("wc_category"),
          error: null,
          value_text: "wc_category",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("located_in_gov_area"),
          placeholder: this.$i18n.t("located_in_gov_area"),
          error: null,
          value_text: "located_in_gov_area",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("toilets_count"),
          placeholder: this.$i18n.t("toilets_count"),
          error: null,
          value_text: "toilets_count",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("internal_water_tapes_count"),
          placeholder: this.$i18n.t("internal_water_tapes_count"),
          error: null,
          value_text: "internal_water_tapes_count",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("external_water_tapes_count"),
          placeholder: this.$i18n.t("external_water_tapes_count"),
          error: null,
          value_text: "external_water_tapes_count",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("total_water_tapes_count"),
          placeholder: this.$i18n.t("total_water_tapes_count"),
          error: null,
          value_text: "total_water_tapes_count",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("seated_toilets_count"),
          placeholder: this.$i18n.t("seated_toilets_count"),
          error: null,
          value_text: "seated_toilets_count",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("urinal_tapes_count"),
          placeholder: this.$i18n.t("urinal_tapes_count"),
          error: null,
          value_text: "urinal_tapes_count",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("showers_count"),
          placeholder: this.$i18n.t("showers_count"),
          error: null,
          value_text: "showers_count",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("upper_water_tank"),
          placeholder: this.$i18n.t("upper_water_tank"),
          error: null,
          value_text: "upper_water_tank",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "autocomplete",
          label: this.$i18n.t("Location"),
          error: null,
          value_text: "location_id",
          items: [],
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "autocomplete",
          label: this.$i18n.t("Camp"),
          error: null,
          value_text: "camps",
          type_select:'multiple',
          items: [],
          value: [],
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      card: {
        title: this.$i18n.t("create washroom"),
        loading: true,
        sub_title: this.$i18n.t("Washroom info"),
      },
    };
  },
  methods: {
    set_data() {
      this.$store.commit("SET_COLLECTION", "gis");
      this.$store.commit("SET_FUNCTION", "add");
      this.$store.commit("SET_URL", "gis/washrooms/store-with-camps");
      this.$store.commit("SET_PARENT_PAGE", "WashroomPage");
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_CARD_LOADING", false);
    },
    get_data() {
      this.$store.commit("SET_CARD_LOADING", true);
      return axios.get('gis/washrooms/get-data').then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          this.style_form[12].items = response.data.locations;
          this.style_form[13].items = response.data.camps;
        },
        (error) => {
          console.log(error);
          this.$store.commit("SET_CARD_LOADING", false);
          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push({
            name: "WashroomPage",
            params: { message: message },
          });
        }
      );
    },
  },
  mounted() {
    this.set_data();
    this.get_data();
    document.title = this.$i18n.t("create washroom");
  },
};
</script>
