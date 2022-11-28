import router from '../router'
import Vue from "vue";
import i18n from '@/i18n.js'
import CampService from '../services/camp.service';
export const camp = {
    namespaced: true,
    state: () => ({
    }),
    actions: {
        // camp
        status_camp({ rootState }, item) {
            Vue.swal({
                title: i18n.t("Are you sure?"),
                text: i18n.t("You won't be able to revert this!"),
                type: "warning",
                showCancelButton: true,
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
                confirmButtonText: i18n.t("Yes"),
                cancelButtonText: i18n.t("No, cancel!"),
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    return CampService.status_camp(item.id, { status: "ready" }).then(
                        (response) => {
                            // console.log(response)
                            rootState.table.items.map(v => {
                                if (v.id == item.id) {
                                    v.status = response.data.data.status
                                    v.status_text = response.data.data.status_text
                                    return v;
                                }
                            });
                            Vue.swal.fire(i18n.t("Done"), response.data.message, "success");
                        },
                        (error) => {
                            console.log(error);
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
                    Vue.swal.fire(i18n.t("Cancelled"), i18n.t("Cancelled"), "error");
                }
            });
        },
        delete_camp({ rootState }, item) {
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
                    return CampService.destroy_camp(item.id).then(
                        (response) => {
                            // console.log(response)
                            rootState.table.items = rootState.table.items.filter((v) => v.id != item.id);
                            Vue.swal.fire(i18n.t("Deleted"), response.data.message, "success");
                        },
                        (error) => {
                            console.log(error);
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
        add_camp({ rootState }, data) {
            return CampService.add_camp(data).then(
                (response) => {
                    console.log(response);
                    rootState.form.loader = false;
                    rootState.form.style_form = [];
                    router.push({
                        name: "CampPage",
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
        update_camp({ rootState }, data) {
            return CampService.edit_camp(rootState.id, data).then(
                (response) => {
                    console.log(response);
                    rootState.form.loader = false;
                    rootState.form.style_form = [];
                    router.push({
                        name: "CampPage",
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
        filterData({ dispatch }) {
            console.log('filter')
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
                console.log('reset1')
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
            return CampService.get_camps(rootState.table.paginate.page, formData).then(
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
                        // console.log('reset2')
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