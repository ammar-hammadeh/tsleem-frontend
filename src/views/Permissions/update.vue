<template>
    <div>
        <v-snackbar
                top
                v-model="snackbar.visible"
                :color="snackbar.color"
                class="snackbar-shadow"
        >
            <div class="d-flex align-start alert-notify">
                <v-icon size="24" class="text-white mr-5"
                >ni ni-bell-55
                </v-icon
                >
                <p class="mb-0">
                    <span class="font-size-root font-weight-600"
                    >{{snackbar.name}}</span
                    >
                    <br/>
                    {{error_msg}}
                </p>
            </div>

            <template v-slot:action="{ attrs }">
                <v-btn
                        icon
                        elevation="0"
                        max-width="136"
                        :ripple="false"
                        height="43"
                        class="font-weight-600 text-capitalize py-3 px-6 rounded-sm"
                        color="rgba(255,255,255, .85)"
                        @click="snackbar.visible = false"
                        v-bind="attrs"
                >
                    <v-icon size="13">fas fa-times</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
        <v-container fluid class="px-6 py-6">
            <v-row>
                <v-col cols="12" class="text-center">
                    <h3 class="text-h3 text-typo font-weight-bold mt-9">
                        Build Your System Permissions
                    </h3>
                    <h5 class="text-h5 text-secondary font-weight-normal">
                        permissions allow you to restrict users.
                    </h5>
                </v-col>
                <v-stepper
                        alt-labels
                        elevation="0"

                        class="bg-transparent overflow-visible w-100 mx-auto"
                >
                    <v-row>
                        <v-col lg="8" cols="12" class="mx-auto">
                            <div v-if="errors" class="alert alert-danger">
                                <ul class="alert alert-danger">
                                    <li v-for="(value, key, index) in errors">{{ value.toString() }}</li>
                                </ul>
                            </div>

                            <v-form ref="newPermissionForm">
                                <v-stepper-items
                                        class="border-radius-xl overflow-hidden shadow-lg mt-5 mb-9"
                                >
                                    <v-stepper-content
                                            step="1"
                                            class="bg-white border-radius-xl px-4 pt-4"
                                    >
                                        <v-card>
                                            <div>
                                                <v-row class="text-center">
                                                    <v-col cols="10" class="mx-auto">
                                                        <h5
                                                                class="text-h5 text-typo font-weight-normal mb-2"
                                                        >
                                                            Permission info
                                                        </h5>
                                                        <p class="text-body">
                                                            Enter Permission name
                                                        </p>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="mt-2">
                                                    <v-col sm="12" cols="12">
                                                        <label
                                                                class="text-xs text-typo font-weight-bolder ms-1"
                                                        >Name</label
                                                        >
                                                        <v-text-field
                                                                v-model="form.name"
                                                                :rules="rules.name"
                                                                lazy-validation
                                                                color="rgba(0,0,0,.6)"
                                                                light
                                                                placeholder="Ex. create-user, update user..."
                                                                class="
                                font-size-input
                                placeholder-lighter
                                mt-2
                                mb-4
                              "
                                                        >
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col sm="12" cols="12">
                                                        <label
                                                                class="text-xs text-typo font-weight-bolder ms-1"
                                                        >Roles</label
                                                        >
                                                        <v-autocomplete
                                                                v-model="form.roles"
                                                                :items="roles"
                                                                :item-text="'name'"
                                                                :item-value="'id'"
                                                                placeholder="Choose one or more to assign permission to it."
                                                                multiple
                                                        ></v-autocomplete>


                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div class="text-end">
                                                <v-btn
                                                        :ripple="false"
                                                        :elevation="0"
                                                        class="
                            font-weight-bold
                            text-xs
                            btn-default
                            bg-gradient-default
                            py-5
                            px-6
                            mt-2
                            mb-2
                            me-2
                          "
                                                        color="primary"
                                                        @click="handleUpdate()"
                                                >
                                                    Submit
                                                </v-btn>
                                            </div>
                                        </v-card>
                                    </v-stepper-content>
                                </v-stepper-items>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-stepper>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    export default {
        name: "Wizard",
        data() {
            return {
                valid: false,
                roles:[],
                snackbar: {
                    color: "#f5365c",
                    class: "danger",
                    name: "Danger",
                    visible: false
                },
                form: {
                    name: "",
                    roles:null
                },
                rules: {
                    name: [
                        (v) => !!v || "Permission name is required",
                    ],

                },
                errors: {},
                error_msg: "",
                loading: false,
            };
        },
        methods: {
            validate() {
                return this.$refs.newPermissionForm.validate();
            },
            getRoles() {
                this.$http.get("/roles").then(
                    (response) => {
                        this.roles = response.data.data;
                    },
                    (error) => {
                        // console.log(error);
                    }
                );
            },
            getPermission(){
                this.$http.get("/permissions/view/"+this.$route.params.id).then(
                    (response) => {
                        this.form = response.data.data;
                        this.form.roles=response.data.data.map(role=>{
                            return {
                                id:role.id,
                                name:role.name
                            }
                        })
                    },
                    (error) => {
                        // console.log(error);
                    }
                );
            },
            async handleUpdate() {
                this.error_msg = "";
                this.loading = true;
                if (this.validate()) {
                    await axios.post("permissions/update/"+this.$route.params.id, this.form)
                        .then((response) => {
                            this.error_msg = response.data.message
                            this.snackbar.color = "#2dce89"
                            this.snackbar.class = "success"
                            this.snackbar.name = "Success"
                            this.snackbar.visible = true
                            this.$router.push("/permissions");
                        })
                        .catch((error) => {
                            this.loading = false;
                            if (error && error.response.status == 422) {
                                this.errors = error.response.data.errors;
                                this.error_msg = "Please Check errors before submit";
                            }
                            this.error_msg =
                                (error.response && error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.snackbar.color = "#f5365c";
                            this.snackbar.class = "error";
                            this.snackbar.name = "Error";
                            this.snackbar.visible = true;
                        });
                }else{
                    this.error_msg = "Please Check errors before submit";
                    this.snackbar.color = "#f5365c";
                    this.snackbar.class = "error";
                    this.snackbar.name = "Error";
                    this.snackbar.visible = true;
                }
            },
        },
        mounted() {
            this.getRoles();
            this.getPermission();
        },
    };
</script>