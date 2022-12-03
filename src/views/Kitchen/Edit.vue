<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
export default {
  name: "Edit-Kitchen",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("edit kitchen"),
        loading: true,
        sub_title: this.$i18n.t("Kitchen info"),
      },
      id: this.$route.params.id,
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("Kitchen"),
          placeholder: this.$i18n.t("Kitchen"),
          value_text: "name",
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "autocomplete",
          label: this.$i18n.t("Location"),
          error: null,
          value_text: "location_id",
          items: [],
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
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
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
    };
  },
  methods: {
    get_kitchen(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return axios.get(`gis/kitchens/edit/${id}`).then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          this.style_form[1].items = response.data.locations;
          this.style_form[2].items = response.data.camps;
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
            name: "KitchenPage",
            params: { message: message },
          });
        }
      );
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "gis");
      this.$store.commit("SET_FUNCTION", "update");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("SET_URL", "gis/kitchens/update-with-camps/"+this.id);
      this.$store.commit("SET_PARENT_PAGE", "KitchenPage");
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.get_kitchen(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("edit kitchen");
  },
};
</script>
