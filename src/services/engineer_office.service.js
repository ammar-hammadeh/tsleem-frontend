class EnginnerOfficeService {
  // categories
  get_categories() {
    return axios.get('general/engineer-office')
  }
  get_engineer_office(id) {
    return axios.get('general/engineer-office/edit/' + id)
  }
  add_engineer_office(data) {
    return axios.post('general/engineer-office/store', data)
  }
  edit_engineer_office(id, data) {
    return axios.post('general/engineer-office/update/' + id, data)
  }
  destroy_engineer_office(id) {
    return axios.delete('general/engineer-office/destroy/' + id)
  }
}
export default new EnginnerOfficeService();