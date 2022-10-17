<template>
  <v-card class="mt-sm-8 mt-md-5 mt-7 bg-transparent">
    <v-alert
      v-if="error_msg"
      :ripple="false"
      key="danger"
      close-icon="fas fa-times font-size-root text-white"
      :class="`alert alert-danger`"
      dismissible
      dark
    >
      <span>
        {{ error_msg }}
      </span>
    </v-alert>
    <div class="card-padding pb-0">
      <h3 class="text-h3 font-weight-bolder text-primary text-gradient mb-2">
        {{ $t("Login to your store") }}
      </h3>

      <p class="mb-0 text-body">
        {{ $t("Enter your email and password to login") }}
      </p>
    </div>
    <div class="card-padding pb-4">
      <v-form ref="loginForm" @submit="handleLogin">
        <label class="text-xs text-typo font-weight-bolder ms-1">{{
          $t("auth.Email Address")
        }}</label>

        <v-text-field
          v-model="form.email"
          :rules="rules.email"
          height="40"
          placeholder="Email"
        >
        </v-text-field>

        <label class="text-xs text-typo font-weight-bolder ms-1">{{
          $t("auth.Password")
        }}</label>
        <v-text-field
          v-model="form.password"
          :rules="rules.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          lazy-validation
          @click:append="show = !show"
          placeholder="Password"
        >
        </v-text-field>

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
      </v-form>
      <div class="text-center">
        <p class="text-sm text-body mt-3 mb-0">
          <!-- {{ $t("auth.forgot password ?") }} -->
          <router-link
            to="/reset_password"
            class="
              text-primary text-gradient text-decoration-none
              font-weight-bold
            "
            >{{ $t("auth.forgot password ?") }}</router-link
          >
        </p>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      show: false,
      form: {
        // email: "admin@admin.com",
        email: "",
        paswword: "",
      },
      rules: {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        password: [
          (v) => !!v || "Password is required",
          (v) => (v && v.length >= 6) || "minimum 6 characters",
        ],
      },
      errors: {},
      error_msg: "",
      loading: false,
    };
  },
  methods: {
    validate() {
      // this.valid=this.$refs.loginForm.validate();
      return this.$refs.loginForm.validate();
    },
    handleLogin(e) {
      e.preventDefault();
      this.error_msg = "";
      this.loading = true;
      if (this.validate()) {
        this.$store.dispatch("auth/login", this.form).then(
          () => {
            this.$router.push("/dashboard");
          },
          (error) => {
            this.loading = false;
            // console.log(error.response.data.message);
            this.error_msg =
              (error.response && error.response.data.message) || error.message;
            error.toString();
          }
        );
      } else {
        this.loading = false;
        this.error_msg = this.$i18n.t("auth.Please Check errors and try again");
        return;
      }
    },
  },
  mounted() {
    document.title = this.$i18n.t("auth.login");
  },
};
</script>
