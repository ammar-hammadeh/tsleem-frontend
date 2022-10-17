class TypeService {
  get_types() {
    return axios.get('general/types')
  }
  get_type(id) {
    return axios.get('general/types/edit/' + id)
  }
  edit_type(id, data) {
    return axios.post('general/types/update/' + id, data)
  }

}
export default new TypeService();