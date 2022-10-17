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
    <div :class="item.class_div" class="position-relative">
      <!-- <v-checkbox
        v-if="item.type == 'checkbox'"
        :rules="item.rules"
        class="mt-0"
        :color="item.color"
        :label="item.label_input"
        :value="item.value"
        :disabled="item.disabled"
        :error-messages="item.error"
      ></v-checkbox>
       -->
      <v-file-input
        v-if="item.type == 'file'"
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

      <v-autocomplete
        v-else-if="item.type == 'autocomplete'"
        :items="item.items"
        :item-text="item.title_select ? item.title_select : 'name'"
        :item-value="'id'"
        :placeholder="$t('general.choose')"
        :error-messages="item.error"
        :multiple="item.type_select == 'multiple' ? true : false"
        :disabled="item.disabled"
        @change="$emit('input', $event)"
        :value="value"
        :outlined="item.class ? true : false"
      ></v-autocomplete>

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
      <v-text-field
        v-else-if="item.type == 'password'"
        @input="updateValue"
        :append-icon="item.show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="item.show ? 'text' : 'password'"
        @click:append="item.show = !item.show"
        v-model="item.value"
        :rules="item.rules"
        lazy-validation
        color="rgba(0,0,0,.6)"
        light
        :value="item.value ? item.value : value"
        :placeholder="item.placeholder"
        :class="item.class"
        :outlined="item.class ? true : false"
        class="font-size-input placeholder-lighter text-light-input"
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
        :outlined="item.class ? true : false"
      >
      </v-text-field>
    </div>

    <span v-if="item.required" class="text-danger astrik">*</span>
  </div>
</template>
<script>
export default {
  name: "Input",
  props: ["item", "value", "show"],
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
