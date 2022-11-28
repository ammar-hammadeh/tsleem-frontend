<template>
  <div class="contruct">
    <Loading v-if="loading"></Loading>
    <v-btn
      :ripple="false"
      :class="classLangBtn"
      class="text-white print-btn bg-gradient-default font-weight-bolder"
      @click="print()"
    >
      {{ $t("print") }}
    </v-btn>
    <div class="contruct-print">
      <v-container class="py-8" fluid>
        <FormHeader />

        <v-container class="mt-5">
          <FormInfoTopSection :name="name" :body="body" />
          <FormInfoSignatures
            :type_need_sign="type_need_sign"
            :signature="signature"
          />
          <FormQuestionsTable
            v-if="questions && questions.length > 0"
            :questions="questions"
          />
          <FormCategoriesTable
            v-if="categories && categories.length > 0"
            :categories="categories"
          />
        </v-container>
      </v-container>
    </div>
  </div>
</template>
<script>
import Loading from "../Components/Loading.vue";
import FormHeader from "@/views/Appointments/Partials/FormPartials/FormHeader";
import FormInfoTopSection from "@/views/Appointments/Partials/FormPartials/FormInfoTopSection";
import FormInfoSignatures from "@/views/Appointments/Partials/FormPartials/FormInfoSignatures";
import FormQuestionsTable from "@/views/Appointments/Partials/FormPartials/FormQuestionsTable";
import FormCategoriesTable from "@/views/Appointments/Partials/FormPartials/FormCategoriesTable";

export default {
  name: "Form-File",
  components: {
    FormCategoriesTable,
    FormQuestionsTable,
    FormInfoSignatures,
    FormInfoTopSection,
    FormHeader,
    Loading,
  },
  data() {
    return {
      loading: false,

      name: "",
      body: "",
      questions: null,
      categories: null,
      signature: null,
      type_need_sign: null,
    };
  },
  computed: {
    classLangBtn() {
      return {
        "mr-6": this.$vuetify.rtl,
        "ml-6": !this.$vuetify.rtl,
      };
    },
  },
  methods: {
    print() {
      window.print();
    },
    fetchData() {
      this.loading = true;

      const URL = "general/forms/form-details";
      const REQUEST_BODY = {
        assign_camps_id: this.$route.params.id,
        form_id: this.$route.params.form,
      };
      axios
        .post(URL, REQUEST_BODY)
        .then((response) => {
          this.loading = false;

          console.log("response ", response.data);
          const {
            name,
            body,
            questions,
            categories,
            signature,
            type_need_sign,
          } = response.data;

          this.name = name;
          this.body = body;
          this.questions = questions;
          this.categories = categories;
          this.signature = signature;
          this.type_need_sign = type_need_sign;
        })
        .catch(this.handleError);
    },
    handleError(error) {
      console.log(error);
      this.loading = false;
      var message = {
        msg: this.$i18n.t("general.there is problem"),
        type: "Danger",
      };
      this.$router.push({
        path: `/appointments/${this.$route.params.id}/form`,
        params: { message: message },
      });
    },
  },
  mounted() {
    document.title = this.$i18n.t("FileSignature");
    this.fetchData();
  },
};
</script>
<style>
.v-application--wrap {
  background-color: #fff;
}
.sub-title-body {
  font-size: 15px;
  margin-bottom: 10px;
}
.content-body {
  /* color: #898989; */
  font-size: 16px;
}
</style>
