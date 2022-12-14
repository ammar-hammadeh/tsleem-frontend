<template>
  <div class="form-card">
    <Loading v-if="loading"></Loading>
    <v-container fluid class="px-6 py-6">
      <v-row>
        <v-col sm="6" cols="12">
          <h5 class="mb-7 text-h5 text-typo font-weight-bold ms-4">
            {{ $t("AppointmentForm") }}
          </h5>
        </v-col>
        <v-col sm="6" cols="12" class="text-left">
          <span class="mx-3" v-if="assign_camp && assign_camp.last_notified">{{ assign_camp.last_notified }}</span> 
          <v-icon @click="notifyAssign" size="25" >ni-bell-55</v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          sm="4"
          class="grid"
          cols="12"
          v-for="(item, index) in forms"
          :key="index"
        >
          <v-card class="shadow-card text-dark border-radius-xl px-4 py-8">
            <div class="check-sign" v-if="item.forms_status == 'signed'">
              <v-btn
                :ripple="false"
                icon
                outlined
                rounded
                :color="'green'"
                width="34px"
                height="34px"
                class="me-4"
              >
                <v-icon size="15" color="green"> mdi-check </v-icon>
              </v-btn>
            </div>
            <v-row no-gutters class="">
              <v-col cols="12" class="my-2">
                <h5
                  class="text-center text-h5 text-dark font-weight-bolder mb-0"
                >
                  {{ item.name }}
                </h5>
              </v-col>
              <v-col cols="12">
                <div class="text-center mt-4 mb-">
                  <div class="d-inline-block mr-2">
                    <v-btn
                      link
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        py-5
                        px-6
                        mb-0
                        bg-gradient-default
                        ms-auto
                      "
                      v-if="str_per.indexOf('appointment-form-answer') > -1 && item.forms_status == 'unsigned'"
                      :to="`/appointments/${$route.params.id}/form/${item.id}`"
                    >
                      {{$t('answers')}}
                      <!-- <v-icon
                        color="#000"
                        size="20"
                      >
                        mdi-clipboard-account
                      </v-icon> -->
                    </v-btn>
                  </div>
                  <div class="d-inline-block mr-2">
                    <v-btn
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        py-5
                        px-6
                        mb-0
                        mr-2
                        bg-gradient-default
                        ms-auto
                      "
                      link
                      v-if="
                        str_per.indexOf('delivery-sign') > -1 &&
                        answered == 1 &&
                        item.forms_status == 'unsigned'
                      "
                      :to="`/appointments/${$route.params.id}/form/${item.id}/signature`"
                    >
                      {{$t('signetures')}}
                      <!-- <v-icon color="#000" size="20"> mdi-pencil </v-icon> -->
                    </v-btn>
                  </div>
                  <div class="d-inline-block mr-2">
                    <v-btn
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        py-5
                        px-6
                        mb-0
                        mr-2
                        bg-gradient-default
                        ms-auto
                      "
                      target="_blank"
                      link
                      v-if="str_per.indexOf('delivery-view') > -1"
                      :to="`/appointments/${$route.params.id}/form/${item.id}/view`"
                    >
                      {{$t('view')}}
                      <!-- <v-icon color="#000" size="20"> mdi-eye </v-icon> -->
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AssignFormService from "../../services/assign_form.service";
import Loading from "../Components/Loading.vue";
import Modal from "../Components/Modal.vue";
import Input from "../Components/Input.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Appointment-Form-Page",
  components: {
    Loading,
    Modal,
    Input,
  },
  data() {
    return {
      answered: 0,
      form: {
        user: "",
      },
      assign_camp:null,
      loader_signature: false,
      user: {
        value_text: "user_id",
        type: "autocomplete",
        label: this.$i18n.t("users"),
        placeholder: this.$i18n.t("users"),
        items: [],
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      loading: false,
      forms: [],
    };
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
  },
  methods: {
    ...mapMutations("form", ["SET_NOTIFY", "SET_FORM_STYLE", "SET_DIALOG"]),
    notifyAssign(){
      const data = new FormData()
      data.append('assign_camps_id', this.$route.params.id)
      for (let i = 0; i < this.forms.length; i++) {
        const element = this.forms[i];
        data.append(`form_ids[${i}]`, element.id)
      }
      this.$swal({
        title: this.$i18n.t("Are you sure to notify ?"),
        text: this.$i18n.t("You won't be able to revert this!"),
        type: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        confirmButtonText: this.$i18n.t("Yes"),
        cancelButtonText: this.$i18n.t("No, cancel!"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          return AssignFormService.sendNotify(data).then(
            (response) => {
              // console.log(response)
              this.$swal.fire(
                this.$i18n.t("Done!"),
                response.data.message,
                "success"
              );
              this.assign_camp = response.data.assign_camp
            },
            (error) => {
              console.log(error);
              this.$swal.fire(
                this.$i18n.t("Error"),
                this.$i18n.t("There error please try again"),
                "error"
              );
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal.fire(
            this.$i18n.t("Cancelled"),
            this.$i18n.t("Cancelled Proccess"),
            "error"
          );
        }
      });
    }
  },
  mounted() {
    this.loading = true;
    document.title = this.$i18n.t("forms");
    return AssignFormService.get_forms_without_question({
      assign_camps_id: this.$route.params.id,
    }).then(
      (response) => {
        this.forms = response.data.forms;
        this.answered = response.data.answered;
        this.assign_camp = response.data.assign_camp
        // this.users.items = response.data.users
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        // console.log(error);
      }
    );
  },
};
</script>
<style scoped>
.shadow-card {
  box-shadow: 0px 4px 18px rgb(0 0 0 / 25%) !important;
  display: flex;
  align-items: center;
}
.check-sign {
  position: absolute;
  top: 18px;
  left: 0px;
}
</style>