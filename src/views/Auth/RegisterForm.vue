<template>
  <div>
    
    <v-container>
      <Notify></Notify>
      <v-row class="justify-center d-flex content">
        <v-col lg="6" md="7" class="mx-auto">
          <div class="register-form card-shadow">
            <v-form ref="loginForm" lazy-validation v-model="valid" @submit.stop.prevent="handleLogin">

              <div class="login border-radius-xl">
                <!-- <div class="login-header pa-4">
               <div class="mb-0">
                 <a href="#" class="d-block auth-logo">
                   <img src="@/assets/img/logo2.png" alt="" width="100px" />
                   <span class="logo-txt"></span>
                 </a>
               </div>
               <div class="text-center mb-1">
                 <h2 class="bg mb-0">{{ $t("Register in the portal") }}</h2>
               </div>
             </div> -->

                <div class="login-body bg-body p-4 pt-16 position-relative">
                  <Loading v-if="load_page"></Loading>
                  <v-row v-if="user.status == 'rejected'">
                    <v-col cols="12" class="pt-0">
                      <div class="">
                        <v-alert
                        v-if="user.status == 'rejected'"
                        close-icon="fas fa-times font-size-root text-white" dismissible :class="`alert alert-danger text-white
                          font-size-root
                          text-center
                          font-weight-thin
                          font-diner`">
                          {{$t('reason_reject_request')}}
                          {{ user.reject_reason }}
                        </v-alert>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0" :key="'col-' + ind" v-for="(item, ind) in style_form"
                      :cols="item.col ? item.col : '6'" v-if="
                        item.hasOwnProperty('visible') ? item.visible : true
                      ">
                      <!-- {{ item.visible }} -->
                      <!-- <Input @input="changeType" :item="item" v-if="item.value_text == 'type_id'"></Input> -->
                      <template v-if="item.value_text == 'phone'">
                        <Input :item="item">
                        <template #feild>
                          <span class="number_phone">966+</span>
                        </template>
                        </Input>
                      </template>
                      <Input v-else :item="item"></Input>
                    </v-col>
                  </v-row>

                  <div class="mb-0 mt-5 text-end">
                    <v-btn elevation="0" :ripple="false" height="43" class="
                        btn
                        w-100
                        px-5
                        py-1
                        btn-blue
                        waves-effect waves-light
                      " small type="submit" :loading="loading">
                      {{ $t("Register now") }}
                      <span slot="loader">
                        <v-progress-circular style="width: 20px; height: 20px" indeterminate color="white">
                        </v-progress-circular>
                      </span>
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Input from "../Components/Input.vue";
import Notify from "../Components/Notify.vue";
import Loading from "../Components/Loading.vue";
import { mapState } from "vuex";
export default {
  components: {
    Input,
    Notify,
    Loading
  },
  data() {
    return {
      valid: false,
      show: false,
      show2: false,
      style_form: [
        // {
        //   col: "6",
        //   object: false,
        //   value_text: "type_id",
        //   class: "form-control",
        //   value: "",
        //   error: null,
        //   required: true,
        //   type: "select",
        //   val_select: "code",
        //   label: this.$i18n.t("user type"),
        //   class_div: "input-group auth-pass-inputgroup",
        //   items: [],
        //   rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        // },
        // {
        //   table: "user",
        //   value_text: "name",
        //   class: "form-control",
        //   value: "",
        // error:null,
        // // required: true,
        //   label: this.$i18n.t("Name"),
        //   placeholder: this.$i18n.t("Name"),
        //   class_div: "input-group auth-pass-inputgroup",
        //   // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        // },
        {
          table: "user",
          class: "form-control",
          value: "",
          error: null,
          type: "email",
          label: this.$i18n.t("auth.Email Address"),
          placeholder: this.$i18n.t("auth.Email Address"),
          class_div: "input-group auth-pass-inputgroup",
          value_text: "email",
          disabled:true
        },
        {
          value_text: "company_name",
          class: "form-control",
          value: "",
          error: null,
          label: this.$i18n.t("Company Name"),
          placeholder: this.$i18n.t("Company Name"),
          class_div: "input-group auth-pass-inputgroup",
          disabled:true
        },
        {
          value_text: "owner_name",
          class: "form-control",
          value: "",
          error: null,
          label: this.$i18n.t("PossName"),
          placeholder: this.$i18n.t("PossName"),
          class_div: "input-group auth-pass-inputgroup",
          disabled:true
        },
        {
          table: "user",
          class: "d-inline-block form-control w-80",
          value: "",
          error: null,
          value_text: "phone",
          label: this.$i18n.t("auth.Phone Number"),
          placeholder: '5xxxxxxxx',
          class_div: "input-group auth-pass-inputgroup",
          disabled:true
        },
     
        
        {
          class: "form-control",
          value: "",
          error: null,
          value_text: "owner_hardcopyid",
          label: this.$i18n.t("ID No"),
          placeholder: this.$i18n.t("ID No"),
          class_div: "input-group auth-pass-inputgroup",
          disabled:true
        },
        {
          col: "6",
          value_text: "license",
          req_val: ["service_provider"],
          visible: true,
          class: "form-control",
          value: "",
          error: null,
          label: this.$i18n.t("license"),
          placeholder: this.$i18n.t("license"),
          class_div: "input-group auth-pass-inputgroup",
          disabled:true
        },
        {
          value_text: "commercial",
          class: "form-control",
          value: "",
          error: null,
          label: this.$i18n.t("Commercial Register num"),
          placeholder: this.$i18n.t("Commercial Register num"),
          class_div: "input-group auth-pass-inputgroup",
          disabled:true
        },
        {
          table: "user",
          req_val: ["design_office", "contractor"],
          value_text: "city_id",
          visible: true,
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "select",
          label: this.$i18n.t("city"),
          placeholder: this.$i18n.t("city"),
          class_div: "input-group auth-pass-inputgroup",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          table: "user",
          visible: true,
          value: "",
          // col: '12',
          error: null,
          required: true,
          req_val: ["contractor", "design_office"],
          label: this.$i18n.t("Specialties"),
          value_text: "category_id",
          type: "select",
          items: [],
          class: "form-control",
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
       
        {
          col: "6",
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "file",
          value: null,
          label: this.$i18n.t("Owner ID photo") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "ownerid_file",
        },
        // السجل التجاري
        {
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "file",
          value: null,
          label:
            this.$i18n.t("Commercial Register") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "commercial_file",
        },
        {
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "date",
          label: this.$i18n.t("Commercial Register Expire"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "commercial_expiration",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "file",
          value: null,
          label:
            this.$i18n.t("My rating certificate") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "classification_file",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "date",
          label: this.$i18n.t("expire_date"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "classification_expire",
        },

        // {
        //   class: "form-control",
        // value:"",
        //   type: "date",
        //   label: this.$i18n.t("expire_date"),
        //   class_div: "input-group auth-pass-inputgroup",
        //   // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        //   value_text: "national_expire",
        // },
        {
          req_val: ["design_office"],
          visible: true,
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "file",
          value: null,
          label:
            this.$i18n.t("Profession practice certificate") +
            " " +
            this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "practice_file",
        },
        {
          req_val: ["design_office"],
          visible: true,
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "date",
          label: this.$i18n.t("expire_date"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "practice_expire",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "file",
          value: null,
          label: this.$i18n.t("business license") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "business_file",
        },
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "date",
          label: this.$i18n.t("expire_date"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          value_text: "business_expire",
        },
        
        {
          req_val: ["design_office", "contractor"],
          visible: true,
          col: "6",
          class: "form-control",
          value: "",
          error: null,
          required: true,
          type: "file",
          value: null,
          label: this.$i18n.t("National address") + " " + this.$i18n.t("(PDF)"),
          class_div: "input-group auth-pass-inputgroup",
          rules: [
            (v) => !!v || this.$i18n.t("form.Item is required"),
            (v) =>
              !v ||
              v.size <= 2000000 ||
              this.$i18n.t("size should be less or equal than 2 MB"),
          ],
          accept: ".pdf",
          value_text: "national_file",
        },
        
        {
            req_val: ["service_provider"],
            error:null,
            required: true,
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
            class_div: "input-group auth-pass-inputgroup",
            class: "form-control",
            value_text: "delegateid",
          },
          {
            req_val: ["service_provider"],
            error:null,
            type: "file",
            required: true,
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
            class_div: "input-group auth-pass-inputgroup",
            class: "form-control",
            value_text: "delegation",
          },
          {
            req_val: ["service_provider"],
            error:null,
            required: true,
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
            class_div: "input-group auth-pass-inputgroup",
            class: "form-control",
            value_text: "hajj_license",
          },
          {
            value: "",
            required: true,
            rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
            type: "date",
            visible: true,
            error: null,
            req_val: ["service_provider"],
            label: this.$i18n.t("hajj_license_expire_date"),
            class_div: "input-group auth-pass-inputgroup",
            class: "form-control",
            value_text: "hajj_license_expire",
          },
          {
          req_val: ["service_provider"],
          col: "6",
          error: null,
          // required: true,
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
          class_div: "input-group auth-pass-inputgroup",
          class: "form-control",
          visible: true,
        },
          {
            // col:12,
            req_val: ["service_provider"],
            error:null,
            // required: true,
            type: "file",
            value: null,
            label: this.$i18n.t("assign_file") + " " + this.$i18n.t("(PDF)"),
            rules: [
              // (v) => !!v || this.$i18n.t("form.Item is required"),
              (v) =>
                !v ||
                v.size <= 2000000 ||
                this.$i18n.t("size should be less or equal than 2 MB"),
            ],
            accept: ".pdf",
            class_div: "input-group auth-pass-inputgroup",
            class: "form-control",
            value_text: "assign_file",
          },
        ],
      load_page:false,
      error_msg: "",
      type_msg: "",
      loading: false,
      currentType: "service_provider",
      valid: true,
    };
  },
  computed:{
    ...mapState('auth',['user']),
  },
  methods: {
    changeType(obj) {
      // alert(obj);
      this.style_form.map(function (item) {
        // if(item.value_text == "type_id")
        if (item.req_val) {
          var req_val = item.req_val;
          if (Array.isArray(req_val) && req_val.includes(obj)) {
            item.visible = true;
          } else {
            item.visible = false;
          }
        }
        return item;
      });
    },
    validate() {
      return this.$refs.loginForm.validate();
    },
    reset() {
      this.$refs.loginForm.reset();
    },
    handleLogin() {
      this.error_msg = "";
      this.loading = true;
      const formData = new FormData();
      this.style_form.map(function (v) {
        if (v.value != undefined && v.value != "" && v.value != null) {
          if (
            (v.type == "select" && v.type_select == "multiple") ||
            (v.type == "autocomplete" && v.type_select == "multiple")
          ) {
            var value = v.value;
            for (var i = 0; i < value.length; i++) {
              const val = value[i];
              formData.append(`${v.value_text}[ ${i} ]`, val);
            }
          }
          else {
            //   if (v.value_text == "phone") {
            //     var val = null;
            //     if (v.value[0] == "0") {
            //       val = v.value.replace(/0/i, "");
            //       val = val;
            //     } else {
            //       val = v.value;
            //     }
            //     formData.append(v.value_text, val);
            //   } else {
            formData.append(v.value_text, v.value);
            // }
          }
        }
      });
      // console.log(...formData);
      if (this.validate()) {
        axios.post("users/update", formData).then(
          (res) => {
            this.loading = false;
            var self = this
              setTimeout(function () {
                self.$router.push({path:"/done"});
              }, 1000)
            // this.$store.commit("form/SET_NOTIFY", {
            //   msg: res.data.message,
            //   type: "Success",
            // });
            // this.reset();
            // this.$store
            //   .dispatch("auth/logout")
            //   .then((response) => {
            //     console.log(response);
            //     var self = this
            //     setTimeout(function () {
            //       self.$router.push("/done");
            //     }, 3000)
            //   })
            //   .catch((err) => console.log(err));
          },
          (error) => {
            this.loading = false;
            // console.log(error.response.data.message);
            this.error_msg =
              (error.response && error.response.data.message) || error.message;
            error.toString();
            this.$store.commit("form/SET_NOTIFY", {
              msg: this.error_msg,
              type: "Danger",
            });
          }
        );
      } else {
        this.loading = false;
        this.error_msg = this.$i18n.t("auth.Please Check errors and try again");
        this.$store.commit("form/SET_NOTIFY", {
          msg: this.$i18n.t("auth.Please Check errors and try again"),
          type: "Danger",
        });
        return;
      }
    },
    get_user() {
      this.load_page = true
      this.$http.get("/users/view-user").then(
        (response) => {
          this.load_page = false
          if (response.data.company) {
            var code = response.data.company.type.code;
            // var code = 'design_office'
            console.log(code)
            var self = this
            this.style_form.map(function (v) {
              if (v.value_text == "type_id") {
                v.value = code;
                v.items = response.data.types;
                // alert(code);
              }

              if (v.table == "user") {
                // console.log(response.data.user[v.value_text]);
                if (v.value_text == "city_id") {
                  v.items = response.data.cities;
                  if (response.data.user.city != null)
                    v.value = response.data.user.city.id;
                }
                else if (v.value_text == "category_id") {
                  if (code == "contractor" || code == "design_office") {
                    // alert(1);
                    self.load_page = true;
                    self.getCategoryByType(code).then((res) => {
                      console.log(res);
                      self.load_page = false;
                      v.items = res.data.data;
                    });
                    if (code == "design_office") {
                      v.type_select = "multiple";
                      v.value = []
                    } else {
                      v.type_select = "single";
                      v.value = ""
                    }
                    if (response.data.user.category != null) {
                      var category = response.data.user.category
                      if (Array.isArray(category) && category.length > 0) {
                        category.forEach(function (s) {
                          v.value.push(s.id)
                        });
                      } else {
                        v.value = category.id;
                      }
                    }
                  }
                }
                else if (
                  response.data.user[v.value_text] != undefined &&
                  response.data.user[v.value_text] != null
                ) {
                  v.value = response.data.user[v.value_text];
                }


              } else {
                if (
                  response.data.company[v.value_text] != undefined &&
                  response.data.company[v.value_text] != null &&
                  v.value_text != "type_id"
                ) {
                  v.value = response.data.company[v.value_text];
                }
              }

              if (v.value_text == "company_name") {
                if (response.data.company.name != null)
                  v.value = response.data.company.name;
              }
              if (v.req_val) {
                var req_val = v.req_val;
                if (Array.isArray(req_val) && req_val.includes(code)) {
                  v.visible = true;
                  // console.log(v.value_text)
                } else {
                  // console.log(v.value_text)
                  v.visible = false;
                }
              }
              return v;
            });
          }
        },
        (error) => {
          this.load_page = false
          if (error.response.status == 403) {
            this.$router.push("/403");
          } else {
            this.$store.dispatch("form/setNotify", {
              msg: this.$i18n.t("general.there is problem"),
              type: "Danger",
            });
          }
        }
      );
    },
    getCategoryByType(type) {
      return axios.get("/auth/categories/by-type/" + type);
    },
  },
  mounted() {
    document.title = this.$i18n.t("auth.register");
    if (!this.$store.state.auth.loggedIn) {
      return next({
        path: '/login',
      })
    }
    this.get_user();
  },
};
</script>
<style >
.number_phone{
  border: 1px solid #dee2e6;
  padding: 7px 4px;
}
.register-form .login-body {
  background-color: #fff !important;
}

.register-form .login .form-label {
  color: #344767;
}

.register-form .form-control.v-text-field--outlined fieldset {
  border: 1px solid #dee2e6;
}

.content {
  margin-top: -134px !important;
}

.register-form .login .login-body {
  border-radius: 1rem;
}

.form-control>.v-input__control>.v-input__slot {
  background-color: transparent;
}

.corner-logo {
  position: absolute;
  top: 15px;
  right: 20px;
}

.register-form .login .form-label {
  font-weight: 600;
  font-size: 12px;
  font-family: GE-Dinar !important;
}
</style>
