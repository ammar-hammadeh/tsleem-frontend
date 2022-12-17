<template>
  <div class="contruct">
    <Loading v-if="loading"></Loading>
    <v-btn
      :ripple="false"
      :class="classLangBtn"
      class="text-white print-btn bg-gradient-default font-weight-bolder"
      @click="print()"
    >
      {{ $t("print") }}
    </v-btn>
    <div class="contruct-print">
      <v-container class="py-8" fluid>
        <v-row class="">
          <v-col cols="4" class="d-flex">
            <div class="div-head d-flex flex-column align-center">
              <img
                width="220"
                src="@/assets/img/SA.jpg"
                class="navbar-brand-img"
              >
              </img>
              <div class="text-center">
                <h4 class="mt-3 title-header">شركة كدانة للتنمية والتطوير</h4>
              </div>
              <div class="text-center">
                <h4 class="mt-3 text-center title-header">مركز تسليم</h4>
              </div>
            </div>
          </v-col>
          <v-col cols="4">
            <img
              src="@/assets/img/kadana.png"
              class="kidana navbar-brand-img mx-auto mt-4"
            >
            </img>
          </v-col>
          <v-col cols="4" class="d-flex justify-center">
            <div class="d-flex flex-column justify-end">
              <div class="header-part-3">رقم المحضر</div>
              <div class="header-part-3 font-poppins-bold">{{ data.id }}</div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row class="mt-5">
          <v-col cols="2" class="d-flex ms-10">
            <div class="d-flex flex-column align-items-center">
              <h5 class="title-date">التاريخ :</h5>
              <h5 class="title-date mt-5">الوقت :</h5>
            </div>
          </v-col>
          <v-col cols="4" class="d-flex">
            <div class="d-flex flex-column align-items-start">
              <h5 class="title-date font-poppins-bold">
                {{ data.created_at | formatDateOnly }}
              </h5>
              <h5 class="title-date mt-5 font-poppins-bold">
                {{ data.created_at | formatTime }}
              </h5>
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
          <v-col cols="5" class="d-flex ms-15">
            <div class="d-flex flex-column align-items-center">
              <h5 class="sub-title-body">{{$t('type_user')}} :</h5>
              <!-- <h5 class="sub-title-body mt-5" v-if="data.assign_camps.get_square">
                  رقم المربع :
                </h5> -->
            </div>
            <div class="d-flex flex-column align-items-center">
              <h5 class="content-body mr-7" v-if="data.company.type">
                {{ data.company.type.name }}
              </h5>
              <!-- <h5
                  class="content-body mr-7 mt-5"
                  v-if="data.assign_camps.get_square"
                >
                  {{ data.assign_camps.get_square.name }}
                </h5> -->
            </div>
          </v-col>
          <v-col cols="5" class="d-flex justify-center">
            <div class="d-flex flex-column align-items-center">
              <h5 class="sub-title-body">{{$t('name_user')}} :</h5>
              <!-- <h5 class="sub-title-body mt-5" v-if="data.assign_camps.get_camp">
                  رقم المخيم :
                </h5> -->
            </div>
            <div class="d-flex flex-column align-items-center">
              <h5 class="content-body mr-7" v-if="data.company">
                {{ data.company.name }}
              </h5>
              <!-- <h5
                  class="content-body mr-7 mt-5"
                  v-if="data.assign_camps.get_camp"
                >
                  {{ data.assign_camps.get_camp.name }}
                </h5> -->
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="12" class="col-paragraph">
            <p class="paragraph">
              اشارة الى دور شركة كدانة في تسليم الجهات المستفيدة لمواقع مخيمات
              مشعر منى , واشارة إلى خطاب معالي ويزر الحج والعمرة رقم
              <span class="font-poppins-bold"> 440223098 </span>
              بتاريخ
              <span class="font-poppins-bold">24/2/1444</span> هــ والذي يتضمن
              تثبيت تخصيص مواقع ومخيمات اسكان الحجاج بالمشاعر المقدسة وفقا لما
              تم في موسم حج <span class="font-poppins-bold">1443</span> هــ ,
              حيص تم تثبيت المواقع على الطبيعة والمساحة الإجمالية المخصصة
              <span v-if="data.company && data.company.kroky">
                حسب الكروكي المرفق رقم
                <span class="font-poppins-bold" v-if="data.company"
                  >({{ data.company.kroky }})</span
                ></span
              >
              ولمدة <span class="font-poppins-bold"> 3 </span> سنوات . مع اعتماد
              كافة الملاحظات التي تم حصرها بموجب كشوفات الملاحظات بمحاضر تسليم
              المخيمات للجهات المستفيدة في عام
              <span class="font-poppins-bold">1443</span> هــ والتزام الجهات
              المستفيدة بالتالي :
              <ul class="mt-3 mr-5" style="list-style: none;">
                <li><span class="font-poppins-bold ml-2">1.</span> التقييد بحدود الموقع المسلم للجهة المستفيدة وعدم التعدي على المواقع المجاورة و التحقق من سلامة الموقع المخصص عند استلامه واحترام ومراعاة الإشغالات الحكومية و الخدمية.</li>
                <li><span class="font-poppins-bold ml-2">2.</span> معاينة الموقع وتحديد مصادر الطاقة المتوفرة ومراعاة طاقاتها الإستيعابية خلال تجهيز الموقع .</li>
                <li><span class="font-poppins-bold ml-2">3.</span> الإلتزام بالشروط والمواصفات للدليل الاسترشادي لشركة كدانة واشتراطات ومتطلبات الجهات ذات العلاقة </li>
                <li><span class="font-poppins-bold ml-2">4.</span> الالتزام بتنفيذ الأعمال بالموقع من خلال مقاوليين مؤهلين وتحت إشراف وتصميم مكتب استشاري معتمد لدى الدفاع المدني. </li>
                <li><span class="font-poppins-bold ml-2">5.</span> اتباع كافة التعليمات واللوائح المتعلقة بإسكان الحجاج وخدمتهم وتوفير وسائل الراحة وفقا للتعليمات المنظمة لذلك ومنها البروتوكولات الصحية ومعايير واشتراطات الأمن والسلامة. </li>
                <li><span class="font-poppins-bold ml-2">6.</span> عدم تأجير الموقع المسلم أو التنازل عنه للغير أو إجراء أي تبادل للمواقع بين الشركات أو المؤسسات. </li>
                <li><span class="font-poppins-bold ml-2">7.</span> التأكيد على ضرورة نقل مخلفات تجهيز الموقع قبل الموسم وبعده إلى المرادم العمومية , وإعادة الوضع إلى ماكان عليه عند الإستلام </li>
                <li><span class="font-poppins-bold ml-2">8.</span> الإلتزام بتسديد الرسوم المالية للخدمات المقدمة مثل الكهرباء وغيرها. </li>
                <li><span class="font-poppins-bold ml-2">9.</span> يحث لشركة كدانة المباشرة في أعمال الصيانة والتشغيل والتصريح للجهات الحكومية والخدمية المشغلة بالحج وتمكينهم من الدخول إلى هذا الموقع متى ما لزم الأمر واستدعت الحاجة كما  يحق له نزع او اختزال أو تعديل حدود هذا الموقع أو إجراء أي تعديلات وجميع ما يلزم لتحقيق المصلحة العامة ودون ممانعة من الجهة المستفيدة. </li>
                <li><span class="font-poppins-bold ml-2">10.</span> السماح للمقاول والاستشاري المشرف التابع لشركة كدانة بمتابعة أعمال التشغيل والصيانة داخل الموقع واستكمال الملاحظات. </li>
                <li><span class="font-poppins-bold ml-2">11.</span> التنسيق مع شركة كدانة قبل بدئ التوصيلات الكهربائية والالتزام بالتعليمات الصادرة من شركة كدانة ومن يمثلها. </li>
              </ul>
            </p>

            <p class="mt-9">وعلى ذلك جرى التوقيع...والله الموفق ,,,,</p>
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="6" class="d-flex">
            <h5 class="sub-title-body">ممثل الجهة المستفيدة</h5>
          </v-col>
          <v-col cols="6" class="d-flex">
            <h5 class="sub-title-body">مندوب شركة كدانة للتنمية والتطوير</h5>
          </v-col>
        </v-row>
        <v-row class="mt-2">
          <v-col cols="6" class="d-flex flex-column">
            <div class="d-flex align-items-center">
              <h5 class="sub-title-body">الاسم :</h5>
              <h5 class="content-body" v-if="data.company">
                {{ data.company.name }}
              </h5>
            </div>
            <div
              class="d-flex flex-column mt-3"
              style="margin-right: 0px"
              v-if="data.users"
            >
              <h5 class="sub-title-body">التوقيع :</h5>
              <h5 v-if="data.users.signature" class="content-body ">
                <img
                  width="150"
                  :src="data.users.full_signature"
                  alt=""
                />
              </h5>
              <div v-else class="signature-div"></div>
            </div>
          </v-col>
          <v-col cols="6" class="d-flex flex-column">
            <div class="d-flex align-items-center">
              <h5 class="sub-title-body">الاسم :</h5>
              <h5 class="content-body">
                {{ data.kidana != null ? data.kidana.name : "" }}
              </h5>
            </div>
            <div
              class="d-flex flex-column mt-3"
              style="margin-right: 0px"
              v-if="data.kidana"
            >
              <h5 class="sub-title-body">التوقيع :</h5>
              <h5 v-if="data.kidana.signature" class="content-body ">
                <img
                  width="150"
                  :src="data.kidana.full_signature"
                  alt=""
                />
              </h5>
              <div v-else class="signature-div"></div>
            </div>
          </v-col>
        </v-row>
     
        <v-row class="signer">
          <v-col cols="12">
            <h5 class="content-body" v-if="data.company">
                عرض المخيمات والمربعات لشركة :  
                  {{ data.company.name }}
                </h5>
          </v-col>
          <v-col cols="6">
            <v-row >
              <v-col cols="6" class="pl-0">
                <v-list class="py-0 border border-left-none border-bottom-none">
                      <v-list-item class=" py-4">
                        <v-list-item-content>
                          <v-list-item-title
                            class="text-typo text-center text-subtitle-2 ls-0 font-weight-bold "
                            >{{$t('Camp')}}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item v-for="item in table" :key="`camp-${item.id}`" class=" py-4">
                        <v-list-item-content>
                          <v-list-item-title
                            class="text-typo text-center text-subtitle-2 font-poppins ls-0"
                            >{{ item.camp_name }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
              </v-col>
                <v-col cols="6" class="pr-0">
                <v-list class="py-0 border border-bottom-none">
                      <v-list-item class=" py-4">
                        <v-list-item-content class="">
                          <v-list-item-title
                            class="text-typo text-center text-subtitle-2 ls-0 font-weight-bold "
                            >{{$t('Square')}}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item  v-for="item in table" :key="`square-${item.id}`" class=" py-4">
                        <v-list-item-content>
                          <v-list-item-title
                            class="text-typo text-center text-subtitle-2 font-poppins ls-0"
                            >{{ item.square_name }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="data.status == 'signed'">
          <v-col cols="6"></v-col>
          <v-col cols="5">
            <qr-code
              :text="`${$frontURL}qr/${data.qr}`"
              :size="130"
            ></qr-code>
            <!-- <div class="">
            </div> -->
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import Loading from "../Components/Loading.vue";

export default {
  name: "File",
  components: {
    Loading,
  },
  data() {
    return {
      data: {},
      loading: false,
      table: [],
    };
  },
  computed: {
    classLangBtn() {
      return {
        "mr-6": this.$vuetify.rtl,
        "ml-6": !this.$vuetify.rtl,
      };
    },
  },
  methods: {
    print() {
      window.print();
    },
  },
  mounted() {
    this.loading = true;
    document.title = this.$i18n.t("FileSignature");
    axios.get("general/contracts/view-by-code/" + this.$route.params.id).then(
      (response) => {
        this.loading = false;
        console.log(response.data);
        this.data = response.data.data;
        this.table = response.data.square_camps;
      },
      (error) => {
        console.log(error);
        this.loading = false;
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
<style scoped>
