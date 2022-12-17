<template>
  <v-row class="">
    <v-col cols="12" class="pl-0">
      <h1 class="title-body text-center">
        {{ name }}
      </h1>
    </v-col>
    <v-col cols="12" class="pl-0">
      <h3 class="title-body white-space-break text-md" v-html="body">
      </h3>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FormInfoTopSection",
  props: ['name', 'body']
}
</script>

<style scoped>

</style>
