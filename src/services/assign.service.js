class AssignService {
  get_assigns(page, data) {
    return axios.post('general/camps/index?page=' + page, data)
  }
  get_assign(id) {
    return axios.get('general/camps/editCampAssign/' + id)
  }
  get_assign_by_company(id) { // for company
    return axios.get('general/camps/editCampByCompany/' + id)
  }
  get_camps_by_square(id) {
    return axios.get('general/camps/camp-by-square/' + id)
  }
  add_assign(data) {
    return axios.post('general/camps/assignCampToCompany', data)
  }
  edit_assign(id, data) {
    return axios.post('general/camps/updateCampAssignation/' + id, data)
  }
  edit_assign_by_company(id, data) {
    return axios.post('general/camps/updateCampByCompany/' + id, data)
  }
  destroy_assign(id) {
    return axios.delete('general/camps/deleteCampAssignation/' + id)
  }
}
export default new AssignService();