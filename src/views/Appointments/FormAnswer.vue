<template>
  <div>
    <Card>
      <template #title>
        <Loading v-if="loading"></Loading>
        {{ $t("AppointmentAnswerForm") }} #
        <span class="mr-3 text-body"> {{ title }}</span>
      </template>
      <template #body>
        <div class="card-header-padding">
          <RoutingButtonsRow
            :is-loading="loader"
            :previous-page-link="`/appointments/${$route.params.id}/form`"
            :submit-handler="handelSubmit"
          />
          <!-- question without category -->
          <FormQuestions v-if="questions.length > 0"  :questions="questions_form" />
            <!-- question with category -->
            <FormCategories v-if="categories.length > 0"  :categories="categories" :categories_form="categories_form" />
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import { mapMutations, mapGetters } from "vuex";
import Loading from "../Components/Loading.vue";
import AssignFormService from "../../services/assign_form.service";
import FormQuestions from "./Partials/FormPartials/FormQuestions";
import FormCategories from "./Partials/FormPartials/FormCategories";
import RoutingButtonsRow from "./Partials/FormAnswerPartials/RoutingButtonsRow";
export default {
  name: "Appointment-Form-Answer-Page",
  components: {
    RoutingButtonsRow,
    Card,
    Loading,
    FormQuestions,
    FormCategories,
  },
  data() {
    return {
      loading: true,
      card: {
        add_url: null,
      },
      date: "",
      componentdate: "",
      questions_form: [],
      categories_form: [],
      categories: [],
      questions: [],
      loader: false,
      title: "",
      modal_data: {
        size: "600px",
        title: null,
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
  },

  methods: {
    ...mapMutations(["SET_CARD"]),
    ...mapMutations("form", ["SET_NOTIFY"]),
    set_data() {
      this.SET_CARD(this.card);
    },
    get_questions() {
      return AssignFormService.get_questions({
        form_id: this.$route.params.form,
        assign_camps_id: this.$route.params.id,
      }).then(
        (response) => {
          this.loading = false;
          this.title = response.data.form.name;
          this.questions = response.data.questions;
          this.categories = response.data.categories;
          this.loading = false;
          if (this.questions.length > 0) {
            var id, value,note,attachements;
            var self = this;
            this.questions.forEach((v) => {
              // console.log(v);
              id = null;
              value = null,note=null,attachements=[];
              if (v.questions.answer != null) {
              id = v.questions.answer.id;
              if (
                  v.questions.inputs.type == "checkbox" &&
                  v.questions.answer.answer == "true"
              )
                  value = true;
              else {
                  value = v.questions.answer.answer;
              }
              note = v.questions.answer.note;
              attachements = v.questions.answer.attachements
            }

            this.questions_form.push({
              question:{
                  label: v.questions.title,
                  type: v.questions.inputs.type,
                  value: value,
              },
              note:{
                  label: self.$i18n.t('Note'),
                  type: "text",
                  value: note,
              },
              attach:{
                  label: self.$i18n.t('Attachments'),
                  type: "file",
                  value: null,
                  type_file:'multiple',
                  uploadPercentage:0,
                  isHidden:true,
                  accept: [".jpg",".png"],
                  attachements
              },
              id: id,
              question_id: v.question_id,
            });
        });
        }
          if (this.categories.length > 0) {
            var id, value, attachements ,self = this;
            this.categories.forEach((v) => {
              var newarray = [];
              // console.log(v);
              id = null;
              value = null,attachements=[]
              v.get_category.get_question.forEach((s) => {
                if (s.answer != null) {
                  id = s.answer.id;
                  if (s.inputs.type == "checkbox" && s.answer.answer == "true")
                    value = true;
                  else value = s.answer.answer;
                  note =  s.answer.note;
                  attachements = s.answer.attachements
                }
                // console.log(s)
                newarray.push({
                  question:{
                    label: s.title,
                    type: s.inputs.type,
                    value: value,
                  },
                  note:{
                      label: self.$i18n.t('Note'),
                      type: "text",
                      value: note,
                  },
                  attach:{
                    label: self.$i18n.t('Attachments'),
                    type: "file",
                    value: null,
                    type_file:'multiple',
                    uploadPercentage:0,
                    accept: [".jpg",".png"],
                    isHidden:true,
                    attachements
                },
                  id: id,
                  question_id: s.id,
                });
              });
              this.categories_form.push(newarray);
            });
          }
        },
        (error) => {
          this.loading = false;
          // console.log(error);
        }
      );
    },
    handelSubmit() {
      this.loader = true;
      let formData = new FormData();
      for (let i = 0; i < this.questions_form.length; i++) {
        const element = this.questions_form[i];
        formData.append(`ids[${i}]`, element.id);
        formData.append(`questions[${i}]`, element.question_id);
        formData.append(`answer[${i}]`, element.question.value);
        formData.append(`note[${i}]`, element.note.value);
      }

      for (let i = 0; i < this.categories_form.length; i++) {
        const element = this.categories_form[i];
        for (let y = 0; y < element.length; y++) {
          // for (let y = 0; y < element.arr.length; y++) {
          // const ele = element.arr[y]
          const ele = element[y];
          formData.append(`ids[${i}][${y}]`, ele.id);
          formData.append(`questions[${i}][${y}]`, ele.question_id);
          formData.append(`answer[${i}][${y}]`, ele.question.value);
          var note = (ele.note.value == 'undefined') ?  null  : ele.note.value
          formData.append(`note[${i}][${y}]`, note);
        }
      }
      formData.append(`assign_camps_id`, this.$route.params.id);
      formData.append(`form_id`, this.$route.params.form);
      // console.log(...formData);
      return AssignFormService.answer_questions(formData).then(
        (response) => {
          this.loader = false;
          // var message = { msg: response.data.message, type: "Success" };
          this.SET_NOTIFY({
              msg: response.data.message,
              type: "Success",
            });

          let self = this
          setTimeout(function(){
              self.$router.push(`/appointments/${self.$route.params.id}/form`)
            },1200)
        },
        (error) => {
          this.loader = false;
          // console.log(error);
          var result_msg =
            (error.response && error.response.data.message) ||
            error.message ||
            error.toString();
          this.SET_NOTIFY({
            msg: result_msg,
            type: "Danger",
          });
        }
      );
    },
  },
  mounted() {
    this.set_data();
    this.get_questions();
    document.title = this.$i18n.t("AppointmentAnswerForm");
  },
};
</script>


