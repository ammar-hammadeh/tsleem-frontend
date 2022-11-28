<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import EnginnerOfficeService from "../../services/engineer_office.service";
export default {
  name: "Edit-EnginnerOffice",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("EditEnginnerOffice"),
        loading: true,
        sub_title: this.$i18n.t("EnginnerOffice info"),
      },
      id: this.$route.params.id,
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("Name"),
          placeholder: this.$i18n.t("Name"),
          value_text: "name",
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
    };
  },
  methods: {
    get_engineer_office(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return EnginnerOfficeService.get_engineer_office(id).then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
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
            name: "EnginnerOfficeCategoryPage",
            params: { message: message },
          });
        }
      );
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "engineer_office");
      this.$store.commit("SET_FUNCTION", "update_engineer_office");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.get_engineer_office(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("EditEnginnerOffice");
  },
};
</script>
