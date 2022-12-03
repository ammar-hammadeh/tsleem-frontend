<template>
  <div>
    <Card>
      <template #top-card>
        <Button v-if="
        str_per.indexOf('zone-create') > -1
      "  @click="addZone" :loader="loader" :classes="`mx-2 ms-2 bg-gradient-blue`" :title="$t('Add new')"></Button>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import Button from "../Components/Button.vue";
import { mapActions,mapGetters } from "vuex";
export default {
  name: "Zone-Page",
  components: {
    Card,Button
  },
  data() {
    return {
      
      header: [
        { text: this.$i18n.t("Zone"), align: "center", value: "id" },
      ],
      loader:false,
      card: {
        title: this.$i18n.t("ZonePage"),
        add_url: "/zones/create",
        permission: "zone-create",
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },
  computed:{
    ...mapGetters("auth", ["str_per"]),
  },
  methods: {
    ...mapActions('gis',["getData"]),
    set_data() {
      this.$store.commit("SET_CARD", this.card);
      this.$store.commit("SET_COLLECTION", "gis");
      this.$store.commit("SET_URL", "gis/zones");
      this.$store.commit("table/SET_LOADING", true);
      this.$store.commit("table/SET_HEADERS", this.header);
      this.$store.commit("table/SET_BTNS", this.btns);
      this.$store.commit("table/SET_BTN_TABLE", this.btn_table);
    },
    get_zones() {
      this.getData({ });
    },
    addZone(){
      this.loader = true;
      return axios.post('gis/zones/store').then(
                (response) => {
                    console.log(response);
                    this.loader = false;
                    this.$store.commit("form/SET_NOTIFY", { msg: response.data.message, type: "Success" });
                    this.$store.commit("table/PUSH_ITEMS", response.data.data);
                },
                (error) => {
                    console.log(error);
                    this.loader = false;
                    if (error.response.status != 401) {
                      this.$store.commit("form/SET_NOTIFY",{
                            msg: i18n.t("general.there is problem"),
                            type: "Danger",
                        });
                    }
                }
            );
    }
  },
  mounted() {
    this.set_data();
    this.get_zones();
    document.title = this.$i18n.t("ZonePage");
  },
};
</script>
