<template>
  <div>
    <CardForm>
      <template #customize-form>
        <router-link
          :title="$t('Create')"
          v-if="$store.getters['auth/str_per'].indexOf('user-create') > -1"
          to="/users/create"
          class="mr-5"
        >
          <v-icon size="18">mdi-plus</v-icon>
        </router-link>
      </template>
    </CardForm>
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
        title: this.$i18n.t("ReAssign"),
        loading: true,
        sub_title: this.$i18n.t("assign info"),
      },
      id: this.$route.params.id,
      style_form: [
        {
          type: "text",
          label: this.$i18n.t("Square"),
          error: null,
          value_text: "square_id",
          value: "",
          disabled: true,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          type: "text",
          label: this.$i18n.t("Camp"),
          error: null,
          value_text: "camp_id",
          value: "",
          disabled: true,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "autocomplete",
          label: this.$i18n.t("Company Name"),
          error: null,
          value_text: "receiver_company_id",
          items: [],
          action: "select_company",
          value: "",
          customize: true,
          class: "w-90 d-inline-block",
          class_label: "d-block",
        },
      ],
    };
  },
  methods: {
    get_assign(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return AssignService.get_assign_by_company(id).then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          this.style_form.map(function (v) {
            if (v.value_text == "receiver_company_id") {
              v.items = response.data.companies;
            }
            // v.items.unshift({ id: null, name: "------" });
            v.value = parseInt(response.data.data[v.value_text]);
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
      this.$store.commit("SET_FUNCTION", "update_re_assign");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.get_assign(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("ReAssign");
  },
};
</script>
