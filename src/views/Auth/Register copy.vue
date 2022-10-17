<template>
  <div class="register">
    <v-alert
      v-if="error_msg"
      :ripple="false"
      key="danger"
      close-icon="fas fa-times font-size-root text-white"
      :class="`alert alert-${type_msg}`"
      dismissible
      dark
    >
      <span>
        {{ error_msg }}
      </span>
    </v-alert>
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
            <v-col cols="12" class="py-0">
              <Input
                v-model="form.type_id"
                @input="changeType"
                :item="userType"
              ></Input>
            </v-col>
            <!-- معلومات الحساب -->
            <v-col cols="6" class="py-0">
              <Input v-model="form.name" :item="userName"></Input>
            </v-col>
            <v-col cols="6" class="py-0">
              <Input v-model="form.email" :item="email"></Input>
            </v-col>
            <v-col cols="6" class="py-0">
              <Input v-model="form.password" :item="password"></Input>
            </v-col>
            <v-col cols="6" class="py-0">
              <Input
                v-model="form.password_confirmation"
                :item="password_confirmation"
              ></Input>
            </v-col>
            <!-- معلومات الشركة -->
            <v-col cols="6" class="py-0">
              <Input v-model="form.company_name" :item="companyName"></Input>
            </v-col>
            <v-col cols="6" class="py-0">
              <Input v-model="form.owner_name" :item="PossName"></Input>
            </v-col>
            <v-col cols="6" class="py-0">
              <Input v-model="form.commercial" :item="commercial"></Input>
            </v-col>
            <v-col cols="6" class="py-0">
              <Input v-model="form.owner_hardcopyid" :item="ID_No"></Input>
            </v-col>
            <v-col
              cols="6"
              class="py-0"
              v-if="currentType == 'service_provider'"
            >
              <Input v-model="form.license" :item="license"></Input>
            </v-col>
            <v-col cols="6" class="py-0">
              <Input v-model="form.phone" :item="phone"></Input>
            </v-col>
            <v-col
              cols="6"
              v-if="currentType != 'service_provider'"
              class="py-0"
            >
              <Input v-model="form.city_id" :item="city"></Input>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-file-input
                outlined
                show-size
                v-model="form.commercial_file"
              ></v-file-input>
              <!-- <Input
                v-model="form.commercial_file"
                :item="commercialFile"
              ></Input> -->
            </v-col>
            <v-col cols="6" class="py-0">
              <Input
                v-model="form.commercial_expiration"
                :item="expire_commercial"
              ></Input>
            </v-col>
            <v-col
              cols="6"
              class="py-0"
              v-if="currentType != 'service_provider'"
            >
              <Input
                v-model="form.classification_file"
                :item="classificationFile"
              ></Input>
            </v-col>
            <v-col
              cols="6"
              class="py-0"
              v-if="currentType != 'service_provider'"
            >
              <Input
                v-model="form.classification_expire"
                :item="classificationExpire"
              ></Input>
            </v-col>
            <v-col
              cols="12"
              class="py-0"
              v-if="currentType != 'service_provider'"
            >
              <Input v-model="form.national_file" :item="nationalFile"></Input>
            </v-col>
            <v-col cols="6" class="py-0" v-if="currentType == 'design_office'">
              <Input v-model="form.practice_file" :item="practiceFile"></Input>
            </v-col>
            <v-col cols="6" class="py-0" v-if="currentType == 'design_office'">
              <Input
                :item="practiceExpire"
                v-model="form.practice_expire"
              ></Input>
            </v-col>
            <v-col
              cols="6"
              class="py-0"
              v-if="currentType != 'service_provider'"
            >
              <Input v-model="form.business_file" :item="businessFile"></Input>
            </v-col>
            <v-col
              cols="6"
              class="py-0"
              v-if="currentType != 'service_provider'"
            >
              <Input
                v-model="form.business_expire"
                :item="businessExpire"
              ></Input>
            </v-col>
            <v-col cols="12" class="py-0">
              <Input v-model="form.ownerid_file" :item="owneridFile"></Input>
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
export default {
  components: {
    Input,
  },
  data() {
    return {
      valid: false,
      show: false,
      show2: false,
      userType: {
        value: "",
        object: true,
        class: "form-control",
        type: "select",
        label: this.$i18n.t("user type"),
        class_div: "input-group auth-pass-inputgroup",
        items: [],
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      userName: {
        class: "form-control",
        label: this.$i18n.t("Name"),
        placeholder: this.$i18n.t("Name"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      companyName: {
        class: "form-control",
        label: this.$i18n.t("Company Name"),
        placeholder: this.$i18n.t("Company Name"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      PossName: {
        class: "form-control",
        label: this.$i18n.t("PossName"),
        placeholder: this.$i18n.t("PossName"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      commercial: {
        class: "form-control",
        label: this.$i18n.t("Commercial Register num"),
        placeholder: this.$i18n.t("Commercial Register num"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      ID_No: {
        class: "form-control",
        label: this.$i18n.t("ID No"),
        placeholder: this.$i18n.t("ID No"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      email: {
        class: "form-control",
        type: "email",
        label: this.$i18n.t("auth.Email Address"),
        placeholder: this.$i18n.t("auth.Email Address"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      password: {
        type: "password",
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
      password_confirmation: {
        class_div: "input-group auth-pass-inputgroup",

        type: "password",
        class: "form-control",
        label: this.$i18n.t("auth.Repeat Password"),
        placeholder: this.$i18n.t("auth.Repeat Password"),
        show: false,
        rules: [
          (v) => !!v || this.$i18n.t("auth.Password Confirmation is required"),
        ],
      },
      phone: {
        class: "form-control",
        label: this.$i18n.t("auth.Phone Number"),
        placeholder: this.$i18n.t("auth.Phone Number"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      city: {
        class: "form-control",
        type: "select",
        label: this.$i18n.t("city"),
        placeholder: this.$i18n.t("city"),
        class_div: "input-group auth-pass-inputgroup",
        items: [],
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      license: {
        class: "form-control",
        label: this.$i18n.t("license"),
        placeholder: this.$i18n.t("license"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      // السجل التجاري
      commercialFile: {
        class: "form-control",
        type: "file",
        label:
          this.$i18n.t("Commercial Register") + " " + this.$i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        accept: ".pdf",
      },
      expire_commercial: {
        class: "form-control",
        type: "date",
        label: this.$i18n.t("Commercial Register Expire"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      classificationFile: {
        class: "form-control",
        type: "file",
        label:
          this.$i18n.t("My rating certificate") + " " + this.$i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        accept: ".pdf",
      },
      classificationExpire: {
        class: "form-control",
        type: "date",
        label: this.$i18n.t("expire_date"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      nationalFile: {
        class: "form-control",
        type: "file",
        label: this.$i18n.t("National address") + " " + this.$i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        accept: ".pdf",
      },
      owneridFile: {
        class: "form-control",
        type: "file",
        label: this.$i18n.t("Owner ID photo") + " " + this.$i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        accept: ".pdf",
      },
      nationalExpire: {
        class: "form-control",
        type: "date",
        label: this.$i18n.t("expire_date"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      practiceFile: {
        class: "form-control",
        type: "file",
        label:
          this.$i18n.t("Profession practice certificate") +
          " " +
          this.$i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        accept: ".pdf",
      },
      practiceExpire: {
        class: "form-control",
        type: "date",
        label: this.$i18n.t("expire_date"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      businessFile: {
        class: "form-control",
        type: "file",
        label: this.$i18n.t("business license") + " " + this.$i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        accept: ".pdf",
      },
      businessExpire: {
        class: "form-control",
        type: "date",
        label: this.$i18n.t("expire_date"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      form: {
        type_id: "",
        company_name: "",
        owner_name: "",
        phone: "",
        city_id: "",
        commercial: "",
        license: "",
        owner_hardcopyid: "",
        // file
        ownerid_file: null,
        commercial_file: null,
        commercial_expiration: "",
        classification_file: null,
        classification_expire: "",
        national_file: null,
        national_expire: "",
        practice_file: null,
        practice_expire: "",
        business_file: null,
        business_expire: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
      },
      error_msg: "",
      type_msg: "",
      loading: false,
      currentType: "service_provider",
      valid: true,
    };
  },
  methods: {
    changeType(obj) {
      console.log(obj);
      this.currentType = obj.code;
    },
    validate() {
      // this.valid=this.$refs.loginForm.validate();
      return this.$refs.loginForm.validate();
    },
    handleLogin() {
      this.error_msg = "";
      this.loading = true;
      console.log(this.form);
      const formData = new FormData();

      if (this.validate()) {
        this.$store.dispatch("auth/register", this.form).then(
          (res) => {
            this.loading = false;
            this.error_msg = res.message;
            this.type_msg = "success";
            // this.$router.push("/dashboard");
          },
          (error) => {
            this.loading = false;
            // console.log(error.response.data.message);
            this.error_msg =
              (error.response && error.response.data.message) || error.message;
            error.toString();
            this.type_msg = "danger";
          }
        );
      } else {
        this.loading = false;
        this.error_msg = this.$i18n.t("auth.Please Check errors and try again");
        this.type_msg = "danger";
        return;
      }
    },
    get_types() {
      this.$http.get("/auth/register-data").then(
        (response) => {
          this.userType.items = response.data.types;
          this.userType.value = 1;
          console.log(this.form);
          this.city.items = response.data.cities;
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
