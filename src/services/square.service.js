class SquareService {
  get_squares(page, data) {
    return axios.post('general/squares?page=' + page, data)
  }
  get_square(id) {
    return axios.get('general/squares/edit/' + id)
  }
  add_square(data) {
    return axios.post('general/squares/store', data)
  }
  edit_square(id, data) {
    return axios.post('general/squares/update/' + id, data)
  }
  destroy_square(id) {
    return axios.delete('general/squares/delete/' + id)
  }
}
export default new SquareService();