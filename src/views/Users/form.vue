<template>
  <div>
    <v-container fluid class="py-8">
      <Loading v-if="loading"></Loading>
      <Notify></Notify>
      <div class="mt-10">
        <v-app-bar color="light" class="mb-5 border-left-primary">
          <v-toolbar-title>{{ $t("sidebar.Register Form") }}</v-toolbar-title>
          <button
            v-if="
              $store.getters['auth/str_per'].indexOf(
                'customer-register-form-create'
              ) > -1
            "
            class="py-5 mb-0 ms-auto"
            @click="add()"
          >
            <v-icon class="custome-btn btn-primary">fas fa-plus</v-icon>
          </button>
        </v-app-bar>
        <div id="stepWizard" v-if="tab_inqueries.length > 0">
          <ul class="nav-wizard">
            <li
              v-for="(item, i) in tab_inqueries"
              :key="i"
              @click="activeity(i)"
              :class="[activeTab == i ? 'active' : '']"
              class="tab-link"
            >
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="tabs_content mt-8">
          <v-card
            v-for="(item, i) in tab_inqueries"
            :key="i"
            v-if="activeTab == i"
            class="card-shadow card-padding pt-5"
          >
            <div>
              <div class="text-right">
                <div class="d-inline-block">
                  <span
                    v-if="
                      $store.getters['auth/str_per'].indexOf(
                        'customer-register-form-update'
                      ) > -1
                    "
                    :title="$t('general.edit')"
                    :class="`btn font-weight-bold  mr-4`"
                    @click="edit(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </span>
                  <span
                    v-if="
                      $store.getters['auth/str_per'].indexOf(
                        'customer-register-form-delete'
                      ) > -1
                    "
                    :title="$t('general.edit')"
                    :class="`btn font-weight-bold  mr-4`"
                    @click="destroy(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </span>
                </div>
              </div>
            </div>
            <v-list-item
              class="py-3"
              v-for="(inquery, index) in item.get_inquiries"
              :key="index"
            >
              <v-list-item-content class="py-0">
                <div class="d-flex flex-column text-start">
                  <span class="text-sm text-typo mb-3 font-weight-bold">
                    {{ inquery.inquery_lang }}
                  </span>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
      </div>
      <Modal :data_modal="modal_data" :inquieries="inquieries_modal">
        <template #body>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div class="">
              <v-row>
                <v-col lg="12" class="py-0">
                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("section name")
                  }}</label>
                  <v-text-field
                    type="text"
                    outlined
                    color="rgba(0,0,0,.6)"
                    class="font-size-input placeholder-lighter text-light-input"
                    :rules="[(v) => !!v || $t('form.Item is required')]"
                    v-model="data.tab"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2">
                <v-col lg="12" class="py-0 text-left">
                  <button
                    class="d-block py-2 px-5 mb-0 btn-primary"
                    @click.prevent="add_inquery"
                  >
                    {{ $t("add inquiry") }}
                    <!-- <v-icon class="custome-btn btn-primary"
                        >fas fa-plus</v-icon
                      > -->
                  </button>
                </v-col>
              </v-row>
              <v-row
                class=""
                v-for="(input, index) in data.form_data_inqueries"
                :key="`dataInput-${index}`"
              >
                <v-col lg="6" class="py-0">
                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("inquiry.Inquery Text")
                  }}</label>
                  <v-autocomplete
                    :value="input.inquiry_id"
                    :items="computedItems"
                    :label="$t('general.choose')"
                    dense
                    outlined
                    :rules="[(v) => !!v || $t('form.Item is required')]"
                    @change="select_inquery(input, $event)"
                  ></v-autocomplete>
                </v-col>
                <v-col lg="4" class="py-0">
                  <v-checkbox
                    class="mt-6"
                    :label="$t('required')"
                    :value="input.is_required"
                    v-model="input.is_required"
                  ></v-checkbox>
                  <!-- :error-messages="item.error" -->
                </v-col>

                <v-col lg="2" class="py-0">
                  <button
                    class="d-inline-block px-2 mb-0 mt-5 ms-auto"
                    style="line-height: 3"
                    @click.prevent="remove_inquery(index)"
                  >
                    <v-icon color="#344767" class="font-20">fa fa-trash</v-icon>
                  </button>
                </v-col>
              </v-row>
            </div>
          </v-form>
        </template>
        <template #footer>
          <v-btn
            :loading="loader"
            class="bg-gradient-primary mw-80"
            color="white"
            text
            @click="save_form()"
          >
            <span slot="loader">
              <v-progress-circular
                style="width: 20px; height: 20px"
                indeterminate
                color="white"
              ></v-progress-circular>
            </span>
            {{ $t("form.save") }}
          </v-btn>
        </template>
      </Modal>
    </v-container>
  </div>
</template>
<script>
import Modal from "../Components/Modal.vue";
import Loading from "../Components/Loading.vue";
import Notify from "../Components/Notify.vue";
// import customerService from "../../../services/customer.service";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("customer");
export default {
  name: "Profile-Customer",
  components: {
    Modal,
    Loading,
    Notify,
  },
  data() {
    return {
      loader: false,
      id: null,
      valid: true,
      form_data: {
        selected: [],
        tab: "",
        form_data_inqueries: [{ inquiry_id: "", is_required: false }],
      },
      loader_form: false,
      loading: false,
      activeTab: 0,
      modal_data: {
        size: "600px",
        title: "",
        dialog: false,
      },
      message: {
        msg: "",
        type: "",
      },
      inquieries_modal: [],
      type_modal: 0,
      tab_inqueries: [],
    };
  },
  computed: {
    ...mapState(["tab_inqueries", "inqueries"]),
    classLang() {
      return {
        "pl-0": !this.$vuetify.rtl,
        "pr-0": this.$vuetify.rtl,
      };
    },
  },
  methods: {
    ...mapActions(["getTabsInquery", "saveTabInquery", "destroyTabInquiry"]),
    validate() {
      return this.$refs.myFormModal.validate();
    },
    activeity(val) {
      this.activeTab = val;
    },
    getDetails() {
      this.loading = true;

      this.getTabsInquery().then(
        (response) => {
          // this.activeTab = this.tab_inqueries[0].id;
          this.inquieries_modal = this.inqueries;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          // console.log(error);
        }
      );
    },
    add() {
      this.type_modal = 0;
      this.id = null;
      this.modal_data.dialog = true;
      this.modal_data.title = this.$i18n.t("create new section");
    },
    edit(item) {
      this.type_modal = 1;
      this.form_data.form_data_inqueries = [];
      console.log(this.form_data.selected);
      this.modal_data.dialog = true;
      this.modal_data.title = this.$i18n.t("edit section") + item.name;
      this.form_data.tab = item.name;
      this.id = item.id;
      for (let i = 0; i < item.get_inquiries.length; i++) {
        const element = item.get_inquiries[i];
        this.form_data.form_data_inqueries.push({
          inquiry_id: parseInt(element.register_form_inquiry.inquiry_id),
          is_required: element.register_form_inquiry.is_required,
        });
        this.form_data.selected.push(
          parseInt(element.register_form_inquiry.inquiry_id)
        );
      }
    },
    save_data(data, valid) {
      this.loader_form = true;
      if (valid) {
        this.saveTabInquery({
          data: data,
          type: this.type_modal,
          id: this.id,
        }).then(
          (res) => {
            this.loader_form = false;
            if (res.data.code && res.data.code == 500) {
              this.$store.dispatch("form/setNotify", {
                msg: res.data.message,
                type: "Danger",
              });
            } else {
              if (this.type_modal == 0) {
                this.activeTab = this.tab_inqueries.length - 1;
              }
              this.modal_data.dialog = false;
              this.$store.dispatch("form/setNotify", {
                msg: res.data.message,
                type: "Success",
              });
            }
          },
          (error) => {
            this.loader_form = false;
            if (error.response.status == 422) {
              let errors = Object.values(error.response.data.errors);
              var msg = errors.toString();
              this.$store.dispatch("form/setNotify", {
                msg: msg,
                type: "Danger",
              });
            } else {
              this.$store.dispatch("form/setNotify", {
                msg: this.$i18n.t("general.there is problem"),
                type: "Danger",
              });
            }
          }
        );
      } else {
        this.loader_form = false;
      }
    },
    destroy(id) {
      this.$swal({
        title: this.$i18n.t("general.Are you sure?!"),
        text: this.$i18n.t("You won't be able to revert this!"),
        type: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        confirmButtonText: this.$i18n.t("general.Yes, delete it!"),
        cancelButtonText: this.$i18n.t("general.No, cancel!"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.destroyTabInquiry(id).then(
            (response) => {
              // console.log(response)
              this.$swal.fire(
                this.$i18n.t("general.Deleted!"),
                response.data.message,
                "success"
              );
            },
            (error) => {
              console.log(error);
              this.$swal.fire(
                this.$i18n.t("general.Error"),
                this.$i18n.t("general.There error please try again"),
                "error"
              );
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal.fire(
            this.$i18n.t("general.Cancelled"),
            this.$i18n.t("general.Cancelled Delete"),
            "error"
          );
        }
      });
    },
  },
  mounted() {
    this.getDetails();
    document.title = this.$i18n.t("sidebar.Register Form");
  },
};
</script>

