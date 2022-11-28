<template>
  <v-container fluid class="py-6">
    <v-row>
      <v-col cols="6">
        <v-card class="card-shadow px-4 py-4 overflow-hidden border-radius-xl">
          <v-row>
            <v-col cols="auto">
              <v-badge
                bottom
                color="bg-gradient-light accent-4 text-dark text-xxs border-radius-md shadow"
                offset-x="10"
                offset-y="10"
              >
                <v-avatar rounded width="74" height="74">
                  <img
                    v-if="general.avatar"
                    :src="general.avatar"
                    :lazy-src="general.avatar"
                    alt="Avatar"
                    class="border-radius-lg"
                  />
                  <img
                    v-else
                    src="@/assets/img/no-avatar.jpg"
                    alt="Avatar"
                    class="border-radius-lg"
                  />
                </v-avatar>
              </v-badge>
            </v-col>
            <v-col cols="auto" class="my-auto">
              <div class="h-100">
                <h5 class="mb-1 text-h5 text-typo font-weight-bold">
                  {{ general.name }}
                </h5>
                <p class="mb-0 font-weight-bold text-body text-sm">
                  {{ general.email }}
                </p>
              </div>
            </v-col>
            <!-- <v-spacer></v-spacer> -->
            <v-col cols="auto" class="my-auto ms-auto">
              <v-chip
                label
                :color="color_status"
                class="py-1 px-6 my-0"
                :text-color="general.status != 'disabled' ? 'white' : 'black'"
              >
                {{ $t(general.status) }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="card-shadow px-4 py-4 overflow-hidden border-radius-xl">
          <v-row>
            <v-col cols="auto">
              <v-avatar rounded width="74" height="74">
                <img
                  v-if="general.signature"
                  :src="general.signature"
                  :lazy-src="general.signature"
                  alt="Avatar"
                  class="border-radius-lg"
                />
                <img
                  v-else
                  src="@/assets/img/signature.png"
                  alt="signature"
                  class="border-radius-lg"
                />
              </v-avatar>
            </v-col>
            <v-col cols="auto" class="my-auto">
              <div class="h-100">
                <h5 class="mb-1 text-h5 text-typo font-weight-bold">
                  {{ $t("signature") }}
                </h5>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6">
        <v-card class="card-shadow border-radius-xl mt-6" id="basic">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("account information") }}
            </h5>
          </div>
          <div class="px-6 pb-6">
            <card-profile :data="user"></card-profile>
          </div>
        </v-card>
        <v-card class="card-shadow border-radius-xl mt-6" id="basic">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("file user") }}
            </h5>
          </div>
          <div v-if="file_user.length > 0" class="px-6 pb-6">
            <card-profile :data="file_user"></card-profile>
          </div>
        </v-card>
      </v-col>
      <v-col lg="6">
        <v-card class="card-shadow border-radius-xl mt-6" id="change">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("Company information") }}
            </h5>
          </div>
          <div class="px-6 pb-6">
            <card-profile :data="company"></card-profile>
          </div>
        </v-card>

        <v-card class="card-shadow border-radius-xl mt-6" id="change">
          <div class="px-6 py-6">
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ $t("file Company") }}
            </h5>
          </div>
          <div v-if="file_company.length > 0" class="px-6 pb-6">
            <card-profile :data="file_company"></card-profile>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardProfile from "../Components/CardProfile.vue";
export default {
  name: "ViewUser",
  components: {
    CardProfile,
  },
  data() {
    return {
      snackbar: {
        color: "#f5365c",
        class: "danger",
        name: this.$i18n.t("Error"),
        visible: false,
      },
      file_company: [],
      file_user: [],
      user: [
        {
          value_text: "code",
          value: null,
          label: this.$i18n.t("user type"),
        },
        {
          value_text: "name",
          value: null,
          label: this.$i18n.t("Name"),
        },
        {
          value_text: "email",
          value: null,
          label: this.$i18n.t("auth.Email Address"),
        },
        {
          value_text: "phone",
          value: null,
          class: "font-poppins",
          label: this.$i18n.t("auth.Phone Number"),
        },

        {
          value_text: "roles",
          value: null,
          label: this.$i18n.t("Role"),
        },
      ],
      company: [
        {
          value_text: "name",
          value: null,
          label: this.$i18n.t("Company Name"),
        },
        {
          value_text: "owner_name",
          value: null,
          label: this.$i18n.t("PossName"),
        },

        {
          value_text: "commercial",
          value: null,
          class: "font-poppins",
          label: this.$i18n.t("Commercial Register num"),
        },
        {
          value_text: "owner_hardcopyid",
          value: null,
          class: "font-poppins",
          label: this.$i18n.t("ID No"),
        },
        {
          value_text: "license",
          value: null,
          class: "font-poppins",
          label: this.$i18n.t("license"),
        },

        {
          value_text: "city",
          value: null,
          label: this.$i18n.t("city"),
        },
        {
          value_text: "category",
          value: null,
          label: this.$i18n.t("categories"),
        },
        // {
        //   value_text: "engineer_office",
        //   value: null,
        //   label: this.$i18n.t("categories"),
        // },
      ],
      file_company2: [
        {
          file_text: "national_file",
          url: "",
          label: this.$i18n.t("National address"),
        },

        {
          file_text: "ownerid_file",
          url: "",
          label: this.$i18n.t("Owner ID photo"),
        },
        {
          file_text: "commercial_file",
          value_text: "commercial_expiration",
          value: null,
          url: "",
          label: this.$i18n.t("Commercial Register"),
        },

        {
          file_text: "classification_file",
          value_text: "classification_expire",
          value: null,
          url: "",
          label: this.$i18n.t("My rating certificate"),
        },

        {
          file_text: "practice_file",
          value_text: "practice_expire",
          value: null,
          url: "",
          label: this.$i18n.t("Profession practice certificate"),
        },
        {
          file_text: "business_file",
          value_text: "business_expire",
          value: null,
          url: "",
          label: this.$i18n.t("business license"),
        },
      ],
      valid: false,
      general: {},
      errors: {},
      error_msg: "",
      loading: false,
    };
  },
  computed: {
    color_status() {
      if (this.general.status == "pending") {
        return "#5cbbf6";
      } else if (this.general.status == "active") {
        return "green";
      } else if (this.general.status == "rejected") {
        return "red";
      }else if (this.general.status == "review") {
        return "orange";
      }
    },
  },
  methods: {
    getUser() {
      var roles = "";
      this.$http.get("/users/view/" + this.$route.params.id).then(
        (response) => {
          console.log(response);
          this.general = response.data.data;
          this.user.forEach((v) => {
            console.log(v.value_text);
            console.log(response.data.data[v.value_text]);
            // if (response.data.data[v.value_text] != undefined) {
            if (v.value_text == "code") {
              // alert(v.value_text);
              v.value = response.data.data.type.name;
            } else if (v.value_text == "roles") {
              if (response.data.data.roles != null) {
                var roles = "";
                response.data.data.roles.forEach((element) => {
                  roles += element.name + "</br>";
                });
                v.value = roles;
              }
            } else if (v.value_text == "phone")
              v.value = `966${response.data.data[v.value_text]}+`;
            else v.value = response.data.data[v.value_text];
            // } else v.value = null;
          });

          this.company.forEach((v) => {
            // if (v.value_text == "engineer_office") {
            //   if (response.data.data.engineer_office != null)
            //     v.value = response.data.data.company.engineer_office.name;
            // } else
            if (v.value_text == "city") {
              if (response.data.data.city != null)
                v.value = response.data.data.city.name;
            } else if (v.value_text == "category") {
              var category = response.data.data.category;
              if (category != null) {
                if (Array.isArray(category) && category.length > 0) {
                  var values = "";
                  category.forEach(function (v) {
                    values += v.name + "</br>";
                  });
                  v.value = values;
                } else {
                  // var values = "";
                  // values = category.name;
                  v.value = category.name;
                }
              }
            } else v.value = response.data.data.company[v.value_text];
          });

          this.file_company = response.data.data.company.attachement;
          this.file_user = response.data.data.attachement;
        },
        (error) => {
          // console.log(error);
        }
      );
    },
  },
  mounted() {
    this.getUser();
    document.title = this.$i18n.t("general.view user");
  },
};
</script>