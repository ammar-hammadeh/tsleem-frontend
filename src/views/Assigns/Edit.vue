<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import AssignService from "../../services/assign.service";
export default {
  name: "Edit-Assign",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("EditAssign"),
        loading: true,
        sub_title: this.$i18n.t("assign info"),
      },
      id: this.$route.params.id,
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
    };
  },
  methods: {
    get_assign(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return AssignService.get_assign(id).then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          // this.style_form[0].items = response.data.inputs;
          // for (let i = 0; i < this.style_form.length; i++) {
          //   const element = this.style_form[i];
          //   element.value = response.data.assign[element.value_text];
          // }
          this.style_form.map(function (v) {
            if (v.value_text == "receiver_company_id") {
              v.items = response.data.companies;
              v.items.unshift({ id: null, name: "------" });
            }
            if (v.value_text == "square_id") v.items = response.data.squares;
            if (v.value_text == "camp_id") v.items = response.data.camps;
            if (response.data.data[v.value_text] == null) v.disabled = true;
            v.value = response.data.data[v.value_text];
            return v;
          });
        },
        (error) => {
          console.log(error);
          this.$store.commit("SET_CARD_LOADING", false);
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
    set_data() {
      this.$store.commit("SET_COLLECTION", "assign");
      this.$store.commit("SET_FUNCTION", "update_assign");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.set_data();
    this.get_assign(this.$route.params.id);
    document.title = this.$i18n.t("EditAssign");
  },
};
</script>
