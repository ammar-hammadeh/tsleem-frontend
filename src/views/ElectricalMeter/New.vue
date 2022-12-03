<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
export default {
  name: "New-ElectricalMeters",
  components: {
    CardForm,
  },
  data() {
    return {
      style_form: [
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("name"),
          placeholder: this.$i18n.t("name"),
          error: null,
          value_text: "name",
          value: "",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("type"),
          placeholder: this.$i18n.t("type"),
          error: null,
          value_text: "type",
          value: "",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("subscription_number"),
          placeholder: this.$i18n.t("subscription_number"),
          error: null,
          value_text: "subscription_number",
          value: "",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("metric_capacity"),
          placeholder: this.$i18n.t("metric_capacity"),
          error: null,
          value_text: "metric_capacity",
          value: "",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("closest_cabin"),
          placeholder: this.$i18n.t("closest_cabin"),
          error: null,
          value_text: "closest_cabin",
          value: "",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "autocomplete",
          label: this.$i18n.t("Location"),
          error: null,
          value_text: "location_id",
          items: [],
          value: "",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "autocomplete",
          label: this.$i18n.t("Camp"),
          error: null,
          value_text: "camps",
          type_select:'multiple',
          items: [],
          value: [],
          // // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      card: {
        title: this.$i18n.t("create electrical_meters"),
        loading: true,
        sub_title: this.$i18n.t("ElectricalMeters info"),
      },
    };
  },
  methods: {
    set_data() {
      this.$store.commit("SET_COLLECTION", "gis");
      this.$store.commit("SET_FUNCTION", "add");
      this.$store.commit("SET_URL", "gis/electrical_meters/store-with-camps");
      this.$store.commit("SET_PARENT_PAGE", "ElectricalMetersPage");
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
          this.style_form[5].items = response.data.locations;
          this.style_form[6].items = response.data.camps;
        },
        (error) => {
          console.log(error);
          this.$store.commit("SET_CARD_LOADING", false);
          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push({
            name: "ElectricalMetersPage",
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
