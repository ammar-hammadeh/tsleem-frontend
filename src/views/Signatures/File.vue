<template>
  <div class="contruct">
    <v-container fluid class="py-8">
      <v-row class="">
        <v-col cols="4" class="d-flex justify-center">
          <div class="d-flex flex-column align-items-center">
            <v-img
              width="220"
              src="@/assets/img/SA.jpg"
              class="navbar-brand-img ms-3"
            >
            </v-img>
            <h4 class="mt-3 text-center title-header">
              شركة كدانة للتنمية والتطوير
            </h4>
            <h4 class="mt-3 text-center title-header">مركز تسليم</h4>
          </div>
        </v-col>
        <v-col cols="4">
          <v-img
            src="@/assets/img/kadana.png"
            class="navbar-brand-img mx-auto mt-4"
            width="220"
          >
          </v-img>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <div class="d-flex flex-column justify-end">
            <div class="header-part-3">رقم المحضر</div>
            <div class="header-part-3">{{ data.id }}</div>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="4" class="d-flex justify-center">
          <div class="d-flex flex-column align-items-center">
            <h5 class="title-date">التاريخ :</h5>
            <h5 class="title-date mt-5">الوقت :</h5>
          </div>
        </v-col>
        <v-col cols="4" class="d-flex">
          <div class="d-flex flex-column align-items-start">
            <h5 class="title-date">{{ data.created_at | formatDateOnly }}</h5>
            <h5 class="title-date mt-5">{{ data.created_at | formatTime }}</h5>
          </div>
        </v-col>
        <v-col cols="4"> </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <h1 class="title-body">محضر تثبيت مواقع مخيمات مشعر منى</h1>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-5" v-if="data.assign_camps">
        <v-col cols="5" class="d-flex justify-center">
          <div class="d-flex flex-column align-items-center">
            <h5 class="sub-title-body">نوع الجهة :</h5>
            <h5 class="sub-title-body mt-5" v-if="data.assign_camps.get_square">
              رقم المربع :
            </h5>
          </div>
          <div class="d-flex flex-column align-items-center">
            <h5 class="content-body mr-7" v-if="data.company.type">
              {{ data.company.type.name }}
            </h5>
            <h5
              class="content-body mr-7 mt-5"
              v-if="data.assign_camps.get_square"
            >
              {{ data.assign_camps.get_square.name }}
            </h5>
          </div>
        </v-col>
        <v-col cols="5" class="d-flex justify-center">
          <div class="d-flex flex-column align-items-center">
            <h5 class="sub-title-body">اسم الجهة :</h5>
            <h5 class="sub-title-body mt-5" v-if="data.assign_camps.get_camp">
              رقم المخيم :
            </h5>
          </div>
          <div class="d-flex flex-column align-items-center">
            <h5 class="content-body mr-7" v-if="data.company">
              {{ data.company.name }}
            </h5>
            <h5
              class="content-body mr-7 mt-5"
              v-if="data.assign_camps.get_camp"
            >
              {{ data.assign_camps.get_camp.name }}
            </h5>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="12" class="col-paragraph">
          <p class="paragraph">
            اشارة الى دور شركة كدانة في تسليم الجهات المستفيدة لمواقع مخيمات
            مشعر منى , فقد تم التنسيق بين شركة كدانة للتنمية والتطوير ووزارة
            الحج والعمرة على ان يتم تثبيت المواقع وتسليمها للجهات المستفيدة وفقا
            لما تم في موسم حج 1443 هــ. مع اعتماد كافة الملاحظات التي تم حصرها
            بموجب كشوفات الملاحظات بمحاضر تسليم المخيمات للجهات المستفيدة في عام
            1443 هــ وإلتزام الجهات المستفيدة و كما سيتم تزويدكم لاحقا بمستندات
            ومتطلبات التثبيت وملحقاتها لضمان المحافظة على المواقع المستلمة
            وجاهزيتها.
          </p>

          <p class="mt-9">وعلى ذلك جرى التوقيع...والله الموفق ,,,,</p>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="5" class="d-flex justify-center">
          <h5 class="sub-title-body">ممثل الجهة المستفيدة</h5>
        </v-col>
        <v-col cols="5" class="d-flex justify-center">
          <h5 class="sub-title-body">مندوب شركة كدانة للتنمية والتطوير</h5>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="5" class="d-flex justify-center align-center flex-column">
          <div class="d-flex align-items-center">
            <h5 class="sub-title-body mr-7">الاسم :</h5>
            <h5 class="content-body mr-7">
              {{ data.company.name }}
            </h5>
          </div>
          <div
            class="d-flex flex-column"
            style="margin-right: 90px"
            v-if="data.users"
          >
            <h5 class="sub-title-body">التوقيع :</h5>
            <h5 v-if="data.users.signature" class="content-body mt-5">
              <img
                width="200"
                :src="$baseURL + 'storage/' + data.users.signature"
                alt=""
              />
            </h5>
          </div>
        </v-col>
        <v-col cols="5" class="d-flex justify-center align-center flex-column">
          <div class="d-flex align-items-center">
            <h5 class="sub-title-body mr-7">الاسم :</h5>
            <h5 class="content-body mr-7">
              {{ data.kidana != null ? data.kidana.name :'' }}
            </h5>
          </div>
          <div
            class="d-flex flex-column"
            style="margin-right: 90px"
            v-if="data.kidana"
          >
            <h5 class="sub-title-body">التوقيع :</h5>
            <h5 v-if="data.kidana.signature" class="content-body mt-5">
              <img
                width="200"
                :src="$baseURL + 'storage/' + data.kidana.signature"
                alt=""
              />
            </h5>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col cols="3"></v-col>
        <v-col cols="5" class="d-flex justify-center">
          <div class="d-flex flex-column align-center">
            <qr-code :text="`${$frontURL}qr/${data.qr}`" :size="130"></qr-code>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "File",

  data() {
    return {
      data: {},
    };
  },
  mounted() {
    document.title = this.$i18n.t("FileSignature");
    axios.get("general/contracts/view/" + this.$route.params.id).then(
      (response) => {
        console.log(response.data.data);
        console.log('ammar');
        this.data = response.data.data;
      },
      (error) => {
        console.log(error);
        var message = {
          msg: this.$i18n.t("general.there is problem"),
          type: "Danger",
        };
        this.$router.push({
          name: "SignaturePage",
          params: { message: message },
        });
      }
    );
  },
};
</script>
<style>
.header-part-3 {
  border: 1px solid #333;
  padding: 2px 16px 10px;
  text-align: center;
}
.header-part-3:last-child {
  border-top: 0;
}
.title-header,
.sub-title-body,
.content-body {
  font-size: 18px;
}
.title-body {
  font-size: 30px;
}
.title-body,
.title-header,
.sub-title-body {
  font-weight: bold;
}
.title-date {
  font-weight: 500;
  font-size: 16px;
}
.col-paragraph {
  max-width: 77%;
  /* text-align: center; */
  margin: auto;
}
.contruct {
  background: #fff;
}
</style>