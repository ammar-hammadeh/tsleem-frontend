<template>
  <div>
    <Notify :details="error_msg"></Notify>
    <v-form ref="loginForm" @submit="handleLogin" class="mt-4 pt-2">
      <div class="login">
        <div class="login-header pa-4">
          <div class="mb-0">
            <a href="#" class="d-block auth-logo">
              <img src="@/assets/img/logo2.png" alt="" width="100px" />
              <span class="logo-txt"></span>
            </a>
          </div>
          <div class="text-center mb-1">
            <h2 class="bg mb-0">{{ $t("auth.login") }}</h2>
          </div>
        </div>

        <div class="login-body bg-body p-4">
          <div class="">
            <label class="form-label">{{ $t("auth.Email Address") }}</label>
            <v-text-field
              class="form-control"
              outlined
              v-model="form.email"
              :rules="rules.email"
              height="40"
              type="email"
              :placeholder="$t('auth.Email Address')"
            >
            </v-text-field>
          </div>
          <div class="">
            <label class="form-label">{{ $t("auth.Password") }}</label>
            <div class="input-group auth-pass-inputgroup">
              <v-text-field
                class="form-control"
                outlined
                v-model="form.password"
                :rules="rules.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                lazy-validation
                @click:append="show = !show"
                :placeholder="$t('auth.Password')"
              >
              </v-text-field>
            </div>
          </div>
          <!-- <div class="mb-2">
            <div class="form-check ms-3">
              <v-checkbox
                class="mt-0"
                v-model="form.remember_me"
                color="#0A2373"
                :label="$t('remember_me')"
              ></v-checkbox>
            </div>
          </div> -->
          <div class="mb-2">
            <router-link
              to="/reset_password"
              class="login-link"
              style="color: #000"
            >
              <p>{{ $t("auth.forgot password ?") }}</p>
            </router-link>
          </div>
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
              {{ $t("auth.login") }}
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
              to="/register"
              class="btn px-2 py-1 btn-secondary shadow-none"
              >{{ $t("NewUser") }}</router-link
            >
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>
<script>
import Notify from "../Components/NewNotify.vue";
import { mapState } from "vuex";
import {getRedirectionFromStorageAndRemove} from "@/util/helpers/LoginRedirectionHelpers/LoginRedirectionHelpers";
export default {
  components: {
    Notify,
  },
  data() {
    return {
      valid: false,
      show: false,
      form: {
        email: "",
        paswword: "",
        remember_me: true,
      },
      rules: {
        email: [(v) => !!v || this.$i18n.t("auth.E-mail is required")],
        password: [
          (v) => !!v || this.$i18n.t("auth.Password is required"),
          (v) =>
            (v && v.length >= 6) || this.$i18n.t("auth.minimum 6 characters"),
        ],
      },
      errors: {},
      error_msg: {},
      loading: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    validate() {
      // this.valid=this.$refs.loginForm.validate();
      return this.$refs.loginForm.validate();
    },
    handleLogin(e) {
      e.preventDefault();
      this.error_msg = {};
      this.loading = true;
      if (this.validate()) {
        this.$store.dispatch("auth/login", this.form).then(
          () => {
            this.loading = false;
            if (this.$store.state.auth.user.status == "disabled") {
              this.error_msg = {
                msg: this.$i18n.t("account is pending"),
                type: "Danger",
              };
              this.$store
                .dispatch("auth/logout")
                .then((response) => {
                  console.log(response);
                })
                .catch((err) => console.log(err));
            } else if (this.$store.state.auth.user.status == "review") {
              this.error_msg = {
                msg: this.$i18n.t("review account"),
                type: "Danger",
              };
              this.$store
                .dispatch("auth/logout")
                .then((response) => {
                  console.log(response);
                })
                .catch((err) => console.log(err));
            } else {


              let goTo = '';
              if (this.user.signature == null) {
                goTo = "/profile";
              } else {
                goTo = "/dashboard";
              }

              const redirectTo = getRedirectionFromStorageAndRemove();
              this.$router.push(redirectTo ?? goTo);
            }

            // console.log(document.referrer)
            // if (document.referrer == "" && document.referrer == "") {
            // } else {
            //   this.$router.go(-1);
            // }
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
            // this.$store.commit("form/SET_NOTIFY", {
            //   msg: this.error_msg,
            //   type: "Danger",
            // });
          }
        );
      } else {
        this.loading = false;
        this.error_msg = {
          msg: this.$i18n.t("auth.Please Check errors and try again"),
          type: "Danger",
        };
        // this.$store.commit("form/SET_NOTIFY", {
        //   msg: this.error_msg,
        // });
        return;
      }
    },
  },
  mounted() {
    document.title = this.$i18n.t("auth.login");
  },
};
</script>
<style>
/* button, */
/* h1,
h2,
h3,
h4,
h5,
h6,
a,
input,
label,
input::placeholder,
p {
  font-family: Poppins !important;
  font-weight: normal;
} */
</style>
