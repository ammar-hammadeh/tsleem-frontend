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
      <v-col cols="6">
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
                    :src="$baseURL + 'storage/users/' + saved_avatar_src"
                    :lazy-src="$baseURL + 'storage/users/' + saved_avatar_src"
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
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6">
        <v-card class="card-shadow border-radius-xl mt-6" id="basic">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("Basic Info") }}
            </h5>
          </div>
          <div class="px-6 pb-6 pt-0">
            <v-form ref="updateUserForm">
              <v-row>
                <v-col cols="12">
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

                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("phone")
                  }}</label>
                  <v-text-field
                    v-model="form.phone"
                    :rules="rules.phone"
                    lazy-validation
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="9662136547"
                    class="font-size-input placeholder-lighter mt-2 mb-4"
                  >
                  </v-text-field>

                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("signer")
                  }}</label>
                  <v-file-input
                    class="font-size-input placeholder-lighter mt-2 mb-4"
                    color="rgba(0,0,0,.6)"
                    light
                    lazy-validation
                    show-size
                    counter
                    v-model="form.signature"
                    chips
                  ></v-file-input>
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
      </v-col>
      <v-col lg="6">
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
    <v-row class="flex-column"> </v-row>
    <!-- </v-col>
    </v-row> -->
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
        signature: null,
        phone: "",
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
          (v) => !!v || this.$i18n.t("Full name is required"),
          (v) =>
            v.length <= 20 ||
            this.$i18n.t("Name must be less than 20 characters"),
        ],
        phone: [(v) => !!v || this.$i18n.t("phone is required")],
        email: [
          (v) => !!v || this.$i18n.t("E-mail is required"),
          (v) => /.+@.+/.test(v) || this.$i18n.t("E-mail must be valid"),
        ],
        roles: [
          (v) => !!v || this.$i18n.t("You must select one role at least"),
          (v) =>
            v.length > 0 || this.$i18n.t("You must select one role at least"),
        ],
        current_password: [
          (v) => !!v || this.$i18n.t("current password is required"),
        ],
        password: [
          (v) => !!v || this.$i18n.t("Password is required"),
          (v) => (v && v.length >= 6) || "minimum 6 characters at least",
        ],
        password_confirmation: [
          (v) => !!v || this.$i18n.t("Password Confirmation is required"),
          (v) =>
            v == this.passwords.new_password ||
            this.$i18n.t("Password and password confirmation does not match"),
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
          this.form.signature = null;
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
      formData.append("signature", this.form.signature);
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("phone", this.form.phone);
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
            this.form.signature = null;
            this.saved_avatar_src = response.data.user.avatar;
            this.error_msg = response.data.message;
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
            // this.error_msg = "";
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
        this.error_msg = this.$i18n.t("Please Check errors and try again");
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