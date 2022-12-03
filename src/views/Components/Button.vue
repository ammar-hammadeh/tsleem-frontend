<template>
  <div :class="class_div">
    <v-btn
      :loading="loader"
      class="font-weight-bold text-xs btn-default py-5 px-6 mb-0 "
      :class="classes"
      color="white"
      text
      :link="link ? true : false"
      :to="link"
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
    class_div: {
      type: String,
      default: "",
    },
    classes: {
      type: String,
      default: "bg-gradient-default",
    },
    link: {
      type: String,
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