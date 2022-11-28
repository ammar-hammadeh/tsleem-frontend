<template>
  <div class="bg-gray-100 border-radius-lg px-5 pt-3">
    <!-- {{ data }} -->
    <div v-for="(item, index) in data" :key="index">
      <v-list-item v-if="item.value != null || item.name" class="px-0 py-3">
        <v-list-item-content class="py-0">
          <div class="d-flex flex-column">
            <h6 class="mb-1 text-typo text-sm font-weight-bold">
              {{ item.label ? item.label : item.name }}
            </h6>
            <span
              :class="[item.class, item.expire ? 'font-poppins' : '']"
              class="text-sm text-body"
            >
              <!-- {{ item.expire }} -->
              <template v-if="item.value">
                <span v-html="item.value"></span>
                <!-- {{ item.value }} -->
              </template>
              <template v-else-if="item.expire">
                {{ item.expire | formatDateOnly }}
              </template>
            </span>
          </div>
        </v-list-item-content>

        <v-list-item-content v-if="item.path" class="py-0 text-end">
          <a
            :href="item.path"
            target="_blank"
            color="#fff"
            class="text-dark font-poppins font-weight-bolder py-6 px-5 shadow-0"
          >
            <v-icon size="18" class="text-dark rotate-180"
              >fas fa-file-pdf text-lg me-1</v-icon
            >
            Pdf
          </a>
        </v-list-item-content>
      </v-list-item>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {},
  },
};
</script>