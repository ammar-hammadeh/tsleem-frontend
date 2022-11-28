<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import { mapMutations } from "vuex";
import CityService from "../../services/city.service";
export default {
  name: "Edit-City",
  components: {
    CardForm,
  },
  data() {
    return {
      type_id: "",
      userName: {
        // class: "form-control",
        type: "text",
        label: this.$i18n.t("Name"),
        placeholder: this.$i18n.t("Name"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
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
      ],
      card: {
        title: "Edit City",
        loading: true,
        sub_title: this.$i18n.t("City info"),
      },
    };
  },
  methods: {
    ...mapMutations([
      "SET_CARD_LOADING",
      "SET_FUNCTION",
      "SET_CARD",
      "SET_COLLECTION",
      "SET_ID",
    ]),
    ...mapMutations("form", ["SET_FORM_STYLE"]),
    get_city(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return CityService.get_city(id).then(
        (response) => {
          console.log(response.data);
          for (let i = 0; i < this.style_form.length; i++) {
            const element = this.style_form[i];
            element.value = response.data.data[element.value_text];
          }
          this.$store.commit("form/SET_FORM_STYLE", this.style_form);
          this.$store.commit("SET_CARD_LOADING", false);
        },
        (error) => {
          console.log(error);
          this.$store.commit("SET_CARD_LOADING", false);
          var message = {
            msg: "يوجد مشكلة في صفحة تعديل بلد الرجاء المحاولة لاحقا",
            type: "Danger",
          };
          this.$router.push({
            name: "CityPage",
            params: { message: message },
          });
        }
      );
    },
    set_data() {
      this.SET_COLLECTION("city");
      this.SET_FUNCTION("update_city");
      this.SET_ID(this.id);
      this.SET_FORM_STYLE(this.style_form);
      this.SET_CARD(this.card);
    },
  },
  created() {
    this.set_data();
    this.get_city(this.$route.params.id);
    document.title = "edit city";
  },
};
</script>
