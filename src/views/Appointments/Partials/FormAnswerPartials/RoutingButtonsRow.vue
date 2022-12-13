<template>
  <v-row class="mb-5">
    <v-col cols="6" class="text-right">
      <Button
          :title="$t('back')"
          :link="previousPageLink"
      ></Button>
    </v-col>
    <v-col cols="6" class="text-left">
      <Button @click="submitHandler" :loader="isLoading"></Button>
    </v-col>
  </v-row>
</template>

<script>
import Button from "../../../Components/Button.vue";

export default {
  name: "RoutingButtonsRow",
  components: {Button},
  props: ["isLoading", "submitHandler", "previousPageLink"],
}
</script>

<style scoped>

</style>
