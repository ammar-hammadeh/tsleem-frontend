<template>
  <div>
    <Card></Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
export default {
  name: "Dashboard",
  components: {
    Card,
  },
  data() {
    return {
      btns: [
        // {
        //   type: "icon",
        //   text: "edit_user",
        //   color: "bg-gradient-success",
        //   icon: "mdi-pencil",
        //   permission: "user-update",
        // },
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
        // {
        //   text: this.$i18n.t("Created at"),
        //   value: "created_at",
        //   align: "center",
        // },
        {
          text: this.$i18n.t("status"),
          value: "status_text",
          align: "center",
        },
        // { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("Users"),
        add_url: "/users/create",
        permission: "user-create",
      },
    };
  },
  methods: {
    set_data() {
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_COLLECTION", "user");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("SET_URL", "users");
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
    this.$store.dispatch("user/getData", { reset: true });
    document.title = this.$i18n.t("Users");
  },
};
</script>
