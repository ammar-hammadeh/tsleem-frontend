<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="modal.dialog" persistent :max-width="modal.size">
        <v-card>
          <v-toolbar color="info" dark class="header-info">
            <slot name="header"></slot>
            {{ modal.title }}
          </v-toolbar>

          <v-card-text class="mt-5">
            <v-container>
              <slot name="body"></slot>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="dark" class="bg-light mw-80" text @click="close()">
              {{ $t("form.Close") }}
            </v-btn>
            <slot name="footer">
              <v-btn
                :loading="loader"
                class="bg-gradient-primary mw-80"
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
            </slot>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapMutations, mapActions } = createNamespacedHelpers("form");
import Form from "../Components/Form.vue";
export default {
  props: {
    modal: {},
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
    // ...mapState(["style_form", "formData", "loader", "dialog", "modal"]),
  },
  watch: {
    "modal.dialog"(val) {
      val || this.close();
    },
  },
  methods: {
    close() {
      this.modal.dialog = false;
      this.$refs.myFormModal.reset();
    },
    validate() {
      return this.$refs.myFormModal.validate();
    },
    save_form() {},
  },
  mounted() {
    console.log("modal");
  },
};
</script>