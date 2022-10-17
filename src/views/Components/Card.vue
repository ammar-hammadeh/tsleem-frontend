<template>
  <v-container fluid class="py-8">
    <Notify></Notify>
    <v-row>
      <v-col cols="12">
        <v-card class="card-shadow border-radius-xl">
          <div class="card-header-padding pb-0">
            <v-row id="card">
              <v-col cols="6">
                <h5 class="text-h5 text-typo font-weight-bold ms-4 mb-3">
                  {{ card.title }}
                </h5>
              </v-col>

              <v-col v-if="card.add_url" cols="6" :class="classLang">
                <v-btn
                  v-if="
                    card.permission && str_per.indexOf(card.permission) > -1
                  "
                  class="mx-2 btn-primary bg-gradient-blue"
                  fab
                  dark
                  small
                  link
                  :to="card.add_url"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-col>
              <slot name="header"></slot>
            </v-row>
          </div>
          <v-card-text class="px-0 py-0">
            <slot name="body">
              <div>
                <FormFilter v-if="filters && filters.length > 0"></FormFilter>
                <slot name="befor_table"></slot>
                <Table>
                  <template slot="table">
                    <slot name="table-card"></slot>
                  </template>
                  <template #action-table="{ item }">
                    <slot name="action-btn-table" :item2="item"></slot>
                  </template>
                  <template #column="{ item }">
                    <slot name="table-column" :item2="item"></slot>
                  </template>
                </Table>
              </div>
              <slot name="part-body"></slot>
            </slot>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Table from "./Table.vue";
import FormFilter from "./Filter.vue";
import Notify from "./Notify.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Card",
  components: {
    Table,
    FormFilter,
    Notify,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["card"]),
    ...mapState("form", ["filters"]),
    ...mapGetters("auth", ["str_per"]),
    classLang() {
      return {
        "text-left": this.$vuetify.rtl,
        "text-right": !this.$vuetify.rtl,
      };
    },
  },
  methods: {},
};
</script>
