<template>
  <v-container fluid>
    <Notify></Notify>
    <Loading v-if="loading"></Loading>
    <v-row>
      <v-col class="grid" cols="12" md="6">
        <v-card class="card-shadow px-4 py-4 overflow-hidden border-radius-xl">
          <div class="px-6 py-3">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("AppointmentFormSignature") }} #
              <span>{{ data.name }}</span>
            </h5>
          </div>
          <template v-if="data.isCategory == 1">
            <div v-if="data.categories.length > 0" class="mt-10">
              <div v-for="(item, index) in data.categories" :key="index" class="my-10 special-category-card">
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
                <v-row v-if="item.get_category.get_question.length > 0">
                  <v-col
                    cols="12"
                    sm="6"
                    lg="4"
                    v-for="(question, i) in item.get_category.get_question"
                    :key="i"
                  >
                    <div>
                      <label class="text-xs text-typo font-weight-bolder ms-1">{{
                        question.title
                      }}</label>
                      <div v-if="question.answer">
                        <div v-if="question.inputs.type == 'checkbox'">
                          <v-icon
                            v-if="question.answer.answer == 'true'"
                            size="20"
                            >mdi-check</v-icon
                          >
                          <span v-else>-</span>
                        </div>
                        <div v-else class="font-poppins">
                          <template>
                            {{ question.answer.answer || "-" }}
                          </template>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </template>
          <template v-else>
              <v-row class="px-6">
                <v-col
                  cols="12"
                  lg="6"
                  v-for="(item, index) in data.questions"
                  :key="index"
                >
                  <div>
                    <label class="text-xs text-typo font-weight-bolder ms-1">{{
                      item.questions.title
                    }}</label>
                    <div v-if="item.questions.answer">
                      <div v-if="item.questions.inputs.type == 'checkbox'">
                        <v-icon
                          v-if="item.questions.answer.answer == 'true'"
                          size="20"
                          >mdi-check</v-icon
                        >
                        <span v-else>-</span>
                      </div>
                      <div v-else class="font-poppins">
                        <template>
                          {{ item.questions.answer.answer || "-" }}
                        </template>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </template>
        </v-card>
      </v-col>
      <v-col class="grid" cols="12" md="6">
        <v-card class="card-shadow px-6 py-4 overflow-hidden border-radius-xl">
          <div class="py-3">
            <h5 class="text-h5 text-typo font-diner font-weight-bold">
              {{$t('have_to_sign')}}
            </h5>
          </div>
          <div
            class="mb-3"
            v-for="(item, index) in data.signature"
            :key="index"
          >
            <div v-if="item.username" class="d-flex align-items-center">
              <h5 class="sub-title-body text-sm text-typo">{{$t('name_user')}} :</h5>
              <h5 class="content-body text-sm mr-3">
                {{ item.username }}
              </h5>
            </div>
            <div v-if="item.type_name" class="d-flex align-items-center">
              <h5 class="sub-title-body text-sm text-typo">{{$t('type_user')}} :</h5>
              <h5 class="content-body text-sm mr-3">
                {{ item.type_name }}
              </h5>
            </div>
            <div
              class="d-flex flex-column mt-3"
              style="margin-right: 0px"
              v-if="item.sign"
            >
              <h5 class="sub-title-body text-sm text-typo">{{$t('signer')}} :</h5>
              <h5 class="content-body text-sm mr-3">
                <img width="150" :src="item.full_path_sign" alt="" />
              </h5>
            </div>
            <hr class="horizontal dark mb-2" />
          </div>
        </v-card>
      </v-col>
      <v-col class="" cols="12" v-if=" data.users && data.users.length > 0">
        <v-card class="card-shadow px-4 py-4 overflow-hidden border-radius-xl">
          <v-row>
            <v-col
              cols="6"
              class="grid"
              v-for="(item, index) in data.users"
              :key="index"
            >
              <v-form ref="form" v-model="valid" lazy-validation>
                <div class="mb-3">
                  <span class="text-body text-md">{{$t('type_user')}} : </span>
                  <label class="text-sm text-typo font-weight-bolder ms-1">
                    {{ item.type_name }}</label
                  >
                </div>
                <Input v-model="modal[index].value" :item="item.form"></Input>
                <VueSignaturePad
                  class="signature mt-5"
                  width="100%"
                  height="500px"
                  ref="signaturePad"
                  :options="options"
                />

                <div class="buttons d-flex my-5 justify-end">
                  <v-btn
                    class="bg-gradient-blue text-white ml-3"
                    @click="undo(index)"
                    >{{ $t("form.Undo") }}</v-btn
                  >
                  <v-btn
                    class="bg-gradient-default mr-3 text-white"
                    @click.prevent="save_signature(index, item.id)"
                    :loading="modal[index].loader"
                  >
                    <span slot="loader">
                      <v-progress-circular
                        style="width: 20px; height: 20px"
                        indeterminate
                        color="white"
                      ></v-progress-circular> </span
                    >{{ $t("form.save") }}</v-btn
                  >
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Input from "../Components/Input.vue";
// import AssignService from "../../services/assign.service";
import Notify from "../Components/Notify.vue";
import Loading from "../Components/Loading.vue";
export default {
  name: "Form-Signature",
  components: {
    Notify,
    Loading,
    Input,
  },
  data() {
    return {
      data: {},
      loading: true,
      form: {
        user: "",
      },
      loader_signature: false,
      options: {
        penColor: "#333",
      },
      valid: false,
      modal: [],
      // user: {
      //   value_text: "user_id",
      //   type: "autocomplete",
      //   label: this.$i18n.t("users"),
      //   placeholder: this.$i18n.t("users"),
      //   items: [],
      //   rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      // },
    };
  },
  computed: {
    // ...mapState('auth',type)
  },
  methods: {
    ...mapMutations(["SET_CARD", "SET_CARD_LOADING"]),
    ...mapMutations("form", ["SET_NOTIFY"]),
    set_data() {
      // this.SET_CARD(this.card);
      // this.SET_CARD_LOADING(false);
    },
    validate(index) {
      return this.$refs.form[index].validate();
    },
    undo(index) {
      // console.log(this.$refs.signaturePad);
      this.$refs.signaturePad[index].undoSignature();
    },
    save_signature(index, id) {
      const { isEmpty, data } = this.$refs.signaturePad[index].saveSignature();

      // console.log(isEmpty);
      // console.log(data);
      if (isEmpty) {
        var result_msg = this.$i18n.t("please drawe signature");
        this.SET_NOTIFY({
          msg: result_msg,
          type: "Warning",
        });
        return;
      }
      if (this.validate(index)) {
        const formData = new FormData();
        formData.append("user_id", this.modal[index].value);
        // formData.append("type_id", this.$.user);
        formData.append("signature", data);
        formData.append("form_id", this.$route.params.form);
        formData.append("assign_camps_id", this.$route.params.id);
        this.modal[index].loader = true;
        axios({
          url: "general/forms/sign-form",
          data: formData,
          method: "POST",
        })
          .then((response) => {
            this.undo(index);
            this.modal = this.modal.filter((s) => s.id != id);
            this.$refs.form[index].resetValidation();
            this.$refs.form[index].reset();
            // this.modal = this.modal.filter(function (v) {
            //   if (v.id != id) {
            //     v.value = "";
            //     v.loader = false;
            //     return v;
            //   }
            // });
            // this.modal[index].value = null;
            // this.modal[index].loader = false;
            this.SET_NOTIFY({
              msg: response.data.message,
              type: "Success",
            });
            this.data.users = this.data.users.filter((v) => v.id != id);
            this.data.signature.push(response.data.user_signature);
          })
          .catch((error) => {
            console.log(error);
            this.modal[index].loader = false;
            if (error && error.response.status == 422) {
              let errors = Object.values(error.response.data.errors);
              // this.errors = errors.flat();
            }
            var result_msg =
              (error.response && error.response.data.message) ||
              error.message ||
              error.toString();
            this.SET_NOTIFY({
              msg: result_msg,
              type: "Danger",
            });
          });
      }
    },
    get_data() {
      // this.SET_CARD_LOADING(true);
      axios
        .post("general/forms/form-details", {
          assign_camps_id: this.$route.params.id,
          form_id: this.$route.params.form,
        })
        .then(
          (response) => {
            this.loading = false;
            console.log(response.data);
            var type_need_sign = [];
            type_need_sign = response.data.type_need_sign;
            var self = this;
            // var newarray = []
            type_need_sign = response.data.type_need_sign.map(function (v) {
              var newarray = [];
              self.modal.push({
                id: v.id,
                value: "",
                loader: false,
              });
              // v.users.map(function (c) {
              // });
              v.form = {
                type: "autocomplete",
                label: self.$i18n.t("users"),
                placeholder: self.$i18n.t("users"),
                items: v.users,
                rules: [(v) => !!v || self.$i18n.t("form.Item is required")],
              };

              return v;
            });
            this.data = {
              name: response.data.name,
              isCategory: response.data.isCategorized,
              questions: response.data.questions,
              signature: response.data.signature,
              categories: response.data.categories,
              users: type_need_sign,
            };
          },
          (error) => {
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
          }
        );
    },
  },
  mounted() {
    this.set_data();
    this.get_data();

    document.title = this.$i18n.t("AppointmentFormSignature");
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  margin-bottom: 15px;
}
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