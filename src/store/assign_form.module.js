import i18n from "@/i18n.js";
import router from "../router";
import AssignFormService from "../services/assign_form.service";

export const assign_form = {
  namespaced: true,
  state: () => ({
    tab_inqueries: [],
  }),
  actions: {
    add_form({ rootState }, data) {
      const withCategory = data.get("withCategory");
      if (withCategory) {
        data.append("isCategorized", 1);
      } else {
        data.append("isCategorized", 0);
      }

      return AssignFormService.add_form(data).then(
        (response) => {
          console.log(response);
          rootState.form.loader = false;
          rootState.form.style_form = [];
          router.push({
            name: "FormPage",
            params: {
              message: { msg: response.data.message, type: "Success" },
            },
          });
        },
        (error) => {
          console.log(error);
          rootState.form.loader = false;
          if (error.response.status == 422) {
            var errors = error.response.data.errors;
            for (let i = 0; i < rootState.form.style_form.length; i++) {
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
    update_form({ rootState }, data) {
      const withCategory = data.get("withCategory");
      if (withCategory) {
        data.append("isCategorized", 1);
      } else {
        data.append("isCategorized", 0);
      }

      return AssignFormService.edit_form(rootState.id, data).then(
        (response) => {
          console.log(response);
          rootState.form.loader = false;
          rootState.form.style_form = [];
          router.push({
            name: "FormPage",
            params: {
              message: { msg: response.data.message, type: "Success" },
            },
          });
        },
        (error) => {
          console.log(error);
          rootState.form.loader = false;
          if (error.response.status == 422) {
            var errors = error.response.data.errors;
            for (let i = 0; i < rootState.form.style_form.length; i++) {
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
  },
};
