class CategoryService {
  // categories
  get_categories() {
    return axios.get('general/categories')
  }
  get_category(id) {
    return axios.get('general/categories/edit/' + id)
  }
  add_category(data) {
    return axios.post('general/categories/store', data)
  }
  edit_category(id, data) {
    return axios.post('general/categories/update/' + id, data)
  }
  destroy_category(id) {
    return axios.delete('general/categories/destroy/' + id)
  }
}
export default new CategoryService();