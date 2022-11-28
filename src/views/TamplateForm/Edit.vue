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
import CardForm from "../Components/CardForm.vue";
import AssignFormService from "../../services/assign_form.service";

export default {
  name: "Edit-Camp",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("EditForm"),
        loading: true,
        sub_title: this.$i18n.t("form info"),
      },
      id: this.$route.params.id,
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
          value: "",
          color: "success",
          rules: [],
        },
        {
          col: "9",
          type: "autocomplete",
          type_select: "multiple",
          title_select: "title",
          label: this.$i18n.t("question"),
          error: null,
          value_text: "question_ids",
          items: [],
          value: [],
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
          value: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],

      QUESTIONS_COMPONENT_WITH_DATA: {},
      CATEGORIES_COMPONENT_WITH_DATA: {},
    };
  },
  methods: {
    get_form(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return AssignFormService.get_form(id)
        .then((assignFormResponse) => {
          this.$store.commit("SET_CARD_LOADING", false);

          const { questions, types, form, categories } =
            assignFormResponse.data;

          // backend is returning it as "0" and it's not a boolean
          form.isCategorized = Boolean(parseInt(form.isCategorized));

          this.style_form[4].items = types;

          // we cash these object with the value fields filled so we can switch them on checkbox click
          const isCategorized = form.isCategorized;
          this.cacheQuestionsComponent({
            col: "9",
            type: "autocomplete",
            type_select: "multiple",
            title_select: "title",
            label: this.$i18n.t("question"),
            error: null,
            value_text: "question_ids",
            items: questions,
            value: isCategorized ? [] : form.questions.map((q) => q.id),
            rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          });
          this.cacheCategoriesComponent({
            col: "9",
            type: "autocomplete",
            type_select: "multiple",
            label: this.$i18n.t("QuestionCategory"),
            error: null,
            value_text: "category_ids",
            items: categories,
            title_select: "name",
            value: isCategorized ? form.categories.map((c) => c.id) : [],
            rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
          });

          this.setFormDataFromResponse(form);
        })
        .catch((e) => this.errorHandler(e));
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "assign_form");
      this.$store.commit("SET_FUNCTION", "update_form");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },

    setFormDataFromResponse(formFromResponse) {
      for (let i = 0; i < this.style_form.length; i++) {
        const element = this.style_form[i];
        if (element.value_text == "question_ids") {
          if (formFromResponse.questions) {
            for (let y = 0; y < formFromResponse.questions.length; y++) {
              const v = formFromResponse.questions[y];
              element.value.push(v.id);
            }
          }
        } else if (element.value_text == "category_ids") {
          if (formFromResponse.categories) {
            for (let y = 0; y < formFromResponse.categories.length; y++) {
              const v = formFromResponse.categories[y];
              element.value.push(v.id);
            }
          }
        } else if (element.value_text == "signers") {
          for (let y = 0; y < formFromResponse.signers.length; y++) {
            const v = formFromResponse.signers[y];
            element.value.push(parseInt(v.type_id));
          }
        } else if (element.value_text == "withCategory") {
          const v = formFromResponse.isCategorized;
          element.value = v;
        } else {
          element.value = formFromResponse[element.value_text];
        }
      }
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
        params: { message: message },
      });
    },
    cacheQuestionsComponent(newComponentFields) {
      this.QUESTIONS_COMPONENT_WITH_DATA = newComponentFields;
    },
    cacheCategoriesComponent(newComponentFields) {
      this.CATEGORIES_COMPONENT_WITH_DATA = newComponentFields;
    },
    showCategoriesSelection() {
      this.style_form[3] = { ...this.CATEGORIES_COMPONENT_WITH_DATA };
    },
    showQuestionsSelection() {
      this.style_form[3] = { ...this.QUESTIONS_COMPONENT_WITH_DATA };
    },
  },
  created() {
    this.get_form(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("EditForm");
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
