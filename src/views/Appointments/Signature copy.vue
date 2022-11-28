<template>
  <div>
    <CardForm>
      <template #card-form>
        <v-form ref="form" v-model="valid" lazy-validation>
          <Input v-model="form.user" :item="user"></Input>
          <!-- <label class="text-xs text-typo font-weight-bolder ms-1">{{
                      $t("signature")
                    }}</label> -->
          <VueSignaturePad
            id="signature"
            class="mt-5"
            width="100%"
            height="500px"
            ref="signaturePad"
            :options="options"
          />
          <v-btn class="bg-gradient-blue text-white mt-3 ml-3" @click="undo">{{
            $t("form.Undo")
          }}</v-btn>

          <div class="buttons text-left my-5">
            <v-btn
              class="bg-gradient-default mr-3 text-white"
              @click.prevent="save_signature"
              :loading="loader_signature"
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
      </template>
    </CardForm>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Input from "../Components/Input.vue";
// import AssignService from "../../services/assign.service";
import CardForm from "../Components/CardForm.vue";
export default {
  name: "Form-Signature",
  components: {
    CardForm,
    Input,
  },
  data() {
    return {
      form: {
        user: "",
      },
      loader_signature: false,
      options: {
        penColor: "#333",
      },
      modal_data: {
        size: "600px",
        title: this.$i18n.t("signature"),
      },
      valid: false,
      user: {
        value_text: "user_id",
        type: "autocomplete",
        label: this.$i18n.t("users"),
        placeholder: this.$i18n.t("users"),
        items: [],
        rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
      },
      card: {
        title: null,
        loading: true,
        sub_title: null,
      },
    };
  },
  computed: {
    // ...mapState('auth',type)
  },
  methods: {
    ...mapMutations(["SET_CARD", "SET_CARD_LOADING"]),
    ...mapMutations("form", ["SET_NOTIFY"]),
    set_data() {
      this.SET_CARD(this.card);
      this.SET_CARD_LOADING(false);
    },
    validate() {
      return this.$refs.form.validate();
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save_signature() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      console.log(isEmpty);
      console.log(data);
      if (isEmpty) {
        var result_msg = this.$i18n.t("please drawe signature");
        this.SET_NOTIFY({
          msg: result_msg,
          type: "Warning",
        });
        return;
      }
      if (this.validate()) {
        const formData = new FormData();
        formData.append("user_id", this.form.user);
        // formData.append("type_id", this.$.user);
        formData.append("signature", data);
        formData.append("form_id", this.$route.params.form);
        formData.append("assign_camps_id", this.$route.params.id);
        this.loader_signature = true;
        axios({
          url: "general/forms/sign-form",
          data: formData,
          method: "POST",
        })
          .then((response) => {
            this.undo();
            this.form.user = "";
            this.loader_signature = false;
            this.SET_NOTIFY({
              msg: response.data.message,
              type: "Success",
            });
          })
          .catch((error) => {
            this.loader_signature = false;
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
      this.SET_CARD_LOADING(true);
      axios.get("general/types/signer-type").then(
        (response) => {
          this.SET_CARD_LOADING(false);
          console.log(response.data);
          this.user.items = response.data.data;
        },
        (error) => {
          console.log(error);
          this.SET_CARD_LOADING(false);
          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push(`/appointments/${this.$route.params.id}/form`);
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
