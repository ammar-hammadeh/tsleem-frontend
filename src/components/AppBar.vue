<template>
  <v-app-bar
    :color="background"
    height="60"
    class="mt-5 px-0 mx-6 toolbar-content-padding-y-none"
    :class="
      navbarFixed
        ? 'position-sticky blur shadow-blur top-1 z-index-sticky py-2'
        : ''
    "
    dense
    rounded
  >
    <div
      class="d-flex justify-space-between align-center"
      style="width: 100%"
    >
      <!--   Drawer Toggler   -->
      <div
        class="drawer-toggler pa-5 ms-6 cursor-pointer"
        style="padding-right: 0 !important;"
        :class="{ active: togglerActive }"
        @click="minifyDrawer"
      >
        <div class="drawer-toggler-inner">
          <i class="drawer-toggler-line bg-body"></i>
          <i class="drawer-toggler-line bg-body"></i>
          <i class="drawer-toggler-line bg-body"></i>
        </div>
      </div>
      <div>
        <!-- Notifications -->
        <v-menu
          transition="slide-y-transition"
          offset-y
          offset-x
          min-width="300"
          max-width="300"
          max-height="300"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-if="type && types.includes(type.code)"
              :ripple="false"
              :class="{ 'btn-dark-hover': !hasBg, 'btn-hover': hasBg }"
              class="text-body ml-6"
              :color="linkColor"
              v-bind="attrs"
              v-on="on"
              small
            >
              <v-badge
                color="red"
                overlap
                :content="unread_notify"
                v-if="unread_notify != 0"
              >
                <v-icon size="16">fa fa-bell text-lg</v-icon>
              </v-badge>
              <v-icon v-else size="16">fa fa-bell text-sm</v-icon>
            </v-btn>
          </template>
  
          <v-list class="py-0">
            <v-list-item
              v-for="(item, i) in notifications"
              :key="i"
              @click="see_notify(item)"
              :class="item.is_seen == 0 ? 'not_seen' : ''"
              class="pa-4 list-item-hover-active"
            >
  
              <v-list-item-content class="pa-0">
                <v-list-item-title
                  class="
                    text-body-2
                    ls-0
                    text-typo
                    font-weight-600
                    mb-0
                    white-space-break
                  "
                >
                  <v-row>
                    <v-col>
                      <h6 class="text-sm font-weight-normal mb-1 text-typo">
                        {{ item.message }}
                      </h6>
                    </v-col>
                  </v-row>
                </v-list-item-title>
  
                <p class="text-xs text-secondary mb-0">
                  <v-icon size="12" class="text-secondary"
                    >fa fa-clock me-1</v-icon
                  >
                  {{ item.created_at }}
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-if="read_more"
              class="border-top list-item-hover-active text-center see_more"
              style="background: #d1d5d5"
            >
              <v-list-item-content class="pa-0">
                <v-list-item-title
                  class="text-body-2 ls-0 list-notify text-typo font-weight-600 mb-0"
                >
                <div>
                  <v-btn
                    @click.capture.native.stop="read_more_method"
                    style="background-color: transparent"
                    class="
                      w-100
                      text-xs
                      font-weight-normal
                      text-typo
                      box-shadow-none
                    "
                  >
                    {{ $t("See more") }}
                  </v-btn>
                </div>
                  <!-- <v-row>
                    <v-col>
                    </v-col>
                  </v-row> -->
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
          </v-list>
        </v-menu>
        <!--   User Dropdown   -->
        <v-menu
          transition="slide-y-transition"
          offset-y
          min-width="250"
          max-width="250"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="text-body btn-hover box-shadow-none"
              :ripple="false"
              color="transparent"
              style="box-shadow: none; padding: 0;"
              v-bind="attrs"
              v-on="on"
              v-if="user"
            >
              <div class="d-flex flex-column align-end">
                <span>{{ fullName }}</span>
                <span> {{ accountType }} </span>
              </div>
              <v-avatar>
                <v-icon size="46">mdi-account-circle</v-icon>
              </v-avatar>
            </v-btn>
          </template>

          <!-- here -->
          <v-list class="py-0">
            <v-list-item class="pa-4 list-item-hover-active">
              <v-list-item-content class="pa-0">
                <v-list-item-title
                  class="text-body-2 ls-0 text-typo font-weight-600 mb-0"
                >
                  <v-row>
                    <v-col>
                      <router-link to="/profile" style="text-decoration: none">
                        <h6 class="text-sm font-weight-normal mb-1 text-typo">
                          <v-icon size="16">fa fa-user me-sm-2 text-sm</v-icon>
                          {{ $t("general.profile") }}
                        </h6>
                      </router-link>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="logout" class="pa-4 list-item-hover-active">
              <v-list-item-content class="pa-0">
                <v-list-item-title
                  class="text-body-2 ls-0 text-typo font-weight-600 mb-0"
                >
                  <v-row>
                    <v-col>
                      <h6 class="text-sm font-weight-normal mb-1 text-typo">
                        <v-icon size="16"
                          >fas fa-sign-out-alt me-sm-2 text-sm</v-icon
                        >
                        {{ $t("logout") }}
                      </h6>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>
<script>
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { mapActions, mapState } from 'vuex';
export default {
  name: "app-bar",
  components: { CustomBreadcrumb },
  props: {
    background: String,
    hasBg: Boolean,
    linkColor: String,
    toggleActive: String,
    navbarFixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawer: false,
      togglerActive: false,
      types:[
      'raft_office',
      'raft_company',
      'service_provider',
      'kdana',
      'admin'
      ],
      count: 1,
      language: [
        { title: '<span class="font-weight-bold">EN</h6>', abbr: "en" },
        { title: '<span class="font-weight-bold">AR</h6>', abbr: "ar" },
      ],
    };
  },
  computed: {
    ...mapState('auth',['user','type']),
    ...mapState('notifications',['unread_notify','notifications','read_more']),
    classLang() {
      return {
        "ml-5": this.$vuetify.rtl,
        "mr-5": !this.$vuetify.rtl,
      };
    },
    styleDropDown() {
      return {
        "left:125px": this.$vuetify.rtl,
        "left:225px": !this.$vuetify.rtl,
      };
    },
    fullName() {
      let user = "";
      if (this.user.name != null)
        user = this.user.name;
      return user;
    },
    accountType() {
      return this.type.name
        ? this.type.name
        : "";
    },
  },
  methods: {
    ...mapActions('notifications',['increaseUnreadMessage','seeMoreNotifications']),
    see_notify(item) {
      this.$http
        .get("general/notification/make_notification_seen/" + item.id)
        .then((response) => {
          if (item.is_seen == 0) {
            item.is_seen = 1;
            this.increaseUnreadMessage();
          }
          if (this.$route.path != item.link) this.$router.push(item.link);
        });
    },
    read_more_method() {
      this.count++;
      this.seeMoreNotifications(this.count);
    },
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then((response) => {
          console.log(response);
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
    change_lang(lang) {
      localStorage.setItem("lang", lang);
      window.location.reload();
    },
    drawerClose() {
      this.togglerActive = !this.togglerActive;
      this.$emit("drawer-toggle", true);
    },
    minifyDrawer() {
      if(this.$vuetify.breakpoint.mobile){
        this.drawerClose()
        return
      }
      this.togglerActive = !this.togglerActive;
      this.mini = !this.mini;
      const body = document.getElementsByTagName("body")[0];

      if (body.classList.contains("drawer-mini")) {
        body.classList.remove("drawer-mini");
      } else {
        body.classList.add("drawer-mini");
      }
    },
  },
  watch: {
    toggleActive(val) {
      this.togglerActive = val;
    },
  },
};
</script>
<style scoped>
.see_more.v-list-item{
  padding: 0 !important;
}
</style>
