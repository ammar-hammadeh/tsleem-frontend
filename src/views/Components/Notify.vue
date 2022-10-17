<template >
  <div>
    <v-snackbar
      top
      v-model="notifyStyle.visible"
      :color="notifyStyle.color"
      class="snackbar-shadow"
    >
      <div class="d-flex align-center alert-notify">
        <v-icon size="24" class="text-white" :class="classLang"
          >ni ni-bell-55</v-icon
        >
        <p class="mb-0">
          <span class="font-size-root font-weight-600">{{
            notifyStyle.note
          }}</span>
          <br />
          {{ notifyStyle.msg }}
        </p>
      </div>

      <template v-slot:action="{ attrs }">
        <!-- elevation="0" -->
        <v-btn
          icon
          max-width="136"
          :ripple="false"
          height="43"
          class="font-weight-600 text-capitalize py-3 px-6 rounded-sm"
          color="rgba(255,255,255, .85)"
          @click="notifyStyle.visible = false"
          v-bind="attrs"
        >
          <v-icon size="13">fas fa-times</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("form");
export default {
  name: "Notify",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["notifyStyle"]),
    classLang() {
      return {
        "ml-5": this.$vuetify.rtl,
        "mr-5": !this.$vuetify.rtl,
      };
    },
  },
};
</script>