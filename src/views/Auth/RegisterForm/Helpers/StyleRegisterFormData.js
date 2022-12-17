import i18n from "@/i18n";

export const HujajDakhilStyleFormData = [
    {
        table: "user",
        class: "form-control",
        value: "",
        error: null,
        type: "email",
        label: i18n.t("auth.Email Address"),
        placeholder: i18n.t("auth.Email Address"),
        class_div: "input-group auth-pass-inputgroup",
        value_text: "email",
        disabled: true
    },
    {
        value_text: "company_name",
        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("Company Name"),
        placeholder: i18n.t("Company Name"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        value_text: "owner_name",
        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("PossName"),
        placeholder: i18n.t("PossName"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        table: "user",
        class: "d-inline-block form-control w-80",
        value: "",
        error: null,
        value_text: "phone",
        label: i18n.t("auth.Phone Number"),
        placeholder: '5xxxxxxxx',
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        class: "form-control",
        value: "",
        error: null,
        value_text: "owner_hardcopyid",
        label: i18n.t("ID No"),
        placeholder: i18n.t("ID No"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        col: "6",
        value_text: "license",

        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("license"),
        placeholder: i18n.t("license"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        value_text: "commercial",
        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("Commercial Register num"),
        placeholder: i18n.t("Commercial Register num"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },

    {
        col: "6",
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("Owner ID photo") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "ownerid_file",
    },
    // السجل التجاري
    {
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label:
            i18n.t("Commercial Register") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "commercial_file",
    },
    {
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "date",
        label: i18n.t("Commercial Register Expire"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
        value_text: "commercial_expiration",
    },
    {
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("delegateid") + " " + i18n.t("(PDF)"),
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        class_div: "input-group auth-pass-inputgroup",
        class: "form-control",
        value_text: "delegateid",
    },
    {
        error: null,
        type: "file",
        required: true,
        value: null,
        label: i18n.t("delegation") + " " + i18n.t("(PDF)"),
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        class_div: "input-group auth-pass-inputgroup",
        class: "form-control",
        value_text: "delegation",
    },
    {
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("hajj_license") + " " + i18n.t("(PDF)"),
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        class_div: "input-group auth-pass-inputgroup",
        class: "form-control",
        value_text: "hajj_license",
    },
    {
        value: "",
        required: true,
        rules: [(v) => !!v || i18n.t("form.Item is required")],
        type: "date",

        error: null,
        label: i18n.t("hajj_license_expire_date"),
        class_div: "input-group auth-pass-inputgroup",
        class: "form-control",
        value_text: "hajj_license_expire",
    },
    {
        col: "6",
        error: null,
        // required: true,
        type: "file",
        value: null,
        label: i18n.t("seasonal_license") + " " + i18n.t("(PDF)"),
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "seasonal_license",
        class_div: "input-group auth-pass-inputgroup",
        class: "form-control",

    },
    {
        error: null,
        type: "file",
        value: null,
        label: i18n.t("assign_file") + " " + i18n.t("(PDF)"),
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        class_div: "input-group auth-pass-inputgroup",
        class: "form-control",
        value_text: "assign_file",
    },

];
export const ContactorStyleFormData = [

    {
        table: "user",
        class: "form-control",
        value: "",
        error: null,
        type: "email",
        label: i18n.t("auth.Email Address"),
        placeholder: i18n.t("auth.Email Address"),
        class_div: "input-group auth-pass-inputgroup",
        value_text: "email",
        disabled: true
    },
    {
        value_text: "company_name",
        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("Company Name"),
        placeholder: i18n.t("Company Name"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        value_text: "owner_name",
        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("PossName"),
        placeholder: i18n.t("PossName"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        table: "user",
        class: "d-inline-block form-control w-80",
        value: "",
        error: null,
        value_text: "phone",
        label: i18n.t("auth.Phone Number"),
        placeholder: '5xxxxxxxx',
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        class: "form-control",
        value: "",
        error: null,
        value_text: "owner_hardcopyid",
        label: i18n.t("ID No"),
        placeholder: i18n.t("ID No"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        value_text: "commercial",
        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("Commercial Register num"),
        placeholder: i18n.t("Commercial Register num"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        table: "user",
        value_text: "city_id",
        disabled: true,
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "select",
        label: i18n.t("city"),
        placeholder: i18n.t("city"),
        class_div: "input-group auth-pass-inputgroup",
        items: [],
        rules: [(v) => !!v || i18n.t("form.Item is required")],
    },
    {
        table: "user",
        value: "",
        disabled: true,
        error: null,
        required: true,
        label: i18n.t("Specialties"),
        value_text: "category_id",
        type: "select",
        items: [],
        class: "form-control",
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
    },

    // السجل التجاري
    {
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label:
            i18n.t("Commercial Register") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "commercial_file",
    },
    {
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "date",
        label: i18n.t("Commercial Register Expire"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
        value_text: "commercial_expiration",
    },
    {

        col: "6",
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("National address") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "national_file",
    },
    {
        col: "6",
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("Owner ID photo") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "ownerid_file",
    },
    {
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label:
            i18n.t("My rating certificate") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "classification_file",
    },
    {

        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "date",
        label: i18n.t("classification_expire"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
        value_text: "classification_expire",
    },


    {

        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("business license") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "business_file",
    },
    {

        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "date",
        label: i18n.t("business_expire"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
        value_text: "business_expire",
    },

    {
        col: 12,
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("secret_information") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "secret_information",
    },
];

export const DesignOfficeStyleFormData = [

    {
        table: "user",
        class: "form-control",
        value: "",
        error: null,
        type: "email",
        label: i18n.t("auth.Email Address"),
        placeholder: i18n.t("auth.Email Address"),
        class_div: "input-group auth-pass-inputgroup",
        value_text: "email",
        disabled: true
    },
    {
        value_text: "company_name",
        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("Company Name"),
        placeholder: i18n.t("Company Name"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        value_text: "owner_name",
        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("PossName"),
        placeholder: i18n.t("PossName"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        table: "user",
        class: "d-inline-block form-control w-80",
        value: "",
        error: null,
        value_text: "phone",
        label: i18n.t("auth.Phone Number"),
        placeholder: '5xxxxxxxx',
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },


    {
        class: "form-control",
        value: "",
        error: null,
        value_text: "owner_hardcopyid",
        label: i18n.t("ID No"),
        placeholder: i18n.t("ID No"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        value_text: "commercial",
        class: "form-control",
        value: "",
        error: null,
        label: i18n.t("Commercial Register num"),
        placeholder: i18n.t("Commercial Register num"),
        class_div: "input-group auth-pass-inputgroup",
        disabled: true
    },
    {
        table: "user",
        disabled: true,
        value_text: "city_id",

        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "select",
        label: i18n.t("city"),
        placeholder: i18n.t("city"),
        class_div: "input-group auth-pass-inputgroup",
        items: [],
        rules: [(v) => !!v || i18n.t("form.Item is required")],
    },
    {
        table: "user",
        disabled: true,

        value: "",
        // col: '12',
        error: null,
        required: true,
        label: i18n.t("Specialties"),
        value_text: "category_id",
        type: "select",
        items: [],
        class: "form-control",
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
    },
    // السجل التجاري
    {
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label:
            i18n.t("Commercial Register") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "commercial_file",
    },
    {
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "date",
        label: i18n.t("Commercial Register Expire"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
        value_text: "commercial_expiration",
    },
    // شهادة نصنيف بلدي
    {

        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label:
            i18n.t("My rating certificate") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "classification_file",
    },
    {

        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "date",
        label: i18n.t("classification_expire"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
        value_text: "classification_expire",
    },

    // صورة هوية المالك | العنوان الوطني
    {

        col: "6",
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("National address") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "national_file",
    },
    {
        col: "6",
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("Owner ID photo") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "ownerid_file",
    },
    // مزاولة المهنة
    {

        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label:
            i18n.t("Profession practice certificate") +
            " " +
            i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "practice_file",
    },
    {

        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "date",
        label: i18n.t("practice_expire"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
        value_text: "practice_expire",
    },
    {

        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("business license") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "business_file",
    },
    {
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "date",
        label: i18n.t("business_expire"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [(v) => !!v || i18n.t("form.Item is required")],
        value_text: "business_expire",
    },

    {
        col: 12,
        class: "form-control",
        value: "",
        error: null,
        required: true,
        type: "file",
        value: null,
        label: i18n.t("secret_information") + " " + i18n.t("(PDF)"),
        class_div: "input-group auth-pass-inputgroup",
        rules: [
            (v) => !!v || i18n.t("form.Item is required"),
            (v) =>
                !v ||
                v.size <= 2000000 ||
                i18n.t("size should be less or equal than 2 MB"),
        ],
        accept: ".pdf",
        value_text: "secret_information",
    },
];
