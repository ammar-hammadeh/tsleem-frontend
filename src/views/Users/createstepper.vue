<template>
  <div>
    <CardForm>
      <template slot="card-body">
        <div>
          <!-- here {{ form.type_id }} -->
          <Stepper :stepper="form_stepper" @handel="handleSubmit">
            <template #type>
              <v-col cols="12">
                <Input
                  v-model="form.type_id"
                  @input="changeType"
                  :item="userType"
                ></Input>
              </v-col>
            </template>
            <template #password>
              <v-col cols="6">
                <label class="text-xs text-typo font-weight-bolder ms-1">{{
                  $t("auth.Password")
                }}</label>
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  v-model="form.password"
                  :rules="rules.password"
                  lazy-validation
                  color="rgba(0,0,0,.6)"
                  light
                  :placeholder="$t('auth.Password')"
                  class="font-size-input placeholder-lighter mt-2 mb-4"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <label class="text-xs text-typo font-weight-bolder ms-1">{{
                  $t("auth.Repeat Password")
                }}</label>
                <v-text-field
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  v-model="form.password_confirmation"
                  :rules="rules.password_confirmation"
                  lazy-validation
                  color="rgba(0,0,0,.6)"
                  light
                  :placeholder="$t('auth.Repeat Password')"
                  class="font-size-input placeholder-lighter mt-2 mb-4"
                >
                </v-text-field>
              </v-col>
            </template>
          </Stepper>
        </div>
      </template>
    </CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import Input from "../Components/Input.vue";
import Stepper from "../Components/Stepper.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Wizard",
  components: {
    CardForm,
    Input,
    Stepper,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("CreateUser"),
        loading: true,
        sub_title: this.$i18n.t("user info"),
        // stepper: true,
      },
      show1: false,
      show2: false,
      form: {
        type_id: "",
        paswword: "",
        paswword_confirmation: "",
      },
      rules: {
        password: [
          (v) => !!v || this.$i18n.t("auth.Password is required"),
          (v) =>
            (v && v.length >= 6) ||
            this.$i18n.t("auth.minimum 6 characters at least"),
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
      form_stepper: {
        header: [
          { name: this.$i18n.t("account information") },
          { name: this.$i18n.t("Company information") },
          { name: this.$i18n.t("files") },
        ],
        content: [
          {
            name: this.$i18n.t("account information"),
            form: [
              {
                visible: true,
                value: "",
                label: this.$i18n.t("Name"),
                placeholder: this.$i18n.t("Name"),
                value_text: "name",
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
              {
                value: "",
                visible: true,
                type: "email",
                value_text: "email",
                label: this.$i18n.t("auth.Email Address"),
                placeholder: this.$i18n.t("auth.Email Address"),
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
            ],
          },
          {
            name: this.$i18n.t("Company information"),
            form: [
              {
                visible: true,
                value: "",
                req_val: [
                  "service_provider",
                  "consulting_office",
                  "design_office",
                  "contractor",
                ],
                label: this.$i18n.t("Company Name"),
                placeholder: this.$i18n.t("Company Name"),
                value_text: "company_name",
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
              {
                value: "",
                visible: true,
                req_val: [
                  "service_provider",
                  "consulting_office",
                  "design_office",
                  "contractor",
                ],
                label: this.$i18n.t("PossName"),
                placeholder: this.$i18n.t("PossName"),
                value_text: "owner_name",
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
              {
                visible: true,
                value: "",
                req_val: [
                  "service_provider",
                  "consulting_office",
                  "design_office",
                  "contractor",
                ],
                label: this.$i18n.t("Commercial Register num"),
                placeholder: this.$i18n.t("Commercial Register num"),
                value_text: "commercial",
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
              {
                visible: true,
                value: "",
                req_val: [
                  "service_provider",
                  "consulting_office",
                  "design_office",
                  "contractor",
                ],
                label: this.$i18n.t("ID No"),
                placeholder: this.$i18n.t("ID No"),
                value_text: "hardcopyid",
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
              {
                visible: true,
                value: "",
                label: this.$i18n.t("auth.Phone Number"),
                placeholder: this.$i18n.t("auth.Phone Number"),
                value_text: "phone",
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
              // {
              //   visible: true,
              //   value: "",
              //   req_val: ["sharer"],
              //   label: this.$i18n.t("company"),
              //   value_text: "company",
              //   type: "select",
              //   rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              // },
              {
                visible: true,
                value: "",
                req_val: ["service_provider", "raft_company"],
                label: this.$i18n.t("license"),
                placeholder: this.$i18n.t("license"),
                value_text: "license",
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
              {
                visible: true,
                value: "",
                req_val: ["raft_company"],
                label: this.$i18n.t("company"),
                value_text: "company",
                type: "select",
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
              {
                visible: true,
                value: "",
                req_val: ["consulting_office", "design_office", "contractor"],
                label: this.$i18n.t("city"),
                placeholder: this.$i18n.t("city"),
                value_text: "city_id",
                rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
              },
            ],
          },
          {
            name: this.$i18n.t("files"),
            form: [
              {
                visible: true,
                value: "",
                req_val: [
                  "service_provider",
                  "consulting_office",
                  "design_office",
                  "contractor",
                ],
                type: "file",
                label:
                  this.$i18n.t("Commercial Register") + this.$i18n.t("(PDF)"),
                value_text: "commercial_file",
                accept: ".pdf",
              },
              {
                value: "",
                type: "date",
                visible: true,
                req_val: [
                  "service_provider",
                  "consulting_office",
                  "design_office",
                  "contractor",
                ],
                label: this.$i18n.t("Commercial Register Expire"),
                value_text: "expire_commercial",
              },

              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office", "design_office", "contractor"],
                label:
                  this.$i18n.t("My rating certificate") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "classification_file",
                accept: ".pdf",
              },
              {
                value: "",
                type: "date",
                visible: true,
                req_val: ["consulting_office", "design_office", "contractor"],
                label: this.$i18n.t("expire_date"),
                value_text: "classification_expire",
              },

              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office", "design_office", "contractor"],
                label:
                  this.$i18n.t("Profession practice certificate") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "practice_file",
                accept: ".pdf",
              },
              {
                value: "",
                type: "date",
                visible: true,
                req_val: ["consulting_office", "design_office", "contractor"],
                label: this.$i18n.t("expire_date"),
                value_text: "practice_expire",
              },
              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office", "design_office", "contractor"],
                label:
                  this.$i18n.t("business license") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "business_file",
                accept: ".pdf",
              },
              {
                value: "",
                type: "date",
                visible: true,
                req_val: ["consulting_office", "design_office", "contractor"],
                label: this.$i18n.t("expire_date"),
                value_text: "business_expire",
              },
              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office", "design_office", "contractor"],
                label:
                  this.$i18n.t("National address") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "national_file",
                accept: ".pdf",
              },
              {
                type: "file",
                visible: true,
                value: "",
                req_val: [
                  "service_provider",
                  "consulting_office",
                  "design_office",
                  "contractor",
                ],
                label:
                  this.$i18n.t("Owner ID photo") + " " + this.$i18n.t("(PDF)"),
                value_text: "ownerid_file",
                accept: ".pdf",
              },
              // رخصة التأمينات الاجتماعية
              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office"],
                label:
                  this.$i18n.t("Social Security License") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "social_security",
                accept: ".pdf",
              },
              {
                value: "",
                type: "date",
                visible: true,
                req_val: ["consulting_office"],
                label: this.$i18n.t("expire_date"),
                value_text: "social_security_expire",
              },
              // رخصة الزكاة والدخل
              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office"],
                label:
                  this.$i18n.t("Zakat and Income License") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "zakat_income",
                accept: ".pdf",
              },
              {
                value: "",
                type: "date",
                visible: true,
                req_val: ["consulting_office"],
                label: this.$i18n.t("expire_date"),
                value_text: "zakat_income_expire",
              },
              // شهادة السعودة
              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office"],
                label:
                  this.$i18n.t("Saudization certificate") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "saudization",
                accept: ".pdf",
              },
              {
                value: "",
                type: "date",
                visible: true,
                req_val: ["consulting_office"],
                label: this.$i18n.t("expire_date"),
                value_text: "saudization_expire",
              },
              // شهادة الغرفة التجارية
              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office"],
                label:
                  this.$i18n.t("Chamber of Commerce certificate") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "chamber_commerce",
                accept: ".pdf",
              },
              {
                value: "",
                type: "date",
                visible: true,
                req_val: ["consulting_office"],
                label: this.$i18n.t("expire_date"),
                value_text: "chamber_commerce_expire",
              },
              // شهادة تسجيل الضريبة
              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office"],
                label:
                  this.$i18n.t("Tax registration certificate") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "tax_registration",
                accept: ".pdf",
              },
              // شهادة حماية الأجور
              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office"],
                label:
                  this.$i18n.t("Wage Protection Certificate") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "wage_protection",
                accept: ".pdf",
              },
              // عقد التأسيس
              {
                visible: true,
                type: "file",
                value: "",
                req_val: ["consulting_office"],
                label:
                  this.$i18n.t("Memorandum of Association") +
                  " " +
                  this.$i18n.t("(PDF)"),
                value_text: "memorandum_association",
                accept: ".pdf",
              },
            ],
          },
        ],
      },
      userType: {
        object: true,
        type: "select",
        label: this.$i18n.t("user type"),
        items: [],
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },

      currentType: "",
      currentTypeId: null,
      toggle_exclusive: 2,
    };
  },
  watch: {
    currentTypeId(val) {
      this.form.type_id = val;
    },
  },
  computed: {
    ...mapState("form", ["formData"]),
  },
  methods: {
    ...mapMutations([
      "SET_COLLECTION",
      "SET_FUNCTION",
      "SET_CARD",
      "SET_CARD_LOADING",
    ]),
    ...mapMutations("form", ["SET_FORM_STYLE", "SET_DATA_STEPPER"]),
    set_data() {
      this.SET_COLLECTION("camp");
      this.SET_FUNCTION("add_camp");
      // this.SET_FORM_STYLE(this.style_form);
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(false);
      // this.SET_DATA_STEPPER(this.form_stepper);
    },

    changeType(val, reload = false) {
      console.log(reload);
      this.currentType = val.code;
      if (!reload) {
        this.$router.push({
          path: this.$route.fullPath,
          query: { type: val.code },
        });
        this.currentTypeId = val.id;
      }
      this.form_stepper.content = this.form_stepper.content.map(function (
        data
      ) {
        data.form.map(function (item) {
          if (item.req_val) {
            var req_val = item.req_val;
            if (Array.isArray(req_val) && req_val.includes(val.code)) {
              item.visible = true;
            } else {
              item.visible = false;
            }
          }
          return item;
        });
        return data;
      });
    },
    async getTypes() {
      await this.$http.get("/general/types").then(
        (response) => {
          this.userType.items = response.data.data;
          if (this.$route.query.type) {
            var data = this.userType.items.filter(
              (v) => v.code == this.currentType
            );
            this.currentTypeId = data[0].id;
          }
        },
        (error) => {
          // console.log(error);
        }
      );
    },
    handleSubmit(value, valid) {
      this.error_msg = "";
      this.loading = true;
      // console.log(this.files);

      if (valid) {
        const formData = new FormData();
        value.map(function (data) {
          data.form.map(function (item) {
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
        });
        formData.append("type_id", this.form.type_id);
        formData.append("password", this.form.password);
        formData.append(
          "password_confirmation",
          this.form.password_confirmation
        );
        console.log(...formData);
        axios
          .post("users/create", formData)
          .then((response) => {
            this.error_msg = response.data.message;
            this.snackbar.color = "#2dce89";
            this.snackbar.class = "success";
            this.snackbar.name = "Success";
            this.snackbar.visible = true;
            this.$router.push("/" + response.user.id);
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

      //
    },
    handleFilesUpload() {
      this.files = event.target.files[0];
      this.avatar_src = URL.createObjectURL(event.target.files[0]);
    },

    removeImage() {
      this.files = [];
      this.avatar_src = "";
    },
  },
  mounted() {
    this.getTypes();
    this.set_data();
    document.title = this.$i18n.t("CreateUser");
    if (this.$route.query.type) {
      this.changeType({ code: this.$route.query.type }, true);
    }
  },
};
</script>