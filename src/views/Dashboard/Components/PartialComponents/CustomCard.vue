<template>
  <v-card class="counter-card pa-3 py-4 fill-height d-flex align-center">
    <v-row align="center">
      <v-col cols="3">
        <v-avatar class="card-avatar">
          <v-icon size="32" color="white">{{ this.icon }}</v-icon>
        </v-avatar>
      </v-col>
      <v-col>
        <div class="d-flex flex-column mr-2">
          <h5 class="text-h5 font-poppins font-weight-bolder text-dark">
            {{ this.count }}
          </h5>
          <span class="text-h7 text-wrap text-dark">{{ this.title }}</span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    title: { required: true },
    count: { required: true },
    icon: { type: String, required: true },
  },
};
</script>

<style scoped>
* {
  font-family: GE-Dinar, Poppins !important;
}
</style>
