<template>
  <div class="table-wrapper">
    <v-row class="mt-7">
      <v-col
          cols="6"
          v-for="item in type_need_sign"
          :key="`need-sign-${item.id}`"
      >
        <h5 class="sub-title-body">{{ item.name_in_form }}</h5>
        <div class="d-flex align-items-center">
          <h5 class="sub-title-body">{{$t('Name')}} :</h5>
          <h5 class="content-body"></h5>
        </div>
        <div class="d-flex flex-column" style="margin-right: 0px">
          <h5 class="sub-title-body">{{$t('signer')}} :</h5>
          <h5 class="content-body">
            <!-- <img width="150" alt="" /> -->
          </h5>
        </div>
      </v-col>
      <v-col
          cols="6"
          v-for="(item, index) in signature"
          :key="`signature-${index}`"
      >
        <h5 class="sub-title-body">{{ item.name_in_form }}</h5>
        <div class="d-flex align-items-center">
          <h5 class="sub-title-body ml-2">{{$t('Name')}} :</h5>
          <h5 class="content-body">
            {{ item.username }}
          </h5>
        </div>
        <div class="d-flex flex-column mt-3" style="margin-right: 0px">
          <h5 class="sub-title-body">{{$t('signer')}} :</h5>
          <h5 class="content-body">
            <img width="150" :src="item.full_path_sign" alt="" />
          </h5>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "FormInfoSignatures",
  props: ['type_need_sign', 'signature']
}
</script>

<style scoped>

@media print {
  .table-wrapper{
    page-break-after: auto;
    page-break-inside: avoid;
    page-break-before: always;
  }
}

</style>
