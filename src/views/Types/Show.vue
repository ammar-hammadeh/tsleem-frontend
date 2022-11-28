<template>
  <div>
    <Card></Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import TypeService from "../../services/type.service";
import { mapMutations } from "vuex";
export default {
  name: "Type-Page",
  components: {
    Card,
  },
  data() {
    return {
      btns: [
        {
          type: "icon",
          text: "edit_type",
          url: "/type/update/",
          item: true,
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          permission: "type-update",
        },
      ],
      header: [
        { text: this.$i18n.t("Type"), align: "center", value: "name" },
        {
          text: this.$i18n.t("status"),
          value: "status_text",
          align: "center",
        },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("user types"),
        add_url: null,
        // permission: "type-create",
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },

  methods: {
    ...mapMutations(["SET_CARD_LOADING", "SET_CARD", "SET_COLLECTION"]),
    ...mapMutations("table", [
      "SET_LOADING",
      "SET_HEADERS",
      "SET_BTNS",
      "SET_ITEMS",
    ]),
    ...mapMutations("form", ["SET_NOTIFY"]),
    set_data() {
      this.SET_CARD(this.card);
      this.SET_COLLECTION("type");
      this.SET_LOADING(true);
      this.SET_HEADERS(this.header);
      this.SET_BTNS(this.btns);
      // this.SET_BTN_TABLESET_LOADING(this.btn_table);
    },
    get_types() {
      return TypeService.get_types().then(
        (response) => {
          this.SET_LOADING(false);
          this.SET_ITEMS(response.data.data);
        },
        (error) => {
          console.log(error);
          this.SET_LOADING(false);
          this.SET_NOTIFY({
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
      this.SET_NOTIFY(this.$route.params.message);
    }
  },
  mounted() {
    this.get_types();
    this.set_data();
    document.title = this.$i18n.t("user types");
  },
};
</script>
