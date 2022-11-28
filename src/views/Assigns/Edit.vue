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
          visible: true,
          type: "autocomplete",
          label: this.$i18n.t("or") + " " + this.$i18n.t("license"),
          error: null,
          value_text: "receiver_cr",
          value: "",
          items: [],
          title_select: "license",
          action: "select_licence",
          // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
    };
  },
  methods: {
    get_assign(id) {
      var self = this;
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
          this.style_form.forEach(function (v) {
            if (v.value_text == "receiver_company_id") {
              v.items = response.data.companies;
            }
            if (v.value_text == "square_id") v.items = response.data.squares;
            if (v.value_text == "camp_id") v.items = response.data.camps;
            v.value = parseInt(response.data.data[v.value_text])
            if (v.value_text == "receiver_cr") {
              v.items = response.data.companies.filter(
                (l) => l.license != null
              );
              console.log(v.items);
              var val = response.data.companies.filter(
                (c) => c.id == parseInt(response.data.data.receiver_company_id)
              );
              if (val.length > 0) {
                v.value = val[0].id;
                var label = self.$i18n.t("license");
                // console.log(val[0].type.code);
                if (val[0].type.code == "raft_office") {
                  label = self.$i18n.t("center number");
                } else {
                  label = self.$i18n.t("license");
                }
                v.label = label;
              } else {
                v.value = "";
              }
              console.log(v.value);
            }
            // return v;
          });
          // this.set_data();
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
    this.get_assign(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("EditAssign");
  },
};
</script>
