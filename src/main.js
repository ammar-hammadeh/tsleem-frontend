import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import DashboardPlugin from "./plugins/dashboard-plugin";
import '@mdi/font/css/materialdesignicons.css'
import store from './store'
import i18n from "./i18n";
import middleware from './middleware/'
import VueQRCodeComponent from 'vue-qrcode-component'
Vue.component('qr-code', VueQRCodeComponent)
Vue.config.productionTip = false;

// Photoswipe Gallery
import Photoswipe from "vue-pswipe";
Vue.use(Photoswipe);

// plugin setup
Vue.use(DashboardPlugin);

// Axios setup
import VueAxios from 'vue-axios'
import authHeader from './services/auth-header';
const axios = require('axios')
Vue.use(VueAxios, axios)
let url = 'https://95.177.179.143:8080/'
// let url = 'https://tasleemback.dohalaw.net/'
// let url = 'http://127.0.0.1:8000/'
Vue.prototype.$baseURL = url
// Vue.prototype.$frontURL = 'https://tasleem.dohalaw.net/'
Vue.prototype.$frontURL = 'https://95.177.179.143/'

window.axios = require('axios')
axios.defaults.baseURL = url + "api/"
axios.interceptors.request.use(function (config) {
    config.headers = authHeader()
    return config
})

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    console.log(error)
    if (error.response.status == 401) {
        store.dispatch("auth/logout")
            .then(() => {
                router.push({ path: `/login` });
            })
            .catch((err) => console.log(err));
    }
    return Promise.reject(error);
});

if (localStorage.hasOwnProperty('lang')) {
    var lang = localStorage.getItem("lang")
} else {
    var lang = localStorage.setItem("lang", 'ar');
}
document.documentElement.lang = lang

import VueSweetalert2 from "vue-sweetalert2";

Vue.use(VueSweetalert2);

import moment from 'moment';
Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('Y-m-d hh:mm')
    }
});

Vue.filter('formatDateOnly', function (value) {
    if (value) {
        return moment(String(value)).format('Y-m-d')
    }
});

Vue.filter('formatTime', function (value) {
    if (value) {
        return moment(String(value)).format('hh:mm:ss')
    }
});

// if (router.name == "Login" || router.name == "Signup") {
//     alert(router.name)
// }
require('./assets/css/login.css');
require('./assets/css/main.css');

function nextCheck(ctx, middleware, index, store) {
    const nextMiddleware = middleware[index]
    if (!nextMiddleware) return ctx.next;

    return (...params) => {
        ctx.next(...params)
        const nextMidd = nextCheck(ctx, middleware, index + 1, store)
        nextMiddleware({ ...ctx, next: nextMidd, store })
    }
}

// Auth && Permissions routes setup
router.beforeEach((to, from, next) => {
    if (store.dispatch("ResetData")) {
        if (to.meta.middlewares) {
            const middleware = Array.isArray(to.meta.middlewares) ? to.meta.middlewares : [to.meta.middlewares]
            const ctx = { from, next, router, to }

            const nextMiddleware = nextCheck(ctx, middleware, 1, store)
            return middleware[0]({ ...ctx, next: nextMiddleware, store })
        }

        return next()
    }
})


new Vue({
    router,
    vuetify,
    store,
    i18n,
    icons: {
        iconfont: 'mdi',
    },
    render: (h) => h(App),
}).$mount("#app");