import AuthService from '../services/auth.service';
const user = JSON.parse(localStorage.getItem('user'));
const type = JSON.parse(localStorage.getItem('type'));
const initialState = user ? { loggedIn: true, user, type } : { loggedIn: false, user: null, type: null };
initialState.permissions = [];
export const auth = {
    namespaced: true,
    state: initialState,
    getters: {
        str_per(state) {
            return state.permissions.toString()
        }
    },
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    // alert('registerFailure');
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        getPermission({ commit }) {
            return AuthService.permission(user).then(
                response => {
                    commit('setPermission', response.data.permissions);
                    return Promise.resolve(response.data);
                },
                error => {
                    // alert('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        setPermission(state, data) {
            state.permissions = data
        },
        setSigneture(state, data) {
            state.user.signature = data
        },
        loginSuccess(state, user) {
            state.loggedIn = true;
            state.user = user.user;
            state.type = user.type;
        },
        loginFailure(state) {
            state.loggedIn = false;
            state.user = null;
            state.type = null;
        },
        logout(state) {
            state.loggedIn = false;
            state.user = null;
            state.type = null;
        },
        registerSuccess(state) {
            state.loggedIn = false;
        },
        registerFailure(state) {
            state.loggedIn = false;
        }
    },
};