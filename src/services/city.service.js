class CityService {
  // cities
  get_cities() {
    return axios.get('general/cities')
  }
  get_city(id) {
    return axios.get('general/cities/edit/' + id)
  }
  add_city(data) {
    return axios.post('general/cities/store', data)
  }
  edit_city(id, data) {
    return axios.post('general/cities/update/' + id, data)
  }
  destroy_city(id) {
    return axios.delete('general/cities/destroy/' + id)
  }
}
export default new CityService();