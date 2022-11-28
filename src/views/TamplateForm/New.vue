<template>
  <div>
    <CardForm>
      <template #card-section-2>
        <v-col md="4" cols="12" class="mb-6">
          <v-card class="card-shadow border-radius-xl mt-9">
            <v-row class="">
              <v-col cols="12">
                <div class="px-6 pb-6 pt-0">
                  <h3
                      class="
                      text-h5 text-typo
                      font-weight-normal
                      text-center
                      mb-6
                      mt-3
                    "
                  >
                    {{ $t("variable body") }}
                  </h3>
                  <p>==camp== عرض المخيم</p>
                  <p>==square== عرض المربع</p>
                  <p>==date== عرض التاريخ بالهجري</p>
                  <p>==day== عرض اليوم بالهجري</p>
                  <p>==month== عرض الشهر بالهجري</p>
                  <p>==year== عرض السنة بالهجري</p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </template>
    </CardForm>
  </div>
</template>
<script>
import {mapMutations} from "vuex";
import AssignFormService from "../../services/assign_form.service";
import CardForm from "../Components/CardForm.vue";

export default {
  name: "New-Camp",
  components: {
    CardForm,
  },
  data() {
    return {
      style_form: [
        {
          col: "12",
          type: "text",
          label: this.$i18n.t("Form Name"),
          placeholder: this.$i18n.t("Form Name"),
          error: null,
          value_text: "name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "textarea",
          label: this.$i18n.t("body"),
          placeholder: this.$i18n.t("body"),
          error: null,
          value_text: "body",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "3",
          type: "checkbox",
          label: this.$i18n.t("WithCategory"),
          value_text: "withCategory",
          label_input: this.$i18n.t("Active"),
          error: null,
          value: false,
          color: "success",
          rules: [],
        },
        {
          col: "9",
          type: "autocomplete",
          type_select: "multiple",
          label: this.$i18n.t("question"),
          error: null,
          value_text: "question_ids",
          items: [],
          title_select: "title",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "12",
          type: "autocomplete",
          type_select: "multiple",
          label: this.$i18n.t("signers"),
          error: null,
          value_text: "signers",
          items: [],
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      card: {
        title: this.$i18n.t("NewForm"),
        loading: true,
        sub_title: this.$i18n.t("form info"),
      },

      QUESTIONS_COMPONENT_WITH_DATA: {},
      CATEGORIES_COMPONENT_WITH_DATA: {}
    };
  },
  methods: {
    ...mapMutations("form", ["SET_FORM_STYLE"]),
    set_data() {
      this.$store.commit("SET_COLLECTION", "assign_form");
      this.$store.commit("SET_FUNCTION", "add_form");
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_CARD_LOADING", false);
    },

    async get_data() {
      this.$store.commit("SET_CARD_LOADING", true);


      try {
        const assignFormResponse = await AssignFormService.get_data();

        this.$store.commit("SET_CARD_LOADING", false);

        const {questions, types, categories} = assignFormResponse.data;

        this.style_form[3].items = questions;
        this.style_form[4].items = types;

        this.cacheQuestionsComponent({...this.style_form[3]});
        this.cacheCategoriesComponent({
          col: "9",
          type: "autocomplete",
          type_select: "multiple",
          label: this.$i18n.t("QuestionCategory"),
          error: null,
          value_text: "category_ids",
          items: categories,
          title_select: "name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        })
      } catch (error) {
        this.errorHandler(error);
      }
    },
    showCategoriesSelection() {

      this.style_form[3] = {...this.CATEGORIES_COMPONENT_WITH_DATA}
    },
    showQuestionsSelection() {
      this.style_form[3] = {...this.QUESTIONS_COMPONENT_WITH_DATA};
    },

    cacheQuestionsComponent(newComponentFields) {
      this.QUESTIONS_COMPONENT_WITH_DATA = newComponentFields;
    },
    cacheCategoriesComponent(newComponentFields) {
      this.CATEGORIES_COMPONENT_WITH_DATA = newComponentFields
    },
    errorHandler(error) {
      console.log(error);
      this.$store.commit("SET_CARD_LOADING", false);
      var message = {
        msg: this.$i18n.t("general.there is problem"),
        type: "Danger",
      };
      this.$router.push({
        name: "FormPage",
        params: {message},
      });
    },
  },
  mounted() {
    this.set_data();
    this.get_data();
    document.title = this.$i18n.t("NewForm");
  },
  computed: {
    withCategory() {
      return this.style_form[2].value;
    },
  },
  watch: {
    withCategory: {
      handler: function (checkboxNewValue) {
        const isTrue = Boolean(checkboxNewValue);
        if (isTrue) {
          this.showCategoriesSelection();
        } else {
          this.showQuestionsSelection();
        }
      },
    },
  },
};
</script>
