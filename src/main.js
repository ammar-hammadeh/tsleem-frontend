import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import DashboardPlugin from "./plugins/dashboard-plugin";
import "@mdi/font/css/materialdesignicons.css";
import store from "./store";
import i18n from "./i18n";
import middleware from "./middleware/";
import VueQRCodeComponent from "vue-qrcode-component";
Vue.component("qr-code", VueQRCodeComponent);
import VueSignature from "vue-signature-pad";
Vue.use(VueSignature);
Vue.config.productionTip = false;
import uq from "@umalqura/core";
uq.locale("ar");
// Returns true
uq.rtl();
import VHijriDatePicker from "vuetify-umalqura";
import "./http/httpClient";

Vue.component("v-hijri-date-picker", VHijriDatePicker);

// Photoswipe Gallery
import Photoswipe from "vue-pswipe";
Vue.use(Photoswipe);

// plugin setup
Vue.use(DashboardPlugin);

import VueDatetimeJs from "vue-datetime-js";
Vue.use(VueDatetimeJs, {
  name: "custom-date-picker",
  props: {
    inputFormat: "YYYY-MM-DD HH:mm:ss",
    format: "jYYYY-jMM-jDD HH:mm:ss",
    editable: false,
    inputClass: "form-control my-custom-class-name",
    placeholder: i18n.t("Please select a date"),
    altFormat: "YYYY-MM-DD HH:mm:ss",
    color: "#00acc1",
    autoSubmit: false,
    //...
    //... And whatever you want to set as default
    //...
  },
});
// Vue.component('date-picker', VueDatetimeJs);

if (localStorage.hasOwnProperty("lang")) {
  var lang = localStorage.getItem("lang");
} else {
  var lang = localStorage.setItem("lang", "ar");
}
document.documentElement.lang = lang;

import VueSweetalert2 from "vue-sweetalert2";

Vue.use(VueSweetalert2);

import moment from "moment";
Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("Y-M-D hh:mm");
  }
});

Vue.filter("formatDateOnly", function (value) {
  if (value) {
    return moment(String(value)).format("Y-M-D");
  }
});

Vue.filter("formatTime", function (value) {
  if (value) {
    return moment(String(value)).format("hh:mm:ss");
  }
});

// if (router.name == "Login" || router.name == "Signup") {
//     alert(router.name)
// }
require("./assets/css/login.css");
require("./assets/css/main.css");

function nextCheck(ctx, middleware, index, store) {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) return ctx.next;

  return (...params) => {
    ctx.next(...params);
    const nextMidd = nextCheck(ctx, middleware, index + 1, store);
    nextMiddleware({ ...ctx, nextMiddleware: nextMidd, store, contextNext: ctx.next });
  };
}

// Auth && Permissions routes setup
router.beforeEach((to, from, next) => {
  if (store.dispatch("ResetData")) {
    if (to.meta.middlewares) {
      const middleware = Array.isArray(to.meta.middlewares)
        ? to.meta.middlewares
        : [to.meta.middlewares];
      const ctx = { from, next, router, to };

      const nextMiddleware = nextCheck(ctx, middleware, 1, store);
      return middleware[0]({ ...ctx, nextMiddleware: nextMiddleware, store, contextNext: next });
    }

    return next();
  }
});

new Vue({
  router,
  vuetify,
  store,
  i18n,
  icons: {
    iconfont: "mdi",
  },
  render: (h) => h(App),
}).$mount("#app");
