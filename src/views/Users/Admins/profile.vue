<template>
  <v-container fluid class="py-6">
    <v-snackbar
      top
      v-model="snackbar.visible"
      :color="snackbar.color"
      class="snackbar-shadow"
    >
      <div class="d-flex align-start alert-notify">
        <v-icon size="24" class="text-white mr-5">ni ni-bell-55 </v-icon>
        <p class="mb-0">
          <span class="font-size-root font-weight-600">{{
            snackbar.name
          }}</span>
          <br />
          {{ error_msg }}
        </p>
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          elevation="0"
          max-width="136"
          :ripple="false"
          height="43"
          class="font-weight-600 text-capitalize py-3 px-6 rounded-sm"
          color="rgba(255,255,255, .85)"
          @click="snackbar.visible = false"
          v-bind="attrs"
        >
          <v-icon size="13">fas fa-times</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col lg="3">
        <v-card class="card-shadow border-radius-xl position-sticky top-1">
          <div class="px-4 py-3">
            <v-list>
              <v-list-item-group class="border-radius-sm">
                <v-list-item class="px-2 border-radius-sm mb-1">
                  <v-list-item-content class="py-0">
                    <a href="#profile" class="text-decoration-none">
                      <div class="d-flex flex-column">
                        <span class="mb-1 text-body text-sm">Profile</span>
                      </div>
                    </a>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="px-2 border-radius-sm mb-1">
                  <v-avatar
                    size="32"
                    class="text-dark border-radius-lg px-2 py-2 me-2"
                  >
                    <svg
                      class="text-dark mb-1"
                      width="16px"
                      height="16px"
                      viewBox="0 0 40 44"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <title>document</title>
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          transform="translate(-1870.000000, -591.000000)"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(154.000000, 300.000000)">
                              <path
                                class="color-background"
                                d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                opacity="0.603585379"
                              ></path>
                              <path
                                class="color-background"
                                d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </v-avatar>
                  <v-list-item-content class="py-0">
                    <a href="#basic" class="text-decoration-none">
                      <div class="d-flex flex-column">
                        <span class="mb-1 text-body text-sm">{{
                          $t("Basic Info")
                        }}</span>
                      </div>
                    </a>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="px-2 border-radius-sm mb-1">
                  <v-avatar
                    size="32"
                    class="text-dark border-radius-lg px-2 py-2 me-2"
                  >
                    <svg
                      class="text-dark mb-1"
                      width="16px"
                      height="16px"
                      viewBox="0 0 42 42"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <title>box-3d-50</title>
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          transform="translate(-2319.000000, -291.000000)"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(603.000000, 0.000000)">
                              <path
                                class="color-background"
                                d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z"
                              ></path>
                              <path
                                class="color-background"
                                d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                opacity="0.7"
                              ></path>
                              <path
                                class="color-background"
                                d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                opacity="0.7"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </v-avatar>
                  <v-list-item-content class="py-0">
                    <a href="#change" class="text-decoration-none">
                      <div class="d-flex flex-column">
                        <span class="mb-1 text-body text-sm">{{
                          $t("change password")
                        }}</span>
                      </div>
                    </a>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-card>
      </v-col>
      <v-col lg="9">
        <v-card class="card-shadow px-4 py-4 overflow-hidden border-radius-xl">
          <v-row>
            <v-col cols="auto">
              <v-badge
                bottom
                color="bg-gradient-light accent-4 text-dark text-xxs border-radius-md shadow"
                offset-x="10"
                offset-y="10"
              >
                <v-avatar rounded width="74" height="74">
                  <img
                    v-if="saved_avatar_src"
                    :src="saved_avatar_src"
                    :lazy-src="saved_avatar_src"
                    alt="Avatar"
                    class="border-radius-lg"
                  />
                  <img
                    v-else
                    src="@/assets/img/no-avatar.jpg"
                    alt="Avatar"
                    class="border-radius-lg"
                  />
                  <span
                    @click="DeleteImage()"
                    v-if="saved_avatar_src"
                    class="
                      v-badge__badge
                      bg-gradient-light
                      accent-4
                      text-dark text-xxs
                      border-radius-md
                      shadow
                    "
                    style="
                      inset: calc(100% - 10px) auto auto calc(100% - 10px);
                      z-index: 9;
                      cursor: pointer;
                    "
                    ><i
                      aria-hidden="true"
                      class="
                        v-icon
                        notranslate
                        fa fa-times
                        text-xxs
                        theme--light
                      "
                    ></i
                  ></span>
                </v-avatar>
              </v-badge>
            </v-col>
            <v-col cols="auto" class="my-auto">
              <div class="h-100">
                <h5 class="mb-1 text-h5 text-typo font-weight-bold">
                  {{ user.name }}
                </h5>
                <p class="mb-0 font-weight-bold text-body text-sm">
                  {{ user.email }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="card-shadow border-radius-xl mt-6" id="basic">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("Basic Info") }}
            </h5>
          </div>
          <div class="px-6 pb-6 pt-0">
            <v-form ref="updateUserForm">
              <v-row>
                <v-col sm="2" cols="12" class="text-center">
                  <v-badge
                    bottom
                    color="bg-gradient-light accent-4 text-dark text-xxs border-radius-md shadow"
                    offset-x="10"
                    offset-y="10"
                    :icon="avatar_src ? '' : 'fa-plus text-xxs'"
                  >
                    <v-avatar rounded width="110" height="110">
                      <img
                        v-if="saved_avatar_src && avatar_src == ''"
                        :src="saved_avatar_src"
                        :lazy-src="saved_avatar_src"
                        alt="Avatar"
                        class="border-radius-lg"
                      />
                      <img
                        v-if="avatar_src"
                        :src="avatar_src"
                        :lazy-src="avatar_src"
                        alt="Avatar"
                        class="border-radius-lg"
                      />
                      <img
                        v-if="
                          (avatar_src == '' || avatar_src == null) &&
                          (saved_avatar_src == '' || saved_avatar_src == null)
                        "
                        src="@/assets/img/no-avatar.jpg"
                        alt="Avatar"
                        class="border-radius-lg"
                      />
                      <span
                        @click="removeImage()"
                        v-if="avatar_src"
                        class="
                          v-badge__badge
                          bg-gradient-light
                          accent-4
                          text-dark text-xxs
                          border-radius-md
                          shadow
                        "
                        style="
                          inset: calc(100% - 10px) auto auto calc(100% - 10px);
                          z-index: 9;
                          cursor: pointer;
                        "
                        ><i
                          aria-hidden="true"
                          class="
                            v-icon
                            notranslate
                            fa fa-times
                            text-xxs
                            theme--light
                          "
                        ></i
                      ></span>

                      <v-file-input
                        class="custom-avatar"
                        id="files"
                        ref="files"
                        accept="image/png, image/jpeg, image/bmp"
                        @change="handleFilesUpload"
                        v-model="files"
                      />
                    </v-avatar>
                  </v-badge>
                </v-col>

                <v-col sm="10" cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("auth.Full Name")
                  }}</label>
                  <v-text-field
                    v-model="form.name"
                    :rules="rules.name"
                    lazy-validation
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="eg. Michael"
                    class="font-size-input placeholder-lighter mt-2 mb-4"
                  >
                  </v-text-field>

                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("auth.Email Address")
                  }}</label>
                  <v-text-field
                    v-model="form.email"
                    :rules="rules.email"
                    lazy-validation
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="Eg. soft@dashboard.com"
                    class="font-size-input placeholder-lighter mt-2 mb-4"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <div class="d-sm-flex">
                <v-btn
                  color="#cb0c9f"
                  class="
                    font-weight-bolder
                    btn-default
                    bg-gradient-default
                    py-4
                    px-8
                    ms-auto
                    mt-sm-auto mt-4
                  "
                  small
                  @click="handleUpdate()"
                  :disabled="loadingInfo"
                >
                  <i
                    v-if="loadingInfo"
                    class="fas fa-circle-notch fa-spin mr-3"
                  ></i>
                  {{ $t("general.Update") }}
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-card>
        <v-card class="card-shadow border-radius-xl mt-6" id="change">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("change password") }}
            </h5>
          </div>
          <v-form ref="resetPasswordForm">
            <div class="px-6 pb-6 pt-0">
              <v-row>
                <v-col cols="12" class="pt-0">
                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("current password")
                  }}</label>
                  <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    @click:append="show3 = !show3"
                    v-model="passwords.current_password"
                    :rules="rules.current_password"
                    lazy-validation
                    :placeholder="$t('current password')"
                    color="rgba(0,0,0,.6)"
                    light
                    class="font-size-input placeholder-lighter mt-2 mb-4"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("New password")
                  }}</label>
                  <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    v-model="passwords.new_password"
                    :rules="rules.password"
                    lazy-validation
                    color="rgba(0,0,0,.6)"
                    light
                    :placeholder="$t('New password')"
                    class="font-size-input placeholder-lighter mt-2 mb-4"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("Confirm new password")
                  }}</label>
                  <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    v-model="passwords.password_confirmation"
                    :rules="rules.password_confirmation"
                    lazy-validation
                    color="rgba(0,0,0,.6)"
                    light
                    :placeholder="$t('auth.Repeat Password')"
                    class="font-size-input placeholder-lighter mt-2 mb-4"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <h5 class="mt-10 mb-2 text-h5 font-weight-bold text-typo">
                {{ $t("Password requirements") }}
              </h5>
              <p class="text-muted mb-2">
                {{ $t("Please follow this guide for a strong password") }}:
              </p>
              <div class="d-sm-flex">
                <ul class="text-muted ps-6 mb-0">
                  <li>
                    <span class="text-sm">{{
                      $t("One special characters")
                    }}</span>
                  </li>
                  <li>
                    <span class="text-sm">{{ $t("Min 6 characters") }}</span>
                  </li>
                  <li>
                    <span class="text-sm">{{
                      $t("One number (2 are recommended)")
                    }}</span>
                  </li>
                  <li>
                    <span class="text-sm">{{ $t("Change it often") }}</span>
                  </li>
                </ul>
                <v-btn
                  color="#cb0c9f"
                  @click="ResetPassword()"
                  class="
                    font-weight-bolder
                    btn-default
                    bg-gradient-default
                    py-4
                    px-8
                    ms-auto
                    mt-sm-auto mt-4
                  "
                  :disabled="loadingPassword"
                  small
                >
                  <i
                    v-if="loadingPassword"
                    class="fas fa-circle-notch fa-spin mr-3"
                  ></i>
                  {{ $t("change password") }}
                </v-btn>
              </div>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "UpdateUser",
  components: {},
  data() {
    return {
      snackbar: {
        color: "#f5365c",
        class: "danger",
        name: this.$i18n.t("Error"),
        visible: false,
      },
      switche: true,
      loadingStatus: false,
      confirm: false,
      show1: false,
      show2: false,
      show3: false,
      valid: false,
      roles: [],
      files: [],
      avatar_src: "",
      saved_avatar_src: "",
      user: {},
      form: {
        name: "",
        email: "",
      },

      passwords: {
        current_password: "",
        new_password: "",
        password_confirmation: "",
      },

      rules: {
        name: [
          (v) => !!v || this.$i18n.t("auth.Full name is required"),
          (v) =>
            v.length <= 20 ||
            this.$i18n.t("auth.Name must be less than 20 characters"),
        ],
        email: [
          (v) => !!v || this.$i18n.t("auth.E-mail is required"),
          (v) => /.+@.+/.test(v) || this.$i18n.t("auth.E-mail must be valid"),
        ],
        roles: [
          (v) => !!v || this.$i18n.t("auth.You must select one role at least"),
          (v) =>
            v.length > 0 ||
            this.$i18n.t("auth.You must select one role at least"),
        ],
        current_password: [
          (v) => !!v || this.$i18n.t("auth.current password is required"),
        ],
        password: [
          (v) => !!v || this.$i18nt("auth.Password is required"),
          (v) =>
            (v && v.length >= 6) ||
            this.$i18nt("auth.minimum 6 characters at least"),
        ],
        password_confirmation: [
          (v) => !!v || this.$i18nt("auth.Password Confirmation is required"),
          (v) =>
            v == this.passwords.new_password ||
            this.$i18nt(
              "auth.Password and password confirmation does not match"
            ),
        ],
      },
      errors: {},
      error_msg: "",
      loading: false,
      e1: 1,
      toggle_exclusive: 2,
      loadingInfo: false,
      loadingRoles: false,
      loadingPassword: false,
    };
  },
  methods: {
    validate() {
      return this.$refs.updateUserForm.validate();
    },
    passwordsvalidate() {
      return this.$refs.resetPasswordForm.validate();
    },

    getUser() {
      this.$http.get("/auth/me").then(
        (response) => {
          console.log(response);
          this.user = response.data.user;
          this.form = response.data.user;
          this.saved_avatar_src = response.data.user.avatar;
        },
        (error) => {
          // console.log(error);
        }
      );
    },

    handleUpdate() {
      this.error_msg = "";
      this.loadingInfo = true;
      const formData = new FormData();
      formData.append("avatar", this.files);
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      if (this.validate()) {
        axios({
          url: "users/update-me",
          data: formData,
          method: "POST",
        })
          .then((response) => {
            this.loadingInfo = false;
            this.user = response.data.user;
            this.form = response.data.user;
            this.saved_avatar_src = response.data.user.avatar;
            this.snackbar.color = "#2dce89";
            this.snackbar.class = "success";
            this.snackbar.name = "Success";
            this.snackbar.visible = true;
          })
          .catch((error) => {
            this.loadingInfo = false;
            if (error && error.response.status == 422) {
              let errors = Object.values(error.response.data.errors);
              this.errors = errors.flat();
            }
            this.error_msg =
              (error.response && error.response.data.message) ||
              error.message ||
              error.toString();
            this.snackbar.color = "#f5365c";
            this.snackbar.class = "error";
            this.snackbar.name = this.$i18n.t("Error");
            this.snackbar.visible = true;
          });
      } else {
        this.loading = false;
        this.error_msg = "Please Check errors and try again.";
        this.snackbar.color = "#f5365c";
        this.snackbar.class = "error";
        this.snackbar.name = this.$i18n.t("Error");
        this.snackbar.visible = true;
        return;
      }
    },

    handleFilesUpload() {
      this.files = event.target.files[0];
      this.avatar_src = URL.createObjectURL(event.target.files[0]);
    },

    removeImage() {
      this.files = [];
      this.avatar_src = "";
    },

    DeleteImage() {
      this.error_msg = "";
      if (this.validate()) {
        this.$swal({
          title: this.$i18n.t("Are you sure you want to delete profile image?"),
          text: this.$i18n.t("You won't be able to revert this!"),
          showCancelButton: true,
          confirmButtonText: this.$i18n.t("general.delete"),
          cancelButtonText: this.$i18n.t("Keep it"),
          customClass: {
            confirmButton: "btn bg-gradient-danger",
            cancelButton: "btn bg-gradient-success",
          },
          preConfirm: (remove) => {
            this.error_msg = "";
            axios({
              url: "users/delete/avatar/" + this.$route.params.id,
              method: "POST",
            })
              .then((response) => {
                this.avatar_src = "";
                this.saved_avatar_src = "";
                this.snackbar.color = "#2dce89";
                this.snackbar.class = "success";
                this.snackbar.name = "Success";
                this.snackbar.visible = true;
              })
              .catch((error) => {
                if (error && error.response.status == 422) {
                  let errors = Object.values(error.response.data.errors);
                  this.errors = errors.flat();
                }
                this.error_msg =
                  (error.response && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.snackbar.color = "#f5365c";
                this.snackbar.class = "error";
                this.snackbar.name = this.$i18n.t("Error");
                this.snackbar.visible = true;
              });
          },
        });
      } else {
        this.loading = false;
        this.error_msg = "Please Check errors and try again.";
        return;
      }
    },

    ResetPassword() {
      if (this.passwordsvalidate()) {
        this.$swal({
          title: this.$i18n.t(
            "Are you sure you want to reset this account password?"
          ),
          text: this.$i18n.t("You won't be able to revert this!"),
          showCancelButton: true,
          confirmButtonText: this.$i18n.t("Change"),
          cancelButtonText: this.$i18n.t("Cancel"),
          customClass: {
            confirmButton: "btn bg-gradient-danger",
            cancelButton: "btn bg-gradient-success",
          },
          preConfirm: (remove) => {
            this.error_msg = "";
            this.loadingPassword = true;

            axios({
              url: "users/change-passwored",
              data: this.passwords,
              method: "POST",
            })
              .then((response) => {
                this.error_msg = response.data.message;
                this.snackbar.color = "#2dce89";
                this.snackbar.class = "success";
                this.snackbar.name = "Success";
                this.snackbar.visible = true;
                this.loadingPassword = false;
              })
              .catch((error) => {
                this.loadingPassword = false;
                if (error && error.response.status == 422) {
                  let errors = Object.values(error.response.data.errors);
                  this.errors = errors.flat();
                }
                this.error_msg =
                  (error.response && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.snackbar.color = "#f5365c";
                this.snackbar.class = "error";
                this.snackbar.name = this.$i18n.t("Error");
                this.snackbar.visible = true;
              });
          },
        });
      } else {
        this.loadingPassword = false;
        this.error_msg = "Please Check errors and try again.";
        return;
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style>
.custom-avatar * {
  width: 100%;
  height: 100%;
}

.custom-avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 0;
  margin: 0;
  opacity: 0;
}

.custom-avatar .v-input__control {
  display: none !important;
}

.v-avatar {
  overflow: visible;
}
</style>