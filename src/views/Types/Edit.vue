<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import TypeService from "../../services/type.service";
export default {
  name: "Edit-Type",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("edit type"),
        loading: true,
        sub_title: this.$i18n.t("type info"),
      },
      id: this.$route.params.id,
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("type"),
          placeholder: this.$i18n.t("type"),
          value_text: "name",
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "checkbox",
          label: this.$i18n.t("status"),
          value_text: "status",
          label_input: this.$i18n.t("Active"),
          error: null,
          value: "",
          color: "success",
          rules: [],
        },
      ],
    };
  },
  methods: {
    get_type(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return TypeService.get_type(id).then(
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
            name: "TypePage",
            params: { message: message },
          });
        }
      );
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "type");
      this.$store.commit("SET_FUNCTION", "update_type");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.get_type(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("edit type");
  },
};
</script>
