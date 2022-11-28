<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import Input from "../Components/Input.vue";
import { mapMutations } from "vuex";
import CampService from "../../services/camp.service";
import CardForm from "../Components/CardForm.vue";
export default {
  name: "New-Camp",
  components: {
    CardForm,
    Input,
  },
  data() {
    return {
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("Camp"),
          placeholder: this.$i18n.t("Camp"),
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
      card: {
        title: this.$i18n.t("create camp"),
        loading: true,
        sub_title: this.$i18n.t("camp info"),
      },
    };
  },
  methods: {
    ...mapMutations([
      "SET_COLLECTION",
      "SET_FUNCTION",
      "SET_CARD",
      "SET_CARD_LOADING",
    ]),
    ...mapMutations("form", ["SET_FORM_STYLE"]),
    set_data() {
      this.SET_COLLECTION("camp");
      this.SET_FUNCTION("add_camp");
      this.SET_FORM_STYLE(this.style_form);
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(false);
    },
    get_data() {
      this.SET_CARD_LOADING(true);
      return CampService.get_square().then(
        (response) => {
          this.SET_CARD_LOADING(false);
          console.log(response.data);
          this.style_form[1].items = response.data.squares;
        },
        (error) => {
          console.log(error);
          this.SET_CARD_LOADING(false);
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
  },
  mounted() {
    this.set_data();
    this.get_data();
    document.title = this.$i18n.t("create camp");
  },
};
</script>
