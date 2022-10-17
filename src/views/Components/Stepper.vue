<template>
  <div>
    <v-stepper
      v-if="stepper"
      alt-labels
      elevation="0"
      v-model="e1"
      class="bg-transparent overflow-visible w-100 mx-auto"
    >
      <v-row>
        <v-col cols="12" class="mx-auto mt-9">
          <v-stepper-header v-if="stepper.header.length > 0" class="shadow-0">
            <span
              v-for="(step, number) in stepper.header"
              :key="'step-' + number"
            >
              <v-stepper-step color="#344767" :step="number + 1">
                <span
                  class="text-secondary font-weight-normal d-block text-center"
                  style="width: max-content"
                  >{{ step.name }}</span
                >
              </v-stepper-step>

              <!-- <v-divider v-if="number < stepper.header.length - 1"></v-divider> -->
            </span>
          </v-stepper-header>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="mx-auto">
          <!-- <div v-if="errors" class="alert alert-danger">
                <ul class="alert alert-danger">
                  <li v-for="(value, key, index) in errors">
                    {{ value.toString() }}
                  </li>
                </ul>
              </div> -->

          <v-form ref="newUserForm" lazy-validation v-model="valid">
            <v-stepper-items
              class="border-radius-xl overflow-hidden shadow-lg mt-5 mb-9"
              v-if="stepper.content.length > 0"
            >
              <v-stepper-content
                :key="'step-' + i"
                v-for="(step, i) in stepper.content"
                :step="i + 1"
                class="bg-white border-radius-xl px-4 pt-4"
              >
                <v-card>
                  <div>
                    <v-row class="text-center">
                      <v-col cols="10" class="mx-auto">
                        <h5 class="text-h5 text-typo font-weight-normal mb-2">
                          {{ step.name }}
                        </h5>
                      </v-col>
                    </v-row>
                    <v-row class="mt-2">
                      <slot v-if="i == 0" name="type"></slot>
                      <v-col
                        :key="'col-' + ind"
                        v-for="(item, ind) in step.form"
                        :cols="item.col ? item.col : '6'"
                        v-if="
                          item.hasOwnProperty('visible') ? item.visible : true
                        "
                      >
                        <Input :item="item"></Input>
                      </v-col>
                      <slot v-if="i == 0" name="password"></slot>
                    </v-row>
                  </div>
                  <!-- <div class="text-end"> -->
                  <div
                    class="mt-10"
                    :class="
                      i == 0 ? 'text-end' : 'd-flex justify-space-between'
                    "
                  >
                    <v-btn
                      v-if="i != 0"
                      :ripple="false"
                      :elevation="0"
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        bg-gradient-light
                        py-5
                        px-6
                        mt-2
                        mb-2
                        me-2
                        text-dark
                      "
                      color="primary"
                      @click="prevStep"
                    >
                      {{ $t("general.Prev") }}
                    </v-btn>
                    <v-btn
                      v-if="i < stepper.content.length - 1"
                      :ripple="false"
                      :elevation="0"
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        bg-gradient-default
                        py-5
                        px-6
                        mt-2
                        mb-2
                        me-2
                      "
                      color="primary"
                      @click="nextStep"
                    >
                      {{ $t("general.Next") }}
                    </v-btn>
                    <v-btn
                      v-if="i == stepper.content.length - 1"
                      :ripple="false"
                      :elevation="0"
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        bg-gradient-default
                        py-5
                        px-6
                        mt-2
                        mb-2
                        me-2
                      "
                      color="primary"
                      @click="handleSubmit()"
                    >
                      {{ $t("general.Submit") }}
                    </v-btn>
                  </div>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-form>
        </v-col>
      </v-row>
    </v-stepper>
  </div>
</template>
<script>
import Input from "./Input.vue";
import { mapState, mapMutations } from "vuex";
export default {
  props: { stepper: Object },
  components: {
    Input,
  },
  data() {
    return {
      e1: 1,
      divider: 1,
      valid: true,
    };
  },
  computed: {
    // ...mapState("form", ["stepper"]),
  },
  methods: {
    ...mapMutations("form", ["SAVE_DATA_STEPPER"]),
    nextStep() {
      this.e1++;
    },
    prevStep() {
      this.e1--;
    },
    validate() {
      return this.$refs.newUserForm.validate();
    },
    handleSubmit() {
      if (this.validate()) {
        this.$emit("handel", this.stepper.content, true);
      } else {
        this.$emit("handel", this.stepper.content, false);
      }
      // const formData = new FormData();
      // this.stepper.content.map(function (data) {
      //   data.form.map(function (item) {
      //     console.log(item);
      //     console.log(item.value);
      //     if (item.value != undefined && item.value != "") {
      //       if (
      //         (item.type == "select" && item.type_select == "multiple") ||
      //         (item.type == "autocomplete" && item.type_select == "multiple")
      //       ) {
      //         var value = item.value;
      //         for (var i = 0; i < value.length; i++) {
      //           const val = value[i];
      //           formData.append(`${item.value_text}[ ${i} ]`, val);
      //         }
      //       } else {
      //         formData.append(item.value_text, item.value);
      //       }
      //     }
      //   });
      // });
      // this.SAVE_DATA_STEPPER(formData);
      // console.log(...formData);
    },
  },
};
</script>