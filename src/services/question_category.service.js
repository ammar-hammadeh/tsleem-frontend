class QuestionCategoryService {
  get_question_categories(page, data) {
    return axios.post('general/question_category?page=' + page, data)
  }
  get_question_category(id) {
    return axios.get('general/question_category/getbyid/' + id)
  }
  add_question_category(data) {
    return axios.post('general/question_category/store', data)
  }
  edit_question_category(id, data) {
    return axios.post('general/question_category/update/' + id, data)
  }
  destroy_question_category(id) {
    return axios.delete('general/question_category/destroy/' + id)
  }
  get_data() {
    return axios.get('general/question_category/get_questions')
  }
}
export default new QuestionCategoryService();
