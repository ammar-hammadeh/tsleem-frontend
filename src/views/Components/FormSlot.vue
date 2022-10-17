<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="mt-2">
        <v-col
          class="pt-0"
          v-for="(item, index) in data"
          :key="index"
          :cols="item.col"
          :id="item.col_id"
          v-if="item.hasOwnProperty('visible') ? item.visible : true"
        >
          <label class="text-xs text-typo font-weight-bolder ms-1">{{
            item.label
          }}</label>
          <!-- :required="item.required" -->

          <v-checkbox
            v-if="item.type == 'checkbox'"
            :rules="item.rules"
            class="mt-0"
            v-model="item.value"
            :color="item.color"
            :label="item.label_input"
            :value="item.value"
            :disabled="item.disabled"
            :error-messages="item.error"
          ></v-checkbox>

          <v-file-input
            v-else-if="item.type == 'file'"
            v-model="form_data[item.value_text]"
            :multiple="item.type_file == 'multiple' ? true : false"
            :rules="item.rules"
            :accept="item.accept"
            show-size
            :error-messages="item.error"
            counter
            :disabled="item.disabled"
            chips
          ></v-file-input>

          <v-select
            v-else-if="item.type == 'select'"
            v-model="item.value"
            :items="item.items"
            :item-text="item.title_select ? item.title_select : 'name'"
            item-value="id"
            :label="$t('general.choose')"
            :error-messages="item.error"
            :multiple="item.type_select == 'multiple' ? true : false"
            @change="action_selectbox(item, $event)"
            :disabled="item.disabled"
          ></v-select>

          <v-autocomplete
            v-else-if="item.type == 'autocomplete'"
            v-model="item.value"
            :items="item.items"
            :item-text="item.title_select ? item.title_select : 'name'"
            :item-value="'id'"
            :placeholder="$t('general.choose')"
            :error-messages="item.error"
            :multiple="item.type_select == 'multiple' ? true : false"
            @change="action_selectbox(item, $event)"
            :disabled="item.disabled"
          ></v-autocomplete>

          <v-textarea
            v-else-if="item.type == 'textarea'"
            :label="item.label"
            auto-grow
            outlined
            :rows="item.row"
            row-height="15"
            :error-messages="item.error"
            :rules="item.rules"
            :value="item.value"
            :disabled="item.disabled"
          ></v-textarea>

          <Input v-else :item="item"></Input>
          <!-- <v-text-field
            
            :rules="item.rules"
            :type="item.type"
            :error-messages="item.error"
            color="rgba(0,0,0,.6)"
            :min="item.min"
            :placeholder="item.placeholder"
            class="
              font-size-input
              placeholder-lighter
              text-light-input
              form-control
            "
            v-model="item.value"
            :disabled="item.disabled"
            :value="item.value"
          >
          </v-text-field> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0" :class="classLang">
          <!-- if btn false will be appered in form -->
          <v-btn
            v-if="!btn"
            :ripple="false"
            class="
              font-weight-bold
              text-xs
              btn-default
              bg-gradient-default
              py-5
              px-6
              mb-0
              ms-auto
            "
            :loading="loader"
            color="primary"
            @click="save()"
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
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Input from "./Input.vue";
export default {
  props: { btn: { type: Boolean, default: false }, data: Object },
  components: {
    Input,
  },
  name: "Form",
  data() {
    return {
      valid: true,
      validation: false,
    };
  },
  computed: {
    ...mapState(["collection", "name_function", "loader"]),
    ...mapState("form", ["style_form", "formData", "loader"]),
    classLang() {
      return {
        "text-left": this.$vuetify.rtl,
        "text-right": !this.$vuetify.rtl,
      };
    },
  },
  methods: {
    ...mapMutations("form", ["SET_LOADER", "SET_ACTION"]),
    ...mapActions("form", ["SaveForm"]),
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    save: function () {
      if (this.validate()) {
        this.validation = true;
      } else {
        this.validation = false;
      }

      this.$emit("save", this.validation, this.data);
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    action_selectbox(item, $event) {
      if (item.action) {
        this.SET_ACTION($event);
        this.$store.dispatch(`${this.collection}/${item.action}`, $event);
      }
    },
  },
  mounted() {
    this.resetValidation();
  },
};
</script>