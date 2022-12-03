<template>
  <div class="table-wrapper">
    <table>
      <tr>
        <th class="py-3">{{ $t("band") }}</th>
        <th class="py-3">{{ $t("answer") }}</th>
      </tr>
      <tr v-for="category in categories" :key="category.id">
        <td class="d-flex bordered-td">
          <span class="d-flex align-center" style="max-width: 20%">

          {{ category.get_category.name }}
          </span>
          <table>
            <tr
                v-for="item in category.get_category.get_question"
                :key="`band-${item.id}`"
            >
              <td class="text-center">{{ item.title }}</td>
            </tr>
          </table>
        </td>
        <td class="bordered-td">
          <table>
            <tr
                v-for="item in category.get_category.get_question"
                :key="`band-${item.id}`"
            >
              <!--              <td>{{ item.title }}</td>-->
              <td class="text-center">
                <span
                    v-if="item.answer"
                    class="
                    text-typo text-center text-subtitle-2
                    font-poppins
                    ls-0
                  "
                >{{ item.answer.answer || "-" }}
                </span>
                <span
                    v-else
                    class="
                    text-typo text-center text-subtitle-2
                    font-poppins
                    ls-0
                  "
                >-
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <v-row
        class="margin-table"
        v-for="category in categories"
        :key="category.id"
    >
      <v-col cols="2" class="pl-0">
        <v-list class="py-0 border border-bottom-none fill-height">
          <v-list-item class="fill-height">
            <v-list-item-content class="text-center">
              <v-list-item-title class="text-wrap"
              >{{ category.get_category.name }}
              </v-list-item-title>
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
table {
  width: 100%;
}

th {
  width: 50%;
}

th{
  text-align: center;
  border: 1px solid #e9ecef;
}
.bordered-td{
  border: 1px solid #e9ecef;

}

@media print {
  .table-wrapper {
    /*page-break-after: auto;*/
    page-break-inside: avoid;
  }
}
</style>
