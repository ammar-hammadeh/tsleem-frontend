<template>
  <v-container fluid class="py-6">
    <v-snackbar
      top
      v-model="snackbar.visible"
      :color="snackbar.color"
      class="snackbar-shadow"
    >
      <div class="d-flex align-start alert-notify">
        <v-icon size="24" class="text-white mr-5">ni ni-bell-55 </v-icon>
        <p class="mb-0">
          <span class="font-size-root font-weight-600">{{
            snackbar.name
          }}</span>
          <br />
          {{ error_msg }}
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

    <v-row>
      <v-col cols="12">
        <v-card class="card-shadow border-radius-xl">
          <div class="card-header-padding">
            <v-row>
              <v-col lg="8" md="8">
                <h5 class="font-weight-bold text-h5 text-typo mb-0">
                  Permissions
                </h5>
                <p class="text-sm text-body mb-0">
                  Features include sorting, searching, pagination,
                  content-editing, and row selection.
                </p>
              </v-col>
              <v-col lg="4" md="4" class="text-right">
                <v-btn
                  class="mx-2 btn-primary bg-gradient-primary"
                  fab
                  dark
                  small
                  link
                  :to="'/permissions/create'"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <v-card-text class="px-0 py-0">
            <v-data-table
              loading
              loading-text="Loading... Please wait"
              :headers="headers"
              :items="permissions"
              :search="search"
              class="table"
              :page.sync="page"
              hide-default-footer
              @page-count="pageCount = $event"
              :items-per-page="itemsPerPage"
              mobile-breakpoint="0"
            >
              <v-progress-linear
                v-show="loading"
                slot="progress"
                color="purple"
                indeterminate
              ></v-progress-linear>
              <template v-slot:top>
                <v-toolbar flat height="80">
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        hide-details
                        v-model="search"
                        placeholder="Search"
                      >
                        <template slot="prepend-inner">
                          <v-icon
                            color="#adb5bd"
                            size=".875rem"
                            class="mr-3 mt-1"
                            >fas fa-search
                          </v-icon>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-toolbar>
              </template>

              <template v-slot:item.id="{ item }">
                <div class="d-flex align-center">
                  <span class="text-sm font-weight-normal text-body">
                    {{ item.id }}
                  </span>
                </div>
              </template>

              <template v-slot:item.name="{ item }">
                <div class="d-flex align-center">
                  <span class="text-sm font-weight-normal text-body">
                    {{ item.name }}
                  </span>
                </div>
              </template>

              <template v-slot:item.roles="{ item }">
                <span class="text-sm font-weight-normal text-body">
                  <v-chip
                    small
                    v-for="role in item.roles"
                    :key="role.id"
                    class="ma-2"
                    close
                    color=""
                    outlined
                    @click="unAssignRole(role.id, item.id, role.name)"
                  >
                    {{ role.name }}
                  </v-chip>
                </span>
              </template>

              <template v-slot:item.created_at="{ item }">
                <span class="text-sm font-weight-normal text-body">
                  {{ item.created_at | formatDate }}
                </span>
              </template>

              <template v-slot:item.updated_at="{ item }">
                <span class="text-sm font-weight-normal text-body">
                  {{ item.created_at | updated_at }}
                </span>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn
                  @click="DeletePermission(item.id)"
                  icon
                  elevation="0"
                  :ripple="false"
                  height="28"
                  min-width="36"
                  width="36"
                  class="btn-ls me-2 my-2 rounded-sm"
                  color="#67748e"
                >
                  <v-icon size="12">ni-fat-remove text-lg</v-icon>
                </v-btn>
                <router-link
                  :to="'/permissions/' + item.id"
                  icon
                  elevation="0"
                  :ripple="false"
                  height="28"
                  min-width="36"
                  width="36"
                  class="btn-ls me-2 my-2 rounded-sm"
                  color="#67748e"
                >
                  <v-icon size="12">ni-ruler-pencil</v-icon>
                </router-link>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions class="card-padding">
            <v-row>
              <v-col cols="6" lg="6" class="d-flex align-center">
                <div class="v-data-footer">
                  <div class="v-data-footer__select ms-0">
                    Rows per page:
                    <v-select
                      hide-details
                      type="number"
                      min="-1"
                      max="15"
                      :value="itemsPerPage"
                      @change="itemsPerPage = parseInt($event, 10)"
                      :items="[10, 20, 30, 40]"
                    >
                    </v-select>
                  </div>
                </div>
              </v-col>
              <v-col cols="6" class="ml-auto d-flex justify-end">
                <v-pagination
                  prev-icon="fa fa-angle-left"
                  next-icon="fa fa-angle-right"
                  class="pagination"
                  color="#cb0c9f"
                  v-model="page"
                  :length="pageCount"
                  circle
                ></v-pagination>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Permissions",
  components: {},
  computed: {
    pages() {
      return this.pagination.rowsPerPage
        ? Math.ceil(this.permissions.length / this.pagination.rowsPerPage)
        : 0;
    },
  },
  data() {
    return {
      loading: false,
      permissions: [],
      rowsPerPageItems: [10, 20, 30, 40],
      error_msg: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          cellClass: "border-bottom",
          sortable: true,
          value: "id",
          class: "text-secondary font-weight-bolder opacity-7 border-bottom",
        },
        {
          text: "Name",
          align: "start",
          cellClass: "border-bottom",
          sortable: true,
          value: "name",
          class: "text-secondary font-weight-bolder opacity-7 border-bottom",
        },
        {
          text: "Roles",
          align: "start",
          cellClass: "border-bottom",
          sortable: false,
          value: "roles",
          class: "text-secondary font-weight-bolder opacity-7 border-bottom",
        },

        {
          text: "Created At",
          align: "start",
          cellClass: "border-bottom",
          sortable: false,
          value: "create_at",
          class: "text-secondary font-weight-bolder opacity-7 border-bottom",
        },
        {
          text: "Updated At",
          align: "start",
          cellClass: "border-bottom",
          sortable: false,
          value: "create_at",
          class: "text-secondary font-weight-bolder opacity-7 border-bottom",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          cellClass: "border-bottom",
          class: "text-secondary font-weight-bolder opacity-7 border-bottom",
        },
      ],
      snackbar: {
        color: "#f5365c",
        class: "danger",
        name: "Danger",
        visible: false,
      },
    };
  },
  methods: {
    getPermissions() {
      this.loading = true;
      this.$http.get("/permissions").then(
        (response) => {
          this.permissions = response.data.data;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          // console.log(error);
        }
      );
    },

    DeletePermission(id) {
      this.$swal({
        title: "Are you sure you want to delete this role?",
        text: this.$i18n.t("You won't be able to revert this!"),
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Keep it!",
        customClass: {
          confirmButton: "btn bg-gradient-danger",
          cancelButton: "btn bg-gradient-success",
        },
        preConfirm: () => {
          axios
            .post("permissions/delete/" + id)
            .then((response) => {
              this.error_msg = response.data.message;
              this.snackbar.color = "#2dce89";
              this.snackbar.class = "success";
              this.snackbar.name = "Success";
              this.snackbar.visible = true;
              this.getPermissions();
            })
            .catch((error) => {
              this.loading = false;
              this.error_msg =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
              this.snackbar.color = "#f5365c";
              this.snackbar.class = "error";
              this.snackbar.name = "Error";
              this.snackbar.visible = true;
            });
        },
      });
    },

    unAssignRole(role_id, permission_id, role_name) {
      this.$swal({
        title:
          "Are you sure you want to remove this permission from role " +
          role_name +
          "?",
        text: "You can re assigned it any time you want",
        showCancelButton: true,
        confirmButtonText: "Remove",
        cancelButtonText: "Keep it!",
        customClass: {
          confirmButton: "btn bg-gradient-danger",
          cancelButton: "btn bg-gradient-success",
        },
        preConfirm: () => {
          axios
            .post("permissions/un-assign-role/" + permission_id, {
              role: role_id,
            })
            .then((response) => {
              this.error_msg = response.data.message;
              this.snackbar.color = "#2dce89";
              this.snackbar.class = "success";
              this.snackbar.name = "Success";
              this.snackbar.visible = true;
              this.getPermissions();
            })
            .catch((error) => {
              this.loading = false;
              this.error_msg =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
              this.snackbar.color = "#f5365c";
              this.snackbar.class = "error";
              this.snackbar.name = "Error";
              this.snackbar.visible = true;
            });
        },
      });
    },
  },
  mounted() {
    this.getPermissions();
  },
};
</script>
