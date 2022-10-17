<template>
  <div>
    <Notify></Notify>
    <v-container v-if="orderDetails != null" fluid class="py-6">
      <v-row>
        <v-col lg="12" class="mx-auto">
          <v-card class="card-shadow border-radius-xl">
            <Loading v-if="loading"></Loading>
            <div class="px-4 pt-4">
              <div class="">
                <div>
                  <h6 class="text-h6 text-typo font-weight-bold mb-2">
                    {{ $t("Order Details") }}
                  </h6>
                  <p class="text-sm text-body mb-0">
                    <v-row>
                      <v-col md="6">
                        <span class="mr-3"
                          >{{ $t("Order ID") }}. <b>{{ orderDetails.id }}</b>
                        </span>
                        <span
                          >{{ $t("from") }}
                          <b>{{ orderDetails.created_at }}</b></span
                        >
                      </v-col>
                      <v-col md="6" class="text-right">
                        <span class="mr-3"
                          >{{ $t("status") }} :
                          <v-chip
                            :color="color_name"
                            class="mr-3 overflow-visible"
                            dark
                            ><b>{{ orderDetails.status }}</b>
                          </v-chip>
                        </span>
                      </v-col>
                    </v-row>
                  </p>
                </div>
              </div>
            </div>
            <div class="px-4 pb-4">
              <hr class="horizontal dark my-6" />
              <v-row>
                <v-col lg="4" md="6">
                  <h6 class="text-h6 text-typo font-weight-bold mb-4">
                    {{ $t("Billing Information") }}
                  </h6>
                  <div
                    class="d-flex flex-column bg-gray-100 pa-6 border-radius-lg"
                  >
                    <h6 class="text-typo font-weight-bold mb-4 text-sm">
                      {{ orderDetails.name }}
                    </h6>
                    <span class="mb-2 text-body text-xs"
                      >{{ $t("auth.Email Address") }}:
                      <span class="text-dark ms-2 font-weight-bold">{{
                        orderDetails.email
                      }}</span></span
                    >
                    <span class="text-xs text-body"
                      >{{ $t("Mobile") }}:
                      <span class="text-dark ms-2 font-weight-bold">{{
                        orderDetails.phone
                      }}</span></span
                    >
                    <span class="text-xs text-body"
                      >{{ $t("Address") }}:
                      <span class="text-dark ms-2 font-weight-bold">{{
                        orderDetails.address
                      }}</span>
                    </span>
                    <span class="text-xs text-body"
                      >{{ $t("Country") }}:
                      <span class="text-dark ms-2 font-weight-bold">{{
                        orderDetails.country_name
                      }}</span>
                    </span>
                    <span class="text-xs text-body"
                      >{{ $t("City") }}:
                      <span class="text-dark ms-2 font-weight-bold">{{
                        orderDetails.city_name
                      }}</span>
                    </span>
                  </div>
                </v-col>
                <v-col lg="3" class="ms-auto">
                  <h6 class="text-h6 text-typo font-weight-bold mb-3">
                    {{ $t("Order Summary") }}
                  </h6>
                  <div class="d-flex">
                    <span class="mb-2 text-body text-sm"> total count: </span>
                    <span class="text-dark font-weight-bold ml-7">{{
                      orderDetails.total_count
                    }}</span>
                  </div>
                  <div class="d-flex">
                    <span class="mb-2 text-body text-sm"> discount: </span>
                    <span class="text-dark font-weight-bold ml-7">{{
                      orderDetails.discount
                    }}</span>
                  </div>
                  <div class="d-flex">
                    <span class="mb-2 text-body text-sm"> total price: </span>
                    <span class="text-dark font-weight-bold ml-7">{{
                      orderDetails.total_price
                    }}</span>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>

        <v-col lg="12" class="mx-auto">
          <v-card class="card-shadow border-radius-xl">
            <div class="px-4 py-4">
              <div class="d-flex align-center">
                <div>
                  <h6 class="text-h6 text-typo font-weight-bold mb-2">
                    {{ $t("Products") }}
                  </h6>
                </div>
              </div>
              <div>
                <Table></Table>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <Modal ref="MyModal"></Modal>
      <!-- @save="submit_change_quantity"
        :data="modal_data" -->
    </v-container>
  </div>
</template>
<script>
import Loading from "../Components/Loading.vue";
import Modal from "../Components/Modal.vue";
import Table from "../Components/Table.vue";
import Notify from "../Components/Notify.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("order");
export default {
  name: "Order-Details",
  components: {
    Table,
    Loading,
    Notify,
    Modal,
  },
  data() {
    return {
      loading: true,
      modal_data: {},
      data_quantity: [
        {
          col: "12",
          type: "number",
          label: this.$i18n.t("Quantity"),
          value_text: "quantity",
          error: null,
          rules: [(v) => !!v || "tem is required"],
        },
      ],

      btns: [
        {
          type: "icon",
          text: "change_quantity",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          permission: "order-product-change-quantity",
        },
        {
          type: "icon",
          text: "delete_item",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "order-product-delete",
        },
      ],
      header: [
        { text: "Name", value: "name", align: "center" },
        { text: "Name In Arabic", value: "name_ar", align: "center" },
        { text: "Category", value: "category", align: "center" },
        { text: "Code", value: "code", align: "center" },
        { text: "Description", value: "description", align: "center" },
        { text: "quantity", value: "quantity", align: "center" },
        { text: "Status", value: "status", align: "center" },
        { text: "Off", value: "off", align: "center" },
        { text: "Appear First", value: "appear_first", align: "center" },
        { text: "Action", value: "btns", align: "center" },
      ],

      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState(["orderDetails"]),
    color_name() {
      if (this.orderDetails.order_status_id == "1") {
        return "red";
      } else {
        return "green";
      }
    },
  },
  methods: {
    ...mapActions([
      "getOrderDetailsAction",
      "deleteOrderItemAction",
      "changeOrderItemQuantityAction",
    ]),
    action(id, name) {
      if (name == "Change Quantity") {
        this.change_quantity(id);
      } else if (name == "Delete") {
        this.delete_item(id);
      }
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "order");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("form/SET_FORM_STYLE", this.data_quantity);
    },

    get_order_details() {
      return this.getOrderDetailsAction(this.id).then(
        (response) => {
          console.log(response);
          this.$store.commit("table/SET_ITEMS", this.orderDetails.products);
          this.loading = false;
          this.$store.commit("table/SET_LOADING", false);
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.$store.commit("table/SET_LOADING", false);
          this.$store.commit("form/SET_NOTIFY", {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          });
        }
      );
    },
  },
  created() {
    if (this.$route.params.message) {
      this.message = this.$route.params.message;
    }
  },
  mounted() {
    this.get_order_details();
    this.set_data();
    document.title = this.$i18n.t("Order Details");
  },
};
</script>
