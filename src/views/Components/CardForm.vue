<template>
  <v-container fluid>
    <Notify></Notify>
    <v-row>
      <!-- <v-col cols="12" class="text-center">
        <h3 class="text-h3 text-typo font-weight-bold mt-9">
          Build {{ $store.state.card.title }}
        </h3>
      </v-col> -->
      <v-col lg="8" cols="12" class="mx-auto mb-6">
        <slot name="card-body">
          <v-card class="card-shadow border-radius-xl mt-9">
            <Loading v-if="$store.state.card.loading"></Loading>
            <v-row class="text-center">
              <v-col cols="10" class="mx-auto">
                <h5 class="text-h5 text-typo font-weight-normal mb-6 mt-3">
                  {{ $store.state.card.sub_title }}
                </h5>
              </v-col>
            </v-row>

            <div class="px-6 pb-6 pt-0">
              <slot name="card-form">
                <Form>
                  <template slot="filed">
                    <slot name="form"> </slot>
                  </template>
                  <template slot="customize">
                    <slot name="customize-form"> </slot>
                  </template>
                </Form>
              </slot>
            </div>
          </v-card>
        </slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Notify from "./Notify.vue";
// import Stepper from "./Stepper.vue";
import Form from "./Form.vue";
import Loading from "./Loading.vue";
export default {
  name: "Card",
  components: {
    Notify,
    // Stepper,
    Form,
    Loading,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="css">
.border-card {
  border-radius: 1rem !important;
}
</style>
