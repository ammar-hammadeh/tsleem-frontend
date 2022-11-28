<template>
  <div>
    <Card>
      <template slot="befor_table">
        <div class="my-4">
          <v-btn
            v-if="
              str_per.indexOf('signature-bulk') > -1 && type.code != 'admin'
            "
            :loading="loading_bulk"
            :class="`font-weight-bold py-2 mr-4 text-white bg-gradient-default`"
            @click="bulkSignature()"
          >
            <span slot="loader">
              <v-progress-circular
                style="width: 20px; height: 20px"
                indeterminate
                color="white"
              ></v-progress-circular>
            </span>
            <div>{{ $t("Bulk signature") }}</div>
          </v-btn>
          <v-btn
            v-if="str_per.indexOf('signature-all') > -1 && type.code != 'admin'"
            :class="`font-weight-bold py-2 mr-3 text-white bg-gradient-default`"
            @click="signatureAll()"
          >
            <div>{{ $t("signature all") }}</div>
          </v-btn>
        </div>
      </template>
      <template #table-column="{ item2 }">
        <div>
          <v-icon color="green" v-if="item2.status == 'signed'">
            mdi-check
          </v-icon>
          <v-icon color="red" v-else> mdi-close </v-icon>
        </div>
      </template>
      <template #action-btn-table="{ item2 }">
        <v-list-item
          v-if="
            str_per.indexOf('signature-contract') > -1 && type.code != 'admin'
          "
        >
        {{classBtn('d-block')}}

          <v-list-item-title v-if="item2.status == 'unsigned'" class="my-3">
            <span style="cursor: pointer" @click="signature(item2)">
              <v-icon>mdi-pencil</v-icon>
              {{ $t("signature") }}
            </span>
          </v-list-item-title>

          <v-list-item-title v-else class="my-3">
            <span class="text-danger">
              {{ $t("signature done") }}
            </span>
          </v-list-item-title>
        </v-list-item>
        <!--  -->
        <v-list-item v-if="str_per.indexOf('signature-show-file') > -1">
          {{classBtn('d-block')}}

          <v-list-item-title class="my-3">
            <a
              style="color: #67748e"
              class="text-decoration-none"
              :href="'/contructs/' + item2.qr"
              target="_blank"
            >
              <v-icon>fas fa-file-pdf</v-icon>
              {{ $t("view_record") }}
            </a>
          </v-list-item-title>
        </v-list-item>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from "../Components/Card.vue";
// import TypeService from "../../services/type.service";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "Signature-New",
  components: {
    Card,
  },
  data() {
    return {
      loading_bulk: false,
      btns: [
        {
          type: "icon",
          text: "view_record",
          color: "bg-gradient-success",
          icon: "fas fa-file-pdf",
          url: "/contructs/",
          item: true,
          permission: "signature-show-file",
        },
        {
          type: "icon",
          text: "signature",
          color: "bg-gradient-success",
          icon: "mdi-pencil",
          permission: "signature-contract",
          swal: true,
        },
      ],
      header: [
        {
          text: this.$i18n.t("Company Name"),
          align: "center",
          value: "company_name",
        },
        {
          text: this.$i18n.t("Square"),
          value: "square_name",
          align: "center",
        },
        { text: this.$i18n.t("Camp"), align: "center", value: "camp_name" },
        { text: this.$i18n.t("status"), align: "center", value: "column" },
        { text: this.$i18n.t("Action"), value: "btns", align: "center" },
      ],
      card: {
        title: this.$i18n.t("SignaturePage"),
        add_url: null,
      },
      btn_table: [
        { name: "print", visible: true, loading: false, global: true },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
    ...mapState("auth", ["type"]),
    ...mapState("table", ["bulk_selected"]),
  },

  methods: {
    ...mapMutations(["SET_URL", "SET_CARD", "SET_COLLECTION", "SET_FUNCTION"]),
    ...mapMutations("table", [
      "SET_SELECT_VIEW",
      "SET_LOADING",
      "SET_HEADERS",
      "SET_BTNS",
      "SET_ITEMS",
      "SET_BTN_TABLE",
      "SET_PAGINATION",
      "SET_CHECK_PER"
    ]),
    ...mapActions("appointment", [
      "getData",
      "signature_construct",
      "signature_bulk",
    ]),
    ...mapMutations("form", ["SET_NOTIFY", "SET_FORM_STYLE", "SET_DIALOG"]),
    classBtn(val){
      // console.log("val_class "+val)
      return this.SET_CHECK_PER(val)
    },
    bulkSignature() {
      if (this.bulk_selected.length == 0) {
        this.SET_NOTIFY({
          msg: this.$i18n.t("please selecte rows"),
          type: "Warning",
        });
        return;
      }
      this.loading_bulk = true;

      console.log(this.bulk_selected);
      this.signature_bulk({ ids: this.bulk_selected }).then(
        (res) => {
          this.loading_bulk = false;
          this.SET_NOTIFY({
            msg: res.data.message,
            type: "Success",
          });
        },
        (err) => {
          this.loading_bulk = false;
          this.SET_NOTIFY({
            msg: err.response.data.message,
            type: "Danger",
          });
        }
      );
    },
    signatureAll() {
      this.$swal({
        title: this.$i18n.t("Are you sure to sign all recourd in table"),
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
          this.signature_bulk({ select_all: true }).then(
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
            this.$i18n.t("Cancelled Proccess"),
            "error"
          );
        }
      });
    },
    set_data() {
      this.SET_CARD(this.card);
      this.SET_COLLECTION("appointment");
      this.SET_LOADING(true);
      this.SET_SELECT_VIEW(true);
      // this.SET_FUNCTION("save_appointment");
      this.SET_HEADERS(this.header);
      this.SET_BTNS(this.btns);
      this.SET_BTN_TABLE(this.btn_table);
      this.SET_PAGINATION(true);
      this.SET_URL("general/contracts");
    },
    signature(item) {
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
          this.signature_construct(item.id).then(
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
    get_assigns() {
      this.getData({ reset: true });
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
    this.get_assigns();
    document.title = this.$i18n.t("SignaturePage");
  },
};
</script>
