import router from '../router'
import i18n from '@/i18n.js'
import Vue from "vue";
import UserService from '../services/user.service';
import axios from 'axios';
export const user = {
    namespaced: true,
    state: () => ({
    }),
    actions: {
        delete_role({ rootState }, item) {
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
                    axios
                        .post("roles/delete/" + item.id).then(
                            (response) => {
                                // console.log(response)
                                rootState.table.items = rootState.table.items.filter((v) => v.id != item.id);
                                Vue.swal.fire(i18n.t("Deleted"), response.data.message, "success");
                            },
                            (error) => {
                                // console.log(error);
                                if (error.response.status != 401) {
                                    Vue.swal.fire(
                                        i18n.t("Error"),
                                        i18n.t("There error please try again"),
                                        "error"
                                    );
                                }
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

        add_employee({ rootState }, data) {
            axios.post("users/create-employee", data).then(
                (response) => {
                    // console.log(response);
                    rootState.form.loader = false;
                    rootState.form.style_form = [];
                    router.push({
                        name: "EmployeePage",
                        params: { message: { msg: response.data.message, type: "Success" } },
                    });
                },
                (error) => {
                    // console.log(error);
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

        edit_role_user({ commit, rootState }, item) {
            commit('form/SET_DIALOG', true, { root: true })
            rootState.id = item.id
            commit("SET_FUNCTION", "update_role_user", { root: true });
        },
        update_role_user({ commit, rootState }, data) {
            return UserService.edit_role_user(rootState.id, data).then(
                (response) => {
                    // console.log(response)
                    rootState.form.loader = false;
                    commit('form/SET_DIALOG', false, { root: true });
                    rootState.table.items.map(v => {
                        if (v.id == rootState.id) {
                            return v.roles = response.data.data.roles

                        }
                    });
                    rootState.form.notify = {
                        msg: response.data.message,
                        type: "Success",
                    };
                },
                (error) => {
                    rootState.form.loader = false;
                    // console.log(error);
                    if (error.response.status == 422) {
                        rootState.form.style_form[0].error = errors.reject_reason;
                    } else if (error.response.status != 401) {
                        // commit('form/SET_DIALOG', false, { root: true });
                        rootState.form.notify = {
                            msg: i18n.t("general.there is problem"),
                            type: "Danger",
                        };
                    }
                }
            )
        },

        active_user({ rootState, commit }, item) {
            if (item.status == 'active') {
                rootState.form.notify = {
                    msg: i18n.t("already active"),
                    type: "Warning",
                };
                return
            }
            commit('form/SET_MODAL', { title: i18n.t("Role") }, { root: true });
            commit('form/SET_DIALOG', true, { root: true });
            rootState.id = item.id
            // 1 => role
            rootState.form.style_form[0].visible = false
            rootState.form.style_form[1].visible = true
            // console.log(rootState.form.style_form[1].value)
            commit("SET_FUNCTION", "action_active_status_user", { root: true });
        },
        rejected_user({ commit, rootState }, item) {
            if (item.status == 'rejected') {
                rootState.form.notify = {
                    msg: i18n.t("already rejected"),
                    type: "Warning",
                };
                return
            }
            commit('form/SET_MODAL', { title: i18n.t("Reason reject") }, { root: true });
            commit('form/SET_DIALOG', true, { root: true });
            rootState.id = item.id
            // 0 => reject reason
            rootState.form.style_form[0].visible = true
            rootState.form.style_form[1].visible = false
            // console.log(rootState.form.style_form[0].value)
            commit("SET_FUNCTION", "action_rejected_status_user", { root: true });
        },

        action_rejected_status_user({ dispatch, commit, rootState }, item) {
            // console.log(item)
            dispatch('do_switch_status_user', {
                data: {
                    status: 'rejected',
                    reject_reason: rootState.form.style_form[0].value
                },
                id: rootState.id
            }).then(
                (response) => {
                    rootState.form.loader = false;
                    commit('form/SET_DIALOG', false, { root: true });
                    if (response.data.code == "104") {
                        rootState.form.notify = {
                            msg: response.data.message,
                            type: "Warning",
                        };
                    } else {
                        rootState.table.items = rootState.table.items.filter((v) => v.id != rootState.id)
                        //     if (v.id == rootState.id) {
                        //         v.status_text = i18n.t("active")
                        //         v.status = 'active'
                        //         return v
                        //     }
                        // });
                        rootState.form.notify = {
                            msg: response.data.message,
                            type: "Success",
                        };

                    }

                },
                (error) => {
                    rootState.form.loader = false;
                    // console.log(error);
                    if (error.response.status == 422) {
                        rootState.form.style_form[0].error = errors.reject_reason;
                    } else if (error.response.status != 401) {
                        // commit('form/SET_DIALOG', false, { root: true });
                        rootState.form.notify = {
                            msg: i18n.t("general.there is problem"),
                            type: "Danger",
                        };
                    }
                }
            )
        },

        action_active_status_user({ dispatch, commit, rootState }, item) {
            // console.log(item)
            dispatch('do_switch_status_user', {
                data: {
                    status: 'active',
                    roles: rootState.form.style_form[1].value
                },
                id: rootState.id
            }).then(
                (response) => {
                    rootState.form.loader = false;
                    commit('form/SET_DIALOG', false, { root: true });
                    if (response.data.code == "104") {
                        rootState.form.notify = {
                            msg: response.data.message,
                            type: "Warning",
                        };
                    } else {
                        rootState.table.items = rootState.table.items.filter((v) => v.id != rootState.id)
                        //     if (v.id == rootState.id) {
                        //         v.status_text = i18n.t("active")
                        //         v.status = 'active'
                        //         return v
                        //     }
                        // });
                        rootState.form.notify = {
                            msg: response.data.message,
                            type: "Success",
                        };

                    }
                },
                (error) => {
                    rootState.form.loader = false;
                    // console.log(error);
                    if (error.response.status == 422) {
                        rootState.form.style_form[0].error = errors.reject_reason;
                    } else if (error.response.status != 401) {
                        // commit('form/SET_DIALOG', false, { root: true });
                        rootState.form.notify = {
                            msg: i18n.t("general.there is problem"),
                            type: "Danger",
                        };
                    }
                }
            )
        },
        activeAccount({ dispatch, commit, rootState }, item) {
            // console.log(item)

            return UserService.switch_user(item.id, { status: 'active' })
                .then(
                    (response) => {
                        rootState.table.items.forEach((v) => {
                            if (v.id == item.id) {
                                v.status_text = i18n.t("active")
                                v.status = 'active'
                                return v
                            }
                        });
                        return Promise.resolve(response);
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                )
        },
        disabledAcctount({ rootState }, item) {
            // console.log(item)

            return UserService.switch_user(item.id, { status: 'disabled' })
                .then(
                    (response) => {
                        rootState.table.items.forEach(v => {
                            if (v.id == item.id) {
                                v.status_text = i18n.t("disabled")
                                v.status = 'disabled'
                                return v
                            }

                        });
                        return Promise.resolve(response);
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                )
        },

        do_switch_status_user({ }, data) {
            return UserService.switch_user(data.id, data.data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            )
        },

        delete_user({ rootState }, item) {
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
                    axios
                        .post("users/delete/" + item.id).then(
                            (response) => {
                                // console.log(response)
                                rootState.table.items = rootState.table.items.filter((v) => v.id != item.id);
                                Vue.swal.fire(i18n.t("Deleted"), response.data.message, "success");
                            },
                            (error) => {
                                // console.log(error);
                                if (error.response.status != 401) {
                                    Vue.swal.fire(
                                        i18n.t("Error"),
                                        i18n.t("There error please try again"),
                                        "error"
                                    );
                                }
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
            // console.log('filter')
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
            if (data.hasOwnProperty('custom')) {
                data.custom.filter(function (filter) {
                    formData.append(filter.name, filter.value);
                });
            }
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
            return axios.post(rootState.url + '?page=' + rootState.table.paginate.page, formData).then(
                (response) => {
                    // console.log(response.data);
                    rootState.table.items = response.data.data.data
                    rootState.table.paginate = {
                        total: response.data.data.total,
                        itemsPerPage: parseInt(response.data.data.per_page),
                        row_pre_page: true,
                        page: rootState.table.paginate.page,
                    }
                    if (data.hasOwnProperty('reset') && data.reset) {
                        // console.log('reset2')
                        rootState.form.filters = response.data.filters;
                    }
                    rootState.table.loading = false;
                    return Promise.resolve(response);
                },
                (error) => {
                    // console.log(error);
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