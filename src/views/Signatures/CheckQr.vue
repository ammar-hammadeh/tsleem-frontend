<template>
  <div style="height: 100vh">
    <div
      style="height: 100%"
      class="d-flex flex-column justify-center align-center text-typo"
    >
      <div>
        <v-btn
          :ripple="false"
          icon
          outlined
          rounded
          :color="status ? 'green' : 'red'"
          width="50px"
          height="50px"
          class="check"
        >
          <v-icon size="30" color="green" v-if="status"> mdi-check </v-icon>
          <v-icon size="30" color="red" v-if="status == false">
            mdi-close
          </v-icon>
        </v-btn>
      </div>
      <h1 class="mt-5">{{ message }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "CheckQr",

  data() {
    return {
      message: "",
      status: "",
    };
  },
  mounted() {
    document.title = this.$i18n.t("FileSignature");
    axios.get("general/contracts/check-qr/" + this.$route.params.qr).then(
      (response) => {
        console.log(response.data);
        this.message = response.data.message;
        this.status = response.data.status;
      },
      (error) => {
        console.log(error);
        var message = {
          msg: this.$i18n.t("general.there is problem"),
          type: "Danger",
        };
        this.$router.push({
          name: "SignaturePage",
          params: { message: message },
        });
      }
    );
  },
};
</script>
<style>
.check {
  border-width: 2px;
}
</style>