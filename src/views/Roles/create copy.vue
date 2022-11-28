<template>
  <div>
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
    <v-container fluid class="px-6 py-6">
      <v-row>
        <v-col cols="12" class="text-center">
          <h3 class="text-h3 text-typo font-weight-bold mt-9">
            {{ $t("role.Build Your System Roles") }}
          </h3>
          <!-- <h5 class="text-h5 text-secondary font-weight-normal">
            {{ $t("role.Roles allow you to group system permissions") }}
          </h5> -->
        </v-col>
        <v-stepper
          alt-labels
          elevation="0"
          v-model="e1"
          class="bg-transparent overflow-visible w-100 mx-auto"
        >
          <v-row>
            <v-col lg="8" cols="12" class="mx-auto mt-9">
              <v-stepper-header class="shadow-0">
                <v-stepper-step step="1" color="#344767">
                  <span
                    class="
                      text-secondary
                      font-weight-normal
                      d-block
                      text-center
                    "
                    style="width: max-content"
                    >{{ $t("role.Role info") }}</span
                  >
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2" color="#344767">
                  <span
                    class="
                      text-secondary
                      font-weight-normal
                      d-block
                      text-center
                    "
                    style="width: max-content"
                    >{{ $t("permissions.Permissions") }}</span
                  >
                </v-stepper-step>
              </v-stepper-header>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="8" cols="12" class="mx-auto">
              <div v-if="errors" class="alert alert-danger">
                <ul class="alert alert-danger">
                  <li v-for="(value, key, index) in errors" :key="index">
                    {{ value.toString() }}
                  </li>
                </ul>
              </div>

              <v-form ref="newRoleForm">
                <v-stepper-items
                  class="border-radius-xl overflow-hidden shadow-lg mt-5 mb-9"
                >
                  <v-stepper-content
                    step="1"
                    class="bg-white border-radius-xl px-4 pt-4"
                  >
                    <v-card>
                      <div>
                        <v-row class="text-center">
                          <v-col cols="10" class="mx-auto">
                            <h5
                              class="text-h5 text-typo font-weight-normal mb-2"
                            >
                              {{ $t("role.Role info") }}
                            </h5>
                            <!-- <p class="text-body">
                              {{ $t("role.Enter Role name") }}
                            </p> -->
                          </v-col>
                        </v-row>
                        <v-row class="mt-2">
                          <v-col sm="12" cols="12">
                            <label
                              class="text-xs text-typo font-weight-bolder ms-1"
                              >{{ $t("Name") }}</label
                            >
                            <v-text-field
                              v-model="form.name"
                              :rules="rules.name"
                              lazy-validation
                              color="rgba(0,0,0,.6)"
                              light
                              placeholder="Ex. Admin, Guest..."
                              class="
                                font-size-input
                                placeholder-lighter
                                mt-2
                                mb-4
                              "
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                      <div class="text-end">
                        <v-btn
                          :ripple="false"
                          :elevation="0"
                          class="
                            font-weight-bold
                            text-xs
                            btn-default
                            bg-gradient-default
                            py-5
                            px-6
                            mt-2
                            mb-2
                            me-2
                          "
                          color="primary"
                          @click="e1 = 2"
                        >
                          {{ $t("general.Next") }}
                        </v-btn>
                      </div>
                    </v-card>
                  </v-stepper-content>

                  <v-stepper-content
                    step="2"
                    class="bg-white border-radius-xl px-4 pt-4"
                  >
                    <v-card>
                      <div>
                        <v-row class="text-center">
                          <v-col cols="10" class="mx-auto">
                            <h5
                              class="text-h5 text-typo font-weight-normal mb-2"
                            >
                              {{ $t("permissions.Permissions") }}
                            </h5>
                            <p class="text-body">
                              {{ $t("permissions.Choose role permissions") }}
                            </p>
                          </v-col>
                        </v-row>

                        <v-row class="mt-2">
                          <v-col sm="12" cols="12">
                            <label
                              class="text-xs text-typo font-weight-bolder ms-1"
                              >{{ $t("permissions.Permissions") }}</label
                            >
                            <v-autocomplete
                              v-model="form.permissions"
                              :items="permissions"
                              :item-text="'permission_lang'"
                              :item-value="'id'"
                              :placeholder="
                                $t('permissions.Choose one or more permission')
                              "
                              multiple
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </div>
                      <div class="d-flex mt-10">
                        <v-btn
                          :ripple="false"
                          :elevation="0"
                          class="
                            font-weight-bold
                            text-xs text-dark
                            btn-light
                            bg-gradient-light
                            py-5
                            px-6
                            mt-6
                            mb-2
                            ms-2
                          "
                          @click="e1 = 1"
                        >
                          {{ $t("general.Prev") }}
                        </v-btn>
                        <v-btn
                          :ripple="false"
                          :elevation="0"
                          class="
                            font-weight-bold
                            text-xs
                            btn-default
                            bg-gradient-default
                            py-5
                            px-6
                            mt-6
                            mb-2
                            me-2
                            ms-auto
                          "
                          color="primary"
                          @click="handleSubmit()"
                        >
                          {{ $t("general.Submit") }}
                          <i v-if="loading" class="fa fa-circle-o-notch"></i>
                        </v-btn>
                      </div>
                    </v-card>
                  </v-stepper-content>
                </v-stepper-items>
              </v-form>
            </v-col>
          </v-row>
        </v-stepper>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Wizard",
  data() {
    return {
      permissions: [],
      valid: false,
      snackbar: {
        color: "#f5365c",
        class: "danger",
        name: "Danger",
        visible: false,
      },
      form: {
        name: "",
        permissions: null,
      },
      rules: {
        name: [(v) => !!v || this.$i18n.t("auth.Full Name is required")],
      },
      errors: {},
      error_msg: "",
      loading: false,
      e1: 1,
    };
  },
  methods: {
    validate() {
      return this.$refs.newRoleForm.validate();
    },
    getPermissions() {
      this.$http.get("/permissions").then(
        (response) => {
          this.permissions = response.data.data;
        },
        (error) => {
          // console.log(error);
        }
      );
    },
    async handleSubmit() {
      this.error_msg = "";
      this.loading = true;
      if (this.validate()) {
        await axios
          .post("roles/create", this.form)
          .then((response) => {
            this.error_msg = response.data.message;
            // this.snackbar.color = "#2dce89";
            // this.snackbar.class = "success";
            // this.snackbar.name = "Success";
            // this.snackbar.visible = true;
            this.$router.push({
              path: "/roles",
              params: { message: this.error_msg },
            });
          })
          .catch((error) => {
            this.loading = false;
            if (error && error.response.status == 422) {
              this.errors = error.response.data.errors;
              this.error_msg = "Please Check errors before submit";
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
        this.error_msg = "Please Check errors before submit";
        this.snackbar.color = "#f5365c";
        this.snackbar.class = "error";
        this.snackbar.name = this.$i18n.t("Error");
        this.snackbar.visible = true;
      }
    },
  },
  mounted() {
    this.getPermissions();
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