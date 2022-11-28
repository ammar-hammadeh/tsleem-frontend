<template>
  <div class="form-group">
    <!-- <label  class="small" :for="id">{{label}}</label> -->
    <!-- <div class="position-relative">
    <input
      class="form-control"
      :value ="value"
      :id="id"
      :type="type"
      :style="[!!error ? {'border': '1px solid #dc3545'} : {} ]"
      :placeholder="placeholder"
      @input="updateValue($event.target.value)"
      @blur="updatekeyValue($event.target.value)"
    />
    

    </div> -->
    <!-- <small class="error" v-if="!!error">{{error}}</small> -->
    <label
      v-if="item.label"
      :class="
        item.class_div
          ? 'form-label'
          : 'text-xs text-typo font-weight-bolder ms-1'
      "
      >{{ item.label }}</label
    >
    <slot name="label-section"></slot>
    <span v-if="item.required" class="text-danger astrik mr-2">*</span>
    <div :class="item.class_div" class="position-relative">
      <v-checkbox
        v-if="item.type == 'checkbox'"
        :rules="item.rules"
        :color="item.color"
        :label="item.label_input"
        :value="item.value"
        :disabled="item.disabled"
        :error-messages="item.error"
        v-model="item.value"
      ></v-checkbox>

      <v-file-input
        v-else-if="item.type == 'file'"
        :value="value"
        :multiple="
          item.type_file && item.type_file == 'multiple' ? true : false
        "
        v-model="item.value"
        :outlined="item.class ? true : false"
        :class="item.class"
        :rules="item.rules"
        :accept="item.accept"
        show-size
        :error-messages="item.error"
        :disabled="item.disabled"
        :chips="item.chips"
        @change="updateChangeFiles($event)"
      ></v-file-input>

      <v-select
        v-else-if="item.type == 'select'"
        lazy-validation
        :items="item.items"
        :rules="item.rules"
        :outlined="item.class ? true : false"
        :dense="item.class ? true : false"
        :item-text="item.title_select ? item.title_select : 'name'"
        :item-value="item.val_select ? item.val_select : 'id'"
        :label="$t('general.choose')"
        :error-messages="item.error"
        persistent-hin
        single-line
        v-model="item.value"
        :return-object="item.object ? true : false"
        :multiple="
          item.type_select && item.type_select == 'multiple' ? true : false
        "
        :class="item.class"
        @change="$emit('input', $event)"
        :value="item.value ? item.value : value"
        :disabled="item.disabled"
      ></v-select>

      <template v-else-if="item.type == 'autocomplete'">
        <v-autocomplete
          v-model="item.value"
          lazy-validation
          :rules="item.rules"
          :items="item.items"
          :item-text="item.title_select ? item.title_select : 'name'"
          :item-value="'id'"
          :placeholder="$t('general.choose')"
          :error-messages="item.error"
          :multiple="item.type_select == 'multiple' ? true : false"
          :disabled="item.disabled"
          @change="$emit('input', $event)"
          :value="item.value ? item.value : value"
          :outlined="item.class ? true : false"
        ></v-autocomplete>
        <!-- <span v-if="item.rules && item.value == null" class="text-danfer">{{
          $t("form.Item is required")
        }}</span> -->
      </template>

      <v-textarea
        v-else-if="item.type == 'textarea'"
        :label="item.label"
        auto-grow
        :outlined="item.class ? true : false"
        :rows="item.row"
        row-height="15"
        :error-messages="item.error"
        :rules="item.rules"
        :disabled="item.disabled"
        @input="updateValue"
        :value="item.value ? item.value : value"
      ></v-textarea>

      <!-- <input
        class="form-control"
        :value="item.value"
        :type="item.type"
        :placeholder="item.placeholder"
        @input="updateValue($event.target.value)"
        @blur="updatekeyValue($event.target.value)"
        v-else
      /> -->
      <template
      v-else-if="item.type == 'password'"
      
      >
        <v-text-field
          @input="updateValue"
          :append-icon="item.show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="item.show ? 'text' : 'password'"
          @click:append="item.show = !item.show"
          v-model="item.value"
          :rules="item.rules"
          lazy-validation
          color="rgba(0,0,0,.6)"
          light
          :error-messages="item.error"
          :value="item.value ? item.value : value"
          :placeholder="item.placeholder"
          :class="item.class"
          :outlined="item.class ? true : false"
          class="font-size-input placeholder-lighter text-light-input"
        >
        </v-text-field>
    </template>

      <template v-else-if="item.type == 'date'">
        <!-- <custom-date-picker
          @input="updateValue"
          :value="item.value ? item.value : value"
          v-model="item.value"
        ></custom-date-picker> -->
        <v-menu
          ref="menu"
          @input="updateValue"
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
              :value="item.value ? item.value : value"
              :outlined="item.class ? true : false"
              v-on="on"
            ></v-text-field>
          </template>
          <v-hijri-date-picker no-title locale="ar" v-model="item.value">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">
              {{ $t("Cancel") }}
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(item.value)">
              {{ $t("OK") }}
            </v-btn></v-hijri-date-picker
          >
        </v-menu>
      </template>
      <v-text-field
        v-else-if="item.type == 'datetime'"
        @input="updateValue"
        :rules="item.rules"
        :class="item.class"
        type="datetime-local"
        :error-messages="item.error"
        color="rgba(0,0,0,.6)"
        :min="item.min"
        :placeholder="item.placeholder"
        class="font-size-input placeholder-lighter text-light-input"
        :disabled="item.disabled"
        v-model="item.value"
        :value="item.value ? item.value : value"
        :outlined="item.class ? true : false"
      >
      </v-text-field>
      <v-text-field
        v-else
        @input="updateValue"
        :rules="item.rules"
        :class="item.class"
        :type="item.type ? item.type : 'text'"
        :error-messages="item.error"
        color="rgba(0,0,0,.6)"
        :min="item.min"
        :placeholder="item.placeholder"
        class="font-size-input placeholder-lighter text-light-input"
        :disabled="item.disabled"
        v-model="item.value"
        :value="item.value ? item.value : value"
        :outlined="item.class && item.class.indexOf('form-control') > -1 ? true : false"
      >
      </v-text-field>
      <slot name="feild"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Input",
  props: ["item", "value", "show"],
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    updateValue: function (value) {
      this.$emit("input", value);
    },
    updatekeyValue: function (value) {
      this.$emit("blur", value);
    },
    updateChangeFile: function (value, item) {
      this.$emit("change", value, item.value_text);
    },
    updateChangeFiles: function (value) {
      this.$emit("input", value);
    },
  },
};
</script>
