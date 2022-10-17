<template>
  <main>
    <v-container fluid>
      <Notify ref="myNotify"></Notify>
      <v-row>
        <v-col lg="10" cols="12" class="mx-auto mb-6">
          <v-card class="card-shadow border-radius-xl mt-6" id="basic">
            <Loading v-if="loading"></Loading>
            <div class="px-6 py-6">
              <h5 class="text-h5 font-weight-bold text-typo">
                {{ $t("Order Status") }}
              </h5>
            </div>
            <div class="px-6">
              <v-row>
                <v-col lg="6" cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1">{{
                    $t("status")
                  }}</label>
                  <v-text-field
                    outlined
                    color="rgba(0,0,0,.6)"
                    class="font-size-input placeholder-lighter text-light-input"
                    v-model="form_data.status"
                    :error-messages="error"
                    :rules="[
                      (v) => !!v || this.$i18n.t('form.Item is required'),
                    ]"
                  >
                  </v-text-field>
                </v-col>
                <v-col
                  lg="1"
                  cols="12"
                  :class="[this.type == 'edit' ? 'd-none' : 'd-block']"
                  v-if="str_per.indexOf('order-status-create') > -1"
                >
                  <v-btn
                    :class="`font-weight-bold py-2 px-1 text-white bg-gradient-primary mt-6`"
                    @click="add()"
                    :loading="loader"
                  >
                    <v-icon>mdi-plus</v-icon>
                    <span slot="loader">
                      <v-progress-circular
                        style="width: 20px; height: 20px"
                        indeterminate
                        color="white"
                      ></v-progress-circular>
                    </span>
                  </v-btn>
                </v-col>
                <v-col
                  lg="1"
                  cols="12"
                  v-if="
                    this.type == 'edit' &&
                    str_per.indexOf('order-status-update') > -1
                  "
                >
                  <v-btn
                    :class="`font-weight-bold py-2 px-1 text-white bg-gradient-default mt-6`"
                    @click="update()"
                    :loading="loader"
                  >
                    {{ $t("general.Update") }}
                    <span slot="loader">
                      <v-progress-circular
                        style="width: 20px; height: 20px"
                        indeterminate
                        color="white"
                      ></v-progress-circular>
                    </span>
                  </v-btn>
                </v-col>
                <v-col
                  lg="1"
                  cols="12"
                  v-if="str_per.indexOf('order-status-change-sort') > -1"
                >
                  <v-btn
                    :class="`font-weight-bold py-2 px-1 text-white bg-gradient-secondary mt-6`"
                    @click="bulk()"
                    :loading="loader_bulk"
                  >
                    {{ $t("change sort") }}
                    <span slot="loader">
                      <v-progress-circular
                        style="width: 20px; height: 20px"
                        indeterminate
                        color="white"
                      ></v-progress-circular>
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="8" cols="12" class="mb-6">
                  <div class="container-list">
                    <draggable v-model="orders">
                      <transition-group name="flip-transition">
                        <div
                          class="list-item mb-3"
                          v-for="item in orders"
                          :key="item.sort"
                        >
                          <div>{{ item.sort }} . {{ item.status }}</div>
                          <div>
                            <v-btn
                              v-if="str_per.indexOf('order-status-update') > -1"
                              :title="`edit`"
                              :class="`w-45 font-weight-bold py-2 px-1 mr-2 text-white bg-gradient-success`"
                              @click="editOrder(item)"
                            >
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                              v-if="str_per.indexOf('order-status-delete') > -1"
                              :title="`delete`"
                              :class="`w-45 font-weight-bold py-2 px-1 mr-2 text-white bg-gradient-danger`"
                              @click="deleteOrder(item.id)"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </transition-group>
                    </draggable>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import Form from "../Components/Form.vue";
import Notify from "../Components/Notify.vue";
import Loading from "../Components/Loading.vue";
import draggable from "vuedraggable";
import OrderService from "../../services/order.service";

export default {
  components: {
    Form,
    Loading,
    Notify,
    draggable,
  },
  data() {
    return {
      type: "add",
      loading: true,
      loader: false,
      loader_bulk: false,
      message: {
        msg: null,
        type: null,
      },
      status: null,
      error: "",
      form_data: { status: "", sort: "" },
      orders: [],
      id: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
  },
  methods: {
    ...mapMutations("form", ["SET_NOTIFY"]),
    add() {
      this.loader = true;
      this.form_data.sort = this.orders.length + 1;
      return OrderService.add_order_status(this.form_data).then(
        (response) => {
          console.log(response);
          this.loader = false;
          this.orders.push(response.data.data);
          this.SET_NOTIFY({
            msg: response.data.message,
            type: "Success",
          });
          this.form_data = {
            status: "",
            sort: this.orders.length + 1,
          };
        },
        (error) => {
          console.log(error);
          this.loader = false;
          if (error.response.status == 422) {
            this.error = error.response.data.errors.status;
          } else {
            this.SET_NOTIFY({
              msg: this.$i18n.t("general.there is problem"),
              type: "Danger",
            });
          }
        }
      );
    },
    update() {
      console.log(this.form_data);
      this.loader = true;
      return OrderService.edit_order_status(this.form_data).then(
        (response) => {
          console.log(response);
          this.loader = false;
          // var orders = this.orders.filter(v => v.id != this.id)
          // orders.concat(response.data.data);
          this.form_data = {
            status: "",
            sort: this.orders.length + 1,
          };
          this.SET_NOTIFY({
            msg: response.data.message,
            type: "Success",
          });
        },
        (error) => {
          console.log(error);
          this.loader = false;
          if (error.response.status == 422) {
            this.error = error.response.data.errors.status;
          } else {
            this.SET_NOTIFY({
              msg: this.$i18n.t("general.there is problem"),
              type: "Danger",
            });
          }
        }
      );
    },
    editOrder(item) {
      this.type = "edit";
      this.form_data = item;
      this.id = item.id;
    },
    deleteOrder(id) {
      console.log("id " + id);
      this.$swal({
        title: this.$i18n.t("Are you sure?"),
        text: i18n.t("You won't be able to revert this!"),
        type: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        confirmButtonText: this.$i18n.t("Yes, delete it!"),
        cancelButtonText: this.$i18n.t("No, cancel!"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          return OrderService.delete_order_status(id).then(
            (response) => {
              console.log(response);
              this.orders = this.orders.filter((v) => v.id != id);
              this.$swal.fire(
                this.$i18n.t("Deleted"),
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
    bulk() {
      this.loader_bulk = true;
      return OrderService.bulk_order_status(this.orders).then(
        (response) => {
          console.log(response);
          this.loader_bulk = false;
          this.orders = response.data.data;
          this.orders = this.orders.sort(function (a, b) {
            return a.sort - b.sort;
          });
          this.SET_NOTIFY({
            msg: response.data.message,
            type: "Success",
          });
        },
        (error) => {
          console.log(error);
          this.loader_bulk = false;
          this.SET_NOTIFY({
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          });
        }
      );
    },
    get_order() {
      return OrderService.get_order_status().then(
        (response) => {
          console.log(response);
          this.loading = false;
          this.orders = response.data.data;
          this.orders = this.orders.sort(function (a, b) {
            return a.sort - b.sort;
          });
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.SET_NOTIFY({
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          });
        }
      );
    },
  },
  mounted() {
    this.get_order();
    if (this.type == "add" && str_per.indexOf("order-status-create1") > -1) {
      // if(str_per.indexOf('order-status-create1') > -1){
      this.status = "add";
      // }
    } else if (
      this.type == "edit" &&
      str_per.indexOf("order-status-update") > -1
    ) {
      this.status = "edit";
    }
    document.title = this.$i18n.t("Order Status");
  },
};
</script>
<style>
.flip-transition-move {
  transition: all 0.7s;
}
.list-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-left: 3px solid #777;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.container-list {
  background: #efe6e633;
  border-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 30px 30px 20px;
}
</style>