<template>
  <v-container fluid class="py-6">
    <v-snackbar
      top
      v-model="snackbar.visible"
      :color="snackbar.color"
      class="snackbar-shadow"
    >
      <div class="d-flex align-start alert-notify">
        <v-icon size="24" class="text-white ml-5">ni ni-bell-55 </v-icon>
        <p class="mb-0">
          <span class="font-size-root font-weight-600">{{
            snackbar.name
          }}</span>
          <br />
          {{ result_msg }}
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
      <v-col sm="6" cols="12">
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
                  {{ data_user.name }}
                </h5>
                <p class="mb-0 font-weight-bold text-body text-sm">
                  {{ data_user.email }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col sm="6" cols="12">
        <v-card class="card-shadow px-4 py-4 overflow-hidden border-radius-xl">
          <v-row>
            <v-col cols="auto">
              <v-avatar rounded width="74" height="74">
                <img
                  v-if="saved_avatar_signature && signature_src == ''"
                  :src="saved_avatar_signature"
                  :lazy-src="saved_avatar_signature"
                  alt="Avatar"
                  class="border-radius-lg"
                />
                <img
                  v-else-if="signature_src"
                  :src="signature_src"
                  :lazy-src="signature_src"
                  alt="Avatar"
                  class="border-radius-lg"
                />
                <img
                  v-else
                  src="@/assets/img/signature.png"
                  alt="signature"
                  class="border-radius-lg"
                />
              </v-avatar>
            </v-col>
            <v-col cols="auto" class="my-auto">
              <div class="h-100">
                <h5 class="mb-1 text-h5 text-typo font-weight-bold">
                  {{ $t("signature") }}
                </h5>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card class="card-shadow border-radius-xl mt-6" id="basic">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("Basic Info") }}
            </h5>
          </div>
          <div class="px-6 pb-6 pt-0">
            <v-form ref="updateUserForm">
              <v-row>
                <v-col
                  cols="12"
                  :key="'col-' + ind"
                  v-for="(item, ind) in form_basic"
                  v-if="item.hasOwnProperty('visible') ? item.visible : true"
                >
                  <Input :item="item"></Input>
                </v-col>
              </v-row>
              <div class="d-sm-flex">
                <v-btn
                  color="#fff"
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
        <v-card class="card-shadow border-radius-xl mt-6">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("file user") }}
            </h5>
          </div>
          <div v-if="file_user.length > 0" class="px-6 pb-6">
            <card-profile :data="file_user"></card-profile>
          </div>
        </v-card>
        <v-card class="card-shadow border-radius-xl mt-6">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("drawe signature") }}
            </h5>
          </div>
          <div class="px-6 pb-6 pt-0">
            <v-row>
              <v-col cols="12">
                <div>
                  <!-- <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("drawe signature")
                  }}</label> -->

                  <VueSignaturePad
                    id="signature"
                    width="100%"
                    height="500px"
                    ref="signaturePad"
                    :options="options"
                  />

                  <div class="buttons text-left my-5">
                    <v-btn
                      class="bg-gradient-blue text-white ml-3"
                      @click="undo"
                      >{{ $t("form.Undo") }}</v-btn
                    >
                    <v-btn
                      class="bg-gradient-blue text-white"
                      @click.prevent="save_signature"
                      :loading="loader_signature"
                    >
                      <span slot="loader">
                        <v-progress-circular
                          style="width: 20px; height: 20px"
                          indeterminate
                          color="white"
                        ></v-progress-circular> </span
                      >{{ $t("form.save") }}</v-btn
                    >
                  </div>
                  <!-- <img
                    v-if="signature_src"
                    :src="signature_src"
                    :lazy-src="signature_src"
                    alt="Avatar"
                    class="border-radius-lg"
                  /> -->
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card class="card-shadow border-radius-xl mt-6" v-if="type.code && !hidden_type_company.includes(type.code)">
        <!-- <v-card class="card-shadow border-radius-xl mt-6" > -->
          <Loading v-if="loading_company"></Loading>
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("Company information") }}
            </h5>
          </div>
          <div class="px-6 pb-6 pt-0">
            <v-form ref="updateCompanyForm">
              <v-row>
                <v-col
                  :cols="item.col ? item.col : 6"
                  :key="'col-' + ind"
                  v-for="(item, ind) in form_company"
                  v-if="item.hasOwnProperty('visible') ? item.visible : true"
                >
                  <Input :item="item"></Input>
                </v-col>
              </v-row>
              <div class="d-sm-flex">
                <v-btn
                  color="#fff"
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
                  @click="handleUpdateCompany()"
                  :disabled="loadingCompInfo"
                >
                  <i
                    v-if="loadingCompInfo"
                    class="fas fa-circle-notch fa-spin mr-3"
                  ></i>
                  {{ $t("general.Update") }}
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-card>
   
        <v-card class="card-shadow border-radius-xl mt-6" v-if="type.code && !hidden_type_company.includes(type.code)">
        <!-- <v-card class="card-shadow border-radius-xl mt-6" > -->
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("file Company") }}
            </h5>
          </div>
          <div v-if="file_company.length > 0" class="px-6 pb-6">
            <card-profile :data="file_company"></card-profile>
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
    <v-row class="flex-column"> </v-row>
    <!-- </v-col>
    </v-row> -->
  </v-container>
</template>
<script>
import Input from "./Components/Input.vue";
import CardProfile from "./Components/CardProfile.vue";
import Loading from "./Components/Loading.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "UpdateUser",
  components: { Input , CardProfile ,Loading},
  data() {
    return {
      loader_signature: false,
      loading_company:false,
      file_company: [],
      file_user:[],
      form_basic:[
      {
          value_text: "name",
          visible: true,
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          label: this.$i18n.t("auth.Full Name"),
          items: [],
        },
        {
          value_text: "email",
          visible: true,
          value: "",
          error: null,
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              (v &&
              /^(([a-zA-Z\-0-9]+(\.[a-zA-Z\-0-9]+[^<>()\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
                  v
                )) ||
              this.$i18n.t("auth.E-mail must be valid"),
        ],
          label: this.$i18n.t("auth.Email Address"),
          items: [],
        },
        {
          value_text: "phone",
          visible: true,
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required"),
          (v) =>
              /^(5)\d*$/.test(v) || this.$i18n.t("have to start number 5"),
            (v) => (v && v.length == 9) || this.$i18n.t("equal 9 characters"),],
          label: this.$i18n.t("phone"),
          items: [],
        },
      {
          req_val: ["consulting_office", "design_office", "contractor"],
          value_text: "city_id",
          visible: false,
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          label: this.$i18n.t("city"),
          type: "select",
          items: [],
        },
        {
          visible: true,
          error: null,
          value: "",
          req_val: ["contractor", "design_office"],
          label: this.$i18n.t("Specialties"),
          value_text: "category_id",
          type: "select",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      form_company: [
        {
          visible: false,
          error: null,
          value: "",
          req_val: ["raft_office"],
          placeholder: this.$i18n.t("office name"),
          label: this.$i18n.t("office name"),
          value_text: "company_name",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          value_text: "company_name",
          visible: false,
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          req_val: [
            "service_provider",
            "consulting_office",
            "design_office",
            "contractor",
            "raft_company",
          ],
          placeholder: this.$i18n.t("Company Name"),
          label: this.$i18n.t("Company Name"),
        },
        {
          value_text: "owner_name",
          visible: false,
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          req_val: [
            "service_provider",
            "consulting_office",
            "design_office",
            "contractor",
          ],
          placeholder: this.$i18n.t("PossName"),
          label: this.$i18n.t("PossName"),
        },
        {
          value_text: "commercial",
          visible: false,
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required"),
          (v) => (v && v.length == 10) || this.$i18n.t("equal 10 characters"),],
          req_val: [
            "service_provider",
            "consulting_office",
            "design_office",
            "contractor",
          ],
          type: "number",
          placeholder: this.$i18n.t("Commercial Register num"),
          label: this.$i18n.t("Commercial Register num"),
        },
        {
          value_text: "owner_hardcopyid",
          visible: false,
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required"),
          (v) => /^(1)\d*$/.test(v) || this.$i18n.t("have to start number 1"),
            (v) => (v && v.length == 10) || this.$i18n.t("equal 10 characters"),],
          req_val: [
            "service_provider",
            "consulting_office",
            "design_office",
            "contractor",
          ],
          placeholder: this.$i18n.t("ID No"),
          label: this.$i18n.t("ID No"),
          type: "number",
        },
        {
          value_text: "license",
          visible: false,
          value: "",
          error: null,
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          req_val: ["raft_office"],
          type: "number",
          placeholder: this.$i18n.t("Unified number"),
          label: this.$i18n.t("Unified number"),
        },
        {
          col:12,
          visible: false,
          error: null,
          type: "number",
          value: "",
          req_val: ["service_provider"],
          label: this.$i18n.t("license"),
          placeholder: this.$i18n.t("license"),
          value_text: "license",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          req_val: ["raft_company"],
          visible: false,
          error: null,
          value: "",
          placeholder: this.$i18n.t("prefix"),
          label: this.$i18n.t("prefix"),
          value_text: "prefix",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col:12,
          req_val: ["raft_company"],
          visible: false,
          error: null,
          value: "",
          type: "number",
          placeholder: this.$i18n.t("kroky"),
          label: this.$i18n.t("kroky"),
          value_text: "kroky",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
            visible: true,
            error: null,
            value: null,
            req_val: [
              "service_provider",
              "consulting_office",
              "design_office",
              "contractor",
            ],
            type: "file",
            label: this.$i18n.t("Commercial Register") + this.$i18n.t("(PDF)"),
            value_text: "commercial_file",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          {
            value: "",
            type: "date",
            visible: true,
            error: null,
            req_val: [
              "service_provider",
              "consulting_office",
              "design_office",
              "contractor",
            ],
            label: this.$i18n.t("Commercial Register Expire"),
            value_text: "commercial_expiration",
            rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          },
  
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office", "design_office", "contractor"],
            label:
              this.$i18n.t("My rating certificate") + " " + this.$i18n.t("(PDF)"),
            value_text: "classification_file",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          {
            value: "",
            type: "date",
            visible: true,
            error: null,
            req_val: ["consulting_office", "design_office", "contractor"],
            label: this.$i18n.t("expire_date"),
            value_text: "classification_expire",
          },
  
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office", "design_office", "contractor"],
            label:
              this.$i18n.t("Profession practice certificate") +
              " " +
              this.$i18n.t("(PDF)"),
            value_text: "practice_file",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          {
            value: "",
            type: "date",
            visible: true,
            error: null,
            req_val: ["consulting_office", "design_office", "contractor"],
            label: this.$i18n.t("expire_date"),
            value_text: "practice_expire",
          },
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office", "design_office", "contractor"],
            label: this.$i18n.t("business license") + " " + this.$i18n.t("(PDF)"),
            value_text: "business_file",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          {
            value: "",
            type: "date",
            visible: true,
            error: null,
            req_val: ["consulting_office", "design_office", "contractor"],
            label: this.$i18n.t("expire_date"),
            value_text: "business_expire",
          },
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office", "design_office", "contractor"],
            label: this.$i18n.t("National address") + " " + this.$i18n.t("(PDF)"),
            value_text: "national_file",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          {
            type: "file",
            visible: true,
            error: null,
            value: null,
            req_val: [
              "service_provider",
              "consulting_office",
              "design_office",
              "contractor",
            ],
            label: this.$i18n.t("Owner ID photo") + " " + this.$i18n.t("(PDF)"),
            value_text: "ownerid_file",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          // رخصة التأمينات الاجتماعية
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office"],
            label:
              this.$i18n.t("Social Security License") +
              " " +
              this.$i18n.t("(PDF)"),
            value_text: "social_security",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          {
            value: "",
            type: "date",
            visible: true,
            error: null,
            req_val: ["consulting_office"],
            label: this.$i18n.t("expire_date"),
            value_text: "social_security_expire",
          },
          // رخصة الزكاة والدخل
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office"],
            label:
              this.$i18n.t("Zakat and Income License") +
              " " +
              this.$i18n.t("(PDF)"),
            value_text: "zakat_income",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          {
            value: "",
            type: "date",
            visible: true,
            error: null,
            req_val: ["consulting_office"],
            label: this.$i18n.t("expire_date"),
            value_text: "zakat_income_expire",
          },
          // شهادة السعودة
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office"],
            label:
              this.$i18n.t("Saudization certificate") +
              " " +
              this.$i18n.t("(PDF)"),
            value_text: "saudization",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          {
            value: "",
            type: "date",
            visible: true,
            error: null,
            req_val: ["consulting_office"],
            label: this.$i18n.t("expire_date"),
            value_text: "saudization_expire",
          },
          // شهادة الغرفة التجارية
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office"],
            label:
              this.$i18n.t("Chamber of Commerce certificate") +
              " " +
              this.$i18n.t("(PDF)"),
            value_text: "chamber_commerce",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          {
            value: "",
            type: "date",
            visible: true,
            error: null,
            req_val: ["consulting_office"],
            label: this.$i18n.t("expire_date"),
            value_text: "chamber_commerce_expire",
          },
          // شهادة تسجيل الضريبة
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office"],
            label:
              this.$i18n.t("Tax registration certificate") +
              " " +
              this.$i18n.t("(PDF)"),
            value_text: "tax_registration",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          // شهادة حماية الأجور
          {
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office"],
            label:
              this.$i18n.t("Wage Protection Certificate") +
              " " +
              this.$i18n.t("(PDF)"),
            value_text: "wage_protection",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          // عقد التأسيس
          {
            col:12,
            visible: true,
            error: null,
            type: "file",
            value: null,
            req_val: ["consulting_office"],
            label:
              this.$i18n.t("Memorandum of Association") +
              " " +
              this.$i18n.t("(PDF)"),
            value_text: "memorandum_association",
            accept: ".pdf",
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
          },
          
          {
            req_val: ["service_provider"],
            error:null,
            type: "file",
            value: null,
            label: this.$i18n.t("seasonal_license") + " " + this.$i18n.t("(PDF)"),
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
            accept: ".pdf",
            value_text: "seasonal_license",
          },
          {
            req_val: ["service_provider"],
            error:null,
            type: "file",
            value: null,
            label: this.$i18n.t("delegateid") + " " + this.$i18n.t("(PDF)"),
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
            accept: ".pdf",
            value_text: "delegateid",
          },
          {
            req_val: ["service_provider"],
            error:null,
            type: "file",
            value: null,
            label: this.$i18n.t("delegation") + " " + this.$i18n.t("(PDF)"),
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
            accept: ".pdf",
            value_text: "delegation",
          },
          {
            req_val: ["service_provider"],
            error:null,
            type: "file",
            value: null,
            label: this.$i18n.t("hajj_license") + " " + this.$i18n.t("(PDF)"),
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
            accept: ".pdf",
            value_text: "hajj_license",
          },
          {
            value: "",
            type: "date",
            visible: true,
            error: null,
            req_val: ["service_provider"],
            label: this.$i18n.t("expire_date"),
            value_text: "hajj_license_expire",
          },
          {
            req_val: ["service_provider"],
            error:null,
            type: "file",
            value: null,
            label: this.$i18n.t("assign_file") + " " + this.$i18n.t("(PDF)"),
            rules: [
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
            accept: ".pdf",
            value_text: "assign_file",
          },
        ],
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
      saved_avatar_signature: "",
      signature_src: "",
      data_user: {},
      options: {
        penColor: "#333",
      },
      form: {
        signature: null,
        phone: "",
        name: "",
        email: "",
      },
      loadingCompInfo: false,
      passwords: {
        current_password: "",
        new_password: "",
        password_confirmation: "",
      },

      rules: {
        current_password: [
          (v) => !!v || this.$i18n.t("auth.current password is required"),
        ],
        password: [
          (v) => !!v || this.$i18n.t("auth.Password is required"),
          (v) =>
            (v && v.length >= 6) ||
            this.$i18n.t("auth.minimum 6 characters at least"),
        ],
        password_confirmation: [
          (v) => !!v || this.$i18n.t("auth.Password Confirmation is required"),
          (v) =>
            v == this.passwords.new_password ||
            this.$i18n.t("Password and password confirmation does not match"),
        ],
      },
      errors: {},
      result_msg: "",
      loading: false,
      e1: 1,
      toggle_exclusive: 2,
      loadingInfo: false,
      loadingRoles: false,
      loadingPassword: false,
      hidden_type_company:[
        'sharer',
        'maintenance',
        'delivery',
        'kdana',
        'admin',
      ]
    };
  },
  computed:{
    ...mapState('auth',['type','user'])
  },
  methods: {
    handleUpdateCompany() {
      this.loadingCompInfo = true;
      if (this.validateCompany()) {
        const formData = new FormData();
        this.form_company.map(function (item) {
          if (item.value != undefined && item.value != "") {
            if (
              (item.type == "select" && item.type_select == "multiple") ||
              (item.type == "autocomplete" && item.type_select == "multiple")
            ) {
              var value = item.value;
              for (var i = 0; i < value.length; i++) {
                const val = value[i];
                formData.append(`${item.value_text}[ ${i} ]`, val);
              }
            } else {
              formData.append(item.value_text, item.value);
            }
          }
          
        });
       
        axios({
          url: "general/companies/update",
          data: formData,
          method: "POST",
        })
          .then((response) => {
            this.loadingCompInfo = false;
            this.getUser()
            this.result_msg = response.data.message;
            this.snackbar.color = "#2dce89";
            this.snackbar.class = "success";
            this.snackbar.name = this.$i18n.t("Success");
            this.snackbar.visible = true;
          })
          .catch((error) => {
            this.loadingCompInfo = false;
            if (error && error.response.status == 422) {
              var errors = error.response.data.errors;
              for (let i = 0; i < this.form_stepper.length; i++) {
                const element = this.form_stepper[i];
                if (errors[element.value_text] != undefined) {
                  // alert(2);
                  // if (element.value_text == "password") {
                  //   alert(1);
                  //   element.error = errors.password.toString();
                  // } else
                  element.error = errors[element.value_text].toString();
                  // console.log(errors[element.error]);
                }
              }
              this.result_msg = this.$i18n.t(
                "Please Check errors before submit"
              );
            } else {
              this.result_msg =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            }
            this.snackbar.color = "#f5365c";
            this.snackbar.class = "danger";
            this.snackbar.name = this.$i18n.t("Error");
            this.snackbar.visible = true;
          });
      } else {
        this.loadingCompInfo = false;
        this.result_msg = this.$i18n.t("Please Check errors before submit");
        this.snackbar.color = "#f5365c";
        this.snackbar.class = "danger";
        this.snackbar.name = this.$i18n.t("Error");
        this.snackbar.visible = true;
        return;
      }
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    ...mapMutations('auth',['setSigneture']),
    save_signature() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      // console.log(isEmpty);
      // console.log(data);
      if (isEmpty) {
        this.result_msg = this.$i18n.t("please drawe signature");
        this.snackbar.color = "#f5365c";
        this.snackbar.class = "error";
        this.snackbar.name = this.$i18n.t("Error");
        this.snackbar.visible = true;
        return;
      }
      this.signature_src = data;
      const formData = new FormData();
      formData.append("change_signature", true);
      formData.append("signature", data);
      // formData.append("signature", realData);
      this.loader_signature = true;
      axios({
        url: "users/update-me",
        data: formData,
        method: "POST",
      })
        .then((response) => {
          this.loader_signature = false;
          this.result_msg = response.data.message;
          this.setSigneture(response.data.signeture) 
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.snackbar.color = "#2dce89";
          this.snackbar.class = "success";
          this.snackbar.name = this.$i18n.t("Success");
          this.snackbar.visible = true;
        })
        .catch((error) => {
          this.loader_signature = false;
          if (error && error.response.status == 422) {
            let errors = Object.values(error.response.data.errors);
            this.errors = errors.flat();
          }
          this.result_msg =
            (error.response && error.response.data.message) ||
            error.message ||
            error.toString();
          this.snackbar.color = "#f5365c";
          this.snackbar.class = "error";
          this.snackbar.name = this.$i18n.t("Error");
          this.snackbar.visible = true;
        });
    },
    validateUser() {
      return this.$refs.updateUserForm.validate();
    },
    validateCompany() {
      return this.$refs.updateCompanyForm.validate();
    },
    passwordsvalidate() {
      return this.$refs.resetPasswordForm.validate();
    },

    getUser() {
      this.$http.get("/auth/me").then(
        (response) => {
          console.log(response);
          this.data_user = response.data.user;
          this.form = response.data.user;
          this.saved_avatar_src = response.data.user.avatar;
          this.saved_avatar_signature = response.data.user.signature;
          this.form.signature = null;
          var self = this;
          var type = self.type.code
          
          this.form_basic = this.form_basic.map(function (item) {
            if (item.value_text == "city_id") {
              item.items = response.data.cities
              if (response.data.user.city != null)
                item.value = response.data.user.city.id;
            }
            else if (item.value_text == "category_id") {
              if (type == "contractor" || type == "design_office") {
                self.getCategoryByType(type).then((res) => {
                  console.log(res);
                  self.loading_company = false
                  item.items = res.data.data;
                });
                if (type == "design_office") {
                  item.type_select = "multiple";
                  item.value = []
                } else {
                  item.type_select = "single";
                  item.value = ""
                }
                var category = response.data.user.category
                if (Array.isArray(category) && category.length > 0 ){
                  category.forEach(function (v) {
                      item.value.push(v.id)
                  });
                }else{
                  item.value = category.id;
                }
              }
            }else{
              if (response.data.user != null)
                  item.value = response.data.user[item.value_text];
              
            }
            if (item.req_val) {
              var req_val = item.req_val;
              if (
                Array.isArray(req_val) &&
                req_val.includes(type)
              ) {
                item.visible = true;
              } else {
                item.visible = false;
              }
            }
            return item;
          });
          this.form_company = this.form_company.map(function (item) {
            if (item.req_val) {
              var req_val = item.req_val;
              if (
                Array.isArray(req_val) &&
                req_val.includes(type)
              ) {
                item.visible = true;
              } else {
                item.visible = false;
              }
            }
              if(item.type != 'file'){
                if(item.value_text == "company_name" && !item.req_val.includes('raft_office')){
                  item.value = response.data.company.name
                }else{
                  if (response.data.company != null)
                    item.value = response.data.company[item.value_text];

                }
              }
            return item;
          });

          this.file_company = response.data.company_file;
          this.file_user = response.data.user_file;
        },
        (error) => {
          // console.log(error);
        }
      );
    },
    getCategoryByType(type) {
      this.loading_company = true;
      return axios.get("/general/categories/by-type/" + type);
    },
    get_company_raft() {
      this.loading_company = true;
      return axios.get("/general/companies/raft-companies");
    },
    handleUpdate() {
      this.result_msg = "";
      this.loadingInfo = true;
      const formData = new FormData();
      console.log(this.form.signature);
      formData.append("avatar", this.files);
      this.form_basic.map(function (item) {
          if (item.value != undefined && item.value != "") {
            if (
              (item.type == "select" && item.type_select == "multiple") ||
              (item.type == "autocomplete" && item.type_select == "multiple")
            ) {
              var value = item.value;
              for (var i = 0; i < value.length; i++) {
                const val = value[i];
                formData.append(`${item.value_text}[ ${i} ]`, val);
              }
            } else {
              formData.append(item.value_text, item.value);
            }
          }
        });
      if (this.validateUser()) {
        axios({
          url: "users/update-me",
          data: formData,
          method: "POST",
        })
          .then((response) => {
            this.loadingInfo = false;
            this.data_user = response.data.user;
            this.form = response.data.user;
            this.form.signature = null;
            this.saved_avatar_src = response.data.user.avatar;
            this.result_msg = response.data.message;
            this.snackbar.color = "#2dce89";
            this.snackbar.class = "success";
            this.snackbar.name = this.$i18n.t("Success");
            this.snackbar.visible = true;
          })
          .catch((error) => {
            this.loadingInfo = false;
            if (error && error.response.status == 422) {
              let errors = Object.values(error.response.data.errors);
              this.errors = errors.flat();
            }
            this.result_msg =
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
        this.result_msg = "Please Check errors and try again.";
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
      this.result_msg = "";
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
            this.result_msg = "";
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
                this.result_msg =
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
        this.result_msg = "Please Check errors and try again.";
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
            // this.result_msg = "";
            this.loadingPassword = true;

            axios({
              url: "users/change-passwored",
              data: this.passwords,
              method: "POST",
            })
              .then((response) => {
                this.result_msg = response.data.message;
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
                this.result_msg =
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
        this.result_msg = this.$i18n.t("Please Check errors and try again");
        return;
      }
    },
  },
  mounted() {
    if(this.user.signature == null){
      this.result_msg = this.$i18n.t('please drawe signature');
      this.snackbar.color = "#17c1e8";
      this.snackbar.class = "info";
      this.snackbar.name = this.$i18n.t("Info");
      this.snackbar.visible = true;
    }
    this.getUser();
    document.title = this.$i18n.t("profile");
    // console.log(this.user.signature);
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
.file{
  position: absolute;
  left: 0;
  font-size: 13px;
}
</style>