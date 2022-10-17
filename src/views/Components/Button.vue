<template>
  <div>
    <v-btn
      :loading="loader"
      class="font-weight-bold text-xs btn-default py-5 px-6 mb-0 ms-auto"
      :class="classes"
      color="white"
      text
      @click="$emit('click')"
    >
      <span slot="loader">
        <v-progress-circular
          style="width: 20px; height: 20px"
          indeterminate
          color="white"
        ></v-progress-circular>
      </span>
      <template v-if="title">
        {{ title }}
      </template>
      <template v-else>
        {{ $t("form.save") }}
      </template>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    loader: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    classes: {
      type: String,
      default: "bg-gradient-default",
    },
  },
  name: "Button",
  data() {
    return {};
  },
  updateChangeFile: function (value) {
    this.$emit("click", value);
  },
};
</script>