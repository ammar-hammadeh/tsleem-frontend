<template>
  <div>
    <CardForm>
      <template slot="card-form">
        <div>
          <v-form
            ref="form"
            lazy-validation
            v-model="valid"
            @submit.stop.prevent="handleLogin"
            class="mt-4 pt-2"
          >
            <v-row>
              <v-col
                class="py-0"
                :key="'col-' + ind"
                v-for="(item, ind) in form_stepper"
                :cols="item.col ? item.col : '6'"
                v-if="item.hasOwnProperty('visible') ? item.visible : true"
              >
                <!-- {{ item.visible }} -->
                <Input
                  @input="changeType"
                  :item="item"
                  v-if="item.value_text == 'type_id'"
                ></Input>
                <Input v-else :item="item"></Input>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pt-0" :class="classLang">
                <!-- if btn false will be appered in form -->
                <Button @click="handleSubmit" :loader="loading"></Button>
                <!-- <v-btn
            :ripple="false"
            class="
              font-weight-bold
              text-xs
              btn-default
              bg-gradient-default
              py-5
              px-6
              mb-0
              ms-auto
            "
            :loading="loader"
            color="primary"
            @click="save()"
          >
            <span slot="loader">
              <v-progress-circular
                style="width: 20px; height: 20px"
                indeterminate
                color="white"
              ></v-progress-circular>
            </span>
            {{ $t("form.save") }}
          </v-btn> -->
              </v-col>
            </v-row>
          </v-form>
        </div>
      </template>
    </CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import Input from "../Components/Input.vue";
import Stepper from "../Components/Stepper.vue";
import Button from "../Components/Button.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Wizard",
  components: {
    CardForm,
    Input,
    Stepper,
    Button,
  },
  data() {
    return {
      valid: true,
      card: {
        title: this.$i18n.t("CreateUser"),
        loading: true,
        sub_title: this.$i18n.t("user info"),
      },
      loading: false,
      form_stepper: [
        {
          // object: true,
          val_select: "code",
          error: null,
          type: "select",
          label: this.$i18n.t("user type"),
          items: [],
          disabled: false,
          value_text: "type_id",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          visible: true,
          error: null,
          value: "",
          label: this.$i18n.t("Name"),
          placeholder: this.$i18n.t("Name"),
          value_text: "name",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          value: "",
          visible: true,
          error: null,
          type: "email",
          value_text: "email",
          label: this.$i18n.t("auth.Email Address"),
          placeholder: this.$i18n.t("auth.Email Address"),
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          type: "password",
          value_text: "password",
          label: this.$i18n.t("auth.Password"),
          placeholder: this.$i18n.t("auth.Password"),
          show: false,
          rules: [
            (v) => !!v || this.$i18n.t("auth.Password is required"),
            (v) =>
              (v && v.length >= 6) ||
              this.$i18n.t("auth.minimum 6 characters at least"),
          ],
        },
        {
          value_text: "password_confirmation",
          type: "password",
          label: this.$i18n.t("auth.Repeat Password"),
          placeholder: this.$i18n.t("auth.Repeat Password"),
          show: false,
          rules: [
            (v) =>
              !!v || this.$i18n.t("auth.Password Confirmation is required"),
          ],
        },
        {
          visible: true,
          error: null,
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
          error: null,
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
          error: null,
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
          error: null,
          value: "",
          req_val: [
            "service_provider",
            "consulting_office",
            "design_office",
            "contractor",
          ],
          label: this.$i18n.t("ID No"),
          placeholder: this.$i18n.t("ID No"),
          value_text: "owner_hardcopyid",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          visible: true,
          error: null,
          value: "",
          label: this.$i18n.t("auth.Phone Number"),
          placeholder: this.$i18n.t("auth.Phone Number"),
          value_text: "phone",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          visible: true,
          error: null,
          value: "",
          req_val: ["sharer"],
          label: this.$i18n.t("categories"),
          value_text: "category_id",
          type: "select",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          visible: true,
          error: null,
          value: "",
          req_val: ["service_provider", "raft_company"],
          label: this.$i18n.t("license"),
          placeholder: this.$i18n.t("license"),
          value_text: "license",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        // {
        //   visible: true,
        // error:false,
        //   value: "",
        //   req_val: ["raft_company"],
        //   label: this.$i18n.t("company"),
        //   value_text: "company",
        //   type: "select",
        //   rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        // },
        {
          type: "select",
          items: [],
          visible: true,
          error: null,
          value: "",
          req_val: ["consulting_office", "design_office", "contractor"],
          label: this.$i18n.t("city"),
          placeholder: this.$i18n.t("city"),
          value_text: "city_id",
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
        },
        // عقد التأسيس
        {
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
        },
        {
          visible: true,
          error: null,
          value: "",
          label: this.$i18n.t("Role"),
          value_text: "roles",
          type: "select",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],

      currentType: "",
      currentTypeId: null,
      toggle_exclusive: 2,
      type_user: null,
    };
  },
  watch: {
    // currentTypeId(val) {
    //   this.form.type_id = val;
    // },
  },
  computed: {
    ...mapState("form", ["formData"]),
    classLang() {
      return {
        "text-left": this.$vuetify.rtl,
        "text-right": !this.$vuetify.rtl,
      };
    },
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
      // this.SET_FORM_STYLE(this.form_stepper);
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(false);
      // this.SET_DATA_STEPPER(this.form_stepper);
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    changeType(val, reload = false) {
      // this.resetValidation()
      this.reset();
      console.log(reload);
      this.currentType = val;
      if (!reload) {
        this.$router.push({
          path: this.$route.fullPath,
          query: { type: val },
        });
      }
      var self = this;
      this.form_stepper = this.form_stepper.map(function (item) {
        if (item.value_text == "type_id") {
          if (self.type_user == "admin") {
            // alert(1)
            if (self.$route.query && self.$route.query.type) {
              item.value = self.$route.query.type;
            }
          } else {
            // alert(2)
            item.value = self.type_user;
            item.disabled = true;
          }
        }
        if (item.req_val) {
          var req_val = item.req_val;
          if (Array.isArray(req_val) && req_val.includes(val)) {
            item.visible = true;
          } else {
            item.visible = false;
          }
        }
        return item;
      });
    },
    async getTypes() {
      var self = this;
      var currentType;
      await this.$http.get("/users/data-user").then(
        (response) => {
          this.form_stepper.map(function (v) {
            if (v.value_text == "type_id") {
              v.items = response.data.types;
              if (self.type_user == "admin") {
                if (self.$route.query && self.$route.query.type) {
                  v.value = self.$route.query.type;
                  currentType = self.$route.query.type;
                } else {
                  v.value = "admin";
                  currentType = "admin";
                }
              } else {
                v.value = self.type_user;
                v.disabled = true;
                currentType = self.type_user;
              }
            }
            if (v.value_text == "city_id") v.items = response.data.cities;
            if (v.value_text == "roles") {
              v.items = response.data.roles;
              if (self.type_user != "admin") {
                v.visible = false;
              }
            }
            if (v.value_text == "category_id")
              v.items = response.data.categories;

            if (v.req_val) {
              var req_val = v.req_val;
              if (Array.isArray(req_val) && req_val.includes(currentType)) {
                v.visible = true;
              } else {
                v.visible = false;
              }
            }
            return v;
          });
        },
        (error) => {
          // console.log(error);
        }
      );
    },
    validate() {
      return this.$refs.form.validate();
    },
    handleSubmit() {
      // alert(1);
      this.error_msg = "";
      this.loading = true;
      // console.log(this.files);

      if (this.validate()) {
        const formData = new FormData();
        this.form_stepper.map(function (item) {
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
        // console.log(...formData);
        axios
          .post("users/create-user", formData)
          .then((response) => {
            this.error_msg = response.data.message;
            // this.$router.push("/users");
            this.$router.push({
              path: "/users",
              params: { message: this.error_msg },
            });
          })
          .catch((error) => {
            this.loading = false;
            if (error && error.response.status == 422) {
              var errors = error.response.data.errors;
              for (let i = 0; i < this.form_stepper.length; i++) {
                const element = this.form_stepper[i];
                if (errors[element.value_text] != undefined)
                  element.error = errors[element.value_text];
                // console.log(errors[element.value_text]);
              }
              this.error_msg = this.$i18n.t(
                "Please Check errors before submit"
              );
            } else {
              this.error_msg =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            }
            this.$store.commit("form/SET_NOTIFY", {
              msg: this.error_msg,
              type: "Danger",
            });
          });
      } else {
        this.loading = false;
        this.error_msg = this.$i18n.t("Please Check errors before submit");
        this.$store.commit("form/SET_NOTIFY", {
          msg: this.error_msg,
          type: "Danger",
        });
      }

      //
    },
  },
  mounted() {
    this.type_user = this.$store.state.auth.type.code;
    this.getTypes();
    this.set_data();
    document.title = this.$i18n.t("new main user");
    if (this.$route.query.type) {
      this.changeType({ code: this.$route.query.type }, true);
    }
  },
};
</script>