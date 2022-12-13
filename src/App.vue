<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    if (localStorage.getItem("lang") == "ar") {
      this.$vuetify.rtl = true;
    } else {
      this.$vuetify.rtl = false;
    }
  },
};
</script>
