<template>
  <div class="position-relative">
    <!-- <Loading v-if="loading"></Loading> -->
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      class="table"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
      mobile-breakpoint="0"
      loading
      loading-text="Loading... Please wait"
    >
      <!-- <template v-for="header in headers" v-slot:item[header.value]="{ item }">
       <div v-html="item[header.value]">test5555 {{item[header.value]}}</div>
     </template> -->

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
    </v-data-table>
    <v-row class="pt-3">
      <v-col md="3">
        <div class="d-flex pl-3">
          <label for="" style="font-size: 14px" class="mr-3 mt-2"
            >Rows Pre Page :
          </label>
          <v-select
            style="width: 36%"
            v-model="itemsPerPage"
            hide-details
            @change="changeItemPage"
            :items="[10, 20, 30]"
            dense
            outlined
          ></v-select>
        </div>
      </v-col>

      <v-col md="9">
        <v-pagination
          prev-icon="fa fa-angle-left"
          next-icon="fa fa-angle-right"
          class="pagination"
          color="#06ab95"
          v-model="page"
          :length="pages"
          @input="handlePageChange"
          total-visible="5"
          circle
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("table");
export default {
  name: "Table",
  data() {
    return {};
  },
  computed: {
    ...mapState(["page", "itemsPerPage", "total", "items", "headers","btns","loading"]),
    pages() {
      return Math.ceil(this.total / this.itemsPerPage) | 0;
    },
  },
  methods: {
    // ...mapActions(["getDataAction"]),
    ...mapMutations(["SET_PAGE","SET_PRE_PAGE"]),
    handlePageChange(page) {
      this.SET_PAGE(page),
      this.$store.dispatch(this.$store.state.collection + '/' + this.$store.state.name_function)
      // this.$emit("get_data_paginate", page);
    },
    changeItemPage($eve) {
      // alert($eve);
      this.SET_PAGE(1),
      this.SET_PRE_PAGE(parseInt($eve)),
      // this.get_tickets(false, "pre_page");
      // this.$emit("change_pre_page", parseInt($eve));
    },
    action: function (id, name, item) {
      this.$emit("action", id, name, item);
    },
  },
};
</script>