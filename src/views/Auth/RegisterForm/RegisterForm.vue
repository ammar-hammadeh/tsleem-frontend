<template>
  <div>
    
    <v-container>
      <Notify></Notify>
      <v-row class="justify-center d-flex content">
        <v-col lg="6" md="7" class="mx-auto">
          <div class="register-form card-shadow">
            <v-form ref="loginForm" lazy-validation v-model="valid" @submit.stop.prevent="handleLogin">

              <div class="login border-radius-xl">
                <div class="login-body bg-body p-4 pt-16 position-relative">
                  <Loading v-if="load_page"></Loading>
                  <v-row v-if="user && user.status == 'rejected'">
                    <v-col cols="12" class="pt-0">
                      <div class="">
                        <v-alert
                        v-if="user && user.status == 'rejected'"
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
                      :cols="item.col ? item.col : '6'">
                      <!-- {{ item.visible }} -->
                      <!-- <Input @input="changeType" :item="item" v-if="item.value_text == 'type_id'"></Input> -->
                      <template v-if="item.value_text == 'phone'">
                        <Input :item="item">
                        <template #feild>
                          <span class="number_phone">966+</span>
                        </template>
                        </Input>
                      </template>
                      <template v-else-if="item.value_text == 'secret_information'">
                        <div class="d-flex align-center">
                          <Input :item="item"></Input>
                          <v-btn
                            :ripple="false"
                            class="btn-blue text-capitalize mt-3 mr-3"
                            >
                            <!-- link -->
                            <!-- :to="item.link" -->
                            {{$t('download file')}}
                          </v-btn>
                        </div>
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
import Input from "../../Components/Input.vue";
import Notify from "../../Components/Notify.vue";
import Loading from "../../Components/Loading.vue";
import {
  isValueNotEmpty,
  isDropDownComponent,
  isFormValidate
} from "../../../helpers/General";
import {
  HujajDakhilStyleFormData,
  ContactorStyleFormData,
  DesignOfficeStyleFormData,
} from "./Helpers/StyleRegisterFormData";
import { mapState } from "vuex";
export default {
  components: {
    Input,
    Notify,
    Loading
  },
  data() {
    return {
      style_form:[],
      valid: false,
      show: false,
      show2: false,
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
   
    reset() {
      this.$refs.loginForm.reset();
    },
    handleLogin() {
      this.error_msg = "";
      this.loading = true;
      const formData = new FormData();
      this.style_form.map(function (v) {
          if (isValueNotEmpty(v.value)) {
            if (isDropDownComponent(v.type, v.type_select)) {
              var value = v.value;
              for (var i = 0; i < value.length; i++) {
                const val = value[i];
                formData.append(`${v.value_text}[ ${i} ]`, val);
              }
            } else {
              formData.append(v.value_text, v.value);
            }
          }
        });
      if (isFormValidate(this.$refs.loginForm)) {
        axios.post("users/update", formData).then(
          (res) => {
            this.loading = false;
            var self = this
              this.reset();
              setTimeout(function () {
                self.$router.push({path:"/done"});
              }, 1000)
            // this.$store.commit("form/SET_NOTIFY", {
            //   msg: res.data.message,
            //   type: "Success",
            // });
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
            switch (code) {
              case "service_provider":
                this.style_form = HujajDakhilStyleFormData;
                break;
              case "design_office":
                this.style_form = DesignOfficeStyleFormData;
                break;
              case "contractor":
                this.style_form = ContactorStyleFormData;
                break;
            }
            this.style_form.map(function (v) {

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
                      if (Array.isArray(category) && category.length > 0 && code == "design_office") {
                        // alert(1);
                        category.forEach(function (s) {
                          v.value.push(s.id)
                        });
                      } else if(Array.isArray(category) && category.length > 0 && code == "contractor") {
                        v.value = category[0].id;
                        // alert(category.id)
                      }
                    }
                  }
                }
                else if (isValueNotEmpty(response.data.user[v.value_text])) {
                  v.value = response.data.user[v.value_text];
                }


              } else {
                if (
                  isValueNotEmpty(response.data.company[v.value_text])
                ) {
                  v.value = response.data.company[v.value_text];
                }
              }

              if (v.value_text == "company_name") {
                if (isValueNotEmpty(response.data.company.name))
                  v.value = response.data.company.name;
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
