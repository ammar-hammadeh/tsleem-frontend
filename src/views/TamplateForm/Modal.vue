<template >
  <div>
    <v-dialog
      v-model="data_modal.dialog"
      persistent
      :max-width="data_modal.size"
    >
      <v-card>
        <v-toolbar
          color="info"
          dark
          class="text-white bg-gradient-default header-info"
          >{{ data_modal.title }}</v-toolbar
        >

        <v-card-text class="mt-5">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="">
                <v-row>
                  <v-col lg="12" class="py-0">
                    <label class="text-xs text-typo font-weight-bolder ms-1">{{
                      $t("Form Name")
                    }}</label>
                    <v-text-field
                      type="text"
                      outlined
                      color="rgba(0,0,0,.6)"
                      class="
                        font-size-input
                        placeholder-lighter
                        text-light-input
                      "
                      :rules="[(v) => !!v || $t('form.Item is required')]"
                      v-model="data.tab"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col lg="12" class="py-0">
                    <label class="text-xs text-typo font-weight-bolder ms-1">{{
                      $t("question")
                    }}</label>
                    <v-autocomplete
                      :value="inquiry_id"
                      :items="computedItems"
                      :label="$t('general.choose')"
                      dense
                      outlined
                      multiple
                      :rules="[(v) => !!v || $t('form.Item is required')]"
                      @change="select_inquery($event)"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <!-- <v-row class="mb-2">
                  <v-col lg="12" class="py-0 text-left">
                    <button
                      class="
                        d-block
                        py-2
                        px-5
                        mb-0
                        bg-gradient-default
                        btn-primary
                      "
                      @click.prevent="add_inquery"
                    >
                      {{ $t("add question") }}
                    </button>
                  </v-col>
                </v-row> -->
              </div>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="dark"
            class="bg-light"
            text
            @click="data_modal.dialog = false"
          >
            {{ $t("form.Close") }}
          </v-btn>
          <v-btn
            color="white"
            class="bg-gradient-blue mw-80"
            :loading="loader"
            text
            @click="save_form()"
          >
            <span slot="loader">
              <v-progress-circular
                style="width: 20px; height: 20px"
                indeterminate
                color="white"
              ></v-progress-circular>
            </span>
            {{ $t("form.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["data_modal", "inquieries", "loader", "data"],
  data() {
    return {
      valid: true,
      validation: false,
      // tab: "",
      // selected: [],
      // form_data_inqueries: [{ inquiry_id: "", is_required: false }],
    };
  },
  watch: {
    "data_modal.dialog"(val) {
      val || this.close();
    },
  },
  computed: {
    computedItems() {
      return this.inquieries.map((item) => {
        return {
          text: item.title,
          value: item.id,
          disabled: this.data.selected.includes(item.id),
        };
      });
    },
  },
  methods: {
    close: function () {
      this.data_modal.dialog = false;
      this.data.selected = [];
      this.data.form_data_inqueries = [{ inquiry_id: "", is_required: false }];
      this.$refs.form.reset();
    },
    select_inquery(item, event) {
      if (this.data.selected.includes(item.inquiry_id)) {
        var index = this.data.selected.indexOf(item.inquiry_id);
        this.data.selected.splice(index, 1);
      }
      item.inquiry_id = event;
      this.data.selected.push(event);

      console.log(this.data.selected);
    },

    validate() {
      return this.$refs.form.validate();
    },
    add_inquery() {
      this.data.form_data_inqueries.push({ inquiry_id: "", is_required: "" });
    },
    remove_inquery(index) {
      this.data.form_data_inqueries.splice(index, 1);
      this.data.selected.splice(index, 1);
      console.log(this.data.selected);
    },
    save_form() {
      if (this.validate()) {
        this.validation = true;
      } else {
        this.validation = false;
      }
      var data = {
        tab: this.data.tab,
        form_data_inqueries: this.data.form_data_inqueries,
      };
      this.$emit("save", data, this.validation);
    },
  },
};
</script>