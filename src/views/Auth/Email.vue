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
            <h2 class="bg mb-0">{{ $t("auth.Email Address") }}</h2>
          </div>
        </div>

        <div class="login-body bg-body p-4">
          <div class="">
            <div class="row">
              <div class="col-lg-12 pt-0">
                <label class="form-label">{{ $t("auth.Email Address") }}</label>
                <v-text-field
                  :rules="rules.email"
                  type="email"
                  outlined
                  color="rgba(0,0,0,.6)"
                  :placeholder="$t('auth.Email Address')"
                  class="form-control"
                  v-model="form.email"
                >
                </v-text-field>
              </div>
              <div class="col-lg-12 pt-0">
                <div class="div_btn text-end">
                  <v-btn
                    elevation="0"
                    :ripple="false"
                    height="43"
                    class="btn px-5 py-1 btn-blue waves-effect waves-light"
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
          </div>
        </div>
      </div>
    </v-form>
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
        email: "",
      },
      rules: {
        email: [
          (v) => !!v || this.$i18n.t("auth.E-mail is required"),
          (v) => /.+@.+/.test(v) || this.$i18n.t("auth.E-mail must be valid"),
        ],
      },
      errors: {},
      error_msg: {
        visible: false,
        msg: null,
        type: null,
      },
      loading: false,
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
        return AuthService.reset_password(this.form).then(
          (response) => {
            console.log(response);
            console.log(response.data.url);
            this.loading = false;
            this.error_msg.msg = response.data.message;
            this.error_msg.type = "success";
            this.error_msg.visible = true;
            // this.$router.push({ path: response.data.url });
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
              this.error_msg.visible = true;
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
