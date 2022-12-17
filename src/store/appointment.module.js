import Vue from "vue";
import i18n from '@/i18n.js'
import AppointmentService from '../services/appointment.service';
export const appointment = {
    namespaced: true,
    state: () => ({
    }),
    actions: {

        save_appointment({ commit, rootState }, data) {


            return AppointmentService.add_appointment(data).then(
                (response) => {
                    // console.log(response)
                    rootState.table.items = rootState.table.items.filter((v) => v.id != rootState.id);
                    rootState.form.loader = false
                    rootState.form.notify = {
                        msg: response.data.message,
                        type: "Success",
                    };
                    commit('form/SET_DIALOG', false, { root: true })
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
            console.log(item)
            commit('form/SET_DIALOG', true, { root: true })
            rootState.form.style_form[0].value = item.appointment
            // console.log(item.assign_camp_id)
            rootState.form.style_form[1].value = item.assign_camp_id
            commit('form/SET_MODAL', { title: i18n.t("Reschedule an appointment") + " # " + item.square_name + " - " + item.camp_name }, { root: true });
            rootState.id = item.id
            commit("SET_FUNCTION", "update_appointment", { root: true });
        },
        update_appointment({ commit, rootState }, data) {
            console.log(...data)
            rootState.form.loader = true
            // console.log()
            return AppointmentService.edit_appointment(rootState.id, data).then(
                (response) => {
                    rootState.form.loader = false
                    rootState.table.items.forEach(v => {
                        if (v.id == rootState.id) {
                            v.appointment = response.data.data
                            return v
                        }
                    });
                    commit('form/SET_DIALOG', false, { root: true })
                    rootState.form.notify = {
                        msg: response.data.message,
                        type: "Success",
                    };
                },
                (error) => {
                    console.log(error);
                    rootState.form.loader = false
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

        contruct_bulk({ rootState, dispatch }, data) {

            return AppointmentService.contruct_bulk(data).then(
                (response) => {
                    window.location.reload();
                    // dispatch("getData", { reset: true })
                    // rootState.table.bulk_selected = []
                    // var status = response.data.contract_status
                    // if (data.hasOwnProperty('select_all')) {
                    //     rootState.table.items.map(v => {
                    //         return v.contract_status = status
                    //     });
                    // } else {

                    //     rootState.table.items.map(v => {
                    //         if (rootState.table.bulk_selected.includes(v.id)) {
                    //             return v.contract_status = status
                    //         }
                    //     });
                    // }
                    return Promise.resolve(response);
                },
                (error) => {
                    // console.log(error);
                    return Promise.reject(error);
                }
            );
        },

        signature_construct({ rootState }, id) {
            return AppointmentService.signature(id).then(
                (response) => {
                    rootState.table.items.map(v => {
                        if (v.id == id) {
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

        signature_bulk({ rootState, dispatch }, data) {
            return AppointmentService.signature_bulk(data).then(
                (response) => {
                    window.location.reload();
                    // dispatch("getData", { reset: true })
                    // rootState.table.bulk_selected = []
                    // var status = response.data.status
                    // if (data.hasOwnProperty('select_all')) {
                    //     rootState.table.items.map(v => {
                    //         return v.status = status
                    //     });
                    // } else {

                    //     rootState.table.items.map(v => {
                    //         if (rootState.table.bulk_selected.includes(v.id)) {
                    //             return v.status = status
                    //         }
                    //     });
                    // }
                    return Promise.resolve(response);
                },
                (error) => {
                    // console.log(error);
                    return Promise.reject(error);
                }
            );
        },


        signature_delivery({ rootState }, id) {

            return AppointmentService.deliverd_signature(id).then(
                (response) => {
                    rootState.table.items.map(v => {
                        if (v.id == id) {
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
            // console.log(data)
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
            } else {
                if (rootState.table.paginate.itemsPerPage != '')
                    formData.append(
                        "paginate",
                        rootState.table.paginate.itemsPerPage
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