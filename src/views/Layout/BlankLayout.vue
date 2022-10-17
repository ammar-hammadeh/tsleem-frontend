<template>
  <v-app>
    <fade-transition :duration="200" origin="center top" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </fade-transition>
  </v-app>
</template>
<script>
// /* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import { FadeTransition } from "vue2-transitions";
import Drawer from "@/components/Drawer.vue";
import AppBar from "@/components/AppBar.vue";
import ContentFooter from "@/components/Footer.vue";
import SettingsDrawer from "@/components/Widgets/SettingsDrawer.vue";

export default {
  components: {
    ContentFooter,
    FadeTransition,
    Drawer,
    AppBar,
    SettingsDrawer,
  },
  data() {
    return {
      drawer: null,
      showSettingsDrawer: false,
      sidebarColor: "success",
      sidebarTheme: "transparent",
      navbarFixed: false,
    };
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
    toggleSettingsDrawer(value) {
      this.showSettingsDrawer = value;
    },
    updateSidebarColor(value) {
      this.sidebarColor = value;
    },
    updateSidebarTheme(value) {
      this.sidebarTheme = value;
    },
    toggleNavbarPosition(value) {
      this.navbarFixed = value;
    },
  },
  mounted() {
    this.initScrollbar();
  },
};
</script>
<style>
@media print {
  .print {
    /* border: 1px solid black; */
    border: none;
    border-collapse: collapse;
  }
  .print tr > td {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    font-size: 12px;
  }
  .print tr > th {
    font-size: 14px;
  }

  .print td:first-child {
    border-left: none;
  }

  .print td:last-child {
    border-right: none;
  }

  .print tr > td:last-of-type {
    display: none;
  }
  .print tr > th:last-of-type {
    display: none;
  }
}
</style>
