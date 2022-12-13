// Axios setup
import VueAxios from "vue-axios";
import authHeader from "../services/auth-header";
import Vue from "vue";
import store from "@/store";
import router from "@/router";
import { saveRedirectionIntoStorage } from "@/util/helpers/LoginRedirectionHelpers/LoginRedirectionHelpers";

const axios = require("axios");
Vue.use(VueAxios, axios);

const BACKEND_URLS = {
  TASLEEM: "https://backend.tsleem.com.sa/",
  DOHALAW: "https://tasleemback.dohalaw.net/",
  DEV: "https://backend-dev.tsleem.com.sa/",
  LOCAL_HOST: "http://127.0.0.1:8000/",
};

const FRONT_URLS = {
  TASLEEM: "https://services.tsleem.com.sa/",
  DOHA_LAW: "https://tasleem.dohalaw.net/",
  SERVICES_DEV: "https://services-dev.tsleem.com.sa/",
};

Vue.prototype.$baseURL = BACKEND_URLS.DOHALAW;
Vue.prototype.$frontURL = FRONT_URLS.DOHA_LAW;

const ENDPOINT_BASE_API = BACKEND_URLS.DOHALAW + "api";

window.axios = require("axios");
axios.defaults.baseURL = ENDPOINT_BASE_API;
axios.interceptors.request.use(function (config) {
  config.headers = authHeader();
  return config;
});
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      console.log(router)
        ; store
          .dispatch("auth/logout")
          .then(() => {
            const prevPath = router.history._startLocation ?? undefined;
            saveRedirectionIntoStorage(prevPath);
            router.push({ path: `/login` });
          })
          .catch((err) => console.log(err));
    }
    return Promise.reject(error);
  }
);
