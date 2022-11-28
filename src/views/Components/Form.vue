<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="mt-2">
        <v-col
          class="pt-0"
          v-for="(item, index) in style_form"
          :key="index"
          :cols="item.col ? item.col : '6'"
          :id="item.col_id"
          v-if="item.hasOwnProperty('visible') ? item.visible : true"
        >
          <label
            :class="item.class_label"
            class="text-xs text-typo mb-1 font-weight-bolder ms-1"
            >{{ item.label }}</label
          >
          <!-- :required="item.required" -->

          <v-checkbox
            v-if="item.type == 'checkbox'"
            :rules="item.rules"
            class="mt-0"
            v-model="item.value"
            :color="item.color"
            :label="item.label_input"
            :class="item.class"
            :value="item.value"
            :disabled="item.disabled"
            :error-messages="item.error"
          ></v-checkbox>

          <v-file-input
            v-else-if="item.type == 'file'"
            :multiple="item.type_file == 'multiple' ? true : false"
            :rules="item.rules"
            :accept="item.accept"
            show-size
            :class="item.class"
            :error-messages="item.error"
            counter
            :disabled="item.disabled"
            v-model="item.value"
            chips
          ></v-file-input>

          <v-select
            v-else-if="item.type == 'select'"
            v-model="item.value"
            :class="item.class"
            :items="item.items"
            :item-text="item.title_select ? item.title_select : 'name'"
            item-value="id"
            :label="$t('general.choose')"
            :error-messages="item.error"
            :multiple="item.type_select == 'multiple' ? true : false"
            @change="action_selectbox(item, $event)"
            :rules="item.rules"
            :disabled="item.disabled"
          ></v-select>

          <v-autocomplete
            v-else-if="item.type == 'autocomplete'"
            v-model="item.value"
            :class="item.class"
            :items="item.items"
            :item-text="item.title_select ? item.title_select : 'name'"
            :item-value="'id'"
            :placeholder="$t('general.choose')"
            :error-messages="item.error"
            :multiple="item.type_select == 'multiple' ? true : false"
            @change="action_selectbox(item, $event)"
            :disabled="item.disabled"
            :rules="item.rules"
          ></v-autocomplete>

          <v-textarea
            v-else-if="item.type == 'textarea'"
            :label="item.label"
            auto-grow
            :class="item.class"
            :rows="item.row"
            row-height="15"
            :outlined="item.outlined"
            single-line
            :error-messages="item.error"
            :rules="item.rules"
            :value="item.value"
            :disabled="item.disabled"
            v-model="item.value"
          ></v-textarea>

          <v-text-field
            v-else-if="item.type == 'password'"
            :append-icon="item.show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="item.show ? 'text' : 'password'"
            @click:append="item.show = !item.show"
            v-model="item.value"
            :error-messages="item.error"
            :disabled="item.disabled"
            :value="item.value"
            :rules="item.rules"
            lazy-validation
            color="rgba(0,0,0,.6)"
            light
            :class="item.class"
            :placeholder="item.placeholder"
            class="font-size-input placeholder-lighter mt-2 mb-4"
          >
          </v-text-field>

          <template v-else-if="item.type == 'date'">
            <!-- <custom-date-picker
              :value="item.value"
              v-model="item.value"
            ></custom-date-picker> -->
            <!-- @input="updateValue" -->
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="item.value"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <!-- :label="item.label ? item.label : $t('Please select a date')" -->
                <v-text-field
                  :class="item.class"
                  v-model="item.value"
                  class="date-input"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  :error-messages="item.error"
                  color="rgba(0,0,0,.6)"
                  :min="item.min"
                  :rules="item.rules"
                  single-line
                  :placeholder="item.placeholder"
                  :disabled="item.disabled"
                  :value="item.value"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-hijri-date-picker no-title locale="ar" v-model="item.value">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  {{ $t("Cancel") }}
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu[0].save(item.value)"
                >
                  {{ $t("OK") }}
                </v-btn></v-hijri-date-picker
              >
            </v-menu>
          </template>

          <input
            v-else-if="item.type == 'hidden'"
            type="hidden"
            :value="item.value"
          />
          <v-text-field
            v-else-if="item.type == 'datetime'"
            :rules="item.rules"
            type="datetime-local"
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
            :class="item.class"
            v-model="item.value"
            :disabled="item.disabled"
            :value="item.value"
          >
          </v-text-field>
          <v-text-field
            v-else
            @input="action_input_text(item, $event)"
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
            :class="item.class"
            v-model="item.value"
            :disabled="item.disabled"
            :value="item.value"
          >
          </v-text-field>

          <slot v-if="item.customize" name="customize"></slot>

          {{ item.data }}
        </v-col>

        <slot name="filed"></slot>
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
import Input from "../Components/Input.vue";
export default {
  props: {
    btn: { type: Boolean, default: false },
    show: { type: Boolean, default: true },
  },
  components: {
    Input,
  },
  name: "Form",
  data() {
    return {
      valid: true,
      menu: false,
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
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    save: function () {
      this.SET_LOADER(true);
      if (this.validate()) {
        this.SaveForm();
        this.$store.dispatch(
          `${this.collection}/${this.name_function}`,
          this.formData
        );
      } else {
        this.SET_LOADER(false);
      }
    },
    action_selectbox(item, $event) {
      if (item.action) {
        this.SET_ACTION($event);
        this.$store.dispatch(`${this.collection}/${item.action}`, $event);
      }
    },
    action_input_text(item, $event) {
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