<template>
  <div class="table-wrapper">
    <table class="main-table">
      <tr>
        <th class="py-3 outer-th empty-th"></th>
        <th class="py-3 outer-th">{{ $t("band") }}</th>
        <th class="py-3 outer-th">{{ $t("answer") }}</th>
        <th class="py-3 outer-th">{{ $t("notes") }}</th>
        <th class="py-3 outer-th attachments">{{ $t("attachments") }}</th>
      </tr>
      <tr
          v-for="category in categories"
          :key="category.id"
          class="inner-table-row"
      >
        <td
            class="text-center category-td pa-2 text-typo text-center text-subtitle-2
                  ls-0"
        >
          <div
              class="text-typo text-subtitle-2"
              style="writing-mode: vertical-lr; margin-right: 40px;">
          {{ category.get_category.name }}
          </div>
        </td>
        <td colspan="5">
          <table class="inner-table">
            <tr
                v-for="item in category.get_category.get_question"
                :key="`band-${item.id}`"
                class="inner-table-row mb-2"
            >
              <td
                  class="
                  text-center
                  title-td
                  text-typo text-center text-subtitle-2
                  ls-0
                  inner-td
                "
              >
                {{ item.title }}
              </td>
              <td
                  class="
                  text-center
                  answer-td
                  text-typo text-center text-subtitle-2
                  ls-0
                  inner-td
                "
              >
                <span v-if="item.inputs.type == 'checkbox' && (item.answer && item.answer.answer) == 'true'">
                  <v-icon
                      class="check"
                  >mdi-check
                  </v-icon>
                </span>
                <span v-else
                  class="text-typo text-center text-subtitle-2
                  ls-0"
                >
                  {{ (item.answer && item.answer.answer) || "-" }}
                </span>

              </td>
              <td
                  class="
                  text-center
                  title-td
                  text-typo text-center text-subtitle-2
                  ls-0
                  inner-td
                "
              >

                {{ item.answer && item.answer.note || "-" }}
              </td>
              <td
                  class="
                  text-center
                  title-td
                  text-typo text-center text-subtitle-2
                  ls-0
                  inner-td
                  attachments
                "
              >
                <div
                    class="pa-2"
                >
                <image-viewer
                    v-if="item.answer && item.answer.attachements.length"
                    :images="item.answer.attachements"
                />
                </div>
<!--                {{item.answer.attachements }}-->
              </td>

            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ImageViewer from "./ImageViewer";
export default {
  name: "FormCategoriesTable",
  components: {ImageViewer},
  props: ["categories"],
};
</script>

<style scoped>
table {
  width: 100%;
  /*border-spacing: 10px 5px;*/
  /*border-collapse: collapse;*/
}

.main-table {
  border-spacing: 0px 10px;
}

.inner-table {
  border-collapse: collapse;
}

th {
  text-align: center;
  border: 1px solid #e9ecef;
}

.outer-th{
  width: 20%;
}

.empty-th{
  width: 10%;
}
.category-td {
  width: 10%;
}

.title-td {
  width: 40.9%;
}

.answer-td {
  width: 59.1%;
}

.inner-td{
  width: 22.5%;
}

.inner-table-row > td {
  border: 1px solid #e9ecef;
}

@media print {
  .table-wrapper {
    page-break-inside: avoid;
  }
  .category-td{
    writing-mode: vertical-lr;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  .attachments{
    display: none;
  }
}
</style>
