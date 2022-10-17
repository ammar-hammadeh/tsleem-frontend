<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col lg="8" cols="12" class="mx-auto mb-6">
          <v-card class="card-shadow border-radius-xl mt-6" id="basic">
            <Loading v-if="loading"></Loading>
            <div class="px-6 py-6">
              <h5 class="text-h5 font-weight-bold text-typo">
                {{ "Edit Order" }}
              </h5>
            </div>
            <div class="px-6 pb-6 pt-0">
              <Form
                :loader="loader_form"
                :form_data="form_data"
                ref="myForm"
                :data="data"
                @save="edit"
              ></Form>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <Notify ref="myNotify" :details="message"></Notify>
    </v-container>
  </div>
</template>
<script>
import Form from "../Components/Form.vue";
import Notify from "../Components/Notify.vue";
import Loading from "../Components/Loading.vue";
import CountryService from "../../services/city.service";
export default {
  name: "Edit-Country",
  components: {
    Form,
    Loading,
    Notify,
  },
  data() {
    return {
      loading: true,
      loader_form: false,
      message: {
        msg: null,
        type: null,
      },
      form_data: {
        name: "",
        name_ar: "",
        code: "",
        currency: "",
        currency_ar: "",
        prefix: "",
      },
      id: this.$route.params.id,
      data: [
        {
          col: "4",
          type: "text",
          label: this.$i18n.t("name (en)"),
          placeholder: "UAE",
          value_text: "name",
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "4",
          type: "text",
          label: this.$i18n.t("name (ar)"),
          placeholder: "الإمارات",
          value_text: "name_ar",
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "4",
          type: "text",
          label: this.$i18n.t("Code"),
          placeholder: "UAE",
          value_text: "code",
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "4",
          type: "text",
          label: this.$i18n.t("currency (en)"),
          placeholder: "AED",
          value_text: "currency",
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "4",
          type: "text",
          label: this.$i18n.t("currency (ar)"),
          placeholder: "درهم",
          value_text: "currency_ar",
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "4",
          type: "number",
          label: this.$i18n.t("Prefix"),
          placeholder: "971",
          value_text: "prefix",
          value: "",
          error: null,
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              (v && v.length < 4) ||
              this.$i18n.t("auth.prefix must be less than 4 number"),
          ],
        },
      ],
    };
  },
  methods: {
    get_country(id) {
      return CountryService.get_country(id).then(
        (response) => {
          this.loading = false;
          console.log(response.data);
          this.form_data = response.data;
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.message = {
            msg: "يوجد مشكلة في صفحة تعديل بلد الرجاء المحاولة لاحقا",
            type: "Danger",
          };
          this.$router.push({
            name: "CountryPage",
            params: { message: this.message },
          });
        }
      );
    },
    edit(data, valid) {
      this.loader_form = true;
      if (valid) {
        return CountryService.edit(this.id, data).then(
          (response) => {
            console.log(response);
            this.loader_form = false;
            this.message = {
              msg: response.data.message,
              type: "Success",
            };
            this.$router.push({
              name: "CountryPage",
              params: { message: this.message },
            });
          },
          (error) => {
            console.log(error);
            this.loader_form = false;
            if (error.response.status == 422) {
              var errors = error.response.data.errors;
              for (let i = 0; i < this.data.length; i++) {
                const element = this.data[i];
                element.error = errors[element.value_text];
              }
            } else {
              this.message = {
                msg: this.$i18n.t("general.there is problem"),
                type: "Danger",
              };
              // this.$refs['myNotify'].SnackbarShow(this.message);
            }
          }
        );
      } else {
        this.loader_form = false;
      }
    },
  },
  created() {
    this.get_country(this.$route.params.id);
  },
};
</script>
