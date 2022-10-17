<template>
  <div class="position-relative">
    <!-- <Loading v-if="$store.state.table.loading"></Loading> -->
    <!-- {{ items }} -->
    <slot name="table"></slot>
    <v-data-table
      :single-expand="data_expand.singleExpand"
      :expanded.sync="data_expand.expanded"
      :show-expand="data_expand.show"
      :headers="headers"
      :show-select="select_view"
      :items="items"
      item-key="id"
      class="table"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      mobile-breakpoint="0"
      loading
      loading-text="Loading... Please wait"
      :hide-default-footer="pagination"
      :items-per-page="pagination ? paginate.itemsPerPage : 10"
      :page.sync="paginate.page"
      @page-count="pageCount = $event"
    >
      <v-progress-linear
        v-show="loading"
        slot="progress"
        color="#c39a77"
        indeterminate
      ></v-progress-linear>

      <template v-slot:top>
        <!-- <div id="btn_row">
          <v-row class="py-0 my-0">
            <v-col cols="12" sm="6" v-for="(btn, i) in btn_table" :key="i">
              <v-btn
                v-if="btn.visible"
                :ripple="false"
                :class="classLangBtn"
                class="text-white bg-gradient-primary font-weight-bolder"
                small
                @click="event_btn(btn.name, null, btn.global)"
                :loading="btn.loading"
              >
                <span slot="loader">
                  <v-progress-circular
                    style="width: 20px; height: 20px"
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                </span>
                {{ $t("print") }}
              </v-btn>
            </v-col>
          </v-row>
        </div> -->
        <v-text-field
          v-model="search"
          :label="$t('Search')"
          class="mx-4 mt-0"
        ></v-text-field>
      </template>

      <template v-slot:item.column="{ item }">
        <div>
          <slot name="column" :item="item"></slot>
        </div>
      </template>

      <template v-slot:item.created_at="{ item }" :id="item.id">
        {{ item.created_at | formatDate }}
      </template>

      <template v-slot:item.avatar="{ item }" :id="item.id">
        <v-list class="py-0">
          <v-list-item class="px-0 py-1">
            <v-list-item-avatar rounded :size="36" class="my-0 me-5">
              <v-img
                v-if="item.avatar"
                :alt="item.avatar"
                :src="$baseURL + 'storage/' + item.avatar"
                class="border-radius-lg"
              ></v-img>
              <img
                v-else
                src="@/assets/img/no-avatar.jpg"
                alt="Avatar"
                class="border-radius-lg"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                class="mb-0 text-sm text-typo font-weight-bold"
                >{{ item.name }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template v-slot:item.circle="{ item }" :id="item.id">
        <div>
          <v-btn
            :ripple="false"
            icon
            outlined
            rounded
            :color="item.status == 1 ? 'green' : 'red'"
            width="34px"
            height="34px"
            class="me-4"
          >
            <v-icon size="15" color="green" v-if="item.status == 1">
              mdi-check
            </v-icon>
            <v-icon size="15" color="red" v-else> mdi-close </v-icon>
          </v-btn>
        </div>
      </template>

      <!-- <template v-for="header in headers" v-slot:item[header.value]="{ item }">
        <div>test5555 {{ item[header.value] }}</div>
      </template> -->

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <!-- {{ item["products"] }} -->
          <div
            class="d-inline-block"
            v-for="(data, index) in item[data_extend.title]"
            :key="index"
          >
            <v-chip color="green" class="mr-3 overflow-visible" dark>
              <v-badge color="red" :content="data[data_extend.number]">
                {{ data[data_extend.name] }}
              </v-badge>
            </v-chip>
          </div>
        </td>
      </template>

      <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
        <v-icon
          v-if="item[data_extend.title] && item[data_extend.title].length > 1"
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
            v-for="(data, index) in item[data_extend.title]"
            :key="index"
          >
            <v-chip color="green" class="mr-3 overflow-visible" dark>
              <v-badge color="red" :content="data[data_extend.number]">
                {{ data[data_extend.name] }}
              </v-badge>
            </v-chip>
          </div>
        </div>
      </template>

      <template v-slot:item.btns="{ item }" :id="item.id">
        <div :id="item.id">
          <!-- <div v-for="(btn, index) in btns" :key="index">
            <div class="d-inline-block" v-if="btn.permission">
              <span
                v-if="str_per.indexOf(btn.permission) > -1"
                :title="btn.text.replace('_', ' ')"
                :class="`btn font-weight-bold  mr-4`"
                @click="action(item, btn.text)"
              >
                <v-icon v-if="btn.type == 'icon'">{{ btn.icon }}</v-icon>
                <div v-else>
                  {{ $t("general." + btn.text.replace("_", " ")) }}
                </div>
              </span>
            </div>
          </div> -->
          <v-menu top :close-on-click="closeOnClick">
            <template v-slot:activator="{ on, attrs }">
              <!-- class="bg-gradient-default text-white" -->
              <v-btn color="dark" small v-bind="attrs" v-on="on" icon>
                <v-icon size="20">mdi-chevron-triple-down</v-icon>
                <!-- {{ $t("Actions") }} -->
              </v-btn>
            </template>

            <v-list>
              <!-- <slot name="item" v-bind="item"></slot> -->
              <slot name="action-table" :item="item">
                <v-list-item v-for="(btn, index) in btns" :key="index">
                  <v-list-item-title
                    v-if="str_per.indexOf(btn.permission) > -1"
                    class="my-3"
                  >
                    <a
                      v-if="btn.url"
                      style="color: #67748e"
                      class="text-decoration-none"
                      :href="btn.item ? btn.url + item.id : btn.url"
                    >
                      <v-icon v-if="btn.type == 'icon'">{{ btn.icon }}</v-icon>
                      {{ $t("general." + btn.text.replace("_", " ")) }}
                    </a>
                    <span
                      style="cursor: pointer"
                      v-else
                      @click="action(item, btn.text)"
                    >
                      <v-icon v-if="btn.type == 'icon'">{{ btn.icon }}</v-icon>
                      {{ $t("general." + btn.text.replace("_", " ")) }}
                    </span>
                  </v-list-item-title>

                  <!-- <v-list-item-title
                v-else
                  class="my-3"
                  @click="action(item, btn.text)"
                >
                  <v-icon v-if="btn.type == 'icon'">{{ btn.icon }}</v-icon>
                  {{ $t("general." + btn.text.replace("_", " ")) }}
                </v-list-item-title> -->
                </v-list-item>
              </slot>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>
    <v-row class="pt-3" v-if="pagination" id="pagination_table">
      <v-col md="3" v-if="paginate.row_pre_page">
        <div class="d-flex pl-3">
          <label for="" style="font-size: 14px" class="mr-3 mt-2"
            >Rows per Page :
          </label>
          <v-select
            style="width: 36%"
            v-model="paginate.itemsPerPage"
            hide-details
            @change="changeItemPage"
            :items="[10, 20, 30, 50, 100]"
            dense
            outlined
          ></v-select>
        </div>
      </v-col>

      <v-col :md="paginate.row_pre_page ? '9' : '12'" class="text-right">
        <v-pagination
          prev-icon="fa fa-angle-left"
          next-icon="fa fa-angle-right"
          class="pagination"
          color="#06ab95"
          v-model="paginate.page"
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
import { mapState, mapGetters } from "vuex";
import Loading from "../Components/Loading.vue";
export default {
  name: "Table",
  data() {
    return {
      search: "",
      closeOnClick: true,
      // expanded: [],
    };
  },
  components: {
    Loading,
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
    ...mapState(["collection"]),
    ...mapState("table", [
      "btn_table",
      "items",
      "headers",
      "btns",
      "loading",
      "data_extend",
      "data_expand",
      "paginate",
      "pagination",
      "select_view",
    ]),
    pages() {
      return Math.ceil(this.paginate.total / this.paginate.itemsPerPage) | 0;
    },
    classLangBtn() {
      return {
        "mr-6": this.$vuetify.rtl,
        "ml-6": !this.$vuetify.rtl,
      };
    },
    classLang() {
      return {
        "text-left": this.$vuetify.rtl,
        "text-right": !this.$vuetify.rtl,
      };
    },
  },

  methods: {
    handlePageChange(page) {
      this.$store.dispatch(this.collection + "/handlePageChange", page);
    },
    changeItemPage($eve) {
      // alert($eve);
      this.$store.dispatch(this.collection + "/changeItemPage", parseInt($eve));
    },

    filterOnlyCapsText(value, search, item) {
      console.log(value);
      console.log(search);
      return (
        value != null &&
        search != null &&
        // typeof value === "string" &&
        value.toString().toLocaleLowerCase().indexOf(search) !== -1
      );
    },
    event_btn(name, item, global) {
      if (global) this.$store.dispatch("table/" + name, item);
      else this.$store.dispatch(this.collection + "/" + name, item);
    },
    action: function (item, name) {
      // alert(name);
      if (this.collection != "") {
        this.$store.dispatch(
          this.collection + "/" + name.replace(" ", "_"),
          item
        );
      } else {
        this.$store.dispatch(name.replace(" ", "_"), item);
      }
    },
  },
};
</script>