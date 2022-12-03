<template>
  <div class="table-wrapper mt-9">
    <table>
      <tr>
        <th class="py-3">{{ $t("band") }}</th>
        <th class="py-3">{{ $t("answer") }}</th>
      </tr>
      <tr v-for="item in questions" :key="`band-${item.id}`">
        <td class="py-3">
          <span class="text-typo text-center text-subtitle-2 font-poppins">
            {{ item.questions.title }}
          </span>
        </td>
        <td class="py-3">
          <template v-if="item.questions.answer">
            <template v-if="item.questions.inputs.type == 'checkbox'">
              <v-icon
                v-if="item.questions.answer.answer == 'true'"
                class="check"
                >mdi-check
              </v-icon>
              <span v-else> - </span>
            </template>
            <template v-else>
              <template v-if="item.questions.answer.answer">
                {{ item.questions.answer.answer }}
              </template>
              <template v-else>-</template>
            </template>
          </template>
          <template v-else>-</template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "FormQuestionsTable",
  props: ["questions"],
};
</script>

<style scoped>
table {
  width: 100%;
}

th {
  width: 50%;
}

th,
td {
  text-align: center;
  border: 1px solid #e9ecef;
}

@media print {
  .table-wrapper {
    /* page-break-after: auto;
    page-break-inside: avoid; */

  }
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  td {
    page-break-inside: avoid;
    page-break-after: auto;
  }
}
</style>
