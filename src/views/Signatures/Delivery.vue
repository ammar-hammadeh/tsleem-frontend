<template>
  <div>
    <Card>
      <template #list-item-table="{ item2 }">
        <v-list-item v-if="str_per.indexOf('delivery-sign') > -1">
          <v-list-item-title class="my-3">
            <v-btn
              style="color: #67748e"
              class="text-decoration-none"
              @click="signature(item2)"
            >
              <v-icon>mdi-pencil</v-icon>
              {{ $t("signature") }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "Signature-Delivery",
  components: {
    Card,
  },
  data() {
    return {
      loader: false,
      btns: [
        // {
        //   type: "icon",
        //   text: "signature_delivery",
        //   color: "bg-gradient-success",
        //   icon: "mdi-pencil",
        //   permission: "sign-form",
        // },
      ],
      header: [
        {
          text: this.$i18n.t("Company Name"),
          align: "center",
          value: "get_square.name",
        },
        {
          text: this.$i18n.t("Square"),
          value: "get_company.name",
          align: "center",
        },
        { text: this.$i18n.t("Camp"), align: "center", value: "get_camp.name" },
        {
          text: this.$i18n.t("license"),
          align: "center",
          value: "get_camp.license",
        },
        // {
        //   text: this.$i18n.t("status"),
        //   align: "center",
        //   value: "appointment_status",
        // },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("DeliveryPage"),
        add_url: null,
        // permission: "type-create",
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
  },

  methods: {
    ...mapMutations([
      "SET_CARD_LOADING",
      "SET_CARD",
      "SET_COLLECTION",
      "SET_URL",
      "SET_FUNCTION",
    ]),
    ...mapActions("appointment", ["getData", "signature_delivery"]),
    ...mapMutations("table", [
      "SET_BTN_TABLE",
      "SET_PAGINATION",
      "SET_LOADING",
      "SET_HEADERS",
      "SET_BTNS",
      "SET_ITEMS",
    ]),
    ...mapMutations("form", ["SET_NOTIFY", "SET_FORM_STYLE"]),
    set_data() {
      this.SET_CARD(this.card);
      this.SET_COLLECTION("appointment");
      this.SET_FORM_STYLE(this.style_form);
      this.SET_LOADING(true);
      this.SET_HEADERS(this.header);
      this.SET_PAGINATION(true);
      this.SET_BTNS(this.btns);
      this.SET_URL("general/forms/allotment-need-sign");
      this.SET_BTN_TABLE(this.btn_table);
    },
    get_types() {
      this.getData({ reset: true });
    },
    signature() {
      this.$swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t("You won't be able to revert this!"),
        type: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        confirmButtonText: this.$i18n.t("Yes"),
        cancelButtonText: this.$i18n.t("No, cancel!"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          var data = {
            assign_camps_id: item.assign_camps_id,
            form_id: item.form_id,
          };
          this.signature_delivery(data).then(
            (response) => {
              // console.log(response)
              this.$swal.fire(
                this.$i18n.t("Done!"),
                response.data.message,
                "success"
              );
            },
            (error) => {
              console.log(error);
              this.$swal.fire(
                this.$i18n.t("Error"),
                this.$i18n.t("There error please try again"),
                "error"
              );
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal.fire(
            this.$i18n.t("Cancelled"),
            this.$i18n.t("Cancelled"),
            "error"
          );
        }
      });
    },
  },
  created() {
    console.log(this.$route.params.message);
    if (this.$route.params.message) {
      this.SET_NOTIFY(this.$route.params.message);
    }
  },
  mounted() {
    this.set_data();
    this.get_types();
    document.title = this.$i18n.t("DeliveryPage");
  },
};
</script>
