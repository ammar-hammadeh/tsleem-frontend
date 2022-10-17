<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import AssignService from "../../services/assign.service";
import CardForm from "../Components/CardForm.vue";
export default {
  name: "New-Assign",
  components: {
    CardForm,
  },
  data() {
    return {
      style_form: [
        {
          col: "6",
          type: "autocomplete",
          label: this.$i18n.t("Square"),
          error: null,
          value_text: "square_id",
          items: [],
          action: "getCampBySquare",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "autocomplete",
          label: this.$i18n.t("Camp"),
          error: null,
          value_text: "camp_id",
          value: "",
          items: [],
          disabled: true,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "autocomplete",
          label: this.$i18n.t("Company Name"),
          error: null,
          value_text: "receiver_company_id",
          items: [],
          action: "select_company",
          value: "",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("license"),
          error: null,
          value_text: "receiver_cr",
          value: "",
          action: "select_licence",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      card: {
        title: this.$i18n.t("NewAssign"),
        loading: true,
        sub_title: this.$i18n.t("assign info"),
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
      this.SET_COLLECTION("assign");
      this.SET_FUNCTION("add_assign");
      this.SET_FORM_STYLE(this.style_form);
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(false);
    },
    get_data() {
      this.SET_CARD_LOADING(true);
      axios.get("general/camps/get-data").then(
        (response) => {
          this.SET_CARD_LOADING(false);
          console.log(response.data);
          this.style_form.map(function (v) {
            if (v.value_text == "receiver_company_id") {
              v.items = response.data.companies;
              return v.items.unshift({ id: null, name: "-----" });
            }

            if (v.value_text == "square_id")
              return (v.items = response.data.squares);
          });
        },
        (error) => {
          console.log(error);
          this.SET_CARD_LOADING(false);
          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push({
            name: "AssignPage",
            params: { message: message },
          });
        }
      );
    },
  },
  mounted() {
    this.set_data();
    this.get_data();
    document.title = this.$i18n.t("NewAssign");
  },
};
</script>
