class CampService {
  get_camps(page, data) {
    return axios.post('general/camps?page=' + page, data)
  }
  get_camp(id) {
    return axios.get('general/camps/edit/' + id)
  }
  add_camp(data) {
    return axios.post('general/camps/store', data)
  }
  edit_camp(id, data) {
    return axios.post('general/camps/update/' + id, data)
  }
  status_camp(id, data) {
    console.log(data)
    return axios.post('general/camps/updateCampStatus/' + id, data)
  }
  destroy_camp(id) {
    return axios.delete('general/camps/delete/' + id)
  }
  get_square() {
    return axios.get('general/camps/get-data')
  }
}
export default new CampService();