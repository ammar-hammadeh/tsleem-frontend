<template>
  <div class="">
    <v-card class="">
      <div class="card-header-padding py-0">
        <!-- <v-col lg="8" md="8">
          <h5 class="font-weight-bold text-h5 text-typo mb-0">Search</h5>
          <p class="text-sm text-body mb-0">
            Use filters to quickly find what you're looking for.
          </p>
        </v-col> -->
        <v-card-text>
          <v-form ref="filterForm">
            <v-row>
              <v-col lg="4" md="4" v-for="(filter, i) in filters" :key="i">
                <label class="text-xs text-typo font-weight-bolder">{{
                  filter.label
                }}</label>

                <v-select
                  v-if="filter.type == 'select'"
                  v-model="filter.value"
                  :name="filter.value"
                  :items="filter.items"
                  :item-text="filter.itemText"
                  :item-value="filter.itemValue"
                  :label="$t('general.choose')"
                  hide-details
                  single-line
                  dense
                >
                </v-select>

                <v-autocomplete
                  class="mt-0 pt-0"
                  v-else-if="filter.type == 'auto-complete'"
                  v-model="filter.value"
                  :name="filter.value"
                  :items="filter.items"
                  :item-text="filter.itemText"
                  :item-value="filter.itemValue"
                ></v-autocomplete>

                <v-text-field
                  v-else
                  :type="filter.type"
                  v-model="filter.value"
                  :name="filter.value"
                  hide-details
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="d-flex mr-0" :class="classLang">
            <v-btn icon color="#1f357e" @click="get_data()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon color="#c0946f" @click="resetFilters()">
              <v-icon>mdi-sync</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("form");
export default {
  name: "FormFilter",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState(["filters"]),
    classLang() {
      return {
        "mr-auto": this.$vuetify.rtl,
        "ml-auto": !this.$vuetify.rtl,
      };
    },
  },
  methods: {
    get_data() {
      this.$store.dispatch(`${this.$store.state.collection}/filterData`);
      // this.$emit("get_data");
    },
    resetFilters() {
      this.$refs.filterForm.reset();
      this.$store.dispatch(`${this.$store.state.collection}/resetFilter`);
      // this.$emit("reset");
    },
  },
};
</script>
<style lang="css">
.v-sheet.v-card {
  border-radius: 0;
}
</style>
