<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
export default {
  name: "Edit-ElectricalMeters",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("edit electrical_meters"),
        loading: true,
        sub_title: this.$i18n.t("ElectricalMeters info"),
      },
      id: this.$route.params.id,
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
    };
  },
  methods: {
    get_washroom(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return axios.get(`gis/electrical_meters/edit/${id}`).then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          this.style_form[5].items = response.data.locations;
          this.style_form[6].items = response.data.camps;
          for (let i = 0; i < this.style_form.length; i++) {
            const element = this.style_form[i];
            if(element.value_text == 'camps'){
              element.value = response.data.data.camp.map((q) => q.id)
            }else
            element.value = response.data.data[element.value_text];
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
            name: "ElectricalMetersPage",
            params: { message: message },
          });
        }
      );
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "gis");
      this.$store.commit("SET_FUNCTION", "update");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("SET_URL", "gis/electrical_meters/update-with-camps/"+this.id);
      this.$store.commit("SET_PARENT_PAGE", "ElectricalMetersPage");
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.get_washroom(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("edit washroom");
  },
};
</script>
