<template>
  <div>
    <Card>
      <template #action-btn-table="{ item2 }">
        <v-list-item
          v-if="
            item2.contract_status == 'signed' &&
            str_per.indexOf('appointment-create') > -1
          "
        >
          <v-list-item-title class="my-3">
            <span style="cursor: pointer" @click="make_appointment(item2)">
              <v-icon>mdi-pencil</v-icon>
              {{ $t("general.make appointment") }}
            </span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="
            item2.contract_status == 'not_created' &&
            str_per.indexOf('appointment-contract') > -1
          "
        >
          <v-list-item-title class="my-3">
            <span style="cursor: pointer" @click="appointment_contracts(item2)">
              <v-icon>mdi-pencil</v-icon>
              {{ $t("general.appointment contracts") }}
            </span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-else-if="item2.contract_status == 'unsigned'">
          <v-list-item-title class="my-3">
            <span class="text-danger">
              <v-icon>mdi-cicrle</v-icon>
              {{ $t("The request is being processed") }}
            </span>
          </v-list-item-title>
        </v-list-item>
      </template>
    </Card>
    <Modal :data="modal_data"> </Modal>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import Modal from "../Components/Modal.vue";
// import TypeService from "../../services/type.service";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "Appointment-New",
  components: {
    Card,
    Modal,
  },
  data() {
    return {
      loader: false,
      modal_data: {
        size: "600px",
        title: this.$i18n.t("general.make appointment"),
      },
      style_form: [
        {
          col: "12",
          type: "date",
          label: this.$i18n.t("Appointment"),
          error: null,
          value_text: "appointment",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          type: "hidden",
          value_text: "assign_camp_id",
          value: "",
        },
      ],
      btns: [
        {
          type: "icon",
          text: "make_appointment",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          permission: "appointment-create",
        },
        {
          type: "icon",
          text: "appointment_contracts",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          permission: "appointment-contract",
          swal: true,
        },
      ],
      header: [
        {
          text: this.$i18n.t("Company Name"),
          align: "center",
          value: "company_name",
        },
        {
          text: this.$i18n.t("Square"),
          value: "square_name",
          align: "center",
        },
        { text: this.$i18n.t("Camp"), align: "center", value: "camp_name" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("NewAppointment"),
        add_url: null,
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
  },

  methods: {
    ...mapMutations([
      "SET_ID",
      "SET_URL",
      "SET_CARD",
      "SET_COLLECTION",
      "SET_FUNCTION",
    ]),
    ...mapMutations("table", [
      "SET_LOADING",
      "SET_HEADERS",
      "SET_BTNS",
      "SET_ITEMS",
      "SET_BTN_TABLE",
      "SET_PAGINATION",
    ]),
    ...mapActions("appointment", [
      "getData",
      "save_appointment",
      "save_appointment_contracts",
    ]),
    ...mapMutations("form", ["SET_NOTIFY", "SET_FORM_STYLE", "SET_DIALOG"]),
    set_data() {
      this.SET_CARD(this.card);
      this.SET_COLLECTION("appointment");
      this.SET_LOADING(true);

      this.SET_HEADERS(this.header);
      this.SET_BTNS(this.btns);
      this.SET_BTN_TABLE(this.btn_table);
      this.SET_PAGINATION(true);
      this.SET_URL("general/appointments");
    },
    appointment_contracts(item) {
      var data = {
        company_id: item.receiver_company_id,
        assign_camps_id: item.id,
      };
      this.$swal({
        title: this.$i18n.t("Are you sure?"),
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
          this.save_appointment_contracts(data).then(
            (response) => {
              // console.log(response)
              this.$swal.fire(
                this.$i18n.t("Done!"),
                response.data.message,
                "success"
              );
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
            this.$i18n.t("Cancelled Delete"),
            "error"
          );
        }
      });
    },
    make_appointment(item) {
      this.SET_DIALOG(true);
      this.style_form[1].value = item.id;
      this.SET_FORM_STYLE(this.style_form);
      this.SET_ID(item.id);
      // this.save_appointment(item);
      this.SET_FUNCTION("save_appointment");
    },
    get_assigns() {
      this.getData({ reset: true });
    },
  },
  created() {
    console.log(this.$route.params.message);
    if (this.$route.params.message) {
      this.SET_NOTIFY(this.$route.params.message);
    }
  },
  mounted() {
    this.set_data();
    this.get_assigns();
    document.title = this.$i18n.t("NewAppointment");
  },
};
</script>
