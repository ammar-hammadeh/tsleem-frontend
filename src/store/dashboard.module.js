import router from '../router'
import Vue from "vue";
import i18n from '@/i18n.js'
import DashboardService from '../services/dashboard.service';
export const city = {
    namespaced: true,
    state: () => ({
    }),
    actions: {

        getStatistics({ rootState }, data) {
            console.log(data)
            return DashboardService.get_statistics().then(
                (response) => {
                    console.log(response.data);
                    // rootState.table.items = response.data.data.data
                    // rootState.table.paginate = {
                    //     total: response.data.data.total,
                    //     itemsPerPage: parseInt(response.data.data.per_page),
                    //     row_pre_page: true,
                    //     page: rootState.table.paginate.page,
                    // }
                    // rootState.table.loading = false;
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
                })
        },
    }
};