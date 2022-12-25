class DashboardService {
  get_statistics_card() {
    return axios.get('general/statistics/dashboard-counter')
  }
  get_statistics_chart() {
    return axios.get('general/statistics/dashboard-chart')
  }
  filter_chart_user(data) {
    return axios.post('general/statistics/filter-user-chart', data)
  }
}
export default new DashboardService();