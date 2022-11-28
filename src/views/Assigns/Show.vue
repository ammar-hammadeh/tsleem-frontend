<template>
  <div>
    <Card>
      <template #list-item-table="{ item2 }">
        <v-list-item
          v-if="
            str_per.indexOf('assign-re-customization') > -1 &&
            type.code == 'raft_company'
          "
        >
          {{classBtn('d-block')}}
          <v-list-item-title class="my-3">
            <a
              style="color: #67748e"
              class="text-decoration-none"
              :href="`assign/re-customization/${item2.id}`"
            >
              <v-icon>mdi-pencil</v-icon>
              {{ $t("general.re assign") }}
            </a>
          </v-list-item-title>
        </v-list-item>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
// import AssignService from "../../services/assign.service";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "Assign-Page",
  components: {
    Card,
  },
  data() {
    return {
      loading_bulk: false,
      btns: [
        {
          type: "icon",
          text: "edit_assign",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          url: "/assign/update/",
          item: true,
          permission: "assign-update",
        },
        // {
        //   type: "icon",
        //   text: "re_assign",
        //   color: "bg-gradient-success",
        //   icon: "mdi-pencil",
        //   url: "/assign/re-customization/",
        //   item: true,
        //   permission: "assign-re-customization",
        // },
        {
          type: "icon",
          text: "delete_assign",
          color: "bg-gradient-danger",
          icon: "mdi-delete",
          permission: "assign-delete",
          swal: true,
        },
      ],
      header: [
        {
          text: this.$i18n.t("user type"),
          align: "center",
          value: "get_company.type.name",
        },

        {
          text: this.$i18n.t("Company Name"),
          align: "center",
          value: "get_company.name",
        },
        {
          text: this.$i18n.t("license"),
          align: "center",
          value: "get_company.license",
        },
        {
          text: this.$i18n.t("Square"),
          value: "get_square.name",
          align: "center",
        },
        { text: this.$i18n.t("Camp"), align: "center", value: "get_camp.name" },
        { text: this.$i18n.t("status"), align: "center", value: "status_text" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("AssignPage"),
        add_url: "/assign/create",
        permission: "assign-create",
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
    ...mapState("auth", ["type"]),
  },
  methods: {
    ...mapActions("assign", ["getData"]),
    classBtn(val){
      // console.log("val_class "+val)
      return this.$store.commit("table/SET_CHECK_PER",val)
    },
    set_data() {
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_COLLECTION", "assign");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_PAGINATION", true);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
    get_assigns() {
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
    this.get_assigns();
    this.set_data();
    document.title = this.$i18n.t("AssignPage");
  },
};
</script>
