class UserService {
    get_users(page, data) {
        return axios.post('users?page=' + page, data)
    }
    switch_user(id, data) {
        return axios.post('users/switch-user-status/' + id, data)
    }
}
export default new UserService();