<template>
  <div>
    <v-container fluid class="py-8">
      <Loading v-if="loading"></Loading>
      <Notify></Notify>
      <div class="mt-10">
        <v-app-bar color="light" class="mb-5 border-left-primary">
          <v-toolbar-title>{{ $t("FormPage") }}</v-toolbar-title>
          <v-btn
            v-if="
              $store.getters['auth/str_per'].indexOf('tamplate-form-create') >
              -1
            "
            class="mx-2 ms-auto btn-primary bg-gradient-blue"
            fab
            dark
            small
            link
            to="forms/create"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
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
              <div class="text-left">
                <div class="d-inline-block">
                  <v-btn
                    link
                    icon
                    :to="'/forms/update/' + item.id"
                    v-if="
                      $store.getters['auth/str_per'].indexOf(
                        'tamplate-form-update'
                      ) > -1
                    "
                    :title="$t('general.edit')"
                    :class="`btn font-weight-bold  mr-4`"
                  >
                    <v-icon size="16">mdi-pencil</v-icon>
                  </v-btn>
                  <span
                    v-if="
                      $store.getters['auth/str_per'].indexOf(
                        'tamplate-form-delete'
                      ) > -1
                    "
                    :title="$t('general.delete')"
                    :class="`btn font-weight-bold  mr-4`"
                    @click="destroy(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </span>
                </div>
              </div>
            </div>
            <v-row>
              <v-col cols="12">
                <div class="text-md text-typo font-weight-bolder ms-1">
                  {{ $t("body") }}
                </div>
                <div class="mt-3 mr-2">
                  {{ item.body }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="text-md text-typo font-weight-bolder ms-1">
                  {{ $t("signers") }}
                </div>
              </v-col>
              <v-col cols="12">
                <v-list-item
                  v-for="(item, index) in item.signers"
                  :key="index"
                  class="py-1"
                >
                  <v-list-item-content class="py-0">
                    <div class="d-flex flex-column text-start">
                      <span class="text-sm text-body mb-3">
                        {{ item.types.name }}
                      </span>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <!--     Questions       -->
            <v-row v-if="item.questions && item.questions.length">
              <v-col cols="12">
                <div class="text-md text-typo font-weight-bolder ms-1">
                  {{ $t("Questions") }}
                </div>
              </v-col>
              <v-col
                cols="6"
                lg="3"
                v-for="(inquery, index) in item.questions"
                :key="index"
              >
                <v-list-item class="py-3">
                  <v-list-item-content class="py-0">
                    <div class="d-flex flex-column text-start">
                      <span class="text-sm text-body mb-3">
                        {{ inquery.title }}
                      </span>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row v-if="item.categories && item.categories.length">
              <v-col cols="12">
                <div class="text-md text-typo font-weight-bolder ms-1">
                  {{ $t("QuestionCategory") }}
                </div>
              </v-col>
              <v-col
                cols="6"
                lg="3"
                v-for="(inquery, index) in item.categories"
                :key="index"
              >
                <v-list-item class="py-3">
                  <v-list-item-content class="py-0">
                    <div class="d-flex flex-column text-start">
                      <span class="text-sm text-body mb-3">
                        {{ inquery.name }}
                      </span>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import Loading from "../Components/Loading.vue";
import Notify from "../Components/Notify.vue";
import AssignFormService from "../../services/assign_form.service";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("assign_form");
export default {
  name: "Assign-form",
  components: {
    Loading,
    Notify,
  },
  data() {
    return {
      tab_inqueries: [],
      loading: false,
      activeTab: 0,
      message: {
        msg: "",
        type: "",
      },
    };
  },
  computed: {
    // ...mapState(["tab_inqueries", "inqueries"]),
    classLang() {
      return {
        "pl-0": !this.$vuetify.rtl,
        "pr-0": this.$vuetify.rtl,
      };
    },
  },
  methods: {
    ...mapActions(["getTabsInquery", "saveTabInquery", "destroyTabInquiry"]),
    activeity(val) {
      this.activeTab = val;
    },
    getDetails() {
      this.loading = true;

      return AssignFormService.get_forms().then(
        (response) => {
          console.log("response of list", response.data);
          this.tab_inqueries = response.data.forms;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          // console.log(error);
        }
      );
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
          return AssignFormService.destroy_form(id).then(
            (response) => {
              // console.log(response)
              this.tab_inqueries = this.tab_inqueries.filter((v) => v.id != id);
              this.$swal.fire(
                this.$i18n.t("general.Deleted"),
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
    document.title = this.$i18n.t("FormPage");
  },
};
</script>

