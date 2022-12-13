<template>
  <div class="register">
    <Notify :details="error_msg"></Notify>
    <Loading v-if="load_page"></Loading>
    <v-form
      ref="loginForm"
      lazy-validation
      v-model="valid"
      @submit.stop.prevent="handleRegister"
      class="mt-4 pt-2"
    >
      <div class="login">
        <FormHeader />

        <div class="login-body bg-body p-4">
          <v-row>
            <v-col
              class="py-0"
              :key="'col-' + ind"
              v-for="(item, ind) in style_form"
              :cols="item.col ? item.col : '6'"
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

        <FormFooter />
      </div>
    </v-form>
  </div>
</template>
<script>
import Input from "../../Components/Input.vue";
import Notify from "../../Components/NewNotify.vue";
import Loading from "../../Components/Loading.vue";
import FormFooter from "./Partials/FormFooter";
import FormHeader from "./Partials/FormHeader";
import {
  isValueNotEmpty,
  isDropDownComponent,
  isFormValidate
} from "../../../helpers/General";
import {
  HujajDakhilStyleFormData,
  ContactorStyleFormData,
  DesignOfficeStyleFormData,
} from "./Helpers/StyleFormData";

export default {
  components: {
    FormHeader,
    FormFooter,
    Input,
    Notify,
    Loading,
  },
  data() {
    return {
      show: false,
      show2: false,
      style_form: HujajDakhilStyleFormData,
      error_msg: { msg: "", type: "" },
      load_page: true,
      type_msg: "",
      loading: false,
      currentType: "service_provider",
      valid: true,
      typesOfUsers: null,
      cities: null,
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
      console.log("type has changed ", obj);
      switch (obj) {
        case "service_provider":
          this.style_form = this.assignFormStyle(HujajDakhilStyleFormData, obj);
          break;
        case "design_office":
          this.style_form = this.assignFormStyle(DesignOfficeStyleFormData, obj);
          break;
        case "contractor":
          this.style_form = this.assignFormStyle(ContactorStyleFormData, obj);
          break;
      }
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
        return item;
      });
    },
    handleRegister() {
      this.error_msg = { msg: "", type: "" };
      console.log(this.error_msg);
      this.loading = true;
      const formData = new FormData();
      if (isFormValidate(this.$refs.loginForm)) {
        this.style_form.map(function (v) {
          if (isValueNotEmpty(v.value)) {
            if (isDropDownComponent(v.type, v.type_select)) {
              var value = v.value;
              for (var i = 0; i < value.length; i++) {
                const val = value[i];
                formData.append(`${v.value_text}[ ${i} ]`, val);
              }
            } else {
              formData.append(v.value_text, v.value);
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
            var self = this;
            setTimeout(function () {
              self.$router.push("/login");
            }, 3000);
            // this.$router.push("/dashboard");
          },
          (error) => {
            this.loading = false;
            var msg =
              (error.response && error.response.data.message) || error.message;
            error.toString();
            this.error_msg = {
              msg: msg,
              type: "Danger",
            };
            var errors = error.response.data.errors;
            console.log(error.response.data.errors);
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
      return this.$http.get("/auth/categories/by-type/" + type);
    },
    async get_types() {
      try {
        this.load_page = true;
        const response = await this.$http.get("/auth/register-data");
        console.log("response of get_types :", response);
        const { types, cities } = response.data;

        this.typesOfUsers = types;
        this.cities = cities;

        this.load_page = false;

        this.style_form.map(function (v) {
          if (v.value_text == "type_id") {
            v.value = "service_provider";
            v.items = types;
          }
          if (v.value_text == "ownerid_file") {
            v.col = "12";
          }
          if (v.value_text == "city_id") v.items = cities;
      
          return v;
        });
      } catch (error) {
        this.getTypesErrorHandler(error);
      }
    },
    getTypesErrorHandler(error) {
      this.load_page = false;
      if (error.response.status != 401) {
        this.error_msg = {
          msg: this.$i18n.t("general.there is problem"),
          type: "Danger",
        };
      }
    },
    assignFormStyle(formStyle, typeOfUser){
      const TYPES_DROPDOWN_INDEX = 0;
      const CITIES_INDEX = 8;

      formStyle[TYPES_DROPDOWN_INDEX].value=typeOfUser;
      formStyle[TYPES_DROPDOWN_INDEX].items = [...this.typesOfUsers];

      if(typeOfUser === "contractor" || typeOfUser === "design_office"){
        formStyle[CITIES_INDEX].items = this.cities;
      }


      return formStyle;
    }
  },
  mounted() {
    document.title = this.$i18n.t("auth.register");
    this.get_types();
  },
};
</script>
<style>
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
