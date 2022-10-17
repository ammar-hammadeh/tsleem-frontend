import router from '../router'
import i18n from '@/i18n.js'
import TypeService from '../services/type.service';
export const type = {
    namespaced: true,
    state: () => ({
    }),
    actions: {

        update_type({ rootState }, data) {
            return TypeService.edit_type(rootState.id, data).then(
                (response) => {
                    console.log(response);
                    rootState.form.loader = false;
                    rootState.form.style_form = [];
                    router.push({
                        name: "TypePage",
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

    }

};