<template>
  <div>
    <v-container fluid class="py-8">
      <Notify></Notify>
      <v-row>
        <v-col cols="12">
          <v-card class="card-shadow border-radius-xl">
            <div class="card-header-padding">
              <v-row>
                <v-col cols="6">
                  <h5 class="text-h5 text-typo font-weight-bold mb-3">
                    Orders
                  </h5>
                </v-col>
                <v-col cols="12">
                  <v-btn
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
                      Saving
                    </span>
                    <div>Bulk</div>
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <v-card-text class="px-0 py-0">
              <Table
                @bulk_selection="bulk_selection"
                @action="action"
                @get_orders="get_orders"
                :exstra="exstra"
                :items="orders"
              ></Table>
            </v-card-text>
          </v-card>
          <Modal></Modal>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Table from "./Table.vue";
import Notify from "../Components/Notify.vue";
import Modal from "../Components/Modal.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations, mapGetters } =
  createNamespacedHelpers("order");
export default {
  name: "Order-Page",
  components: {
    Table,
    Notify,
    Modal,
  },
  data() {
    return {
      exstra: {
        loading: false,
        total: 0,
        select_view: true,
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        data_extend: { title: "products", number: "quantity", name: "name" },
      },
      modal_data: {
        size: "1000px",
        title: "",
        dialog: false,
        loader: false,
      },
      data_order: [
        {
          col: "6",
          type: "number",
          label: "discount",
          value_text: "discount",
          error: null,
          value: "",
          rules: [],
        },
        {
          col: "6 ",
          col_id: "col_reason",
          type: "select",
          title_select: "reason",
          type_select: "single",
          label: "product discount reason id",
          value_text: "product_discount_reason_id",
          items: [],
          error: null,
          value: "",
          rules: [],
        },
      ],
      data_ads_order: [
        {
          col: "4",
          type: "text",
          label: "customer name",
          value_text: "customer_name",
          error: null,
          value: "",
          rules: [(v) => !!v || "tem is required"],
        },
        {
          col: "4",
          type: "number",
          label: "customer phone",
          value_text: "customer_phone",
          error: null,
          value: "",
          rules: [(v) => !!v || "tem is required"],
        },
        {
          col: "4",
          type: "text",
          label: "customer address",
          value_text: "customer_address",
          error: null,
          value: "",
          rules: [(v) => !!v || "tem is required"],
        },
        {
          col: "4",
          col_id: "col_gender",
          type: "select",
          type_select: "single",
          label: "customer gender",
          value_text: "customer_gender",
          items: [],
          error: null,
          value: "",
          rules: [(v) => !!v || "Item is required"],
        },
        {
          col: "4",
          col_id: "col_country",
          type: "select",
          type_select: "single",
          label: "country",
          value_text: "country_id",
          items: [],
          error: null,
          value: "",
          rules: [(v) => !!v || "Item is required"],
          action: "change_country",
        },
        {
          col: "4",
          col_id: "col_city",
          type: "select",
          type_select: "single",
          label: "city",
          value_text: "city_id",
          items: [],
          error: null,
          value: "",
          rules: [(v) => !!v || "Item is required"],
        },
        {
          col: "4",
          type: "number",
          label: "discount",
          value_text: "discount",
          error: null,
          value: "",
          rules: [],
        },
        {
          col: "4",
          col_id: "col_reason",
          type: "select",
          title_select: "reason",
          type_select: "single",
          label: "product discount reason id",
          value_text: "product_discount_reason_id",
          items: [],
          error: null,
          value: "",
          rules: [],
        },
      ],
      loading: false,
      loading_bulk: false,
    };
  },

  computed: {
    ...mapState(["orders", "cities"]),
    ...mapGetters(["get_cities"]),
  },
  methods: {
    ...mapMutations(["SET_OBJ", "SET_ITEM"]),
    ...mapActions([
      "getOrderAction",
      "changeStatusAction",
      "cancelOrderAction",
      "bulkChangeStatusAction",
      "editOrderAction",
    ]),
    get_orders(data) {
      this.exstra.loading = true;
      this.getOrderAction(data).then(
        (response) => {
          var res = response.data.data;
          console.log(response.data.data);
          // this.exstra.data_extend = this.orders.products;
          this.exstra.loading = false;
          this.data_ads_order[4].items = res.countries;
          this.data_ads_order[7].items = res.reasons;
          this.data_ads_order[3].items = res.genders;
          this.data_order[1].items = res.reasons;

          var info = response.data.data.orders;
          this.exstra.total = info.total;
          this.exstra.pageCount = info.total;
          this.exstra.itemsPerPage = info.per_page;
          this.exstra.page = info.current_page;
          console.log(this.exstra.pageCount);
        },
        (error) => {
          console.log(error);
          this.exstra.loading = false;
          this.$store.commit("form/SET_NOTIFY", {
            msg: "يوجد مشكلة الرجاء المحاولة لاحقا",
            type: "Danger",
          });
        }
      );
    },
    action(item, name) {
      if (name == "Details") {
        this.details(item);
      } else if (name == "Change Status") {
        this.change_status(item);
      } else if (name == "Edit") {
        this.edit(item);
      } else if (name == "Cancel") {
        this.cancel(item);
      }
    },
    edit(item) {
      this.$store.commit("form/SET_DIALOG", true);
      this.SET_OBJ({ country_id: item.country_id });
      if (item.utm_source_id == 1) {
        this.modal_data.size = "500";
        for (let i = 0; i < this.data_order.length; i++) {
          const element = this.data_order[i];
          element.value = item[element.value_text];
        }
        this.$store.commit("form/SET_FORM_STYLE", this.data_order);
      } else {
        this.modal_data.size = "1000";
        this.data_ads_order[5].items = this.get_cities;
        for (let i = 0; i < this.data_ads_order.length; i++) {
          const element = this.data_ads_order[i];
          element.value = item[element.value_text];
        }
        this.$store.commit("form/SET_FORM_STYLE", this.data_ads_order);
      }
      this.SET_ITEM(item);
      this.$store.commit("SET_COLLECTION", "order");
      this.$store.commit("SET_FUNCTION", "editOrderAction");
      this.modal_data.title = "Edit Order Information # " + item.id;
      this.$store.commit("form/SET_MODAL", this.modal_data);
    },
    change_status(item) {
      console.log("change");
      this.exstra.loading = true;
      this.changeStatusAction(item.id).then(
        (response) => {
          console.log(response);
          this.exstra.loading = false;
          this.$store.commit("form/SET_NOTIFY", {
            msg: response.data.message,
            type: "Success",
          });
        },
        (error) => {
          console.log(error);
          this.exstra.loading = false;
          this.$store.commit("form/SET_NOTIFY", {
            msg: "يوجد مشكلة الرجاء المحاولة لاحقا",
            type: "Danger",
          });
        }
      );
    },
    cancel(item) {
      console.log(item);
      if (item.order_status_id == 1) {
        this.$store.commit("form/SET_NOTIFY", {
          msg: "this order is already Canceled",
          type: "Warning",
        });
      } else {
        this.$swal({
          title: "Are you sure?!",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-danger",
          },
          confirmButtonText: "Yes, Cancel it!",
          cancelButtonText: "No, back!",
          reverseButtons: true,
        }).then((result) => {
          if (result.value) {
            this.cancelOrderAction(item.id).then(
              (response) => {
                console.log(response);
                this.$swal.fire(
                  "Canceld Order!",
                  response.data.message,
                  "success"
                );
              },
              (error) => {
                console.log(error);
                this.$swal.fire(
                  "Error",
                  "There error please try again",
                  "error"
                );
              }
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire("Cancelled", "Cancelled Delete", "error");
          }
        });
      }
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
            msg: "يوجد مشكلة الرجاء المحاولة لاحقا",
            type: "Danger",
          });
        }
      );
    },
    bulk_selection(data) {
      this.selected = data;
    },
    details(item) {
      console.log("details");
      this.$router.push({ path: `/order/order-details/${item.id.toString()}` });
    },
  },
  created() {
    if (this.$route.params.message) {
      this.$store.commit("form/SET_NOTIFY", this.$route.params.message);
    }
  },
  mounted() {
    // this.get_orders()
  },
};
</script>
