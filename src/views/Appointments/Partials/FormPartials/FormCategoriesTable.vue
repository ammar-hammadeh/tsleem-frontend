<template>
  <div class="table-wrapper">
    <v-row class="margin-table">
      <v-col cols="6" class="pl-0">
        <v-list class="py-0 border border-bottom-none">
          <v-list-item class="py-1">
            <v-list-item-content>
              <v-list-item-title
                class="
                  text-typo text-center text-subtitle-2
                  ls-0
                  font-weight-bold
                "
                >{{ $t("band") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="6" class="pr-0">
        <v-list class="py-0 border border-bottom-none">
          <v-list-item class="py-1">
            <v-list-item-content>
              <v-list-item-title
                class="
                  text-typo text-center text-subtitle-2
                  ls-0
                  font-weight-bold
                "
                >{{ $t("answer") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row
      class="margin-table"
      v-for="category in categories"
      :key="category.id"

    >
      <v-col cols="2" class="pl-0">
        <v-list class="py-0 border border-bottom-none fill-height">
          <v-list-item class="fill-height">
            <v-list-item-content class="text-center">
              <v-list-item-title class="text-wrap">{{
                category.get_category.name
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="4" class="pl-0 pr-0">
        <v-list class="py-0 border border-bottom-none">
          <v-list-item
            v-for="item in category.get_category.get_question"
            :key="`band-${item.id}`"
            class="py-1"
          >
            <v-list-item-content>
              <v-list-item-title
                class="text-typo text-center text-subtitle-2 font-poppins ls-0"
                >{{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="6" class="pr-0">
        <v-list class="py-0 border border-bottom-none">
          <v-list-item
            v-for="item in category.get_category.get_question"
            :key="`band-${item.id}`"
            class="py-1"
          >
            <v-list-item-content>
              <v-list-item-title
              v-if="item.answer"
                class="text-typo text-center text-subtitle-2 font-poppins ls-0"
                >{{ item.answer.answer || "-" }}
              </v-list-item-title>
              <v-list-item-title
              v-else
                class="text-typo text-center text-subtitle-2 font-poppins ls-0"
                >-
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "FormCategoriesTable",
  props: ["categories"],
};
</script>

<style scoped>

@media print {
  .table-wrapper{
    /*page-break-after: auto;*/
    page-break-inside: avoid;
  }
}

</style>
