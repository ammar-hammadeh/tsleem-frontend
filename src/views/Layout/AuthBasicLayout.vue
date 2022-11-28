<template>
  <v-app>
    <v-main class="auth-pages">
      <div
        class="header-auth position-relative ma-4 pb-17 pt-16 border-radius-xl"
        :style="`background-image:  url(${require('../../assets/img/bg-login.png')}; background-size: cover; background-position: 50%;`"
      >
        <div @click="logout" class="logout">
          <h6 class="text-md font-weight-bold mb-1 text-typo text-gray">
            <v-icon size="20"
            >fas fa-sign-out-alt me-sm-2 text-md</v-icon
            >
            {{ $t("logout") }}
          </h6>
      </div>
        <span
          v-if="this.$route.name == 'RegisterForm'"
          class="mask bg-gradient-default border-radius-xl opacity-6"
        ></span>
        <a href="#" class="d-block auth-logo corner-logo">
          <img src="@/assets/img/logo2.png" alt="" width="100px" />
          <span class="logo-txt"></span>
        </a>
        <v-img
          src="@/assets/img/shapes/waves-white.svg"
          alt="pattern-lines"
          class="position-absolute opacity-6 start-0 top-0 w-100"
          v-if="this.$route.name == 'Pricing'"
        ></v-img>
        <v-container>
          <v-row class="d-flex mt-5">
            <v-col cols="12" md="6" class="mx-auto py-0 position-relative">
              <h3
                class="text-h3 font-weight-bold text-white text-center mb-2"
                v-if="this.$route.name == 'Pricing'"
              >
                {{ headerTitle() }}
              </h3>
              <h1
                class="
                  text-h1 text-white
                  font-weight-bolder
                  text-center
                  mb-2
                  mt-5
                  font-diner
                "
                v-else
              >
                {{ headerTitle() }}
              </h1>
              <p
                class="
                  text-white
                  font-size-root
                  text-center
                  font-weight-thin
                  mb-12
                  font-diner
                "
              >
                {{ paragraphs }}
              </p>
              <!-- <p
                class="
                  text-danger
                  font-size-root
                  text-center
                  font-weight-thin
                  mb-12
                  font-diner
                "
                v-if="user.status == 'rejected'"
              >
              {{$t('Reason reject')}}
                {{ user.reject_reason }}
              </p> -->
            </v-col>
          </v-row>
        </v-container>
      </div>
      <!-- <app-bar-auth background="transparent" has-bg linkColor="white">
      </app-bar-auth> -->
      <fade-transition :duration="200" origin="center top" mode="out-in">
        <!-- your content here -->
        <v-container class="mt-n16 pb-0 position-relative">
          <router-view></router-view>
          <!-- <content-footer auth v-if="!$route.meta.hideFooter"></content-footer> -->
        </v-container>
      </fade-transition>
    </v-main>
  </v-app>
</template>
<script>
import AppBarAuth from "@/components/AppBarAuth";
import { FadeTransition } from "vue2-transitions";
import ContentFooter from "@/components/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "page-layout",
  components: {
    AppBarAuth,
    FadeTransition,
    ContentFooter,
  },
  data() {
    return {
      paragraphs: "",
      tab: null,
    };
  },
  computed:{
    ...mapState('auth',['user']),
  },
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then((response) => {
          console.log(response);
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
    headerTitle() {
      switch (this.$route.name) {
        case "SignUpBasic":
          this.paragraphs =
            "Use these awesome forms to login or create new account in your project for free.";
          return "Welcome!";
        case "RegisterForm":
          this.paragraphs = this.$i18n.t("please fill this information");
          return this.$i18n.t("Register Form");
        default:
          break;
      }
    },
  },
};
</script>
<style scoped>
.logout{
  position: absolute;
    z-index: 1;
    top: 23px;
    left: 21px;
    cursor: pointer;
}
.logout .text-gray{
  color: #494851 !important
}
</style>
