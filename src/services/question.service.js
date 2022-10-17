class QuestionService {
  get_questions(page, data) {
    return axios.post('general/questions?page=' + page, data)
  }
  get_question(id) {
    return axios.get('general/questions/edit/' + id)
  }
  add_question(data) {
    return axios.post('general/questions/store', data)
  }
  edit_question(id, data) {
    return axios.post('general/questions/update/' + id, data)
  }
  destroy_question(id) {
    return axios.delete('general/questions/delete/' + id)
  }
}
export default new QuestionService();