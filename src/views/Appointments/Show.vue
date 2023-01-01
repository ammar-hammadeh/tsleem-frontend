<template>
  <div>
    <Card>
      <template #table-column="{ item2 }">
        {{ item2.appointment | formatDate }}
      </template>
      <template #action-btn-table="{ item2 }">
        <v-list-item
          v-if="
            str_per.indexOf('appointment-update') > -1 &&
            item2.status != 'answered' &&
            item2.status != 'deliverd'
          "
        >
        {{classBtn('d-block')}}
          <v-list-item-title class="my-3">
            <!-- {{ item2.status }} -->
            <span style="cursor: pointer" @click="edit_appoint(item2)">
              <v-icon>mdi-calendar-clock</v-icon>
              {{ $t("general.edit appointment") }}
            </span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="str_per.indexOf('appointment-form-view') > -1">
          {{classBtn('d-block')}}
          <v-list-item-title class="my-3">
            <!-- item2.status == 'answered'
                  ? 'appointments/' +
                    item2.assign_camp_id +
                    '/form?type=' +
                    item2.status
                  : -->
            <a
              style="color: #67748e"
              class="text-decoration-none"
              :href="'appointments/' + item2.assign_camp_id + '/form'"
            >
              <v-icon>mdi-eye</v-icon>
              {{ $t("View delivery records") }}
            </a>
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
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
// import TypeService from "../../services/type.service";
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
        title: null,
      },
      type: "",
      style_form: [
        {
          col: "12",
          type: "datetime",
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
        // {
        //   type: "icon",
        //   text: "edit_appointment",
        //   color: "bg-gradient-success",
        //   icon: "mdi-pencil",
        //   permission: "appointment-update",
        // },
        // {
        //   type: "icon",
        //   text: "send_appointment",
        //   color: "bg-gradient-success",
        //   icon: "mdi-send",
        //   permission: "appointment-send",
        // },
        // {
        //   type: "icon",
        //   text: "view_delivery_records",
        //   url: "/appointment/form/",
        //   item: true,
        //   color: "bg-gradient-success",
        //   icon: "mdi-eye",
        //   permission: "appointment-form-view",
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
          value: "column",
        },
        {
          text: this.$i18n.t("status"),
          align: "center",
          value: "status_assign",
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
  computed: {
    ...mapGetters("auth", ["str_per"]),
  },

  methods: {
    ...mapMutations([
      "SET_CARD_LOADING",
      "SET_CARD",
      "SET_COLLECTION",
      "SET_URL",
      "SET_FUNCTION",
    ]),
    ...mapActions("appointment", ["getData", "edit_appointment"]),
    ...mapMutations("table", [
      "SET_BTN_TABLE",
      "SET_PAGINATION",
      "SET_LOADING",
      "SET_HEADERS",
      "SET_BTNS",
      "SET_ITEMS",
      "SET_CHECK_PER"
    ]),
    ...mapMutations("form", ["SET_NOTIFY", "SET_FORM_STYLE"]),
    classBtn(val){
      // console.log("val_class "+val)
      return this.SET_CHECK_PER(val)
    },
    set_data() {
      this.SET_CARD(this.card);
      this.SET_COLLECTION("appointment");
      this.SET_FORM_STYLE(this.style_form);
      this.SET_LOADING(true);
      this.SET_HEADERS(this.header);
      this.SET_PAGINATION(true);
      this.SET_BTNS(this.btns);
      this.SET_URL("general/appointments/appointments");
      this.SET_BTN_TABLE(this.btn_table);
    },
    edit_appoint(item) {
      this.edit_appointment(item);
    },
    get_data() {
      if (this.$route.query.status) {
      this.getData(
      { 
        custom : [{name :'status' , value: this.$route.query.status}] ,
        reset: true
      });
    }else{
      this.getData({ reset: true });
    }
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
    this.get_data();
    document.title = this.$i18n.t("AppointmentPage");
  },
};
</script>
