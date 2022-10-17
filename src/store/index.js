import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import { form } from './form.module';
import { table } from './table.module';
import { order } from './order.module';
import { camp } from './camp.module';
import { question } from './question.module';
import { city } from './city.module';
import { type } from './type.module';
import { user } from './user.module';
import { square } from './square.module';
import { assign } from './assign.module';
import { appointment } from './appointment.module';
import { category } from './category.module';
Vue.use(Vuex);
// Vue.use(router);
export default new Vuex.Store({
    state: () => ({
        collection: '',
        name_function: '',
        id: '',
        url: null,
        card: {},
    }),
    mutations: {
        SET_COLLECTION(state, data) {
            state.collection = data
        },
        SET_URL(state, data) {
            state.url = data
        },
        SET_FUNCTION(state, data) {
            state.name_function = data;
        },
        SET_ID(state, data) {
            state.id = data;
        },
        SET_CARD(state, data) {
            state.card = data;
        },
        SET_CARD_LOADING(state, data) {
            state.card.loading = data;
        },
        // SET_FORM_DATA(state,data){
        //     state.form_data = data
        // },
    },
    actions: {
        ResetData({ state, rootState }) {
            rootState.table.btn_table = [];
            rootState.table.items = [];
            rootState.table.data_extend = {};
            rootState.table.data_expand = {};
            rootState.table.headers = [];
            rootState.table.btns = [];
            rootState.table.pagination = false;
            rootState.table.paginate = {
                page: 1,
                itemsPerPage: 0,
                total: 0,
                row_pre_page: false
            };
            rootState.table.select_view = false
            state.url = null
            state.name_function = ''
            state.collection = ''
            state.id = ''

            // form
            rootState.form.filters = [];
            rootState.form.formData = null;
            rootState.form.form_data = {};
            rootState.form.style_form = [];
            rootState.form.action = '';
            rootState.form.notify = {
                color: null,
                visible: false,
                msg: '',
                note: ''
            };
            rootState.form.modal = {};
            rootState.form.loader = false;
            rootState.form.dialog = false;
            rootState.form.stepper = {}

            return true;
        },
    },
    modules: {
        auth, table, form, order, category, user, appointment,
        camp, city, type, square, question, assign
    }
});