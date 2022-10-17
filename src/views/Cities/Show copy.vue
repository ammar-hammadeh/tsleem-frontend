<template>
  <div>
    <Card>
      <template #url>
        <v-btn
          class="mx-2 btn-primary bg-gradient-blue"
          fab
          dark
          small
          @click="add()"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
    </Card>
    <Modal :modal="modal_data">
      <template #body>
        <Form :btn="true" :data="style_form" @save="handelSubmit"> </Form>
      </template>
    </Modal>
  </div>
</template>
<script>
import Card from "../Components/Card";
import Form from "../Components/FormSlot";
import Modal from "../Components/Modal";
import CityService from "../../services/city.service";
import { mapMutations } from "vuex";

export default {
  name: "City-Page",
  components: {
    Card,
    Form,
    Modal,
  },
  data() {
    return {
      modal_data: {
        size: "600px",
        title: "",
        dialog: false,
      },
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("Name"),
          placeholder: "تبوك",
          error: null,
          value_text: "name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      btns: [
        {
          type: "icon",
          text: "edit_city",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          url: "/city/update/",
          item: true,
          permission: "city-update",
        },
      ],
      header: [
        { text: this.$i18n.t("Name"), align: "center", value: "name" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("cities"),
        add_url: "/city/create",
        permission: "city-create",
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },
  methods: {
    ...mapMutations(["SET_CARD_LOADING", "SET_CARD", "SET_COLLECTION"]),
    ...mapMutations("table", [
      "SET_LOADING",
      "SET_HEADERS",
      "SET_BTNS",
      "SET_ITEMS",
    ]),
    ...mapMutations("form", ["SET_NOTIFY"]),
    set_data() {
      this.SET_CARD(this.card);
      this.SET_COLLECTION("city");
      this.SET_LOADING(true);
      this.SET_HEADERS(this.header);
      this.SET_BTNS(this.btns);
    },
    handelSubmit(valid, data) {
      var data = data.map(function (item) {
        return item.value;
      });
      console.log(data);
    },
    add() {
      this.modal_data.dialog = true;
      this.modal_data.title = "add city";
    },
    get_cities() {
      // for filter
      // this.getData({ reset: true });
      // this.getData({});
      this.SET_LOADING(true);
      return CityService.get_cities().then(
        (response) => {
          this.SET_LOADING(false);
          this.SET_ITEMS(response.data.data);
        },
        (error) => {
          console.log(error);
          this.SET_LOADING(false);
          this.SET_NOTIFY({
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          });
        }
      );
    },
  },
  created() {
    if (this.$route.params.message) {
      this.$store.commit("form/SET_NOTIFY", this.$route.params.message);
    }
  },
  mounted() {
    this.get_cities();
    this.set_data();
    document.title = this.$i18n.t("cities");
  },
};
</script>
