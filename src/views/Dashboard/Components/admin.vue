<template>
  <v-row>
    <v-col md="11" class="z-index-2">
      <v-card class="bg-transparent mb-6 px-4 py-4">
        <!-- <v-row>
              <v-col lg="6">
                <h2 class="text-h2 text-white  font-weight-bolder mb-0">
                  General datas
                </h2>
              </v-col>
            </v-row> -->
      </v-card>
      <v-row>
        <v-col sm="6" cols="12">
          <v-card
            class="card-shadow bg-gradient-secondary border-radius-xl px-4 py-4"
          >
            <v-row no-gutters>
              <v-col sm="8">
                <p
                  class="
                    text-sm
                    mb-0
                    text-capitalize
                    font-weight-bold
                    text-white
                    opacity-7
                  "
                >
                  {{ $t("ready camps") }}
                </p>
                <h5 class="text-h5 text-white font-weight-bolder mb-0">
                  {{ data.ready_camps }}
                  <!-- <span class="text-success text-sm font-weight-bolder"
                        >+3%</span
                      > -->
                </h5>
              </v-col>
              <v-col sm="4" class="text-end">
                <v-avatar color="bg-white" class="shadow" rounded>
                  <v-icon size="20" class="text-typo"> mdi-tent </v-icon>
                </v-avatar>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col sm="6" cols="12">
          <v-card
            class="
              mb-6
              card-shadow
              bg-gradient-secondary
              border-radius-xl
              px-4
              py-4
            "
          >
            <v-row no-gutters>
              <v-col sm="8">
                <p
                  class="
                    text-sm
                    mb-0
                    text-capitalize
                    font-weight-bold
                    text-white
                    opacity-7
                  "
                >
                  {{ $t("pending user") }}
                </p>
                <h5 class="text-h5 text-white font-weight-bolder mb-0">
                  {{ data.pending_user }}
                  <!-- <span class="text-success text-sm font-weight-bolder"
                        >+55%</span
                      > -->
                </h5>
              </v-col>
              <v-col sm="4" class="text-end">
                <v-avatar color="bg-white" class="shadow" rounded>
                  <v-icon size="20" class="text-typo">
                    mdi-account-clock-outline
                  </v-icon>
                </v-avatar>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col sm="4" cols="12">
          <v-card
            class="
              mb-6
              card-shadow
              bg-gradient-secondary
              border-radius-xl
              px-4
              py-4
            "
          >
            <v-row no-gutters>
              <v-col sm="8">
                <p
                  class="
                    text-sm
                    mb-0
                    text-capitalize
                    font-weight-bold
                    text-white
                    opacity-7
                  "
                >
                  {{ $t("total camps") }}
                </p>
                <h5 class="text-h5 text-white font-weight-bolder mb-0">
                  {{ data.total_camps }}
                  <!-- <span class="text-danger text-sm font-weight-bolder"
                        >-2%</span
                      > -->
                </h5>
              </v-col>
              <v-col sm="4" class="text-end">
                <v-avatar color="bg-white" class="shadow" rounded>
                  <v-icon size="20" class="text-typo"> mdi-tent </v-icon>
                </v-avatar>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col sm="4" cols="12">
          <v-card
            class="card-shadow bg-gradient-secondary border-radius-xl px-4 py-4"
          >
            <v-row no-gutters>
              <v-col sm="8">
                <p
                  class="
                    text-sm
                    mb-0
                    text-capitalize
                    font-weight-bold
                    text-white
                    opacity-7
                  "
                >
                  {{ $t("total square") }}
                </p>
                <h5 class="text-h5 text-white font-weight-bolder mb-0">
                  {{ data.total_square }}
                  <!-- <span class="text-success text-sm font-weight-bolder"
                        >+5%</span
                      > -->
                </h5>
              </v-col>
              <v-col sm="4" class="text-end">
                <v-avatar color="bg-white" class="shadow" rounded>
                  <v-icon size="20" class="text-typo">
                    mdi-vector-square
                  </v-icon>
                </v-avatar>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col sm="4" cols="12">
          <v-card
            class="card-shadow bg-gradient-secondary border-radius-xl px-4 py-4"
          >
            <v-row no-gutters>
              <v-col sm="8">
                <p
                  class="
                    text-sm
                    mb-0
                    text-capitalize
                    font-weight-bold
                    text-white
                    opacity-7
                  "
                >
                  {{ $t("total user") }}
                </p>
                <h5 class="text-h5 text-white font-weight-bolder mb-0">
                  {{ data.total_user }}
                  <!-- <span class="text-success text-sm font-weight-bolder"
                        >+5%</span
                      > -->
                </h5>
              </v-col>
              <v-col sm="4" class="text-end">
                <v-avatar color="bg-white" class="shadow" rounded>
                  <v-icon size="20" class="text-typo">
                    mdi-account-group-outline</v-icon
                  >
                </v-avatar>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    data: {},
  },
};
</script>