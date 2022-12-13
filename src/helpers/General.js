export function isValueNotEmpty(value) {
    return value !== undefined && value !== "" && value != null;
}

export function isDropDownComponent(type, select_type) {
    return (
        (type === "select" && select_type === "multiple") ||
        (type === "autocomplete" && select_type === "multiple")
    );
}

export function isFormValidate(form) {
    return form.validate()
}
