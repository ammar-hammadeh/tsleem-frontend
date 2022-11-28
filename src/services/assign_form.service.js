class AssignFormService {
  get_forms() {
    return axios.get('general/forms')
  }
  get_forms_without_question(data) {
    return axios.post('general/forms/forms', data);
  }
  get_form(id) {
    return axios.get('general/forms/edit/' + id)
  }
  get_data() {
    return axios.get('general/forms/get-data')
  }
  add_form(data) {
    return axios.post('general/forms/store', data)
  }
  edit_form(id, data) {
    return axios.post('general/forms/update/' + id, data)
  }
  destroy_form(id) {
    return axios.delete('general/forms/destroy/' + id)
  }
  get_questions(data) {
    return axios.post('general/forms/questions-with-answer-ids', data)
  }
  editable_questions(data) {
    return axios.post('general/forms/form-with-answerd-q', data)
  }
  answer_questions(data) {
    return axios.post('general/forms/form-update-answer', data)
  }
}
export default new AssignFormService();