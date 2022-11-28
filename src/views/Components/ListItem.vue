<template >
  <div>
    <hr class="horizontal dark mb-2" />
    <v-list nav dense>
      <!-- <h5
        class="
          text-uppercase text-caption
          ls-0
          font-weight-bolder
          p-0
          text-muted
          mx-4
          mt-2
          mb-2
          ps-2
          d-none-mini
          white-space-nowrap
        "
      >
        {{ $t(header.title) }}
      </h5> -->

      <!-- <h5
        v-else-if="item.permission == null"
        class="
          text-uppercase text-caption
          ls-0
          font-weight-bolder
          p-0
          text-muted
          mx-4
          mt-4
          mb-2
          ps-2
          d-none-mini
          white-space-nowrap
        "
      >
        {{ $t(`sidebar.${header.title}`) }}
      </h5> -->

      <template>
        <div v-for="(item, i) in items" :key="i">
          <template
            v-if="item.permission && str_per.indexOf(item.permission) > -1"
          >
            <!-- <div> -->
            <template>
              <template
                v-if="
                  item.permission == 'employee' &&
                  ((user && user.parent_id != null) ||
                    (type && type.code == 'admin'))
                "
              >
              </template>
              <template v-else>
                <v-list-group
                  :ripple="false"
                  v-if="item.items"
                  :key="item.title"
                  v-model="item.active"
                  append-icon="fas fa-angle-down"
                  class="pb-1 mx-2"
                  active-class="item-active"
                >
                  <template v-slot:activator>
                    <v-list-item-icon
                      class="shadow border-radius-md mx-2 align-center"
                    >
                      <!-- <div class="c-p-10" v-html="item.action">
                      {{ item.action }}
                    </div> -->
                      <v-icon size="16" v-html="item.action"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="$t(item.title)"
                        class="ms-1"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <div v-if="item.items">
                    <v-list-item
                      :ripple="false"
                      link
                      class="mb-0 no-default-hover"
                      :class="child.active ? 'item-active' : ''"
                      v-for="child in item.items"
                      :key="child.title"
                      :to="child.link"
                    >
                      <template
                        v-if="
                          (child.permission == 'add-employee' ||
                            child.permission == 'index-employee') &&
                          type &&
                          type.code == 'admin'
                        "
                      ></template>
                      <template v-else>
                        <div
                          v-if="
                            child.permission &&
                            str_per.indexOf(child.permission) > -1
                          "
                        >
                          <!-- <div> -->
                          <div>
                            <span
                              class="v-list-item-mini"
                              v-text="child.prefix"
                            ></span>

                            <v-list-item-content
                              class="ms-6 ps-7"
                              v-if="!child.items"
                            >
                              <v-list-item-title
                                v-text="$t(child.title)"
                                @click="listClose($event)"
                              ></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-content
                              class="ms-6 ps-7 py-0"
                              v-if="child.items"
                            >
                              <v-list-group
                                prepend-icon=""
                                :ripple="false"
                                sub-group
                                no-action
                                v-model="child.active"
                              >
                                <template v-slot:activator>
                                  <span class="v-list-item-mini">{{
                                    child.prefix
                                  }}</span>
                                  <v-list nav dense class="pa-0">
                                    <v-list-group
                                      :ripple="false"
                                      append-icon="fas fa-angle-down me-auto ms-1"
                                      active-class="item-active"
                                      class="mb-0"
                                    >
                                      <template v-slot:activator class="mb-0">
                                        <v-list-item-content class="py-0">
                                          <v-list-item-title
                                            v-text="$t(child.title)"
                                          ></v-list-item-title>
                                        </v-list-item-content>
                                      </template>
                                    </v-list-group>
                                  </v-list>
                                </template>

                                <v-list-item
                                  v-for="child2 in child.items"
                                  :ripple="false"
                                  :key="child2.title"
                                  :to="child2.link"
                                  @click="listClose($event)"
                                >
                                  <v-list-item-content>
                                    <span
                                      class="v-list-item-mini"
                                      v-text="child2.prefix"
                                    ></span>
                                    <v-list-item-title
                                      v-text="$t(child2.title)"
                                    ></v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-group>
                            </v-list-item-content>
                          </div>
                        </div>
                      </template>
                    </v-list-item>
                  </div>
                </v-list-group>
                <v-list-item
                  link
                  :to="item.link"
                  class="pb-1 mx-2 no-default-hover"
                  :ripple="false"
                  active-class="item-active"
                  v-else
                >
                  <v-list-item-icon
                    class="shadow border-radius-md mx-2 align-center"
                  >
                    <v-icon size="16" v-html="item.action"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="$t(item.title)"
                      class="ms-1"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </template>
          </template>
        </div>
      </template>
    </v-list>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: ["items", "header"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["str_per"]),
    ...mapState("auth", ["user", "type"]),
  },
  methods: {
    listClose($event) {
      this.$emit("listClose", $event);
    },
  },
};
</script>