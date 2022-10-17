<template>
  <div class="register">
    <Notify></Notify>
    <v-form
      ref="loginForm"
      lazy-validation
      v-model="valid"
      @submit.stop.prevent="handleLogin"
      class="mt-4 pt-2"
    >
      <div class="login">
        <div class="login-header pa-4">
          <div class="mb-0">
            <a href="#" class="d-block auth-logo">
              <img src="@/assets/img/logo2.png" alt="" width="100px" />
              <span class="logo-txt"></span>
            </a>
          </div>
          <div class="text-center mb-1">
            <h2 class="bg mb-0">{{ $t("Register in the portal") }}</h2>
          </div>
        </div>

        <div class="login-body bg-body p-4">
          <v-row>
            <v-col
              class="py-0"
              :key="'col-' + ind"
              v-for="(item, ind) in style_form"
              :cols="item.col ? item.col : '6'"
              v-if="item.hasOwnProperty('visible') ? item.visible : true"
            >
              <!-- {{ item.visible }} -->
              <Input
                @input="changeType"
                :item="item"
                v-if="item.value_text == 'type_id'"
              ></Input>
              <Input v-else :item="item"></Input>
            </v-col>
          </v-row>

          <div class="mb-0 text-end">
            <v-btn
              elevation="0"
              :ripple="false"
              height="43"
              class="btn px-5 py-1 btn-blue waves-effect waves-light"
              small
              type="submit"
              :loading="loading"
            >
              {{ $t("Register now") }}
              <span slot="loader">
                <v-progress-circular
                  style="width: 20px; height: 20px"
                  indeterminate
                  color="white"
                ></v-progress-circular>
              </span>
            </v-btn>
          </div>
        </div>
        <div class="login-footer py-3 px-4">
          <div class="text-end mb-3">
            <router-link
              to="/login"
              class="btn px-2 py-1 btn-secondary shadow-none"
              >{{ $t("auth.login") }}</router-link
            >
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>
<script>
import Input from "../Components/Input.vue";
import Notify from "../Components/Notify.vue";
export default {
  components: {
    Input,
    Notify,
  },
  data() {
    return {
      valid: false,
      show: false,
      show2: false,
      style_form: [
        {
          col: "12",
          value: "",
          object: false,
          value_text: "type_id",
          class: "form-control",
          type: "select",
          val_select: "code",
          label: this.$i18n.t("user type"),
          class_div: "input-group auth-pass-inputgroup",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          value_text: "name",
          class: "form-control",
          label: this.$i18n.t("Name"),
          placeholder: this.$i18n.t("Name"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          class: "form-control",
          type: "email",
          label: this.$i18n.t("auth.Email Address"),
          placeholder: this.$i18n.t("auth.Email Address"),
          class_div: "input-group auth-pass-inputgroup",
          value_text: "email",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          type: "password",
          value_text: "password",
          class: "form-control",
          label: this.$i18n.t("auth.Password"),
          placeholder: this.$i18n.t("auth.Password"),
          show: false,
          rules: [
            (v) => !!v || this.$i18n.t("auth.Password is required"),
            (v) =>
              (v && v.length >= 6) ||
              this.$i18n.t("auth.minimum 6 characters at least"),
          ],
          class_div: "input-group auth-pass-inputgroup",
        },
        {
          class_div: "input-group auth-pass-inputgroup",
          value_text: "password_confirmation",
          type: "password",
          class: "form-control",
          label: this.$i18n.t("auth.Repeat Password"),
          placeholder: this.$i18n.t("auth.Repeat Password"),
          show: false,
          rules: [
            (v) =>
              !!v || this.$i18n.t("auth.Password Confirmation is required"),
          ],
        },
        {
          value_text: "company_name",
          class: "form-control",
          label: this.$i18n.t("Company Name"),
          placeholder: this.$i18n.t("Company Name"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          value_text: "owner_name",
          class: "form-control",
          label: this.$i18n.t("PossName"),
          placeholder: this.$i18n.t("PossName"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          value_text: "commercial",
          class: "form-control",
          label: this.$i18n.t("Commercial Register num"),
          placeholder: this.$i18n.t("Commercial Register num"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          class: "form-control",
          value_text: "owner_hardcopyid",
          label: this.$i18n.t("ID No"),
          placeholder: this.$i18n.t("ID No"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },

        {
          class: "form-control",
          value_text: "phone",
          label: this.$i18n.t("auth.Phone Number"),
          placeholder: this.$i18n.t("auth.Phone Number"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          req_val: ["design_office", "contractor"],
          value_text: "city_id",
          visible: true,
          class: "form-control",
          type: "select",
          label: this.$i18n.t("city"),
          placeholder: this.$i18n.t("city"),
          class_div: "input-group auth-pass-inputgroup",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          value_text: "license",
          req_val: ["service_provider"],
          visible: true,
          class: "form-control",
          label: this.$i18n.t("license"),
          placeholder: this.$i18n.t("license"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        // السجل التجاري
        {
          class: "form-control",
          type: "file",
          value: null,
          label:
            this.$i18n.t("Commercial Register") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          accept: ".pdf",
          value_text: "commercial_file",
        },
        {
          class: "form-control",
          type: "date",
          label: this.$i18n.t("Commercial Register Expire"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "commercial_expiration",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
          type: "file",
          value: null,
          label:
            this.$i18n.t("My rating certificate") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          accept: ".pdf",
          value_text: "classification_file",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
          type: "date",
          label: this.$i18n.t("expire_date"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "classification_expire",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          col: "12",
          class: "form-control",
          type: "file",
          value: null,
          label: this.$i18n.t("National address") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          accept: ".pdf",
          value_text: "national_file",
        },
        // {
        //   class: "form-control",
        //   type: "date",
        //   label: this.$i18n.t("expire_date"),
        //   class_div: "input-group auth-pass-inputgroup",
        //   rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        //   value_text: "national_expire",
        // },
        {
          req_val: ["design_office"],
          visible: true,
          class: "form-control",
          type: "file",
          value: null,
          label:
            this.$i18n.t("Profession practice certificate") +
            " " +
            this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          accept: ".pdf",
          value_text: "practice_file",
        },
        {
          req_val: ["design_office"],
          visible: true,
          class: "form-control",
          type: "date",
          label: this.$i18n.t("expire_date"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "practice_expire",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
          type: "file",
          value: null,
          label: this.$i18n.t("business license") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          accept: ".pdf",
          value_text: "business_file",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
          type: "date",
          label: this.$i18n.t("expire_date"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "business_expire",
        },
        {
          col: "12",
          class: "form-control",
          type: "file",
          value: null,
          label: this.$i18n.t("Owner ID photo") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          accept: ".pdf",
          value_text: "ownerid_file",
        },
      ],
      error_msg: "",
      type_msg: "",
      loading: false,
      currentType: "service_provider",
      valid: true,
    };
  },
  methods: {
    reset() {
      this.$refs.loginForm.reset();
    },
    changeType(obj) {
      console.log(obj);
      this.style_form.map(function (item) {
        // if(item.value_text == "type_id")
        if (item.req_val) {
          var req_val = item.req_val;
          if (Array.isArray(req_val) && req_val.includes(obj)) {
            item.visible = true;
          } else {
            item.visible = false;
          }
        }
        return item;
      });
    },
    validate() {
      return this.$refs.loginForm.validate();
    },
    handleLogin() {
      this.error_msg = "";
      this.loading = true;
      const formData = new FormData();
      this.style_form.map(function (v) {
        console.log(v.value_text);
        console.log(v.value);
        if (v.value != undefined) {
          formData.append(v.value_text, v.value);
        }
      });
      // console.log(...formData);
      if (this.validate()) {
        this.$store.dispatch("auth/register", formData).then(
          (res) => {
            this.loading = false;
            this.$store.commit("form/SET_NOTIFY", {
              msg: res.message,
              type: "Success",
            });
            this.reset();
            // this.$router.push("/dashboard");
          },
          (error) => {
            this.loading = false;
            // console.log(error.response.data.message);
            this.error_msg =
              (error.response && error.response.data.message) || error.message;
            error.toString();
            this.$store.commit("form/SET_NOTIFY", {
              msg: this.error_msg,
              type: "Danger",
            });
          }
        );
      } else {
        this.loading = false;
        this.error_msg = this.$i18n.t("auth.Please Check errors and try again");
        his.$store.commit("form/SET_NOTIFY", {
          msg: this.$i18n.t("auth.Please Check errors and try again"),
          type: "Danger",
        });
        return;
      }
    },
    get_types() {
      this.$http.get("/auth/register-data").then(
        (response) => {
          this.style_form.map(function (v) {
            if (v.value_text == "type_id") {
              v.value = "service_provider";
              v.items = response.data.types;
            }
            if (v.value_text == "city_id") v.items = response.data.cities;

            if (v.req_val) {
              var req_val = v.req_val;
              if (
                Array.isArray(req_val) &&
                req_val.includes("service_provider")
              ) {
                v.visible = true;
              } else {
                v.visible = false;
              }
            }
            return v;
          });
        },
        (error) => {
          if (error.response.status != 401) {
            this.$store.dispatch("form/setNotify", {
              msg: this.$i18n.t("general.there is problem"),
              type: "Danger",
            });
          }
        }
      );
    },
  },
  mounted() {
    document.title = this.$i18n.t("auth.register");
    this.get_types();
  },
};
</script>
<style >
.v-application .register h1,
.v-application .register h2,
.v-application .register h3,
.v-application .register h4,
.v-application .register h5,
.v-application .register h6,
.v-application .register a,
.v-application .register input,
/* .v-application .register button, */
.v-application .register label,
.v-application .register input::placeholder {
  font-family: GE-Dinar !important;
}
</style>
