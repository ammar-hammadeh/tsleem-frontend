class DashboardService {
  get_statistics() {
    return axios.get('general/statistics/dashboard-counter')
  }
}
export default new DashboardService();