<template>
  <div class="mx-6 py-4">
    <Notify></Notify>
    <v-row>
      <v-expansion-panels v-if="filters && filters.length > 0" class="pa-2">
        <v-expansion-panel >
          <v-expansion-panel-header>
            {{$t("Filters")}}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <FormFilter></FormFilter>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-col cols="12">
        <v-card class="card-shadow border-radius-xl">
          <div class="card-header-padding pb-0">
            <v-row id="card">
              <slot name="header"></slot>
            </v-row>
          </div>
          <v-card-text class="px-0 py-0">
            <slot name="body">
              <div>



                <slot name="befor_table"></slot>
                <Table>
                  <template #top-right-actions>
                    <v-btn
                        v-if="
                    card.permission && str_per.indexOf(card.permission) > -1
                  "
                        class="mx-2 btn-primary bg-gradient-blue"
                        dark
                        link
                        :to="card.add_url"
                    >
                      <!--                      <v-icon dark> mdi-plus</v-icon>-->
                      <h5>{{ $t('Add new') }}</h5>
                    </v-btn>
                  </template>
                  <template slot="table">
                    <slot name="table-card"></slot>
                  </template>
                  <template #action-table="{ item }">
                    <slot name="action-btn-table" :item2="item"></slot>
                  </template>
                  <template #list-item="{ item }">
                    <slot name="list-item-table" :item2="item"></slot>
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
  </div>
</template>
<script>
import Table from "./Table.vue";
import FormFilter from "./Filter.vue";
import Notify from "./Notify.vue";
import {mapState, mapGetters} from "vuex";

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
