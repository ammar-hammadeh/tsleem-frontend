<template>
  <div class="position-relative">
    <slot name="table"></slot>
    <v-data-table
        class="table"
        item-key="id"
        mobile-breakpoint="0"
        loading
        :loading-text="$t('there is no data')"

        v-model="selected"
        :search="search"
        :single-expand="data_expand.singleExpand"
        :expanded.sync="data_expand.expanded"
        :show-expand="data_expand.show"

        :headers="headers"
        :items="items"
        :show-select="select_view"
        :hide-default-footer="pagination"
        :items-per-page="pagination ? paginate.itemsPerPage : 10"
        :page.sync="paginate.page"

        :custom-filter="filterOnlyCapsText"
        @item-selected="bulk_selection"
        @page-count="pageCount = $event"
    >
      <v-progress-linear
          v-show="loading"
          slot="progress"
          color="#c39a77"
          indeterminate
      ></v-progress-linear>

      <template v-slot:top>
        <div class="d-flex justify-md-space-between align-center">
          <div style="width: 300px" class="d-flex align-center">
            <slot name="top-right-actions"></slot>
            <v-text-field
                v-model="search"
                :label="$t('Search')"
                class="mx-4 mt-0 font-lang"
            ></v-text-field>
          </div>

          <div class="d-flex pl-3 rows_per_page" v-if="pagination">
            <label for="" style="font-size: 14px" class="mx-3 mt-2"
            > عدد الأسطر :
            </label>
            <v-select
                style="width: 100px"
                v-model="paginate.itemsPerPage"
                hide-details
                @change="changeItemPage"
                :items="[10, 20, 30, 50, 100]"
                dense
            ></v-select>
            <slot name="top-left-actions"></slot>
          </div>
        </div>
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
                  :src="item.avatar"
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

      <template v-slot:item.roles="{ item }" :id="item.id">
        <div v-if="item.roles.length > 0">
          <div v-for="(role, i) in item.roles" :key="i">
            <v-chip label outlined color="default" class="py-1 mt-1 px-2 my-0">
              <span class="text-caption ls-0">{{ role.name }}</span>
            </v-chip>
          </div>
        </div>
        <div v-else>-</div>
      </template>

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
                <v-list-item
                    v-for="(btn, index) in btns"
                    :key="index"
                    v-if="str_per.indexOf(btn.permission) > -1"
                >
                  <v-list-item-title class="my-3">
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
                <slot name="list-item" :item="item"></slot>
              </slot>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>
    <div class="d-flex align-center justify-md-space-between py-3" v-if="pagination" id="pagination_table">
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
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Loading from "../Components/Loading.vue";
export default {
  name: "SSRPaginationTable",
  data() {
    return {
      search: "",
      closeOnClick: true,
      // expanded: [],
      selected: [],
    };
  },
  components: {
    Loading,
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
    ...mapState(["collection"]),
    ...mapState("table", [
      "bulk_selected",
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
  watch: {
    selected($event) {
      console.log($event);
      var bulk_selected = [];
      $event.forEach((v) => {
        bulk_selected.push(v.id);
      });
      this.SET_BULK_SELECTED(bulk_selected);
    },
  },
  methods: {
    ...mapMutations("table", ["SET_BULK_SELECTED"]),
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
    bulk_selection($event) {
      var bulk_selected = [];
      bulk_selected.push($event.item.id);
      this.SET_BULK_SELECTED(bulk_selected);
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
<style scoped>
#pagination_table {
  width: 100%;
}
.pagination{
  margin: auto;
}
html:lang(ar) .rows_per_page{
  font-family: GE-Dinar Poppins !important;
}
</style>

