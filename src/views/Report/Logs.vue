<template>
  <div>
    <Card>
      <template #table-column="{ item2 }">
        <div v-for="(value ,key) in item2.new_value" v-if="value" class="dir-ltr">
          <span>{{value}} : </span> 
            <span>{{key}}</span>
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
        { text: this.$i18n.t("method"), align: "center", value: "method" },
        { text: this.$i18n.t("module"), align: "center", value: "module_text" },
        { text: this.$i18n.t("message"), align: "center", value: "message" },
        { text: this.$i18n.t("old"), align: "center", value: "oldValue" },
        { text: this.$i18n.t("new"), align: "center", value: "column" },
        { text: this.$i18n.t("Created at"), align: "center", value: "created_at" },
        { text: this.$i18n.t("Account"), value: "name", align: "center" },
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
      this.$store.commit("SET_URL","general/system_logs");
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
