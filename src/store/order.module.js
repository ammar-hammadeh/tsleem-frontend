import OrderService from '../services/order.service';
import Vue from "vue";
import i18n from '@/i18n.js'
import router from '../router'
export const order = {
    namespaced: true,
    state: () => ({
        orders: [],
        orderDetails: {},
        cities: [],
        obj: {},
        item: {},
        data_quantity: [
            {
                col: "12",
                type: "number",
                label: "Quantity",
                value_text: "quantity",
                error: null,
                rules: [(v) => !!v || i18n.t("form.Item is required")],
                visible: true
            },
        ],
        // data_ads_order
        data_order: [
            {
                col: "4",
                type: "text",
                label: "customer name",
                value_text: "customer_name",
                error: null,
                value: "",
                rules: [(v) => !!v || i18n.t("form.Item is required")],
                visible: true
            },
            {
                col: "4",
                type: "number",
                label: "customer phone",
                value_text: "customer_phone",
                error: null,
                value: "",
                rules: [(v) => !!v || i18n.t("form.Item is required")],
                visible: true
            },
            {
                col: "4",
                type: "text",
                label: "customer address",
                value_text: "customer_address",
                error: null,
                value: "",
                rules: [(v) => !!v || i18n.t("form.Item is required")],
                visible: true
            },
            {
                col: "4",
                col_id: "col_gender",
                type: "select",
                type_select: "single",
                label: "customer gender",
                value_text: "customer_gender",
                items: [],
                error: null,
                value: "",
                rules: [(v) => !!v || i18n.t("form.Item is required")],
                visible: true
            },
            {
                col: "4",
                col_id: "col_country",
                type: "select",
                type_select: "single",
                label: "country",
                value_text: "country_id",
                items: [],
                error: null,
                value: "",
                rules: [(v) => !!v || i18n.t("form.Item is required")],
                visible: true,
                action: "change_country",
            },
            {
                col: "4",
                col_id: "col_city",
                type: "select",
                type_select: "single",
                label: "city",
                value_text: "city_id",
                items: [],
                error: null,
                value: "",
                rules: [(v) => !!v || i18n.t("form.Item is required")],
                visible: true
            },
            {
                col: "6",
                type: "number",
                label: "discount",
                value_text: "discount",
                error: null,
                value: "",
                rules: [],
                visible: true
            },
            {
                col: "6",
                col_id: "col_reason",
                type: "select",
                title_select: "reason",
                type_select: "single",
                label: "product discount reason id",
                value_text: "product_discount_reason_id",
                items: [],
                error: null,
                value: "",
                rules: [],
                visible: true
            },
        ],
    }),
    getters: {
        get_cities(state) {
            return state.cities.filter(v => v.country_id == state.obj.country_id)
        }
    },
    actions: {


        change_country({ rootState, commit, getters }) {
            commit('SET_OBJ', { country_id: rootState.form.action })
            rootState.form.style_form[5].items = getters.get_cities
        },

        Edit({ rootState, state, getters, commit }, data) {
            console.log(data)
            commit("SET_OBJ",
                { country_id: data.country_id, id: data.id, products: data.products });
            if (data.utm_source_id == 1 || data.utm_source_id == 2) {
                // show last 2 elemnt in array
                rootState.form.modal.size = "500";
                for (let i = 0; i < state.data_order.length; i++) {
                    const element = state.data_order[i];
                    if (i == 6 || i == 7) {
                        element.value = data[element.value_text];
                        element.col = 6
                    } else {
                        element.visible = false;
                    }
                }
                commit("form/SET_FORM_STYLE", state.data_order, { root: true });
            } else {
                rootState.form.modal.size = "1000";
                state.data_order[5].items = getters.get_cities;
                for (let i = 0; i < state.data_order.length; i++) {
                    const element = state.data_order[i];
                    element.value = data[element.value_text];
                    element.visible = true;
                }
                commit("form/SET_FORM_STYLE", state.data_order, { root: true });
            }
            // state.item = data;
            rootState.form.modal.title = "Edit Order Information # " + data.id;
            commit("form/SET_DIALOG", true, { root: true });
            commit("SET_COLLECTION", "order", { root: true });
            commit("SET_FUNCTION", "updateDataAction", { root: true });
        },

        updateDataAction({ commit, rootState, state }, data) {
            if (data.get('utm_source_id') != 1 && data.get('utm_source_id') != 2) {
                data.append("ads", 1)
            }
            data.append("id", state.obj.id)
            return OrderService.edit_order(data).then(
                res => {
                    console.log(res)
                    rootState.form.loader = false
                    rootState.form.dialog = false;
                    rootState.form.notify = {
                        msg: res.data.message,
                        type: "Success",
                    };
                    var order = Object.assign(res.data.order, { products: state.obj.products })
                    commit('table/UPDATE_ITEM', { data: order, type: 'update' }, { root: true });
                    return Promise.resolve(res);
                },
                error => {
                    rootState.form.loader = false
                    rootState.form.notify = {
                        msg: i18n.t("general.there is problem"),
                        type: "Danger",
                    };
                    return Promise.reject(error);
                }
            );
        },

        Change_Status({ dispatch }, data) {
            Vue.swal({
                title: i18n.t("general.Are you sure?!"),
                text: i18n.t("You won't be able to revert this!"),
                type: "warning",
                showCancelButton: true,
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
                confirmButtonText: i18n.t("general.Yes, change it!"),
                cancelButtonText: i18n.t("general.No, back!"),
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    dispatch("changeStatusAction", data.id)
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Vue.swal.DismissReason.cancel
                ) {
                    Vue.swal.fire(i18n.t("Cancelled"), i18n.t("Cancelled Delete"), "error");
                }
            });
        },

        changeStatusAction({ rootState, commit }, id) {
            return OrderService.change_status(id).then(
                res => {
                    console.log(res)
                    if (res.data.code == 500) {
                        commit("form/SET_NOTIFY", {
                            msg: res.data.message,
                            type: "Warning",
                        }, { root: true });
                    } else {
                        rootState.table.items.forEach(v => {
                            if (v.id == id) {
                                v.status = res.data.status
                            }
                        });
                        commit("form/SET_NOTIFY", {
                            msg: res.data.message,
                            type: "Success",
                        }, { root: true })
                    }
                    return Promise.resolve(res);
                },
                error => {
                    commit("form/SET_NOTIFY", {
                        msg: i18n.t("general.there is problem"),
                        type: "Danger",
                    }, { root: true });
                    return Promise.reject(error);
                }
            );
        },

        Cancel({ dispatch, commit }, data) {
            if (data.order_status_id == 1) {
                commit("form/SET_NOTIFY", {
                    msg: "this order is already Canceled",
                    type: "Warning",
                }, { root: true });
            } else {
                Vue.swal({
                    title: i18n.t("general.Are you sure?!"),
                    text: i18n.t("You won't be able to revert this!"),
                    type: "warning",
                    showCancelButton: true,
                    customClass: {
                        confirmButton: "btn bg-gradient-success",
                        cancelButton: "btn bg-gradient-danger",
                    },
                    confirmButtonText: i18n.t("general.Yes, Cancel it!"),
                    cancelButtonText: i18n.t("general.No, back!"),
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {
                        dispatch("cancelOrderAction", data.id)
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Vue.swal.DismissReason.cancel
                    ) {
                        Vue.swal.fire(i18n.t("Cancelled"), i18n.t("Cancelled Delete"), "error");
                    }
                });
            }
        },

        cancelOrderAction({ commit, rootState }, id) {
            return OrderService.cancel_order(id).then(
                res => {
                    console.log(res)
                    if (res.data.code == 500) {

                        commit("form/SET_NOTIFY", {
                            msg: res.data.message,
                            type: "Warning",
                        }, { root: true });
                    } else {

                        rootState.table.items.forEach(v => {
                            if (v.id == id) {
                                v.status = 'cancel'
                            }
                        });
                        commit("form/SET_NOTIFY", {
                            msg: res.data.message,
                            type: "Success",
                        }, { root: true });
                    }
                    return Promise.resolve(res);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },

        Details({ }, data) {
            router.push({ path: `/order/order-details/${data.id.toString()}` });
        },

        bulkChangeStatusAction({ commit }, data) {
            console.log(data)
            return OrderService.bulk_change_status({ ids: data }).then(
                res => {
                    console.log(res)
                    // commit('REMOVE_UPDATE_ORDER', { order: res.data.data, id: id});
                    return Promise.resolve(res);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },

        // details Action 
        getOrderDetailsAction({ commit }, id) {
            return OrderService.order_details(id).then(
                data => {
                    console.log(data)
                    commit('UPDATE_ORDER_DETAIL', data.data.data);
                    return Promise.resolve(data);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },

        delete_item({ rootState, commit }, item) {
            Vue.swal({
                title: i18n.t("Are you sure?"),
                text: i18n.t("You won't be able to revert this!"),
                type: "warning",
                showCancelButton: true,
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
                confirmButtonText: i18n.t("Yes, delete it!"),
                cancelButtonText: i18n.t("No, cancel!"),
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    return OrderService.delete_order_item(item.id).then(
                        (response) => {
                            // console.log(response)
                            rootState.table.items = rootState.table.items.filter((v) => v.id != item.id);
                            commit('DELETE_ORDER_DETAIL', item.id);
                            Vue.swal.fire(i18n.t("Deleted"), response.data.message, "success");
                        },
                        (error) => {
                            console.log(error);
                            Vue.swal.fire(
                                i18n.t("Error"),
                                i18n.t("There error please try again"),
                                "error"
                            );
                        }
                    );
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Vue.swal.DismissReason.cancel
                ) {
                    Vue.swal.fire(i18n.t("Cancelled"), i18n.t("Cancelled Delete"), "error");
                }
            });
        },

        change_quantity({ rootState, state, commit }, item) {

            rootState.form.dialog = true;
            rootState.form.form_style = state.data_quantity;
            rootState.name_function = 'changeOrderItemQuantityAction';
            commit('SET_OBJ', { id: item.id })
            rootState.form.modal = {
                title: "Change Quantity  # " + item.name,
                size: "500",
            };
        },

        changeOrderItemQuantityAction({ rootState, commit, state }, data) {
            data.append('order_details_id', state.obj.id)
            rootState.form.loader = true;
            return OrderService.change_order_item_quantity(data).then(
                res => {
                    console.log(res)
                    rootState.form.dialog = false;
                    rootState.form.loader = false;
                    rootState.form.notify = {
                        msg: res.data.message,
                        type: "Success",
                    };
                    commit('UPDATE_ORDER_DETAIL', { data: data.get('quantity'), type: 'update', id: state.obj.id });
                    return Promise.resolve(res);
                },
                error => {
                    rootState.form.loader = false;
                    if (error.res.status == 404) {
                        rootState.form.notify = {
                            msg: "هذا العنصر غير موجود",
                            type: "Warning",
                        };
                    } else {
                        rootState.form.notify = {
                            msg: i18n.t("general.there is problem"),
                            type: "Danger",
                        };
                    }
                    return Promise.reject(error);
                }
            );
        },

        // pagination section
        handlePageChange({ rootState, dispatch }, page) {
            rootState.table.paginate.page = page
            dispatch("getData", {})
        },

        changeItemPage({ rootState, dispatch }, pre_page) {
            rootState.table.paginate.itemsPerPage = parseInt(pre_page);
            rootState.table.paginate.page = 1;
            dispatch("getData", { pre_page, type: "pre_page" })
        },

        // filter section 
        filterData({ dispatch }) {
            dispatch("getData", {})
        },
        resetFilter({ rootState, dispatch }) {
            rootState.table.paginate.page = 1;
            dispatch("getData", { reset: true })
        },

        getData({ commit, rootState, state, }, data) {
            console.log(data)
            rootState.table.loading = true;
            const formData = new FormData();
            if (!data.hasOwnProperty('reset')) {

                rootState.form.filters.filter(function (filter) {
                    formData.append(filter.name, filter.value);
                });
            }
            if (data.hasOwnProperty('type') && data.type == "pre_page") {
                formData.append(
                    "paginate",
                    data.pre_page
                );
            }
            return OrderService.get_orders(rootState.table.paginate.page, formData).then(
                (response) => {
                    console.log(response.data);
                    var result = response.data;
                    rootState.form.filters = result.filters
                    commit('table/UPDATE_ITEM', { data: result.data.data }, { root: true });
                    state.data_order[4].items = result.countries;
                    state.data_order[7].items = result.reasons;
                    state.data_order[3].items = result.genders;
                    state.cities = result.cities
                    rootState.table.paginate = {
                        total: result.data.total,
                        itemsPerPage: parseInt(result.data.per_page),
                        row_pre_page: true,
                        page: rootState.table.paginate.page,
                    }
                    // rootState.table.data_extend = 
                    if (data.hasOwnProperty('reset') && data.reset) {

                        rootState.form.filters = result.filters;
                    }
                    rootState.table.loading = false;
                    return Promise.resolve(response);
                },
                (error) => {
                    console.log(error);
                    rootState.table.loading = false;
                    rootState.form.notify = {
                        msg: i18n.t("general.there is problem"),
                        type: "Danger",
                    };
                    return Promise.reject(error);
                }
            )
        },

    },
    mutations: {
        SET_OBJ(state, data) {
            state.obj = data;
        },
        SET_ITEM(state, data) {
            state.item = data;
        },

        REMOVE_UPDATE_ORDER(state, data) {
            state.orders.forEach(v => {
                if (v.id == data.id) {
                    if (data.type == 'status') {
                        v.status = data.order
                    } else if (data.type == 'cancel') {
                        v.status = data.order
                    }

                }
            });
        },

        DELETE_ORDER_DETAIL(state, id) {
            let data = state.orderDetails.products.filter(v => v.id != id)
            state.orderDetails.products = data
        },

        UPDATE_ORDER_DETAIL(state, data) {
            console.log(data)
            if (data.type == 'update') {
                state.orderDetails.products.forEach(v => {
                    if (v.id == data.id) {
                        v.quantity = data.data
                    }
                });
            } else {
                state.orderDetails = data;
            }
        },
    },
};