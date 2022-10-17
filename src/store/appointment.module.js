import Vue from "vue";
import i18n from '@/i18n.js'
import AppointmentService from '../services/appointment.service';
export const appointment = {
    namespaced: true,
    state: () => ({
    }),
    actions: {

        save_appointment({ commit, rootState }, data) {

            commit('form/SET_DIALOG', false, { root: true })
            return AppointmentService.add_appointment(data).then(
                (response) => {
                    // console.log(response)
                    rootState.table.items = rootState.table.items.filter((v) => v.id != rootState.id);
                    rootState.form.loader = false
                    rootState.form.notify = {
                        msg: response.data.message,
                        type: "Success",
                    };
                },
                (error) => {
                    console.log(error);
                    rootState.form.loader = false
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
        edit_appointment({ commit, rootState }, item) {
            commit('form/SET_DIALOG', true, { root: true })
            rootState.form.style_form[0].value = item.appointment
            rootState.form.style_form[1].value = item.id
        },
        update_appointment({ commit, rootState }, data) {
            console.log(...data)
            commit('form/SET_DIALOG', false, { root: true })
            return AppointmentService.edit_appointment(data).then(
                (response) => {
                    // console.log(response)
                    // rootState.table.items.forEach(v => {
                    //     if (v.id == data.assign_camp_id) {
                    //         v.appointment == data.appointment
                    //     }
                    // });
                    rootState.form.notify = {
                        msg: response.data.msg,
                        type: "Success",
                    };
                },
                (error) => {
                    console.log(error);
                    if (error.response.status != 401) {

                        rootState.form.notify = {
                            msg: i18n.t("general.there is problem"),
                            type: "Danger",
                        };
                    }
                }
            );
        },
        save_appointment_contracts({ rootState }, data) {
            return AppointmentService.add_contracts(data).then(
                (response) => {
                    rootState.table.items.map(v => {
                        if (v.id == data.assign_camps_id) {
                            return v.contract_status = response.data.contract_status
                        }
                    });
                    return Promise.resolve(response);
                },
                (error) => {
                    // console.log(error);
                    return Promise.reject(error);
                }
            );

        },

        signature_construct({ rootState }, data) {
            return AppointmentService.signature(data).then(
                (response) => {
                    rootState.table.items.map(v => {
                        if (v.id == data.id) {
                            return v.status = response.data.status
                        }
                    });
                    return Promise.resolve(response);
                },
                (error) => {
                    // console.log(error);
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

        getData({ rootState }, data) {
            console.log('ammar')
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
            // var url ;
            console.log(rootState.url)
            axios.post(rootState.url + '?page=' + rootState.table.paginate.page, formData).then(
                (response) => {
                    console.log(response.data);
                    rootState.table.items = response.data.data.data
                    rootState.table.paginate = {
                        total: response.data.data.total,
                        itemsPerPage: parseInt(response.data.data.per_page),
                        row_pre_page: true,
                        page: rootState.table.paginate.page,
                    }
                    if (data.hasOwnProperty('reset') && data.reset) {

                        rootState.form.filters = response.data.filters;
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
                }
            )
        },

    },

};