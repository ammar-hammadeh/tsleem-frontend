<template >
  <div>
    <v-snackbar
      top
      v-model="snackbarC.visible"
      :color="snackbarC.color"
      class="snackbar-shadow"
    >
      <div class="d-flex align-center alert-notify">
        <v-icon size="24" class="text-white ml-5">ni ni-bell-55</v-icon>
        <p class="mb-0">
          <span class="font-size-root font-weight-600">{{
            snackbarC.note
          }}</span>
          <br />
          {{ snackbarC.msg }}
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
          @click="snackbarC.visible = false"
          v-bind="attrs"
        >
          <v-icon size="13">fas fa-times</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "Notify",
  props: ["details"],
  data() {
    return {
      snackbar: {
        color: null,
        visible: false,
        msg: "",
        note: "",
      },
    };
  },
  computed: {
    snackbarC() {
      // console.log("type");
      // console.log(this.details.type);
      if (!this.details.type) return this.snackbar;
      switch (this.details.type) {
        case "Info":
          return {
            color: "#17c1e8",
            visible: true,
            msg: this.details.msg,
            note: this.$i18n.t("Info"),
          };
        case "Success":
          return {
            color: "#2dce89",
            visible: true,
            msg: this.details.msg,
            note: this.$i18n.t("Success"),
          };
        case "Warning":
          return {
            color: "#fbcf33",
            visible: true,
            msg: this.details.msg,
            note: this.$i18n.t("Warning"),
          };
        case "Danger":
          return {
            color: "#f5365c",
            visible: true,
            msg: this.details.msg,
            note: this.$i18n.t("Error"),
          };
      }
    },
  },
  methods: {},
  mounted() {
    // this.SnackbarShow(this.details);
    // console.log('details notufy1')
    // console.log(this.details)
  },
};
</script>