<template>
  <div>
    <CardForm>
      <template slot="form"> </template>
    </CardForm>
  </div>
</template>
<script>
import Input from "../Components/Input.vue";
import { mapMutations } from "vuex";
import CardForm from "../Components/CardForm.vue";
import {EmailWithNoArabicValidator} from "@/util/helpers/Validators/EmailValidator";
export default {
  name: "Create-Employee",
  components: {
    CardForm,
    Input,
  },
  data() {
    return {
      style_form: [
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("Name"),
          placeholder: this.$i18n.t("Name"),
          error: null,
          value_text: "name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("auth.Email Address"),
          placeholder: this.$i18n.t("auth.Email Address"),
          error: null,
          value_text: "email",
          value: "",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              (v && EmailWithNoArabicValidator(v)) ||
              this.$i18n.t("auth.E-mail must be valid"),
          ],
        },
        {
          col: "6",
          type: "password",
          label: this.$i18n.t("auth.Password"),
          placeholder: this.$i18n.t("auth.Password"),
          error: null,
          value_text: "password",
          value: "",
          show: false,
          rules: [
            (v) => !!v || this.$i18n.t("auth.Password is required"),
            (v) =>
              (v && v.length >= 6) ||
              this.$i18n.t("auth.minimum 6 characters at least"),
          ],
        },
        {
          col: "6",
          type: "password",
          label: this.$i18n.t("auth.Repeat Password"),
          placeholder: this.$i18n.t("auth.Repeat Password"),
          error: null,
          show: false,
          value_text: "password_confirmation",
          value: "",
          rules: [
            (v) =>
              !!v || this.$i18n.t("auth.Password Confirmation is required"),
          ],
        },
        {
          col: "12",
          type: "select",
          label: this.$i18n.t("city"),
          error: null,
          value_text: "city_id",
          items: [],
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],

      card: {
        title: this.$i18n.t("CreateEmployee"),
        loading: true,
        sub_title: this.$i18n.t("employee info"),
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
      this.SET_COLLECTION("user");
      this.SET_FUNCTION("add_employee");
      this.SET_FORM_STYLE(this.style_form);
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(false);
    },
    get_data() {
      this.SET_CARD_LOADING(true);
      this.$http.get("/general/cities").then(
        (response) => {
          this.SET_CARD_LOADING(false);
          console.log(response.data);
          this.style_form.map(function (v) {
            if (v.value_text == "city_id")
              return (v.items = response.data.data);
          });
        },
        (error) => {
          this.SET_CARD_LOADING(false);
          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push({
            name: "UserPage",
            params: { message: message },
          });
        }
      );
    },
  },
  mounted() {
    this.set_data();
    this.get_data();
    document.title = this.$i18n.t("CreateEmployee");
  },
};
</script>
