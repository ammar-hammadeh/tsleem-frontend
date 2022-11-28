import Vue from 'vue';
export const notifications = {
  namespaced: true,
  state: () => ({
    unread_notify: '',
    notifications: [],
    read_more: true
  }),

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
    SET_COUNT_UNREAD_MESSAGE(state, data) {
      state.unread_notify = data
    },
    SET_NOTIFICATIONS(state, data) {
      state.notifications = data
    },
    SET_READ_MORE(state, data) {
      state.read_more = data
    },
  },
  actions: {
    getNotifocations({ commit }) {
      Vue.$http.post("general/notification/user_notification", { first: true })
        .then((response) => {
          commit("SET_NOTIFICATIONS", response.data.notifications.data)
          if (response.data.notifications.total == response.data.notifications.data.length) {
            commit("SET_READ_MORE", false)
          }
          commit(
            "SET_COUNT_UNREAD_MESSAGE", response.data.unread_notify);
        });
    },
    seeMoreNotifications({ state, commit }, counter) {
      Vue.$http
        .post("general/notification/user_notification?page=" + counter)
        .then((response) => {
          var res = response.data.notifications;
          let count = res.data.length;
          for (let i = 0; i < count; i++) {
            const element = res.data[i];
            console.log(element);
            state.notifications.push(element);
          }
          if (res.total == state.notifications.length) {
            commit("SET_READ_MORE", false);
          }
        });
    },
    increaseUnreadMessage({ state }) {
      if (state.unread_notify > 0) {
        state.unread_notify--
      }
    },

  },


};