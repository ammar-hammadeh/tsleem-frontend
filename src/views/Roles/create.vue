<template>
  <div>
    <!-- <v-hijri-date-picker no-title locale="ar" v-model="date">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)">
        OK
      </v-btn></v-hijri-date-picker
    > -->
    <!-- <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          dense
          v-model="date"
          label="Picker in menu"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-hijri-date-picker
        no-title
        locale="ar"
        v-model="date"
      >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$refs.menu.save(date)"
      >
        OK
      </v-btn>
    </v-hijri-date-picker>
    </v-menu> -->
    <!-- <custom-date-picker v-model="date2"></custom-date-picker> -->
    <CardForm>
      <template #card-form>
        <v-form ref="newRoleForm">
          <v-row class="mt-2">
            <v-col sm="12" cols="12">
              <label class="text-xs text-typo font-weight-bolder ms-1">{{
                $t("Name")
              }}</label>
              <v-text-field
                v-model="form.name"
                :rules="[(v) => !!v || $t('auth.Full Name is required')]"
                lazy-validation
                color="rgba(0,0,0,.6)"
                light
                placeholder="Ex. Admin, Guest..."
                class="font-size-input placeholder-lighter mt-2 mb-4"
              >
              </v-text-field>
            </v-col>

            <v-col sm="12" cols="12">
              <label class="text-xs text-typo font-weight-bolder ms-1">{{
                $t("permissions.Permissions")
              }}</label>
              <div class="row mt-4">
                <div
                  class="perClass col-md-4"
                  v-for="(item, index) in group_per2"
                  :key="`per-${index}`"
                >
                  <!-- <template
                  v-if="
                    group_per.includes(item.group_page) == false
                      ? group_per.push(item.group_page)
                      : ''
                  "
                > -->
                  <div class="card-shadow border-radius-xl p-2">
                    <div class="d-flex bg-gradient-default border-radius-top">
                      <div class="col-10">
                        <h4 class="h2Class">{{ item.group_lang }}</h4>
                      </div>
                      <div class="col-2 text-right">
                        <div class="form-check">
                          <input
                            :class="`form-check-input checkClassAll ${item.group_page}`"
                            type="checkbox"
                            :value="item.id"
                            @change="checkClassAll(item)"
                            :id="`chech_${item.group_page}`"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div
                      class="d-flex"
                      v-for="(ele, ind) in permissions"
                      :key="`per2-${ind}`"
                      v-if="item.group_page == ele.group_page"
                    >
                      <!-- <template > -->
                      <div class="col-10">
                        <span class="h2Class">{{ ele.permission_lang }}</span>
                      </div>
                      <div class="col-2 text-right">
                        <div class="form-check">
                          <input
                            :class="`${ele.group_page} form-check-input checkClass `"
                            type="checkbox"
                            :value="ele.id"
                            @change="set_permission(ele.id)"
                          />
                          <!-- v-model="form.permissions" -->
                        </div>
                      </div>
                      <!-- </template> -->
                    </div>
                  </div>
                  <!-- {{ group_per.push(item.group_page) }} -->
                  <!-- </template> -->
                </div>
              </div>
            </v-col>
            <v-col cols="6" class="text-right">
              <Button
                :title="$t('check all')"
                :classes="'bg-gradient-blue'"
                @click="checkAll"
              ></Button>
            </v-col>
            <v-col cols="6" class="text-left">
              <Button @click="handleSubmit" :loader="loader"></Button>
            </v-col>
          </v-row>
        </v-form>
      </template>
    </CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import Button from "../Components/Button.vue";
import { mapMutations } from "vuex";
export default {
  name: "Create-Role",
  components: {
    CardForm,
    Button,
  },
  data() {
    return {
      menu: false,
      form: {
        name: "",
        permissions: [],
      },
      date2: "",
      group_per: [],
      group_per2: [],
      card: {
        title: this.$i18n.t("role.Build Your System Roles"),
        loading: true,
        sub_title: this.$i18n.t("role.Role info"),
      },
      permissions: [],
      valid: false,
      errors: {},
      error_msg: "",
      loader: false,
      date: "",
    };
  },
  methods: {
    ...mapMutations(["SET_CARD", "SET_CARD_LOADING"]),
    ...mapMutations("form", ["SET_NOTIFY"]),
    checkAll() {
      var elements = document.getElementsByClassName("checkClassAll");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.checked = true;
      }
      var sub_elements = document.getElementsByClassName("checkClass");
      for (let i = 0; i < sub_elements.length; i++) {
        const element = sub_elements[i];
        element.checked = true;
        this.form.permissions.push(parseInt(element.value));
      }
    },
    checkClassAll(item) {
      // alert(1);
      var ele = document.getElementById("chech_" + item.group_page);
      var elements = document.getElementsByClassName(item.group_page);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (ele.checked == 1) {
          element.checked = true;
          if (element.value != "")
            this.form.permissions.push(parseInt(element.value));
        } else {
          element.checked = false;
          this.form.permissions = this.form.permissions.filter(function (
            value
          ) {
            return value != element.value;
          });
        }
      }
    },
    set_permission(val) {
      // console.log(val);
      if (!this.form.permissions.includes(val)) this.form.permissions.push(val);
      else {
        this.form.permissions = this.form.permissions.filter(function (value) {
          return value != val;
        });
        // }
      }
    },
    validate() {
      return this.$refs.newRoleForm.validate();
    },
    set_data() {
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(true);
    },
    getPermissions() {
      this.$http.get("/permissions").then(
        (response) => {
          this.SET_CARD_LOADING(false);
          this.permissions = response.data.data;
          this.permissions.forEach((v) => {
            if (!this.group_per.includes(v.group_page)) {
              this.group_per.push(v.group_page);
              this.group_per2.push({
                group_lang: v.group_lang,
                group_page: v.group_page,
              });
            }
          });
        },
        (error) => {
          this.SET_CARD_LOADING(false);
          // console.log(error);
        }
      );
    },
    async handleSubmit() {
      this.error_msg = "";
      this.loader = true;
      if (this.validate()) {
        await axios
          .post("roles/create", this.form)
          .then((response) => {
            this.error_msg = { msg: response.data.message, type: "Success" };
            this.$router.push({
              path: "/roles",
              params: { message: this.error_msg },
            });
          })
          .catch((error) => {
            this.loader = false;
            if (error && error.response.status == 422) {
              this.errors = error.response.data.errors;
              this.error_msg = "Please Check errors before submit";
            }

            this.error_msg =
              (error.response && error.response.data.message) ||
              error.message ||
              error.toString();
            this.SET_NOTIFY({
              msg: this.error_msg,
              type: "Warning",
            });
          });
      } else {
        this.loader = false;
        this.SET_NOTIFY({
          msg: this.$i18n.t("Please Check errors before submit"),
          type: "Warning",
        });
        return;
      }
    },
  },
  mounted() {
    this.getPermissions();
    this.set_data();
    document.title = this.$i18n.t("Create role");
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