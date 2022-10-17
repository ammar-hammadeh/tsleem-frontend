import i18n from '@/i18n.js'
export const form = {
  namespaced: true,
  state: () => ({
    data: {},
    filters: [],
    formData: null,
    form_data: {},
    style_form: [],
    action: '',
    notify: {
      color: '',
      visible: false,
      msg: '',
      note: ''
    },
    modal: {},
    loader: false,
    dialog: false,
    stepper: {},
  }),
  getters: {
    notifyStyle(state) {
      if (!state.notify.type) {
        return state.notify;
      } else {
        switch (state.notify.type) {
          case "Info":
            return state.notify = {
              color: "#17c1e8",
              visible: true,
              msg: state.notify.msg,
              note: i18n.t('Info')
            };
            break;
          case "Success":
            return state.notify = {
              color: "#2dce89",
              visible: true,
              msg: state.notify.msg,
              note: i18n.t('Success')
            };
            break;
          case "Warning":
            return state.notify = {
              color: "#fbcf33",
              visible: true,
              msg: state.notify.msg,
              note: i18n.t('Warning')
            };
            break;
          case "Danger":
            return state.notify = {
              color: "#f5365c",
              visible: true,
              msg: state.notify.msg,
              note: i18n.t('Error')
            };
            break;
        }
      }
    }
  },
  actions: {
    setFormData({ commit }, data) {
      commit("SET_FORM_DATA", data)
    },
    setDataStepper({ commit }, data) {
      commit("SET_DATA_STEPPER", data)
    },
    setLoadingStepper({ commit }, data) {
      commit("SET_LOADING_STEPPER", data)
    },
    setData({ commit }, data) {
      commit("SET_DATA", data)
    },
    setItemData({ commit }, data) {
      commit("SET_ITEM_DATA", data)
    },
    SaveForm({ commit, state }) {
      commit('SAVE_FORM')
    }
  },
  mutations: {
    SAVE_FORM(state) {
      const formData = new FormData();
      state.style_form.filter(function (item) {
        // console.log(item.value)
        if (item.value != undefined && item.value != "") {
          if ((item.type == "select" && item.type_select == "multiple") || item.type == "autocomplete" && item.type_select == "multiple") {
            var value = item.value;
            for (var i = 0; i < value.length; i++) {
              const val = value[i];
              formData.append(`${item.value_text}[ ${i} ]`, val);
            }
          } else {
            formData.append(item.value_text, item.value);
          }
        }
      });
      // console.log(...formData);
      state.formData = formData
    },
    SET_DATA_STEPPER(state, data) {
      state.stepper = data
    },
    SAVE_DATA_STEPPER(state, data) {
      state.formData = data
    },
    SET_LOADING_STEPPER(state, data) {
      state.stepper.loading = data
    },
    SET_NOTIFY(state, data) {
      state.notify = data
    },
    SET_ACTION(state, data) {
      state.action = data;
    },
    SET_FORM_STYLE(state, data) {
      state.style_form = data
    },
    SET_FORM_DATA(state, data) {
      state.form_data = null
      // console.log(data)
      state.form_data = data
    },
    SET_ITEM_DATA(state, data) {
      state.style_form[data.index].items = data.data
    },
    SET_LOADER(state, data) {
      state.loader = data
    },
    SET_DIALOG(state, data) {
      state.dialog = data
    },
    SET_MODAL(state, data) {
      state.modal = data
    }


  },
};