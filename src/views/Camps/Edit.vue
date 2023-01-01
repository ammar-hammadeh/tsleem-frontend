<template>
  <div>
    <CardForm></CardForm>
  </div>
</template>
<script>
import CardForm from "../Components/CardForm.vue";
import CampService from "../../services/camp.service";
export default {
  name: "Edit-Camp",
  components: {
    CardForm,
  },
  data() {
    return {
      card: {
        title: this.$i18n.t("Edit Camp"),
        loading: true,
        sub_title: this.$i18n.t("camp info"),
      },
      id: this.$route.params.id,
      style_form: [
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("Camp"),
          placeholder: this.$i18n.t("Camp"),
          error: null,
          value_text: "name",
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        {
          col: "6",
          type: "autocomplete",
          label: this.$i18n.t("square"),
          error: null,
          value_text: "square_id",
          items: [],
          value: "",
          rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        },
        // {
        //   col: "6",
        //   type: "text",
        //   label: this.$i18n.t("gate"),
        //   error: null,
        //   value_text: "gate",
        //   value: "",
        //   rules: [
        //     // (v) => !!v || this.$i18n.t("form.Item is required"),
        //   (v) =>
        //       (v && v.length <= 5) ||
        //       this.$i18n.t("auth.maximum 5 characters at least"),],
        // },
        // {
        //   col: "6",
        //   type: "text",
        //   label: this.$i18n.t("street"),
        //   error: null,
        //   value_text: "street",
        //   value: "",
        //   rules: [
        //     // (v) => !!v || this.$i18n.t("form.Item is required"),
        //   (v) =>
        //       (v && v.length <= 5) ||
        //       this.$i18n.t("auth.maximum 5 characters at least"),],
        // },
        
       
        // {
        //   col: "12",
        //   type: "autocomplete",
        //   label: this.$i18n.t("Location"),
        //   error: null,
        //   value_text: "location_id",
        //   items: [],
        //   value: "",
        //   // rules: [(v) => !!v || this.$i18n.t("form.Item is required")],
        // },
        {
          col: "6",
          type: "text",
          label: this.$i18n.t("developed_name"),
          placeholder: this.$i18n.t("developed_name"),
          error: null,
          value_text: "developed_name",
          value: "",
          rules: [
            // (v) => !!v || this.$i18n.t("form.Item is required"),
          // (v) =>
          //     (v && v.length <= 25) ||
          //     this.$i18n.t("auth.maximum 25 characters at least"),
          ],
        },
        {
          col: "6",
          type: "checkbox",
          label: null,
          value_text: "is_developed",
          label_input: this.$i18n.t("is_developed"),
          error: null,
          value: false,
          color: "success",
          rules: [],
        },
       
      ],
    };
  },
  methods: {
    get_camp(id) {
      this.$store.commit("SET_CARD_LOADING", true);
      return CampService.get_camp(id).then(
        (response) => {
          this.$store.commit("SET_CARD_LOADING", false);
          console.log(response.data);
          this.style_form = this.style_form.map((v)=>{
            if(v.value_text == 'square_id')
            v.items = response.data.squares;
            else if(v.value_text == 'location_id')
            v.items = response.data.locations;

            v.value = response.data.data[v.value_text];
            return v
          })
        },
        (error) => {
          console.log(error);
          this.$store.commit("SET_CARD_LOADING", false);
          var message = {
            msg: this.$i18n.t("general.there is problem"),
            type: "Danger",
          };
          this.$router.push({
            name: "CampPage",
            params: { message: message },
          });
        }
      );
    },
    set_data() {
      this.$store.commit("SET_COLLECTION", "camp");
      this.$store.commit("SET_FUNCTION", "update_camp");
      this.$store.commit("SET_ID", this.id);
      this.$store.commit("form/SET_FORM_STYLE", this.style_form);
      this.$store.commit("SET_CARD", this.card);
    },
  },
  created() {
    this.get_camp(this.$route.params.id);
    this.set_data();
    document.title = this.$i18n.t("edit camp");
  },
};
</script>
