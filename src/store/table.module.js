import { check } from "prettier";

export const table = {
  namespaced: true,
  state: () => ({
    search: '',
    // page: 1,
    // itemsPerPage: 0,
    // total: 0,
    btn_table: [],
    loading: false,
    items: [],
    data_extend: {},
    data_expand: {},
    headers: [],
    btns: [],
    pagination: false,
    paginate: {
      page: 1,
      itemsPerPage: 0,
      total: 0,
      row_pre_page: false
    },
    select_view: false,
    bulk_selected: [],
    chack_permission: 'd-none'
  }),
  // getters: {

  // },
  actions: {
    print() {
      document.querySelector("table").classList.add("print");
      window.print()
    }
  },
  mutations: {
    SET_CHECK_PER(state, data) {
      state.chack_permission = data
    },
    SET_BULK_SELECTED(state, data) {
      state.bulk_selected = data
    },
    SET_DATA_EXTEND(state, data) {
      state.data_extend = data
    },
    SET_DATA_EXPAND(state, data) {
      state.data_expand = data
    },
    SET_PAGE(state, data) {
      state.page = data
    },
    SET_PRE_PAGE(state, data) {
      state.itemsPerPage = data
    },
    SET_ITEMS(state, data) {
      // alert('set item')
      // console.log(data)
      state.items = data;
    },
    PUSH_ITEMS(state, data) {
      state.items.push(data)
    },
    SET_HEADERS(state, data) {
      state.headers = data;
    },
    SET_LOADING(state, data) {
      state.loading = data
    },
    SET_BTNS(state, data) {
      state.btns = data
    },
    SET_PAGINATION(state, data) {
      state.pagination = data
    },
    SET_PAGINATE(state, data) {
      state.paginate = data
    },
    SET_BTN_TABLE(state, data) {
      state.btn_table = data
    },
    SET_SELECT_VIEW(state, data) {
      state.select_view = data
    },
    UPDATE_ITEM(state, info) {
      console.log(info)
      if (info.type == 'update') {
        // state.items = state.items.filter(v => v.id != info.data.id)
        // state.items = state.items.concat(info.data)
        state.items = state.items.map((v, index) => {
          if (v.id == info.data.id) {
            return v = info.data
          }
          return v
        })
      } else {
        state.items = info.data;
      }
    }

  }
}