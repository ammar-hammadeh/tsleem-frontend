<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent :max-width="data.size">
        <v-card>
          <v-toolbar
            color="white"
            class="text-white bg-gradient-default header-info"
            >{{ data.title ? data.title : $store.state.form.modal.title  }}</v-toolbar
          >

          <v-card-text class="mt-5">
            <v-container>
              <Form
                :btn="true"
                ref="myFormModal"
                :collection="collection"
              ></Form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="dark" class="bg-light mw-80" text @click="close()">
              {{ $t("form.Close") }}
            </v-btn>
            <v-btn
              :loading="$store.state.form.loader"
              class="bg-gradient-blue mw-80"
              color="white"
              text
              @click="save_form()"
            >
              <span slot="loader">
                <v-progress-circular
                  style="width: 20px; height: 20px"
                  indeterminate
                  color="white"
                ></v-progress-circular>
              </span>
              {{ $t("form.save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("form");
import Form from "./Form.vue";
export default {
  props: {
    collection: "",
    data: {},
    btn: {
      type: Boolean,
      default: true,
    },
  },
  name: "Modal",
  components: {
    Form,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["style_form", "formData", "loader", "dialog", "modal"]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    ...mapMutations(["SET_LOADER", "SET_DIALOG"]),
    ...mapActions(["SaveForm"]),
    close() {
      this.SET_DIALOG(false);
      this.$refs.myFormModal.reset();
    },
    validate() {
      return this.$refs.myFormModal.validate();
    },
    save_form: function () {
      // this.$refs.myFormModal.save();
      // this.$emit("save", this.form_data);
      this.SET_LOADER(true);
      if (this.validate()) {
        this.SaveForm();
        this.$store.dispatch(
          `${this.$store.state.collection}/${this.$store.state.name_function}`,
          this.formData
        );
      } else {
        this.SET_LOADER(false);
      }
    },
    set_selectbox: function (data, index) {
      this.$refs.myFormModal.set_selectbox_data(data, index);
    },
  },
  mounted() {
    console.log("modal");
  },
};
</script>