class AppointmentService {
  // get_appointments(page, data) {
  //   return axios.post('general/appointments?page=' + page, data)
  // }
  get_camp(id) {
    return axios.get('general/appointments/edit/' + id)
  }
  add_appointment(data) {
    return axios.post('general/appointments/store', data)
  }
  edit_appointment(id, data) {
    return axios.post('general/appointments/update/' + id, data)
  }
  destroy_appointment(id) {
    return axios.delete('general/appointments/delete/' + id)
  }
  add_contracts(data) {
    return axios.post('general/contracts/store', data)
  }
  signature(id) {
    return axios.get('general/contracts/sign-contract/' + id)
  }
}
export default new AppointmentService();