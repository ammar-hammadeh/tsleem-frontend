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
                <template v-else-if="item.value_text == 'phone'">
                  <Input :item="item">
                    <template #feild>
                      <span class="number_phone">966+</span>
                    </template>
                  </Input>
                </template>
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
          label: this.$i18n.t("Role"),
          value_text: "roles",
          type: "select",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        // {
        //   visible: true,
        //   error: null,
        //   value: "",
        //   label: this.$i18n.t("Name"),
        //   placeholder: this.$i18n.t("Name"),
        //   value_text: "name",
        //   rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        // },
        {
          value: "",
          visible: true,
          error: null,
          type: "email",
          value_text: "email",
          label: this.$i18n.t("auth.Email Address"),
          placeholder: "Example@test.com",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
            (v &&
            /^(([a-zA-Z\-0-9]+(\.[a-zA-Z\-0-9]+[^<>()\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
                  v
                )) ||
              this.$i18n.t("auth.E-mail must be valid"),
          ],
        },
        {
          visible: true,
          error: null,
          value: "",
          class: "d-inline-block w-80",
          label: this.$i18n.t("auth.Phone Number"),
          placeholder: '5xxxxxxxx',
          value_text: "phone",
          type: "number",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              /^(5)\d*$/.test(v) || this.$i18n.t("have to start number 5"),
            (v) => (v && v.length == 9) || this.$i18n.t("equal 9 characters"),
          ],
        },
        {
          type: "password",
          value_text: "password",
          label: this.$i18n.t("auth.Password"),
          placeholder: this.$i18n.t("auth.Password"),
          show: false,
          error: null,
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
          error: null,
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
            "raft_company",
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
          type: "number",
          label: this.$i18n.t("Commercial Register num"),
          placeholder: this.$i18n.t("Commercial Register num"),
          value_text: "commercial",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) => (v && v.length == 10) || this.$i18n.t("equal 10 characters"),
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
          type: "number",
          label: this.$i18n.t("ID No"),
          placeholder: this.$i18n.t("ID No"),
          value_text: "owner_hardcopyid",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) => /^(1)\d*$/.test(v) || this.$i18n.t("have to start number 1"),
            (v) => (v && v.length == 10) || this.$i18n.t("equal 10 characters"),
          ],
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
        // {
        //   visible: true,
        //   error: null,
        //   value: "",
        //   req_val: ["design_office"],
        //   label: this.$i18n.t("categories"),
        //   value_text: "engineer_office_id",
        //   type: "select",
        //   rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        // },
        {
          visible: true,
          error: null,
          value: "",
          req_val: ["raft_office"],
          label: this.$i18n.t("office name"),
          value_text: "company_name",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          visible: true,
          error: null,
          value: "",
          req_val: ["raft_office"],
          label: this.$i18n.t("Unified number"),
          value_text: "license",
          type: "number",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          // col:12,
          visible: true,
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
            req_val: ["service_provider"],
            error:null,
            type: "file",
            value: null,
            label: this.$i18n.t("assign_file") + " " + this.$i18n.t("(PDF)"),
            rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
            accept: ".pdf",
            value_text: "assign_file",
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
            // "consulting_office",
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
            // "consulting_office",
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
          req_val: [
            // "consulting_office", 
            "design_office", "contractor"],
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
          req_val: [
            // "consulting_office",
            "design_office", "contractor"],
          label: this.$i18n.t("expire_date"),
          value_text: "classification_expire",
        },

        {
          visible: true,
          error: null,
          type: "file",
          value: null,
          req_val: [
            // "consulting_office",
            "design_office", "contractor"],
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
          req_val: [
            // "consulting_office",
            "design_office", "contractor"],
          label: this.$i18n.t("expire_date"),
          value_text: "practice_expire",
        },
        {
          visible: true,
          error: null,
          type: "file",
          value: null,
          req_val: [
            // "consulting_office",
            "design_office", "contractor"],
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
          req_val: [
            // "consulting_office",
            "design_office", "contractor"],
          label: this.$i18n.t("expire_date"),
          value_text: "business_expire",
        },
        {
          visible: true,
          error: null,
          type: "file",
          value: null,
          req_val: [
            // "consulting_office",
          "design_office", "contractor"],
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
            // "consulting_office",
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
        // {
        //   visible: true,
        //   error: null,
        //   type: "file",
        //   value: null,
        //   req_val: ["consulting_office"],
        //   label:
        //     this.$i18n.t("Social Security License") +
        //     " " +
        //     this.$i18n.t("(PDF)"),
        //   value_text: "social_security",
        //   accept: ".pdf",
        //   rules: [
        //     (v) =>
        //       !v ||
        //       v.size <= 2000000 ||
        //       this.$i18n.t("size should be less or equal than 2 MB"),
        //   ],
        // },
        // {
        //   value: "",
        //   type: "date",
        //   visible: true,
        //   error: null,
        //   req_val: ["consulting_office"],
        //   label: this.$i18n.t("expire_date"),
        //   value_text: "social_security_expire",
        // },
        // رخصة الزكاة والدخل
        // {
        //   visible: true,
        //   error: null,
        //   type: "file",
        //   value: null,
        //   req_val: ["consulting_office"],
        //   label:
        //     this.$i18n.t("Zakat and Income License") +
        //     " " +
        //     this.$i18n.t("(PDF)"),
        //   value_text: "zakat_income",
        //   accept: ".pdf",
        //   rules: [
        //     (v) =>
        //       !v ||
        //       v.size <= 2000000 ||
        //       this.$i18n.t("size should be less or equal than 2 MB"),
        //   ],
        // },
        // {
        //   value: "",
        //   type: "date",
        //   visible: true,
        //   error: null,
        //   req_val: ["consulting_office"],
        //   label: this.$i18n.t("expire_date"),
        //   value_text: "zakat_income_expire",
        // },
        // شهادة السعودة
        // {
        //   visible: true,
        //   error: null,
        //   type: "file",
        //   value: null,
        //   req_val: ["consulting_office"],
        //   label:
        //     this.$i18n.t("Saudization certificate") +
        //     " " +
        //     this.$i18n.t("(PDF)"),
        //   value_text: "saudization",
        //   accept: ".pdf",
        //   rules: [
        //     (v) =>
        //       !v ||
        //       v.size <= 2000000 ||
        //       this.$i18n.t("size should be less or equal than 2 MB"),
        //   ],
        // },
        // {
        //   value: "",
        //   type: "date",
        //   visible: true,
        //   error: null,
        //   req_val: ["consulting_office"],
        //   label: this.$i18n.t("expire_date"),
        //   value_text: "saudization_expire",
        // },
        // شهادة الغرفة التجارية
        // {
        //   visible: true,
        //   error: null,
        //   type: "file",
        //   value: null,
        //   req_val: ["consulting_office"],
        //   label:
        //     this.$i18n.t("Chamber of Commerce certificate") +
        //     " " +
        //     this.$i18n.t("(PDF)"),
        //   value_text: "chamber_commerce",
        //   accept: ".pdf",
        //   rules: [
        //     (v) =>
        //       !v ||
        //       v.size <= 2000000 ||
        //       this.$i18n.t("size should be less or equal than 2 MB"),
        //   ],
        // },
        // {
        //   value: "",
        //   type: "date",
        //   visible: true,
        //   error: null,
        //   req_val: ["consulting_office"],
        //   label: this.$i18n.t("expire_date"),
        //   value_text: "chamber_commerce_expire",
        // },
        // شهادة تسجيل الضريبة
        // {
        //   visible: true,
        //   error: null,
        //   type: "file",
        //   value: null,
        //   req_val: ["consulting_office"],
        //   label:
        //     this.$i18n.t("Tax registration certificate") +
        //     " " +
        //     this.$i18n.t("(PDF)"),
        //   value_text: "tax_registration",
        //   accept: ".pdf",
        //   rules: [
        //     (v) =>
        //       !v ||
        //       v.size <= 2000000 ||
        //       this.$i18n.t("size should be less or equal than 2 MB"),
        //   ],
        // },
        // شهادة حماية الأجور
        // {
        //   visible: true,
        //   error: null,
        //   type: "file",
        //   value: null,
        //   req_val: ["consulting_office"],
        //   label:
        //     this.$i18n.t("Wage Protection Certificate") +
        //     " " +
        //     this.$i18n.t("(PDF)"),
        //   value_text: "wage_protection",
        //   accept: ".pdf",
        //   rules: [
        //     (v) =>
        //       !v ||
        //       v.size <= 2000000 ||
        //       this.$i18n.t("size should be less or equal than 2 MB"),
        //   ],
        // },
        // عقد التأسيس
        // {
        //   visible: true,
        //   error: null,
        //   type: "file",
        //   value: null,
        //   req_val: ["consulting_office"],
        //   label:
        //     this.$i18n.t("Memorandum of Association") +
        //     " " +
        //     this.$i18n.t("(PDF)"),
        //   value_text: "memorandum_association",
        //   accept: ".pdf",
        //   rules: [
        //     (v) =>
        //       !v ||
        //       v.size <= 2000000 ||
        //       this.$i18n.t("size should be less or equal than 2 MB"),
        //   ],
        // },
        
        {
          // req_val: ["raft_office"],
          visible: false,
          error: null,
          value: "",
          label: this.$i18n.t("company raft"),
          value_text: "raft_company_id",
          type: "select",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          visible: false,
          error: null,
          value: "",
          label: this.$i18n.t("prefix"),
          value_text: "prefix",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          visible: false,
          error: null,
          value: "",
          type: "number",
          label: this.$i18n.t("kroky"),
          value_text: "kroky",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          req_val: ["service_provider"],
          error:null,
          type: "file",
          value: null,
          label: this.$i18n.t("seasonal_license") + " " + this.$i18n.t("(PDF)"),
          rules: [
            // (v) => !!v || this.$i18n.t("form.Item is required"),
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
            (v) => !!v || this.$i18n.t("form.Item is required"),
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
            (v) => !!v || this.$i18n.t("form.Item is required"),
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
            (v) => !!v || this.$i18n.t("form.Item is required"),
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
            rules: [(v) => !!v || this.$i18n.t("form.Item is required"),],
            value_text: "hajj_license_expire",
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
    // CheckMatchPassword(){

    // },
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
      // console.log(val);
      // console.log(reload);
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
            if (self.$route.query && self.$route.query.type) {
              item.value = self.$route.query.type;
            }
          } else if (self.type_user == "raft_company") {
            item.value = "raft_office";
            item.disabled = true;
          }
        } else if (item.value_text == "category_id") {
          if (val == "contractor" || val == "design_office") {
            self.getCategoryByType(val).then((res) => {
              console.log(res);
              self.$store.commit("SET_CARD_LOADING", false);
              item.items = res.data.data;
            });
            if (val == "design_office") {
              item.type_select = "multiple";
            } else {
              item.type_select = "single";
            }
          }
        } else if (item.value_text == "raft_company_id") {
          if (self.type_user == "admin" && val == "raft_office") {
            item.visible = true;
            self.get_company_raft().then((res) => {
              console.log(res);
              self.$store.commit("SET_CARD_LOADING", false);
              item.items = res.data.data;
            });
          } else {
            item.visible = false;
          }
        } else if (item.value_text == "prefix" || item.value_text == "kroky") {
          if (self.type_user == "admin" && self.currentType == "raft_company")
            item.visible = true;
          else item.visible = false;
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
    get_company_raft() {
      this.$store.commit("SET_CARD_LOADING", true);
      return axios.get("/general/companies/raft-companies");
    },
    getCategoryByType(type) {
      this.$store.commit("SET_CARD_LOADING", true);
      return axios.get("/general/categories/by-type/" + type);
    },
    async getTypes() {
      var self = this;
      var currentType;
      await this.$http.get("/users/data-user").then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
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
              } else if (self.type_user == "raft_company") {
                // alert(2);
                v.value = "raft_office";
                v.visible = false;
                currentType = "raft_office";
              }
              // } else {
              //   v.value = self.type_user;
              //   v.disabled = true;
              //   currentType = self.type_user;
              // }
            }
            if (v.value_text == "city_id") v.items = response.data.cities;
            if (v.value_text == "roles") {
              v.items = response.data.roles;
              if (self.type_user != "admin") {
                v.visible = false;
              }
            }
            // if (v.value_text == "category_id") {
            //   alert(self.type_user);
            //   if (
            //     self.type_user == "design_office" ||
            //     self.type_user == "contractor"
            //   )
            //     v.label = this.$i18n.t("Specialties");
            //   else if (self.type_user == "sharer") {
            //     alert("ca");
            //     v.label = 'this.$i18n.t("categories")';
            //   }
            // }
            // v.items = response.data.categories;

            // if (v.value_text == "engineer_office_id")
            //   v.items = response.data.engineer_office;

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
          this.$store.commit("SET_CARD_LOADING", false);
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
              // if (item.value_text == "phone") {
              //   var val = null;
              //   if (item.value[0] == "0") {
              //     val = item.value.replace(/0/i, "");
              //     val = val;
              //   } else {
              //     val = item.value;
              //   }
              //   formData.append(item.value_text, val);
              // } else {
                formData.append(item.value_text, item.value);
              // }
            }
          }
        });
        // console.log(...formData);
        axios
          .post("users/create-user", formData)
          .then((response) => {
            this.error_msg = { msg: response.data.message, type: "Success" };
            this.loading = false;
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
                if (errors[element.value_text] != undefined) {
                  // alert(2);
                  // if (element.value_text == "password") {
                  //   alert(1);
                  //   element.error = errors.password.toString();
                  // } else
                  element.error = errors[element.value_text].toString();
                  console.log(errors[element.error]);
                }
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
    this.$store.commit("SET_CARD_LOADING", true);
    this.type_user = this.$store.state.auth.type.code;
    if (this.type_user == "raft_company") {
      this.card.sub_title = this.$i18n.t("user info raft office");
    } else {
      this.card.sub_title = this.$i18n.t("user info");
    }
    this.getTypes();
    this.set_data();
    document.title = this.$i18n.t("new main user");
    if (this.$route.query.type) {
      this.changeType(this.$route.query.type, true);
      // this.type_user = this.$route.query.type;
    }
  },
};
</script>