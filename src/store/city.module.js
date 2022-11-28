import router from '../router'
import Vue from "vue";
import i18n from '@/i18n.js'
import CityService from '../services/city.service';
export const city = {
    namespaced: true,
    state: () => ({
    }),
    actions: {
        add_city({ rootState }, data) {
            return CityService.add_city(data).then(
                (response) => {
                    console.log(response);
                    rootState.form.loader = false;
                    rootState.form.style_form = [];
                    router.push({
                        name: "CityPage",
                        params: { message: { msg: response.data.message, type: "Success" } },
                    });
                },
                (error) => {
                    console.log(error);
                    rootState.form.loader = false;
                    if (error.response.status == 422) {
                        var errors = error.response.data.errors;
                        for (
                            let i = 0;
                            i < rootState.form.style_form.length;
                            i++
                        ) {
                            const element = rootState.form.style_form[i];
                            element.error = errors[element.value_text];
                        }
                    } else if (error.response.status != 401) {
                        rootState.form.notify = {
                            msg: i18n.t("general.there is problem"),
                            type: "Danger",
                        };
                    }
                }
            );

        },
        update_city({ rootState, state }, data) {
            return CityService.edit_city(rootState.id, data).then(
                (response) => {
                    console.log(response);
                    rootState.form.loader = false;
                    rootState.form.style_form = [];
                    router.push({
                        name: "CityPage",
                        params: { message: { msg: response.data.message, type: "Success" } },
                    });
                },
                (error) => {
                    console.log(error);
                    rootState.form.loader = false;
                    if (error.response.status == 422) {
                        var errors = error.response.data.errors;
                        for (
                            let i = 0;
                            i < rootState.form.style_form.length;
                            i++
                        ) {
                            const element = rootState.form.style_form[i];
                            element.error = errors[element.value_text];
                        }
                    } else if (error.response.status != 401) {
                        rootState.form.notify = {
                            msg: i18n.t("general.there is problem"),
                            type: "Danger",
                        };
                    }
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
        // filterData({ dispatch }) {
        //     dispatch("getData", {})
        // },
        // resetFilter({ rootState, dispatch }) {
        //     rootState.table.paginate.page = 1;
        //     dispatch("getData", { reset: true })
        // },

        getData({ rootState }, data) {
            console.log(data)
            rootState.table.loading = true;
            const formData = new FormData();
            // if (!data.hasOwnProperty('reset')) {

            //     rootState.form.filters.filter(function (filter) {
            //         formData.append(filter.name, filter.value);
            //     });
            // }
            if (data.hasOwnProperty('type') && data.type == "pre_page") {
                formData.append(
                    "paginate",
                    data.pre_page
                );
            } else {
                if (rootState.table.paginate.itemsPerPage != '')
                    formData.append(
                        "paginate",
                        rootState.table.paginate.itemsPerPage
                    );
            }
            return CityService.get_cities(rootState.table.paginate.page, formData).then(
                (response) => {
                    console.log(response.data);
                    // rootState.form.filters = response.data.filters
                    rootState.table.items = response.data.data.data
                    rootState.table.paginate = {
                        total: response.data.data.total,
                        itemsPerPage: parseInt(response.data.data.per_page),
                        row_pre_page: true,
                        page: rootState.table.paginate.page,
                    }
                    rootState.table.loading = false;
                    return Promise.resolve(response);
                },
                (error) => {
                    console.log(error);
                    rootState.table.loading = false;
                    if (error.response.status != 401) {
                        rootState.form.notify = {
                            msg: i18n.t("general.there is problem"),
                            type: "Danger",
                        };

                    }
                    return Promise.reject(error);
                })
        },
    }
};