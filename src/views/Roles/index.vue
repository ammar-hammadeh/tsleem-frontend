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
        {
          type: "icon",
          text: "edit_role",
          url: "/roles/",
          item: true,
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          permission: "role-update",
        },
        // {
        //   type: "icon",
        //   text: "delete_role",
        //   color: "bg-gradient-danger",
        //   icon: "mdi-delete",
        //   permission: "role-delete",
        //   swal: true,
        // },
      ],
      header: [
        { text: this.$i18n.t("Name"), value: "name", align: "center" },
        {
          text: this.$i18n.t("Created at"),
          value: "created_at",
          align: "center",
        },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("Roles"),
        add_url: "/roles/create",
        permission: "role-create",
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
    },
    getRoles() {
      this.$http.get("/roles").then(
        (response) => {
          this.$store.commit("table/SET_ITEMS", response.data.data);
          this.$store.commit("table/SET_LOADING", false);
          // this.roles = response.data.data;
        },
        (error) => {
          this.$store.commit("table/SET_LOADING", false);
          this.$store.commit("form/SET_NOTIFY", {
            msg: i18n.t("general.there is problem"),
            type: "Danger",
          });
          // console.log(error);
        }
      );
    },
  },
  created() {
    console.log(this.$route.params.message);
    if (this.$route.params.message) {
      this.$store.commit("form/SET_NOTIFY", this.$route.params.message);
    }
  },
  mounted() {
    this.set_data();
    this.getRoles();
    document.title = this.$i18n.t("Roles");
  },
};
</script>
