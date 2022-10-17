<template>
  <div>
    <Card>
      <template slot="befor_table">
        <v-col cols="12">
          <v-btn
            v-if="str_per.indexOf('order-bulk') > -1"
            :loading="loading_bulk"
            :class="`font-weight-bold py-2 px-1 mr-2 text-white bg-gradient-primary`"
            @click="bulkchangeStatus()"
          >
            <span slot="loader">
              <v-progress-circular
                style="width: 20px; height: 20px"
                indeterminate
                color="white"
              ></v-progress-circular>
            </span>
            <div>{{ $t("Bulk") }}</div>
          </v-btn>
        </v-col>
      </template>
      <!-- <slot v-slot:table-column="{ item }"> testvariable
        <template v-slot:item.status="{ item }" :id="item.id">
        <div :class="item.order_status_id == 1 ? 'text-danger' : ''">
          {{ item.status }}
        </div>
      </template>
      </slot> -->
    </Card>
    <Modal></Modal>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
// import Table from "./Table.vue";
// import Notify from "../Components/Notify.vue";
import Modal from "../Components/Modal.vue";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Order-Page",
  components: {
    Card,
    // Notify,
    Modal,
  },
  data() {
    return {
      modal_data: {
        size: "1000px",
        title: "",
        dialog: false,
        loader: false,
      },

      header: [
        { text: this.$i18n.t("ID"), value: "id", align: "center" },
        {
          text: this.$i18n.t("Supplier"),
          value: "customer_name",
          align: "center",
          // filterable: false,
        },
        {
          text: this.$i18n.t("Address"),
          value: "customer_address",
          align: "center",
        },
        {
          text: this.$i18n.t("phone"),
          value: "customer_phone",
          align: "center",
        },
        { text: this.$i18n.t("source"), value: "utm_sources", align: "center" },
        { text: this.$i18n.t("Discount"), value: "discount", align: "center" },
        {
          text: this.$i18n.t("Total Price"),
          value: "total_price",
          align: "center",
        },
        {
          text: this.$i18n.t("Total Count"),
          value: "total_count",
          align: "center",
        },
        { text: this.$i18n.t("status"), value: "status", align: "center" },
        // {text: this.$i18n.t('reasone'),value: 'reasone',align: 'center',},
        {
          text: this.$i18n.t("Created at"),
          value: "created_at",
          align: "center",
        },
        {
          text: this.$i18n.t("Product"),
          value: "data-table-expand",
          align: "center",
        },
        { text: this.$i18n.t("Actions"), value: "btns", align: "center" },
      ],
      btns: [
        {
          type: "icon",
          text: "Details",
          color: "text-info",
          icon: "mdi-eye",
          permission: "order-details",
        },
        {
          type: "icon",
          text: "Change Status",
          color: "text-warning",
          icon: "mdi-arrow-up-bold-box-outline",
          permission: "order-change-status",
        },
        {
          type: "icon",
          text: "Cancel",
          color: "text-danger",
          icon: "mdi-minus-circle",
          permission: "order-cancel",
        },
        {
          type: "icon",
          text: "Edit",
          color: "text-success",
          icon: "mdi-pencil",
          permission: "order-update",
        },
      ],
      data_expand: { singleExpand: true, expanded: [], show: true },
      data_extend: {
        title: this.$i18n.t("Products"),
        number: "quantity",
        name: "name",
      },
      card: {
        title: this.$i18n.t("Orders"),
      },
      loading: false,
      loading_bulk: false,
    };
  },

  computed: {
    ...mapState("order", ["orders", "cities"]),
    ...mapGetters("order", ["get_cities"]),
    ...mapGetters("auth", ["str_per"]),
  },
  methods: {
    ...mapActions("order", ["getData", "bulkChangeStatusAction"]),
    get_orders() {
      this.getData({ reset: true });
    },

    bulkchangeStatus() {
      this.loading_bulk = true;
      this.bulkChangeStatusAction(this.selected).then(
        (response) => {
          console.log(response);
          this.loading_bulk = false;
          this.$store.commit("form/SET_NOTIFY", {
            msg: response.data.message,
            type: "Success",
          });
        },
        (error) => {
          console.log(error);
          this.loading_bulk = false;
          this.$store.commit("form/SET_NOTIFY", {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          });
        }
      );
    },
    bulk_selection(data) {
      this.selected = data;
    },

    set_data() {
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_COLLECTION", "order");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("table/SET_SELECT_VIEW", true);
      this.$store.commit("table/SET_DATA_EXTEND", this.data_extend);
      this.$store.commit("table/SET_DATA_EXPAND", this.data_expand);
      // this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
  },
  created() {
    if (this.$route.params.message) {
      this.$store.commit("form/SET_NOTIFY", this.$route.params.message);
    }
  },
  mounted() {
    this.set_data();
    this.get_orders();
    document.title = this.$i18n.t("Orders");
  },
};
</script>
