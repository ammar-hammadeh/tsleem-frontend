class AuthService {
    login(user) {
        return axios
            .post('auth/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                // console.log(response.data)
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('type', JSON.stringify(response.data.type));
                    localStorage.setItem('accessToken', JSON.stringify(response.data.access_token));
                }
                return response.data;
            });
    }
    logout() {
        // console.log('logout service')
        return axios.post('auth/logout')
            .then(resp => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('user')
                localStorage.removeItem('type')
                return resp
            })
            .catch(err => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('user')
                localStorage.removeItem('type')
                return err
            })
    }
    register(user) {
        // console.log(user)
        return axios.post('auth/register', user);
    }
    permission() {
        return axios.get('auth/permission-me');
    }
    reset_password(email) {
        return axios.post('auth/password-reset-request', email)
    }
    new_password(data) {
        return axios.post('auth/password-reset', data)
    }
}
export default new AuthService();