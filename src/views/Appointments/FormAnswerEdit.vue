<template>
  <div>
    <Card>
      <template #title>
        {{ $t("AppointmentAnswerForm") }} #
        <span class="mr-3 text-color-primary"> {{ title }}</span>
      </template>
      <template #body>
        <div class="card-header-padding">
          <v-row>
            <v-col
              cols="12"
              sm="4"
              lg="3"
              v-for="(item, index) in questions_form"
              :key="index"
            >
              <!-- {{ item.type }} -->
              <Input :item="item"></Input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="text-right">
              <Button
                :title="$t('back')"
                :link="`/appointments/${$route.params.id}/form`"
              ></Button>
            </v-col>
            <v-col cols="6" class="text-left">
              <Button @click="handelSubmit" :loader="loader"></Button>
            </v-col>
          </v-row>
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";
import Input from "../Components/Input.vue";
import Button from "../Components/Button.vue";
import AssignFormService from "../../services/assign_form.service";
export default {
  name: "Appointment-Form-Answer-Page",
  components: {
    Card,
    Button,
    Input,
  },
  data() {
    return {
      card: {
        add_url: null,
      },
      date: "",
      componentdate: "",
      questions_form: [],
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
    ...mapMutations(["SET_CARD_LOADING", "SET_CARD"]),
    set_data() {
      this.SET_CARD(this.card);
    },
    get_questions() {
      this.SET_CARD_LOADING(true);
      return AssignFormService.editable_questions(this.$route.params.form).then(
        (response) => {
          this.SET_CARD_LOADING(false);
          this.title = response.data.data.name;
          this.questions = response.data.data.questions;
          this.loading = false;
          this.questions.forEach((v) => {
            this.questions_form.push({
              label: v.title,
              type: v.inputs.type,
              value: null,
              question_id: v.id,
            });
          });
        },
        (error) => {
          this.SET_CARD_LOADING(false);
          // console.log(error);
        }
      );
    },
    handelSubmit() {
      this.loader = true;
      let formData = new FormData();
      for (let i = 0; i < this.questions_form.length; i++) {
        const element = this.questions_form[i];
        formData.append(`question[${i}]`, element.question_id);
        formData.append(`answer[${i}]`, element.value);
        formData.append(`assign_camps_id[${i}]`, this.$route.params.id);
      }
      return AssignFormService.edit_form(
        this.$route.params.form,
        formData
      ).then(
        (response) => {
          this.loader = false;
          this.$router.push(`/appointments/${this.$route.params.id}/form`);
        },
        (error) => {
          this.loader = false;
          // console.log(error);
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
