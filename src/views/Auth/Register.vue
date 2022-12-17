<template>
  <div class="register">
    <Notify :details="error_msg"></Notify>
    <Loading v-if="load_page"></Loading>
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
              <template v-else-if="item.value_text == 'phone'">
                <Input :item="item">
                  <template #feild>
                    <span class="number_phone">966+</span>
                  </template>
                </Input>
              </template>
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
import Notify from "../Components/NewNotify.vue";
import Loading from "../Components/Loading.vue";
import {EmailWithNoArabicValidator} from "@/util/helpers/Validators/EmailValidator";
export default {
  components: {
    Input,
    Notify,
    Loading,
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
error:null,
          required: true,
          type: "select",
          val_select: "code",
          label: this.$i18n.t("user type"),
          class_div: "input-group auth-pass-inputgroup",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
//         {
//           value_text: "name",
//           class: "form-control",
// error:null,
//           required: true,
//           label: this.$i18n.t("Name"),
//           placeholder: this.$i18n.t("Name"),
//           class_div: "input-group auth-pass-inputgroup",
//           rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
//         },


        {
          class: "form-control",
error:null,
          required: true,
          type: "email",
          label: this.$i18n.t("auth.Email Address"),
          placeholder: "Example@test.com",
          class_div: "input-group auth-pass-inputgroup",
          value_text: "email",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
                (v && EmailWithNoArabicValidator(v)) ||
              this.$i18n.t("auth.E-mail must be valid"),
          ],
        },
        {
          value_text: "company_name",
          class: "form-control",
error:null,
          required: true,
          label: this.$i18n.t("Company Name"),
          placeholder: this.$i18n.t("Company Name"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          type: "password",
          value_text: "password",
          class: "form-control",
          error:null,
          required: true,
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
          error:null,
          required: true,
          label: this.$i18n.t("auth.Repeat Password"),
          placeholder: this.$i18n.t("auth.Repeat Password"),
          show: false,
          rules: [
            (v) =>
              !!v || this.$i18n.t("auth.Password Confirmation is required"),
          ],
        },
        {
          value_text: "owner_name",
          class: "form-control",
error:null,
          required: true,
          label: this.$i18n.t("PossName"),
          placeholder: this.$i18n.t("PossName"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          type: "number",
          value_text: "commercial",
          class: "form-control",
error:null,
          required: true,
          label: this.$i18n.t("Commercial Register num"),
          placeholder: this.$i18n.t("Commercial Register num"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) => (v && v.length == 10) || this.$i18n.t("equal 10 characters"),
          ],
        },
        {
          type: "number",
          class: "form-control",
error:null,
          required: true,
          value_text: "owner_hardcopyid",
          label: this.$i18n.t("ID No"),
          placeholder: this.$i18n.t("ID No"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) => /^(1)\d*$/.test(v) || this.$i18n.t("have to start number 1"),
            (v) => (v && v.length == 10) || this.$i18n.t("equal 10 characters"),
          ],
        },

        {
          class: "d-inline-block form-control w-80",
          required: true,
          value_text: "phone",
          type: "number",
          label: this.$i18n.t("auth.Phone Number"),
          placeholder: '5xxxxxxxx',
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              /^(5)\d*$/.test(v) || this.$i18n.t("have to start number 5"),
            (v) => (v && v.length == 9) || this.$i18n.t("equal 9 characters"),
          ],
        },
        {
          req_val: ["design_office", "contractor"],
          value_text: "city_id",
          visible: true,
          class: "form-control",
error:null,
          required: true,
          type: "select",
          label: this.$i18n.t("city"),
          placeholder: this.$i18n.t("city"),
          class_div: "input-group auth-pass-inputgroup",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "number",
          value_text: "license",
          req_val: ["service_provider"],
          visible: true,
          class: "form-control",
error:null,
          required: true,
          label: this.$i18n.t("license"),
          placeholder: this.$i18n.t("license"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          visible: true,
          error: null,
          value: "",
          col: "6",
          class: "form-control",
error:null,
          required: true,
          class_div: "input-group auth-pass-inputgroup",
          req_val: ["design_office", "contractor"],
          label: this.$i18n.t("Specialties"),
          value_text: "category_id",
          type: "select",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        // السجل التجاري
        {
          req_val: ["design_office", "contractor"],
          class: "form-control",
error:null,
          required: true,
          type: "file",
          value: null,
          label:
            this.$i18n.t("Commercial Register") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "commercial_file",
        },
        {
          req_val: ["design_office", "contractor"],
          class: "form-control",
error:null,
          required: true,
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
error:null,
          required: true,
          type: "file",
          value: null,
          label:
            this.$i18n.t("My rating certificate") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "classification_file",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
error:null,
          required: true,
          type: "date",
          label: this.$i18n.t("expire_date"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "classification_expire",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          // col: "12",
          class: "form-control",
error:null,
          required: true,
          type: "file",
          value: null,
          label: this.$i18n.t("National address") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "national_file",
        },
        // {
        //   req_val: ["service_provider"],
        //   col: "6",
        //   class: "form-control",
        //   error:null,
        //   required: true,
        //   type: "file",
        //   value: null,
        //   label: this.$i18n.t("seasonal_license") + " " + this.$i18n.t("(PDF)"),
        //   class_div: "input-group auth-pass-inputgroup",
        //   rules: [
        //     (v) => !!v || this.$i18n.t("form.Item is required"),
        //     (v) =>
        //       !v ||
        //       v.size <= 2000000 ||
        //       this.$i18n.t("size should be less or equal than 2 MB"),
        //   ],
        //   accept: ".pdf",
        //   value_text: "seasonal_license",
        // },

        {
          req_val: ["design_office", "contractor"],
          col: "6",
          class: "form-control",
error:null,
          required: true,
          type: "file",
          value: null,
          label: this.$i18n.t("Owner ID photo") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "ownerid_file",
        },
        // {
        //   class: "form-control",
// error:null,
        // required:true,
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
error:null,
          required: true,
          type: "file",
          value: null,
          label:
            this.$i18n.t("Profession practice certificate") +
            " " +
            this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "practice_file",
        },
        {
          req_val: ["design_office"],
          visible: true,
          class: "form-control",
error:null,
          required: true,
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
error:null,
          required: true,
          type: "file",
          value: null,
          label: this.$i18n.t("business license") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "business_file",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
error:null,
          required: true,
          type: "date",
          label: this.$i18n.t("expire_date"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "business_expire",
        },
      ],
      error_msg: { msg: "", type: "" },
      load_page: true,
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
    resetValidation() {
      this.$refs.loginForm.resetValidation();
    },
    changeType(obj) {
      var self = this;
      // console.log(obj);
      this.resetValidation();
      this.style_form.map(function (item) {
        if (obj == "service_provider") {
          if (item.value_text == "ownerid_file") {
            item.col = "12";
          }
        } else {
          if (item.value_text == "ownerid_file") {
            item.col = "6";
          }
        }

        if (item.value_text == "category_id") {
          if (obj == "contractor" || obj == "design_office") {
            // alert(1);
            self.load_page = true;
            self.getCategoryByType(obj).then((res) => {
              console.log(res);
              self.load_page = false;
              item.items = res.data.data;
            });
            if (obj == "design_office") {
              item.type_select = "multiple";
            } else {
              item.type_select = "single";
            }
          }
        }

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
      this.error_msg = { msg: "", type: "" };
      console.log(this.error_msg);
      this.loading = true;
      const formData = new FormData();
      if (this.validate()) {
        this.style_form.map(function (v) {
          console.log(v.value_text);
          console.log(v.value);
          if (v.value != undefined && v.value != "" && v.value != null) {
            if (
              (v.type == "select" && v.type_select == "multiple") ||
              (v.type == "autocomplete" && v.type_select == "multiple")
            ) {
              var value = v.value;
              for (var i = 0; i < value.length; i++) {
                const val = value[i];
                formData.append(`${v.value_text}[ ${i} ]`, val);
              }
            }
            else {
              // if (v.value_text == "phone") {
              //   var val = null;
              //   if (v.value[0] == "0") {
              //     val = v.value.replace(/0/i, "");
              //     val = val;
              //   } else {
              //     val = v.value;
              //   }
              //   formData.append(v.value_text, val);
              // } else {
                formData.append(v.value_text, v.value);
              // }
            }
          }
        });
        console.log(...formData);
        // return;
        this.$store.dispatch("auth/register", formData).then(
          (res) => {
            this.loading = false;
            this.error_msg = {
              msg: res.message,
              type: "Success",
            };
            // this.reset();
            var self = this
            setTimeout(function () {
              self.$router.push("/login");
            }, 3000)
            // this.$router.push("/dashboard");
          },
          (error) => {
            this.loading = false;
            // console.log(error.response.data.message);
            var msg =
              (error.response && error.response.data.message) || error.message;
            error.toString();
            this.error_msg = {
              msg: msg,
              type: "Danger",
            };
            var errors = error.response.data.errors;
            console.log(error.response.data.errors)
              for (let i = 0; i < this.style_form.length; i++) {
                const element = this.style_form[i];
                if (errors[element.value_text] != undefined) {
                  // alert(2);
                  // if (element.value_text == "password") {
                  //   alert(1);
                  //   element.error = errors.password.toString();
                  // } else
                  element.error = errors[element.value_text].toString();
                  console.log(errors[element.value_text]);
                  console.log(element.error);
                }
              }
          }
        );
      } else {
        this.loading = false;
        this.error_msg = {
          msg: this.$i18n.t("auth.Please Check errors and try again"),
          type: "Danger",
        };
        return;
      }
    },
    getCategoryByType(type) {
      return axios.get("/auth/categories/by-type/" + type);
    },
    get_types() {
      this.$http.get("/auth/register-data").then(
        (response) => {
          this.style_form.map(function (v) {
            if (v.value_text == "type_id") {
              v.value = "service_provider";
              v.items = response.data.types;
            }
            if (v.value_text == "ownerid_file") {
              v.col = "12";
            }
            if (v.value_text == "city_id") v.items = response.data.cities;
            // if (v.value_text == "category_id")
            //   v.items = response.data.categories;

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
          this.load_page = false;
        },
        (error) => {
          this.load_page = false;
          if (error.response.status != 401) {
            this.error_msg = {
              msg: this.$i18n.t("general.there is problem"),
              type: "Danger",
            };
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
