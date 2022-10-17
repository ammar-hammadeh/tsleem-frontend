<template>
  <v-card class="mt-sm-8 mt-md-5 mt-7 bg-transparent">
    <v-alert
      v-if="error_msg.visible"
      :ripple="false"
      key="danger"
      close-icon="fas fa-times font-size-root text-white"
      :class="`alert alert-${error_msg.type}`"
      dismissible
      dark
    >
      <span>
        {{ error_msg.msg }}
      </span>
    </v-alert>
    <div class="card-padding pb-0">
      <h3 class="text-h3 font-weight-bolder text-primary text-gradient mb-2">
        {{ $t("auth.Reset Password") }}
      </h3>
    </div>
    <div class="card-padding pb-4">
      <v-form @submit="handleLogin" ref="loginForm">
        <div class="row">
          <div class="col-lg-12 pt-0">
            <v-text-field
              v-model="form.password"
              :rules="rules.password"
              :error-messages="errors.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              lazy-validation
              @click:append="show = !show"
              outlined
              color="rgba(0,0,0,.6)"
              :placeholder="$t('auth.Password')"
              class="font-size-input placeholder-lighter text-light-input"
            >
            </v-text-field>
          </div>
          <div class="col-lg-12 pt-0">
            <v-text-field
              :rules="rules.password_confirmation"
              :error-messages="errors.password_confirmation"
              :append-icon="show_cpass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_cpass ? 'text' : 'password'"
              lazy-validation
              @click:append="show_cpass = !show_cpass"
              outlined
              color="rgba(0,0,0,.6)"
              :placeholder="$t('auth.Repeat Password')"
              class="font-size-input placeholder-lighter text-light-input"
              v-model="form.password_confirmation"
            >
            </v-text-field>
          </div>
          <div class="col-lg-12 pt-0">
            <div class="div_btn">
              <v-btn
                elevation="0"
                :ripple="false"
                height="43"
                class="
                  font-weight-bold
                  text-uppercase
                  btn-primary
                  bg-gradient-primary
                  py-2
                  px-6
                  me-2
                  mt-7
                  mb-2
                  w-100
                "
                color="#5e72e4"
                small
                :loading="loading"
                type="submit"
              >
                <!-- @submit="handleLogin()" -->
                <span slot="loader">
                  <v-progress-circular
                    style="width: 20px; height: 20px"
                    indeterminate
                    color="white"
                  >
                  </v-progress-circular>
                  <!-- {{ $t("general.loading") }} -->
                </span>
                {{ $t("auth.send") }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-form>
    </div>
  </v-card>
</template>
<script>
import AuthService from "../../services/auth.service";
import Notify from "../Components/Notify.vue";
export default {
  components: { Notify },
  data() {
    return {
      valid: false,
      show: false,
      form: {
        password: "",
        password_confirmation: "",
        token: "",
        email: "",
      },
      rules: {
        password: [
          (v) => !!v || this.$i18n.t("auth.Password is required"),
          (v) =>
            (v && v.length >= 6) || this.$i18n.t("auth.minimum 6 characters"),
        ],
        password_confirmation: [
          (v) => !!v || this.$i18n.t("auth.Password Confirmation is required"),
          (v) =>
            v == this.form.password ||
            this.$i18n.t(
              "auth.Password and password confirmation does not match"
            ),
        ],
      },
      errors: {},
      error_msg: {
        msg: null,
        type: null,
        visible: false,
      },
      loading: false,
      show_cpass: false,
    };
  },
  methods: {
    validate() {
      return this.$refs.loginForm.validate();
    },
    handleLogin(e) {
      e.preventDefault();
      // this.error_msg.msg = "";
      this.loading = true;
      if (this.validate()) {
        this.form.token = this.$route.query.token;
        this.form.email = this.$route.query.email;
        return AuthService.new_password(this.form).then(
          (response) => {
            // console.log(response);
            this.loading = false;
            // console.log(response);
            this.error_msg.msg = response.data.message;
            this.error_msg.type = "success";
            this.error_msg.visible = true;
            var router = this.$router;
            // setTimeout(function () {
            //   router.push({ path: "/login" });
            // }, 2000);
          },
          (error) => {
            console.log(error);
            this.loading = false;
            if (error && error.response.status == 422) {
              this.errors = error.response.data.errors;
              this.error_msg.msg =
                (error.response && error.response.data.message) ||
                error.message;
              error.toString();
              this.error_msg.type = "danger";
            } else {
              this.error_msg.msg =
                (error.response && error.response.data.message) ||
                error.message;
              error.toString();
              this.error_msg.type = "danger";
              this.error_msg.visible = true;
            }
          }
        );
      } else {
        this.loading = false;
        this.error_msg.msg = this.$i18n.t(
          "auth.Please Check errors and try again."
        );
        this.error_msg.type = "danger";
        this.error_msg.visible = true;
        return;
      }
    },
  },
  mounted() {
    document.title = this.$i18n.t("auth.Reset Password");
  },
};
</script>

