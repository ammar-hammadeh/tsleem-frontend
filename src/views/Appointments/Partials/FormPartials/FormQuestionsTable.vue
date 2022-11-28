<template>
  <div class="table-wrapper">
    <v-row class="margin-table">
      <v-col cols="6" class="pl-0">
        <v-list class="py-0 border border-left-none border-bottom-none">
          <v-list-item class="py-1">
            <v-list-item-content>
              <v-list-item-title
                  class="
                          text-typo text-center text-subtitle-2
                          ls-0
                          font-weight-bold
                        "
              >{{ $t("band") }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              v-for="item in questions"
              :key="`band-${item.id}`"
              class="py-1"
          >
            <v-list-item-content>
              <v-list-item-title
                  class="
                          text-typo text-center text-subtitle-2
                          font-poppins
                          ls-0
                        "
                  :class="[
                          item.questions.inputs.type == 'checkbox'
                            ? 'padding-print-3'
                            : '',
                        ]"
              >{{ item.questions.title }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="6" class="pr-0">
        <v-list class="py-0 border border-bottom-none">
          <v-list-item class="py-1">
            <v-list-item-content class="">
              <v-list-item-title
                  class="
                          text-typo text-center text-subtitle-2
                          ls-0
                          font-weight-bold
                        "
              >{{ $t("answer") }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              v-for="item in questions"
              :key="`answer-${item.id}`"
              class="py-1"
          >
            <v-list-item-content>
              <v-list-item-title
                  class="
                          text-typo text-center text-subtitle-2
                          font-poppins
                          ls-0
                        "
              >
                <!-- {{item.questions.answer}} -->
                <template v-if="item.questions.answer">
                  <template
                      v-if="item.questions.inputs.type == 'checkbox'"
                  >
                    <!-- <i class="check mdi mdi-check" v-if="item.questions.answer.answer == 'true'"></i> -->
                    <v-icon
                        v-if="item.questions.answer.answer == 'true'"
                        class="check"
                    >mdi-check</v-icon
                    >
                    <span v-else> - </span>
                  </template>
                  <template v-else>
                    <template v-if="item.questions.answer.answer">
                      {{ item.questions.answer.answer }}
                    </template>
                    <template v-else> - </template>
                  </template>
                </template>
                <template v-else> - </template>
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
  name: "FormQuestionsTable",
  props: ['questions']
}
</script>

<style scoped>

@media print {
  .table-wrapper{
    /*page-break-after: auto;*/
    page-break-inside: avoid;
  }
}

</style>
