<template>
  <div>
    <Card>
      <template #table-column="{ item2 }">
        <div v-for="(value ,key) in item2.properties.attributes">
          <span v-if="value">
            {{value}} : {{key}}
          </span>
        </div>
      </template>
      
    </Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("report");
export default {
  name: "Log-Page",
  components: {
    Card,
  },
  data() {
    return {
      header: [
        { text: this.$i18n.t("table name"), align: "center", value: "log_name" },
        { text: this.$i18n.t("Proccess"), align: "center", value: "event_text" },
        { text: this.$i18n.t("old"), align: "center", value: "oldProperties" },
        { text: this.$i18n.t("new"), align: "center", value: "column" },
        { text: this.$i18n.t("Created at"), align: "center", value: "created_at" },
        { text: this.$i18n.t("User"), value: "name", align: "center" },
      ],
      card: {
        title: this.$i18n.t("LogPage"),
        add_url: null,
        permission: null,
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
      this.$store.commit("SET_COLLECTION", "report");
      this.$store.commit("SET_URL","general/logs");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
    get_logs() {
      this.getData({ reset: true });
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
    this.get_logs();
    document.title = this.$i18n.t("LogPage");
  },
};
</script>
