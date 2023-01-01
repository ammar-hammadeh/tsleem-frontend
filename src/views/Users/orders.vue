<template>
  <div>
    <Card>
      <template #befor_table>
        <div >
          <v-row class="py-0 my-0">
            <v-col cols="12" sm="6">
              <v-btn
                :ripple="false"
                :class="classLangBtn"
                class="
                  text-white
                  bg-gradient-success
                  font-weight-bolder
                "
                small
                @click="export_excel"
                :loading="load_excel"
              >
                <!-- color="#c7373a" -->
                <span slot="loader">
                  <v-progress-circular
                    style="width: 20px; height: 20px"
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                </span>
                {{ $t("excel") }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
      <template #table-column="{ item2 }">
        <v-chip
          
          class="ma-2"
          :text-color="item2.status != 'disabled' ? 'white' : 'black'"
          :color="color_status(item2.status)"
        >
        {{ item2.status_text }}
        </v-chip>
      </template>
    </Card>
    <Modal :data="modal_data"> </Modal>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import Modal from "../Components/Modal.vue";
export default {
  name: "userRequest",
  components: {
    Card,
    Modal,
  },
  data() {
    return {
      load_excel:false,
      modal_data: {
        size: "600px",
        title: null,
      },
      style_form: [
        {
          col: "12",
          visible: false,
          label: this.$i18n.t("Reason reject"),
          outlined:true,
          error: null,
          type: "textarea",
          value_text: "reject_reason",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },

        {
          col: "12",
          visible: false,
          label: this.$i18n.t("Role"),
          error: null,
          type: "select",
          value_text: "roles",
          items: [],
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
      ],
      btns: [
        // {
        //   type: "icon",
        //   text: "edit_user",
        //   color: "bg-gradient-success",
        //   icon: "mdi-pencil",
        //   permission: "user-update",
        // },
        {
          type: "icon",
          text: "view_user",
          color: "bg-gradient-success",
          icon: "mdi-eye",
          item: true,
          url: "view/",
          permission: "user-view",
        },
        {
          type: "icon",
          text: "active_user",
          color: "bg-gradient-success",
          icon: "mdi-check",
          permission: "user-active",
        },
        {
          type: "icon",
          text: "rejected_user",
          color: "bg-gradient-success",
          icon: "mdi-close",
          permission: "user-rejected",
        },
      ],
      header: [
        { text: 'ID', value: "id", align: "center" },
        { text: this.$i18n.t("Name"), value: "name", align: "center" },

        {
          text: this.$i18n.t("auth.Email Address"),
          value: "email",
          align: "center",
        },
        {
          text: this.$i18n.t("license"),
          value: "company.license",
          align: "center",
        },
        {
          text: this.$i18n.t("Commercial Register num"),
          value: "company.commercial",
          align: "center",
        },
        {
          text: this.$i18n.t("Company Name"),
          value: "company.name",
          align: "center",
        },
        {
          text: this.$i18n.t("user type"),
          value: "type.name",
          align: "center",
        },
        {
          text: this.$i18n.t("files_counter"),
          value: "company.files_counter",
          align: "center",
        },
        {
          text: this.$i18n.t("status"),
          value: "column",
          align: "center",
        },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("userRequest"),
        add_url: null,
        permission: null,
      },
    };
  },
  computed:{
    classLangBtn() {
      return {
        "mr-6": this.$vuetify.rtl,
        "ml-6": !this.$vuetify.rtl,
      };
    },
  },
  methods: {
    export_excel() {
      this.load_excel = true;
      const formData = new FormData();
      // this.filters.filter(function (filter) {
      //   formData.append(filter.name, filter.value);
      // });
      this.$http({
        url: this.$baseURL + "api/users/exportPendingUsers",
        responseType: "blob",
        method: "post",
        // data: formData,
      }).then(
        (response) => {
          this.load_excel = false;
          // console.log(response);
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/vnd.ms-excel",
            })
          );

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "users_requests_" + new Date().toLocaleString() + ".xlsx"
          );
          document.body.appendChild(link);
          link.click();
        },
        (error) => {
          this.load_excel = false;
          if (error.response.status != 401) {
            this.message = {
              msg: this.$i18n.t("general.there is problem"),
              type: "Danger",
            };
          }
        }
      );
    },
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
    set_data() {
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_COLLECTION", "user");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("SET_URL", "users/pending-users");
    },
  },
  mounted() {
    this.$http.get("/roles").then(
      (response) => {
        this.style_form[1].items = response.data.data;
        this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      },
      (error) => {}
    );
    this.set_data();
    this.$store.dispatch("user/getData", { reset: true });
    document.title = this.$i18n.t("userRequest");
  },
};
</script>
