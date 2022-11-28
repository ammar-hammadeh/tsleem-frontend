<template>
  <div>
    <Card>
      <template #table-column="{ item2 }">
        <v-chip
          
          class="ma-2"
          :text-color="item2.status != 'disabled' ? 'white' : 'black'"
          :color="color_status(item2.status)"
        >
        {{ item2.status_text }}
        </v-chip>
      </template>
      <template #list-item-table="{ item2 }">
        <v-list-item
          v-if="
            str_per.indexOf('user-active-account') > -1 &&
            (item2.status == 'review' || item2.status == 'rejectd' || item2.status == 'disabled')
          "
        >
        {{classBtn('d-block')}}
          <v-list-item-title class="my-3">
            <span style="cursor: pointer" @click="active(item2)">
              <v-icon>mdi-account-check</v-icon>
              {{ $t("general.active") }}
            </span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="
            str_per.indexOf('user-disabled-account') > -1 &&
            item2.status == 'active'
          "
        >
        {{classBtn('d-block')}}
          <v-list-item-title class="my-3">
            <span style="cursor: pointer" @click="disabled(item2)">
              <v-icon>mdi-account-cancel</v-icon>
              {{ $t("general.disabled") }}
            </span>
          </v-list-item-title>
        </v-list-item>
      </template>
    </Card>
    <Modal :data="modal_data"> </Modal>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../Components/Card.vue";
import Modal from "../Components/Modal.vue";
export default {
  name: "Dashboard",
  components: {
    Card,
    Modal,
  },
  data() {
    return {
      modal_data: {
        size: "600px",
        title: this.$i18n.t("Role"),
      },
      style_form: [
        {
          col: 12,
          error: null,
          type_select: "multiple",
          value: "",
          label: this.$i18n.t("Role"),
          value_text: "roles",
          type: "autocomplete",
          items: [],
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      btns: [
        {
          type: "icon",
          text: "view_user",
          color: "bg-gradient-success",
          icon: "mdi-eye",
          item: true,
          url: "users/view/",
          permission: "user-view",
        },
        {
          type: "icon",
          text: "edit_role_user",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          permission: "user-update-role",
        },
        {
          type: "icon",
          text: "delete_user",
          color: "bg-gradient-success",
          icon: "mdi-delete",
          permission: "delete_user",
        },
      ],
      header: [
        {
          text: this.$i18n.t("Company Name"),
          value: "company.name",
          align: "center",
        },
        { text: this.$i18n.t("Name"), value: "name", align: "center" },
        {
          text: this.$i18n.t("auth.Phone Number"),
          value: "phone",
          align: "center",
        },
        {
          text: this.$i18n.t("auth.Email Address"),
          value: "email",
          align: "center",
        },
        {
          text: this.$i18n.t("user type"),
          value: "type.name",
          align: "center",
        },
        {
          text: this.$i18n.t("status"),
          value: "column",
          align: "center",
        },
        {
          text: this.$i18n.t("Reason reject"),
          value: "reject_reason",
          align: "center",
        },
        { text: this.$i18n.t("role.Roles"), value: "roles", align: "center" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("Users"),
        add_url: "/users/create",
        permission: "user-create",
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
  },
  methods: {
    ...mapActions("user", ["activeAccount", "disabledAcctount"]),
    color_status(val) {
      if (val == "pending") {
        return "#5cbbf6";
      } else if (val == "active") {
        return "green";
      } else if (val == "rejected") {
        return "red";
      }else if (val == "review") {
        return "orange";
      }
    },
    classBtn(val){
      // console.log("val_class "+val)
      return this.$store.commit("table/SET_CHECK_PER",val)
    },
    set_data() {
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_COLLECTION", "user");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("SET_URL", "users");
    },
    active(item) {
      // console.log(item);
      this.$swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t("You won't be able to revert this!"),
        type: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        confirmButtonText: this.$i18n.t("Yes"),
        cancelButtonText: this.$i18n.t("No, cancel!"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.activeAccount(item).then(
            (response) => {
              this.$swal.fire(
                this.$i18n.t("Done!"),
                response.data.message,
                "success"
              );
            },
            (error) => {
              this.$swal.fire(
                this.$i18n.t("Error"),
                this.$i18n.t("There error please try again"),
                "error"
              );
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal.fire(
            this.$i18n.t("Cancelled"),
            this.$i18n.t("Cancelled Delete"),
            "error"
          );
        }
      });
    },

    disabled(item) {
      // console.log(item);
      this.$swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t("You won't be able to revert this!"),
        type: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        confirmButtonText: this.$i18n.t("Yes"),
        cancelButtonText: this.$i18n.t("No, cancel!"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.disabledAcctount(item).then(
            (response) => {
              this.$swal.fire(
                this.$i18n.t("Done!"),
                response.data.message,
                "success"
              );
            },
            (error) => {
              this.$swal.fire(
                this.$i18n.t("Error"),
                this.$i18n.t("There error please try again"),
                "error"
              );
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal.fire(
            this.$i18n.t("Cancelled"),
            this.$i18n.t("Cancelled Delete"),
            "error"
          );
        }
      });
    },
  },
  created() {
    console.log(this.$route.params.message);
    if (this.$route.params.message) {
      this.$store.commit("form/SET_NOTIFY", this.$route.params.message);
    }
  },
  mounted() {
    // this.getUsers();
    this.set_data();
    this.$http.get("/roles").then(
      (response) => {
        this.style_form[0].items = response.data.data;
        this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      },
      (error) => {}
    );
    this.$store.dispatch("user/getData", { reset: true });
    document.title = this.$i18n.t("Users");
  },
};
</script>
