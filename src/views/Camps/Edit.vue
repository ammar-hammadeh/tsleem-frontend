<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import CampService from "../../services/camp.service";
export default {
  name: "Edit-Camp",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("edit camp"),
        loading: true,
        sub_title: this.$i18n.t("camp info"),
      },
      id: this.$route.params.id,
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
          label: this.$i18n.t("square"),
          error: null,
          value_text: "square_id",
          items: [],
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
    };
  },
  methods: {
    get_camp(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return CampService.get_camp(id).then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          this.style_form[1].items = response.data.squares;
          for (let i = 0; i < this.style_form.length; i++) {
            const element = this.style_form[i];
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
            name: "CampPage",
            params: { message: message },
          });
        }
      );
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "camp");
      this.$store.commit("SET_FUNCTION", "update_camp");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.get_camp(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("edit camp");
  },
};
</script>
