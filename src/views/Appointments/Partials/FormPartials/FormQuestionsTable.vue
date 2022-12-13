<template>
  <div class="table-wrapper mt-9">
    <table>
      <tr>
        <th class="py-3">{{ $t("band") }}</th>
        <th class="py-3">{{ $t("answer") }}</th>
        <th class="py-3">{{ $t("notes") }}</th>
        <th class="py-3 attachment">{{ $t("attachments") }}</th>
      </tr>
      <tr v-for="item in questions" :key="`band-${item.id}`">

        <!--    Title    -->
        <td class="py-3">
          <span class="text-typo text-center text-subtitle-2 ">
            {{ item.questions.title }}
          </span>
        </td>

        <!--    Answer    -->
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
        <!--    Notes    -->
        <td class="py-3">
          <span class="text-typo text-center text-subtitle-2 ">
            {{ item.questions.answer.note || '-' }}
          </span>
        </td>
        <!--    Notes    -->
        <td class="py-3 attachment">
          <div class="text-typo text-center text-subtitle-2 ">

            <image-viewer                 v-if="item.questions.answer.attachements.length"
             :images="item.questions.answer.attachements"/>
            <span v-else>
              -
            </span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ImageViewer from "./ImageViewer";
export default {
  name: "FormQuestionsTable",
  components: {ImageViewer},
  props: ["questions"],
  data(){
    return{
      isModalOpen: false,
      imageIndex: 0,
    }
  },
  methods: {
    openAttachmentsModal(imagesArray) {
      // console.log("shall show images", imagesArray);
      this.isModalOpen = true
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
}

th {
  width: 25%;
}

th,
td {
  width: 25%;
  max-width: 25%;
  text-align: center;
  border: 1px solid #e9ecef;
}

.hoverable:hover {
  cursor: pointer;
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

  .attachment {
    display: none;
  }
}
</style>
