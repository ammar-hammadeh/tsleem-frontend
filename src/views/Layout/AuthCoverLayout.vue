<template>
  <v-app>
    <div class="auth-page bg-page-login">
      <v-container>
        <v-row>
          <v-col
            :xl="$route.name == 'Login' ? '4' : '5'"
            :lg="$route.name == 'Login' ? '5' : '6'"
            :md="$route.name == 'Login' ? '6' : '7'"
            :sm="$route.name == 'Login' ? '8' : '9'"
            cols="12"
            class="d-flex flex-column mx-auto"
          >
            <!-- <div class="col-md-6 col-sm-8 col-lg-5 col-xl-4 col-xxl-3 mx-auto"> -->
            <fade-transition :duration="200" origin="center top" mode="out-in">
              <!-- your content here -->
              <router-view></router-view>
            </fade-transition>
          </v-col>
        </v-row>
      </v-container>
      <!-- end container fluid -->
    </div>
  </v-app>
</template>
<script>
import AppBarBlurAuth from "@/components/AppBarBlurAuth";
import { FadeTransition } from "vue2-transitions";
import ContentFooter from "@/components/Footer.vue";

export default {
  name: "page-layout",
  components: {
    AppBarBlurAuth,
    FadeTransition,
    ContentFooter,
  },
  data() {
    return {};
  },
};
</script>
