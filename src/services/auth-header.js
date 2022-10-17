export default function authHeader() {
    let lang = localStorage.getItem("lang") || 'en';
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (accessToken) {
        return { Authorization: 'Bearer ' + accessToken, 'X-localization': lang };
    } else {
        return { 'X-localization': lang };
    }
}