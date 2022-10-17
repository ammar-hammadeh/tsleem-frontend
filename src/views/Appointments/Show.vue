<template>
  <div>
    <Card></Card>
    <Modal :data="modal_data"> </Modal>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import Modal from "../Components/Modal.vue";
// import TypeService from "../../services/type.service";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Appointment-Page",
  components: {
    Card,
    Modal,
  },
  data() {
    return {
      loader: false,
      modal_data: {
        size: "600px",
        title: this.$i18n.t("Reschedule an appointment"),
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
          text: "edit_appointment",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          permission: "appointment-update",
        },
        {
          type: "icon",
          text: "send_appointment",
          color: "bg-gradient-success",
          icon: "mdi-send",
          permission: "appointment-send",
        },
        // {
        //   type: "icon",
        //   text: "contract_view",
        //   url: "/appointment/contract/",
        //   item: true,
        //   color: "bg-gradient-success",
        //   icon: "mdi-eye",
        //   permission: "appointment-contract-view",
        // },
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
        {
          text: this.$i18n.t("appointment"),
          align: "center",
          value: "appointment",
        },
        {
          text: this.$i18n.t("status"),
          align: "center",
          value: "appointment_status",
        },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("AppointmentPage"),
        add_url: null,
        // permission: "type-create",
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },

  methods: {
    ...mapMutations([
      "SET_CARD_LOADING",
      "SET_CARD",
      "SET_COLLECTION",
      "SET_URL",
      "SET_FUNCTION",
    ]),
    ...mapActions("appointment", ["getData"]),
    ...mapMutations("table", [
      "SET_BTN_TABLE",
      "SET_PAGINATION",
      "SET_LOADING",
      "SET_HEADERS",
      "SET_BTNS",
      "SET_ITEMS",
    ]),
    ...mapMutations("form", ["SET_NOTIFY", "SET_FORM_STYLE"]),
    set_data() {
      this.SET_CARD(this.card);
      this.SET_COLLECTION("appointment");
      this.SET_FUNCTION("update_appointment");
      this.SET_FORM_STYLE(this.style_form);
      this.SET_LOADING(true);
      this.SET_HEADERS(this.header);
      this.SET_PAGINATION(true);
      this.SET_BTNS(this.btns);
      this.SET_URL("general/appointments/appointments");
      this.SET_BTN_TABLE(this.btn_table);
    },
    get_types() {
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
    this.get_types();
    document.title = this.$i18n.t("AppointmentPage");
  },
};
</script>
