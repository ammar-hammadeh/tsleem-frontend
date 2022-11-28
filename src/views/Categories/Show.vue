<template>
  <div>
    <Card></Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import CategoryService from "../../services/category.service";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("category");
export default {
  name: "Category-Page",
  components: {
    Card,
  },
  data() {
    return {
      btns: [
        {
          type: "icon",
          text: "edit_category",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          url: "/categories/update/",
          item: true,
          permission: "category-update",
        },
        {
          type: "icon",
          text: "delete_category",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "category-delete",
          swal: true,
        },
      ],
      header: [
        { text: this.$i18n.t("Name"), align: "center", value: "name" },
        { text: this.$i18n.t("Type"), align: "center", value: "type.name" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("CategoryPage"),
        add_url: "/categories/create",
        permission: "category-create",
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },
  methods: {
    ...mapActions(["getData"]),
    set_data() {
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_COLLECTION", "category");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", false);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
    get_categories() {
      return CategoryService.get_categories().then(
        (response) => {
          console.log(response.data);
          this.$store.commit("table/SET_LOADING", false);
          this.$store.commit("table/SET_ITEMS", response.data.data);
        },
        (error) => {
          this.$store.commit("table/SET_LOADING", false);
          console.log(error);
          this.$store.commit("form/SET_NOTIFY", {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          });
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
    this.get_categories();
    this.set_data();
    document.title = this.$i18n.t("CategoryPage");
  },
};
</script>
