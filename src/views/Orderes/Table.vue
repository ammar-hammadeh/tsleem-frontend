<template>
  <div class="position-relative">
    <!-- <Loading v-if="exstra.loading"></Loading> -->
    <v-data-table
      :headers="headers"
      :items="items"
      :single-expand="true"
      :expanded.sync="expanded"
      show-expand
      item-key="id"
      :show-select="exstra.select_view"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      :options.sync="options"
      :server-items-length="exstra.total"
      @item-selected="bulk_selection"
      mobile-breakpoint="0"
      loading
      loading-text="Loading... Please wait"
    >
      <v-progress-linear
        v-show="exstra.loading"
        slot="progress"
        color="purple"
        indeterminate
      ></v-progress-linear>
      <!-- :items-per-page-options="[5,10,30,40]" -->

      <!-- <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template> -->

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <!-- {{ item["products"] }} -->
          <div
            class="d-inline-block"
            v-for="(data, index) in item[exstra.data_extend.title]"
            :key="index"
          >
            <v-chip color="green" class="mr-3 overflow-visible" dark>
              <v-badge color="red" :content="data[exstra.data_extend.number]">
                {{ data[exstra.data_extend.name] }}
              </v-badge>
            </v-chip>
          </div>
        </td>
      </template>

      <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
        <v-icon
          v-if="item[exstra.data_extend.title].length > 1"
          :class="[
            'v-data-table__expand-icon',
            { 'v-data-table__expand-icon--active': isExpanded },
          ]"
          @click.stop="expand(!isExpanded)"
          >$expand</v-icon
        >
        <div v-else>
          <div
            class="d-inline-block"
            v-for="(data, index) in item[exstra.data_extend.title]"
            :key="index"
          >
            <v-chip color="green" class="mr-3 overflow-visible" dark>
              <v-badge color="red" :content="data[exstra.data_extend.number]">
                {{ data[exstra.data_extend.name] }}
              </v-badge>
            </v-chip>
          </div>
        </div>
      </template>

      <template v-slot:item.status="{ item }" :id="item.id">
        <div :class="item.order_status_id == 1 ? 'text-danger' : ''">
          {{ item.status }}
        </div>
      </template>

      <template v-slot:item.btns="{ item }" :id="item.id">
        <div class="d-flex justify-content-center" :id="item.id">
          <div class="d-inline-block" v-for="(btn, index) in btns" :key="index">
            <span
              :title="btn.text"
              :class="`btn font-weight-bold  mr-4`"
              @click="action(item, btn.text)"
            >
              <v-icon v-if="btn.type == 'icon'">{{ btn.icon }}</v-icon>
              <div v-else>{{ btn.text }}</div>
            </span>
          </div>
        </div>
      </template>

      <!-- </div> -->
    </v-data-table>
  </div>
</template>
<script>
import Loading from "../Components/Loading.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("order");
export default {
  props: ["items", "exstra"],
  components: {
    Loading,
  },
  data() {
    return {
      options: {},
      search: "",
      selected: [],
      expanded: [],
      headers: [
        { text: "ID", value: "id", align: "center" },
        {
          text: "name",
          value: "customer_name",
          align: "center",
          filterable: false,
        },
        { text: "Address", value: "customer_address", align: "center" },
        { text: "phone", value: "customer_phone", align: "center" },
        { text: "source", value: "utm_sources", align: "center" },
        { text: "Discount", value: "discount", align: "center" },
        { text: "Total Price", value: "total_price", align: "center" },
        { text: "Total Count", value: "total_count", align: "center" },
        { text: "Status", value: "status", align: "center" },
        // {text: 'reasone',value: 'reasone',align: 'center',},
        { text: "Created at", value: "created_at", align: "center" },
        { text: "Product", value: "data-table-expand", align: "center" },
        { text: "Actions", value: "btns", align: "center" },
      ],
      btns: [
        { type: "icon", text: "Details", color: "text-info", icon: "mdi-eye" },
        {
          type: "icon",
          text: "Change Status",
          color: "text-warning",
          icon: "mdi-arrow-up-bold-box-outline",
        },
        {
          type: "icon",
          text: "Cancel",
          color: "text-danger",
          icon: "mdi-minus-circle",
        },
        {
          type: "icon",
          text: "Edit",
          color: "text-success",
          icon: "mdi-pencil",
        },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        console.log("handler");
        // this.getOrderAction()
        this.$emit("get_orders", this.options);
        // this.filter_data(this.options)
      },
      deep: true,
    },
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      console.log(value);
      console.log(search);
      if (value != null && search != null && typeof value === "string") {
        // value.toString().toLocaleLowerCase().indexOf(search) !== -1
      }
    },

    bulk_selection($event) {
      this.selected.push($event.item.id);
      this.$emit("bulk_selection", this.selected);
    },
    action: function (id, name) {
      this.$emit("action", id, name);
    },
  },
};
</script>