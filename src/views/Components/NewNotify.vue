<template >
  <div>
    <v-snackbar
      top
      v-model="snackbarC.visible"
      :color="snackbarC.color"
      class="snackbar-shadow"
    >
      <div class="d-flex align-end alert-notify">
        <v-icon size="24" class="text-white mr-5">ni ni-bell-55</v-icon>
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
      if (!this.details.type) return;
      switch (this.details.type) {
        case "Info":
          return {
            color: "#17c1e8",
            visible: true,
            msg: this.details.msg,
            note: "Info",
          };
          break;
        case "Success":
          return {
            color: "#2dce89",
            visible: true,
            msg: this.details.msg,
            note: "Success",
          };
          break;
        case "Warning":
          return {
            color: "#fbcf33",
            visible: true,
            msg: this.details.msg,
            note: "Warning",
          };
          break;
        case "Danger":
          return {
            color: "#f5365c",
            visible: true,
            msg: this.details.msg,
            note: "Error",
          };
          break;
      }
    },
  },
  methods: {
    SnackbarShow(details) {
      console.log("type");
      console.log(details.type);
      if (!details.type) return;
      switch (details.type) {
        case "Info":
          this.snackbar = {
            color: "#17c1e8",
            visible: true,
            msg: details.msg,
            note: "Info",
          };
          break;
        case "Success":
          this.snackbar = {
            color: "#82d616",
            visible: true,
            msg: details.msg,
            note: "Success",
          };
          break;
        case "Warning":
          this.snackbar = {
            color: "#fbcf33",
            visible: true,
            msg: details.msg,
            note: "Warning",
          };
          break;
        case "Danger":
          this.snackbar = {
            color: "#ea0606",
            visible: true,
            msg: details.msg,
            note: "Error",
          };
          break;
      }
    },
  },
  mounted() {
    this.SnackbarShow(this.details);
    // console.log('details notufy1')
    // console.log(this.details)
  },
};
</script>