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
          <v-row v-if="questions_form.length > 0">
            <v-col
              cols="12"
              sm="4"
              lg="3"
              v-for="(item, index) in questions_form"
              :key="index"
            >
              <Input :item="item"></Input>
            </v-col>
          </v-row>
          <!-- question with category -->
          <div v-if="categories.length > 0" class="mt-10">

            <div v-for="(item, index) in categories" :key="index" class="my-10 special-category-card">

              <h4
                class="
                  theme--light
                  my-3
                  text-h4
                  font-weight-bold
                "
              >
                {{ item.get_category.name }}

              </h4>
              <v-row v-if="categories_form.length > 0">
                <v-col
                  cols="12"
                  sm="4"
                  lg="3"
                  v-for="(question, i) in categories_form[index]"
                  :key="i"
                >
                  <Input :item="question"></Input>
                </v-col>
              </v-row>

            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import { mapMutations, mapGetters } from "vuex";
import Input from "../Components/Input.vue";
import Loading from "../Components/Loading.vue";
import AssignFormService from "../../services/assign_form.service";
import RoutingButtonsRow from "@/views/Appointments/Partials/FormAnswerPartials/RoutingButtonsRow";
export default {
  name: "Appointment-Form-Answer-Page",
  components: {
    RoutingButtonsRow,
    Card,
    Loading,
    Input,
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
            var id, value;
            this.questions.forEach((v) => {
              // console.log(v);
              id = null;
              value = null;
              if (v.questions.answer != null) {
                id = v.questions.answer.id;
                if (
                  v.questions.inputs.type == "checkbox" &&
                  v.questions.answer.answer == "true"
                )
                  value = true;
                else value = v.questions.answer.answer;
              }
              this.questions_form.push({
                label: v.questions.title,
                type: v.questions.inputs.type,
                value: value,
                id: id,
                question_id: v.question_id,
              });
            });
          }

          if (this.categories.length > 0) {
            var id, value;
            this.categories.forEach((v) => {
              var newarray = [];
              // console.log(v);
              id = null;
              value = null;
              v.get_category.get_question.forEach((s) => {
                if (s.answer != null) {
                  id = s.answer.id;
                  if (s.inputs.type == "checkbox" && s.answer.answer == "true")
                    value = true;
                  else value = s.answer.answer;
                }
                // console.log(s)
                // newarray.arr.push({
                newarray.push({
                  label: s.title,
                  type: s.inputs.type,
                  value: value,
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
        formData.append(`answer[${i}]`, element.value);
      }

      for (let i = 0; i < this.categories_form.length; i++) {
        const element = this.categories_form[i];
        for (let y = 0; y < element.length; y++) {
          // for (let y = 0; y < element.arr.length; y++) {
          // const ele = element.arr[y]
          const ele = element[y];
          formData.append(`ids[${i}][${y}]`, ele.id);
          formData.append(`questions[${i}][${y}]`, ele.question_id);
          formData.append(`answer[${i}][${y}]`, ele.value);
        }
      }
      formData.append(`assign_camps_id`, this.$route.params.id);
      formData.append(`form_id`, this.$route.params.form);
      // console.log(...formData);
      return AssignFormService.answer_questions(formData).then(
        (response) => {
          this.loader = false;
          var message = { msg: response.data.message, type: "Success" };
          this.$router.push({
            path: `/appointments/${this.$route.params.id}/form`,
            params: message,
          });
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

<style scoped>
.special-category-card{
  border: 1px solid;
  border-radius: 5px;
  padding: 20px;
  padding-top: 0;
  position: relative;
}
.special-category-card h4{
  position: relative;
  top: -30px;
  background: white;
  min-width: max-content;
  padding-left: 7px;
  padding-right: 7px;
  display: inline-block;
}
</style>
