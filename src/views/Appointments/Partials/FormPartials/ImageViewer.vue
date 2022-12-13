<template>
  <v-dialog v-model="isModalOpen" width="500" v-if="images.length">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
             fab
             x-small
             v-bind="attrs" v-on="on">
        <v-icon
        >mdi-information
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-carousel v-model="imageIndex">
        <v-carousel-item v-for="img in images" :key="img.id">
          <v-img :src="img.path"></v-img>
        </v-carousel-item>
      </v-carousel>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="isModalOpen = false"> {{$t('close')}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ImageViewer",
  props: ["images"],
  data() {
    return {
      isModalOpen: false,
      imageIndex: 0,
    };
  },
};
</script>

<style scoped></style>
