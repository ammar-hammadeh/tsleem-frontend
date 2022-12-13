import Vue from "vue";
import VueRouter from "vue-router";
import DashboardLayout from "../views/Layout/DashboardLayout.vue";
import BlankLayout from "../views/Layout/BlankLayout.vue";
import ProfileLayout from "../views/Layout/ProfileLayout.vue";
import DashboardLayoutVr from "../views/Layout/DashboardLayoutVr.vue";
import PageLayout from "../views/Layout/PageLayout";
import AuthBasicLayout from "../views/Layout/AuthBasicLayout";
import AuthCoverLayout from "../views/Layout/AuthCoverLayout";
import AuthIllustrationLayout from "../views/Layout/AuthIllustrationLayout";
import Middleware from "../middleware/";
// Dashboard pages
const Dashboard = () => import("../views/Dashboard/Dashboard.vue");
const Automotive = () => import("../views/Dashboard/Automotive.vue");
const SmartHome = () => import("../views/Dashboard/SmartHome.vue");
const VrDefault = () => import("../views/Dashboard/VrDefault.vue");
const VrInfo = () => import("../views/Dashboard/VrInfo.vue");
const Crm = () => import("../views/Dashboard/Crm.vue");
const GettingStarted = () => import("../views/Dashboard/GettingStarted.vue");

// order
const OrderPage = () => import("@/views/Users/orders.vue");
const ShowOrder = () => import("@/views/Orderes/Details.vue");
// order status
const OrderStatusPage = () => import("@/views/OrderStatus/Show.vue");

// camps
const CampPage = () => import("@/views/Camps/Show.vue");
const NewCamp = () => import("@/views/Camps/New.vue");
const EditCamp = () => import("@/views/Camps/Edit.vue");

// Category
const CategoryPage = () => import("@/views/Categories/Show.vue");
const NewCategory = () => import("@/views/Categories/New.vue");
const EditCategory = () => import("@/views/Categories/Edit.vue");

// Question Category
const QuestionCategoryPage = () => import("@/views/QuestionCategory/Show.vue");
const NewQuestionCategory = () => import("@/views/QuestionCategory/New.vue");
const EditQuestionCategory = () => import("@/views/QuestionCategory/Edit.vue");

// square
const SquarePage = () => import("@/views/Squares/Show.vue");
const NewSquare = () => import("@/views/Squares/New.vue");
const EditSquare = () => import("@/views/Squares/Edit.vue");

// cities
const CityPage = () => import("@/views/Cities/Show.vue");
const NewCity = () => import("@/views/Cities/New.vue");
const EditCity = () => import("@/views/Cities/Edit.vue");

// types
const TypePage = () => import("@/views/Types/Show.vue");
const EditType = () => import("@/views/Types/Edit.vue");

// appointments
const AppointmentPage = () => import("@/views/Appointments/Show.vue");
const NewAppointment = () => import("@/views/Appointments/New.vue");
const AppointmentForm = () => import("@/views/Appointments/Form.vue");
const AnswerForm = () => import("@/views/Appointments/FormAnswer.vue");
const AnswerFormEdit = () => import("@/views/Appointments/FormAnswerEdit.vue");
const SignatureForm = () => import("@/views/Appointments/Signature.vue");
const FileForm = () => import("@/views/Appointments/FileForm.vue");

// question
const QuestionPage = () => import("@/views/Questions/Show.vue");
const NewQuestion = () => import("@/views/Questions/New.vue");
const EditQuestion = () => import("@/views/Questions/Edit.vue");

// form
const FormPage = () => import("@/views/TamplateForm/Show.vue");
const NewForm = () => import("@/views/TamplateForm/New.vue");
const EditForm = () => import("@/views/TamplateForm/Edit.vue");

// signature
const SignaturePage = () => import("@/views/Signatures/Show.vue");
const DeliveryPage = () => import("@/views/Signatures/Delivery.vue");
const FileSignature = () => import("@/views/Signatures/File.vue");
const BlankCheckQr = () => import("@/views/Signatures/CheckQr.vue");
const BlankRegisterDone = () => import("@/views/Auth/Done.vue");

// assign
const AssignPage = () => import("@/views/Assigns/Show.vue");
const NewAssign = () => import("@/views/Assigns/New.vue");
const EditAssign = () => import("@/views/Assigns/Edit.vue");
const ReAssign = () => import("@/views/Assigns/ReAssign.vue");

// Pages
const Pricing = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Pricing.vue");
const Rtl = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Rtl.vue");
const ProfileOverview = () =>
  import(
    /* webpackChunkName: "pages" */
    "@/views/Pages/Profile/ProfileOverview.vue"
  );
const Teams = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Profile/Teams.vue");
const Projects = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Profile/Projects.vue");
const Reports = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Users/Reports.vue");
const NewUser = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Users/NewUser.vue");
const Settings = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Account/Settings.vue");
const Billing = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Account/Billing.vue");
const Invoice = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Account/Invoice.vue");
const Timeline = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Projects/Timeline.vue");
const Charts = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Charts.vue");
const Alerts = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Alerts.vue");
const Notifications = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Notifications.vue");
const SignUpBasic = () =>
  import(
    /* webpackChunkName: "pages" */
    "@/views/Pages/Authentication/SignUp/Basic.vue"
  );
const SignUpCover = () =>
  import(
    /* webpackChunkName: "pages" */
    "@/views/Pages/Authentication/SignUp/Cover.vue"
  );

const SignUpIllustration = () =>
  import(
    /* webpackChunkName: "pages" */
    "@/views/Pages/Authentication/SignUp/Illustration.vue"
  );

// Applications
const Kanban = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Applications/Kanban.vue");
const Wizard = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Applications/Wizard.vue");
const Datatables = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Applications/Datatables.vue");
const Calendar = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Applications/Calendar.vue");

// Ecommerce
const NewProduct = () =>
  import(
    /* webpackChunkName: "pages" */
    "@/views/Ecommerce/Products/NewProduct.vue"
  );
const EditProduct = () =>
  import(
    /* webpackChunkName: "pages" */
    "@/views/Ecommerce/Products/EditProduct.vue"
  );
const ProductPage = () =>
  import(
    /* webpackChunkName: "pages" */
    "@/views/Ecommerce/Products/ProductPage.vue"
  );
const OrderList = () =>
  import(
    /* webpackChunkName: "pages" */
    "@/views/Ecommerce/Orders/OrderList.vue"
  );
const OrderDetails = () =>
  import(
    /* webpackChunkName: "pages" */
    "@/views/Ecommerce/Orders/OrderDetails.vue"
  );

/************** Start Store Routes ***********************/
/****************************************************** */
/****************************************************** */
/****************************************************** */
const LogIn = () =>
  import(
    /* webpackChunkName: "Auth" */
    "@/views/Auth/Login.vue"
  );
const ResetPassword = () =>
  import(
    /* webpackChunkName: "Auth" */
    "@/views/Auth/ResetPassword.vue"
  );
const Email = () =>
  import(
    /* webpackChunkName: "Auth" */
    "@/views/Auth/Email.vue"
  );

const Signup = () =>
  import(
    /* webpackChunkName: "Auth" */
    "@/views/Auth/Register/Register.vue"
  );

/****************************************************** */
/****************************************************** */
/****************************************************** */
/************** End Store Routes ***********************/

Vue.use(VueRouter);

let vrPages = {
  path: "/",
  component: DashboardLayoutVr,
  name: "Vr",
  children: [
    {
      path: "/pages/dashboards/vr/vr-default",
      name: "VrDefault",
      component: VrDefault,
      meta: {
        groupName: "Dashboards",
      },
    },
    {
      path: "/pages/dashboards/vr/vr-info",
      name: "VrInfo",
      component: VrInfo,
      meta: {
        groupName: "Dashboards",
      },
    },
  ],
};

let profilePages = {
  path: "/",
  component: ProfileLayout,
  name: "Profile",
  children: [
    {
      path: "/pages/pages/profile/overview",
      name: "ProfileOverview",
      component: ProfileOverview,
      meta: {
        groupName: "Pages",
      },
    },
    {
      path: "/pages/pages/profile/teams",
      name: "Teams",
      component: Teams,
      meta: {
        groupName: "Pages",
      },
    },
    {
      path: "/pages/pages/profile/projects",
      name: "Project",
      component: Projects,
      meta: {
        groupName: "Pages",
      },
    },
  ],
};

let userPages = {
  path: "/",
  component: DashboardLayout,
  name: "Users",
  children: [
    {
      path: "/pages/pages/users/reports",
      name: "Reports",
      component: Reports,
      meta: {
        groupName: "Pages",
      },
    },
    {
      path: "/pages/pages/users/new-user",
      name: "NewUser",
      component: NewUser,
      meta: {
        groupName: "Pages",
      },
    },
  ],
};

let accountPages = {
  path: "/",
  component: DashboardLayout,
  name: "Account",
  children: [
    {
      path: "/pages/pages/account/settings",
      name: "Settings",
      component: Settings,
      meta: {
        groupName: "Pages",
      },
    },
    {
      path: "/pages/pages/account/billing",
      name: "Billing",
      component: Billing,
      meta: {
        groupName: "Pages",
      },
    },
    {
      path: "/pages/pages/account/invoice",
      name: "Invoice",
      component: Invoice,
      meta: {
        groupName: "Pages",
      },
    },
  ],
};

let projectsPages = {
  path: "/",
  component: DashboardLayout,
  name: "Projects",
  children: [
    {
      path: "/pages/pages/projects/timeline",
      name: "Timeline",
      component: Timeline,
      meta: {
        groupName: "Pages",
      },
    },
  ],
};

let applicationPages = {
  path: "/",
  component: DashboardLayout,
  name: "Application",
  children: [
    {
      path: "/pages/applications/kanban",
      name: "Kanban",
      component: Kanban,
      meta: {
        groupName: "Applications",
      },
    },
    {
      path: "/pages/applications/wizard",
      name: "Wizard",
      component: Wizard,
      meta: {
        groupName: "Applications",
      },
    },
    {
      path: "/pages/applications/datatables",
      name: "Datatables",
      component: Datatables,
      meta: {
        groupName: "Applications",
      },
    },
    {
      path: "/pages/applications/calendar",
      name: "Calendar",
      component: Calendar,
      meta: {
        groupName: "Applications",
      },
    },
  ],
};

let ecommercePages = {
  path: "/",
  component: ProfileLayout,
  name: "Ecommerce",
  children: [
    {
      path: "/pages/ecommerce/products/new-product",
      name: "NewProduct",
      component: NewProduct,
      meta: {
        groupName: "Ecommerce",
      },
    },
  ],
};

let pricingPage = {
  path: "/",
  component: PageLayout,
  name: "Pricing Page",
  children: [
    {
      path: "/pages/pages/pricing-page",
      name: "Pricing",
      component: Pricing,
    },
  ],
};

let authBasicPages = {
  path: "/",
  component: AuthBasicLayout,
  name: "Authentication Basic",
  children: [
    {
      path: "/pages/authentication/signup/basic",
      name: "SignUpBasic",
      component: SignUpBasic,
    },
  ],
};

let authCoverPages = {
  path: "/",
  component: AuthCoverLayout,
  name: "Authentication Cover",
  children: [
    {
      path: "/pages/authentication/signup/cover",
      name: "SignUpCover",
      component: SignUpCover,
    },
  ],
};

let authIllustrationPages = {
  path: "/",
  component: AuthIllustrationLayout,
  name: "Authentication Illustration",
  children: [
    {
      path: "/pages/authentication/signup/illustration",
      name: "SignUpIllustration",
      component: SignUpIllustration,
    },
  ],
};

let RegisterFormPages = {
  path: "/",
  component: AuthBasicLayout,
  name: "RegisterFormPage",
  children: [
    {
      path: "/form-register",
      name: "RegisterForm",
      component: () => import("@/views/Auth/RegisterForm/RegisterForm.vue"),
      meta: {
        groupName: "RegisterForm",
        middlewares: [Middleware.authReject],
      },
    },
  ],
};
let OrdersPage = {
  path: "/",
  component: DashboardLayout,
  name: "Order",
  children: [
    // {
    //     path: "/orders",
    //     name: "OrderPage",
    //     component: OrderPage,
    //     meta: {
    //         groupName: "Order",
    //         middlewares: [Middleware.auth,Middleware.permission],
    //         permissions: 'order-index',
    //     },
    // },
  ],
};

let questionsPage = {
  path: "/",
  component: DashboardLayout,
  name: "Question",
  children: [
    {
      path: "/questions/create",
      name: "NewQuestion",
      component: NewQuestion,
      meta: {
        groupName: "Question",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "question-create",
      },
    },
    {
      path: "/questions/update/:id",
      name: "EditQuestion",
      component: EditQuestion,
      meta: {
        groupName: "Question",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "question-update",
      },
    },
    {
      path: "/questions",
      name: "QuestionPage",
      component: QuestionPage,
      meta: {
        groupName: "Question",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "question-index",
      },
    },
  ],
};

let questionCategoryPage = {
  path: "/",
  component: DashboardLayout,
  name: "QuestionCategory",
  children: [
    {
      path: "/question-category/create",
      name: "NewQuestionCategory",
      component: NewQuestionCategory,
      meta: {
        groupName: "QuestionCategory",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "question_category-create",
      },
    },
    {
      path: "/question-category/update/:id",
      name: "EditCategory",
      component: EditQuestionCategory,
      meta: {
        groupName: "QuestionCategory",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "question_category-update",
      },
    },
    {
      path: "/question-category",
      name: "QuestionCategoryPage",
      component: QuestionCategoryPage,
      meta: {
        groupName: "QuestionCategory",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "question_category-index",
      },
    },
  ],
};

let AnswerFromPage = {
  path: "/",
  component: DashboardLayout,
  name: "Form",
  children: [
    {
      path: "appointments/:id/form",
      name: "AppointmentForm",
      component: AppointmentForm,
      meta: {
        groupName: "AnswerForm",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "appointment-form-view",
      },
    },
    {
      path: "appointments/:id/form/:form",
      name: "AppointmentAnswerForm",
      component: AnswerForm,
      meta: {
        groupName: "AnswerForm",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "appointment-form-answer",
      },
    },

    {
      path: "appointments/:id/form/:form/edit",
      name: "AppointmentAnswerFormEdit",
      component: AnswerFormEdit,
      meta: {
        groupName: "AnswerForm",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "appointment-form-answer-edit",
      },
    },
    {
      path: "appointments/:id/form/:form/signature",
      name: "AppointmentFormSignature",
      component: SignatureForm,
      meta: {
        groupName: "AnswerForm",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "delivery-sign",
      },
    },
  ],
};

let TamplateFormPage = {
  path: "/",
  component: DashboardLayout,
  name: "Form",
  children: [
    {
      path: "/forms/create",
      name: "NewForm",
      component: NewForm,
      meta: {
        groupName: "Form",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "tamplate-form-create",
      },
    },
    {
      path: "/forms/update/:id",
      name: "EditForm",
      component: EditForm,
      meta: {
        groupName: "Form",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "tamplate-form-update",
      },
    },
    {
      path: "/forms",
      name: "FormPage",
      component: FormPage,
      meta: {
        groupName: "Form",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "tamplate-form-index",
      },
    },
  ],
};

let SignaturesPage = {
  path: "/",
  component: DashboardLayout,
  name: "Signature",
  children: [
    {
      path: "/contructs",
      name: "SignaturePage",
      component: SignaturePage,
      meta: {
        groupName: "Signature",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "signature-index",
      },
    },
    {
      path: "/deliveries",
      name: "DeliveryPage",
      component: DeliveryPage,
      meta: {
        groupName: "Delivery",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "delivery-index",
      },
    },
  ],
};

let FilePage = {
  path: "/",
  component: BlankLayout,
  name: "FileSignaturePage",
  children: [
    {
      path: "/contructs/:id",
      name: "FileSignature",
      component: FileSignature,
      meta: {
        groupName: "Signature",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "signature-show-file",
      },
    },
    {
      path: "appointments/:id/form/:form/view",
      name: "AppointmentFormView",
      component: FileForm,
      meta: {
        groupName: "AnswerForm",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "delivery-view",
      },
    },
    {
      path: "/qr/:qr",
      name: "BlankCheckQr",
      component: BlankCheckQr,
      meta: {
        groupName: "Signature",
      },
    },
    {
      path: "/done",
      name: "BlankRegisterDone",
      component: BlankRegisterDone,
      meta: {
        groupName: "Done",
        middlewares: [Middleware.authReject],
      },
    },
  ],
};

let campsPage = {
  path: "/",
  component: DashboardLayout,
  name: "Camp",
  children: [
    {
      path: "/camps/create",
      name: "NewCamp",
      component: NewCamp,
      meta: {
        groupName: "Camp",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "camp-create",
      },
    },
    {
      path: "/camps/update/:id",
      name: "EditCamp",
      component: EditCamp,
      meta: {
        groupName: "Camp",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "camp-update",
      },
    },
    {
      path: "/camps",
      name: "CampPage",
      component: CampPage,
      meta: {
        groupName: "Camp",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "camp-index",
      },
    },
  ],
};

let categoriesPage = {
  path: "/",
  component: DashboardLayout,
  name: "Category",
  children: [
    {
      path: "/categories/create",
      name: "NewCategory",
      component: NewCategory,
      meta: {
        groupName: "Categories",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "category-create",
      },
    },
    {
      path: "/categories/update/:id",
      name: "EditCategory",
      component: EditCategory,
      meta: {
        groupName: "Categories",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "category-update",
      },
    },
    {
      path: "/categories",
      name: "CategoryPage",
      component: CategoryPage,
      meta: {
        groupName: "Categories",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "category-index",
      },
    },
  ],
};

let SquaresPage = {
  path: "/",
  component: DashboardLayout,
  name: "Square",
  children: [
    {
      path: "/squares/create",
      name: "NewSquare",
      component: NewSquare,
      meta: {
        groupName: "Square",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "square-create",
      },
    },
    {
      path: "/squares/update/:id",
      name: "EditSquare",
      component: EditSquare,
      meta: {
        groupName: "Square",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "square-update",
      },
    },
    {
      path: "/squares",
      name: "SquarePage",
      component: SquarePage,
      meta: {
        groupName: "Square",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "square-index",
      },
    },
  ],
};

let CitiesPage = {
  path: "/",
  component: DashboardLayout,
  name: "City",
  children: [
    {
      path: "/city/create",
      name: "NewCity",
      component: NewCity,
      meta: {
        groupName: "City",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "city-create",
      },
    },
    {
      path: "/city/update/:id",
      name: "EditCity",
      component: EditCity,
      meta: {
        groupName: "City",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "city-update",
      },
    },
    {
      path: "/city",
      name: "CityPage",
      component: CityPage,
      meta: {
        groupName: "City",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "city-index",
      },
    },
  ],
};

let AssignsPage = {
  path: "/",
  component: DashboardLayout,
  name: "Assign",
  children: [
    {
      path: "/assign/create",
      name: "NewAssign",
      component: NewAssign,
      meta: {
        groupName: "Assign",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "assign-create",
      },
    },
    {
      path: "/assign/update/:id",
      name: "EditAssign",
      component: EditAssign,
      meta: {
        groupName: "Assign",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "assign-update",
      },
    },
    {
      path: "/assign/re-customization/:id",
      name: "ReAssign",
      component: ReAssign,
      meta: {
        groupName: "Assign",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "assign-re-customization",
      },
    },
    {
      path: "/assign",
      name: "AssignPage",
      component: AssignPage,
      meta: {
        groupName: "Assign",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "assign-index",
      },
    },
  ],
};

let TypesPage = {
  path: "/",
  component: DashboardLayout,
  name: "Type",
  children: [
    {
      path: "/type/update/:id",
      name: "EditType",
      component: EditType,
      meta: {
        groupName: "Type",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "type-update",
      },
    },
    {
      path: "/type",
      name: "TypePage",
      component: TypePage,
      meta: {
        groupName: "Type",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "type-index",
      },
    },
  ],
};

let AppointmentsPage = {
  path: "/",
  component: DashboardLayout,
  name: "Appointment",
  children: [
    {
      path: "/appointments/create",
      name: "NewAppointment",
      component: NewAppointment,
      meta: {
        groupName: "Appointment",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "appointment-creat-index",
      },
    },
    {
      path: "/appointments",
      name: "AppointmentPage",
      component: AppointmentPage,
      meta: {
        groupName: "Appointment",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "appointment-index",
      },
    },
    // {
    //     path: "/appointment/contract/:id",
    //     name: "AppointmentContractPage",
    //     component: AppointmentContractPage,
    //     meta: {
    //         groupName: "Appointment",
    //         middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
    //         permissions: 'appointment-contract-view',
    //     },
    // },
  ],
};

/************** Start Routes ***********************/
let Report = {
  path: "/",
  component: DashboardLayout,
  name: "Report-Page",
  children: [{
    path: "/logs",
    name: "Logs",
    component: () =>
      import("@/views/Report/Logs.vue"),
    meta: {
      groupName: "Report",
      middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
      permissions: 'report-log',
    },
  },

  ],
};
let Login = {
  path: "/login",
  component: AuthCoverLayout,
  name: "Login-Page",
  children: [
    {
      path: "/login",
      name: "Login",
      component: LogIn,
      meta: {
        middlewares: [Middleware.gust],
      },
    },
    {
      path: "/reset_password",
      name: "Email",
      component: Email,
      meta: {
        middlewares: [Middleware.gust],
      },
    },
    {
      path: "/reset",
      name: "ResetPassword",
      component: ResetPassword,
      meta: {
        middlewares: [Middleware.gust],
      },
    },
  ],
};

let SignUp = {
  path: "/register",
  component: AuthCoverLayout,
  name: "Signup-Page",
  children: [
    {
      path: "/register",
      name: "Signup",
      component: Signup,
      meta: {
        middlewares: [Middleware.gust],
      },
    },
  ],
};
let EmployeePage = {
  path: "/",
  component: DashboardLayout,
  name: "Employee-Page",
  children: [
    {
      path: "/employees",
      name: "EmployeePage",
      component: () => import("@/views/Employees/index.vue"),
      meta: {
        groupName: "employees",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "index-employee",
      },
    },
    {
      path: "/employees/create",
      name: "CreateEmployee",
      component: () => import("@/views/Employees/create_emp.vue"),
      meta: {
        groupName: "employees",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "add-employee",
      },
    },
  ],
};
let Admins = {
  path: "/",
  component: DashboardLayout,
  name: "Admins-Page",
  children: [
    {
      path: "/users",
      name: "Admins",
      component: () => import("@/views/Users/index.vue"),
      meta: {
        groupName: "users",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "user-index",
      },
    },
    {
      path: "/users/create",
      name: "CreateUser",
      component: () => import("@/views/Users/create.vue"),
      meta: {
        groupName: "users",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "user-create",
      },
    },
    {
      path: "/users/update/:id",
      name: "UpdateUser",
      component: () => import("@/views/Users/update.vue"),
      meta: {
        groupName: "users",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "user-update",
      },
    },
    {
      path: "/users/view/:id",
      name: "ViewUser",
      component: () => import("@/views/Users/view.vue"),
      meta: {
        groupName: "users",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "user-view",
      },
    },
    {
      path: "/users/request",
      name: "userRequest",
      component: OrderPage,
      meta: {
        groupName: "users",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "user-request",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/profile.vue"),
      meta: {
        groupName: "users",
        middlewares: [Middleware.auth, Middleware.permission],
      },
    },
  ],
};

let Roles = {
  path: "/",
  component: DashboardLayout,
  name: "Roles-Page",
  children: [
    {
      path: "/roles",
      name: "Roles",
      component: () => import("@/views/Roles/index.vue"),
      meta: {
        groupName: "roles",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "role-index",
      },
    },
    {
      path: "/roles/create",
      name: "Create role",
      component: () => import("@/views/Roles/create.vue"),
      meta: {
        groupName: "roles",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "role-create",
      },
    },
    {
      path: "/roles/:id",
      name: "Update role",
      component: () => import("@/views/Roles/update.vue"),
      meta: {
        groupName: "roles",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "role-update",
      },
    },
  ],
};

let Permissions = {
  path: "/",
  component: DashboardLayout,
  name: "Permissions-Page",
  children: [
    {
      path: "/permissions",
      name: "Permissions",
      component: () => import("@/views/Permissions/index.vue"),
      meta: {
        groupName: "permissions",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
      },
    },
    {
      path: "/permissions/create",
      name: "Create permission",
      component: () => import("@/views/Permissions/create.vue"),
      meta: {
        groupName: "permissions",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
      },
    },
    {
      path: "/permissions/:id",
      name: "Update permission",
      component: () => import("@/views/Permissions/update.vue"),
      meta: {
        groupName: "permissions",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
      },
    },
  ],
};
let PageError = {
  path: "/error",
  component: AuthCoverLayout,
  name: "Errors",
  children: [
    {
      path: "/403",
      name: "403",
      component: () => import("@/views/Error/403.vue"),
    },
    // {
    //     path: "/404",
    //     name: "404",
    //     component: () =>
    //         import("@/views/Error/403.vue"),
    // },
  ],
};

// GIS
let GISPage = {
  path: "/",
  component: DashboardLayout,
  name: "GIS",
  children: [
    {
      path: "/locations/create",
      name: "NewLocation",
      component: () => import("@/views/Location/New.vue"),
      meta: {
        groupName: "Location",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "location-create",
      },
    },
    {
      path: "/locations/update/:id",
      name: "EditLocation",
      component: () => import("@/views/Location/Edit.vue"),
      meta: {
        groupName: "Location",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "location-update",
      },
    },
    {
      path: "/locations",
      name: "LocationPage",
      component: () => import("@/views/Location/Show.vue"),
      meta: {
        groupName: "Location",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "location-index",
      },
    },

    // kitchens

    {
      path: "/kitchens/create",
      name: "NewKitchen",
      component: () => import("@/views/Kitchen/New.vue"),
      meta: {
        groupName: "Kitchen",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "kitchen-create",
      },
    },
    {
      path: "/kitchens/update/:id",
      name: "EditKitchen",
      component: () => import("@/views/Kitchen/Edit.vue"),
      meta: {
        groupName: "Kitchen",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "kitchen-update",
      },
    },
    {
      path: "/kitchens",
      name: "KitchenPage",
      component: () => import("@/views/Kitchen/Show.vue"),
      meta: {
        groupName: "Kitchen",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "kitchen-index",
      },
    },
    // tent
    {
      path: "/tents/create",
      name: "NewTent",
      component: () => import("@/views/Tent/New.vue"),
      meta: {
        groupName: "Tent",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "tent-create",
      },
    },
    {
      path: "/tents/update/:id",
      name: "EditTent",
      component: () => import("@/views/Tent/Edit.vue"),
      meta: {
        groupName: "Tent",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "tent-update",
      },
    },
    {
      path: "/tents",
      name: "TentPage",
      component: () => import("@/views/Tent/Show.vue"),
      meta: {
        groupName: "Tent",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "tent-index",
      },
    },

    // container
    {
      path: "/containers/create",
      name: "NewContainer",
      component: () => import("@/views/Container/New.vue"),
      meta: {
        groupName: "Container",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "container-create",
      },
    },
    {
      path: "/containers/update/:id",
      name: "EditContainer",
      component: () => import("@/views/Container/Edit.vue"),
      meta: {
        groupName: "Container",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "container-update",
      },
    },
    {
      path: "/containers",
      name: "ContainerPage",
      component: () => import("@/views/Container/Show.vue"),
      meta: {
        groupName: "Container",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "container-index",
      },
    },

    // zone
    {
      path: "/zones",
      name: "ZonePage",
      component: () => import("@/views/Zone/Show.vue"),
      meta: {
        groupName: "Zone",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "zone-index",
      },
    },

    // plot
    {
      path: "/plots/create",
      name: "NewPlot",
      component: () => import("@/views/Plot/New.vue"),
      meta: {
        groupName: "Plot",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "plot-create",
      },
    },
    {
      path: "/plots/update/:id",
      name: "EditPlot",
      component: () => import("@/views/Plot/Edit.vue"),
      meta: {
        groupName: "Plot",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "plot-update",
      },
    },
    {
      path: "/plots",
      name: "PlotPage",
      component: () => import("@/views/Plot/Show.vue"),
      meta: {
        groupName: "Plot",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "plot-index",
      },
    },

    // establishments
    {
      path: "/establishments/create",
      name: "NewEstablishments",
      component: () => import("@/views/Establishment/New.vue"),
      meta: {
        groupName: "Establishment",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "establishments-create",
      },
    },
    {
      path: "/establishments/update/:id",
      name: "EditEstablishments",
      component: () => import("@/views/Establishment/Edit.vue"),
      meta: {
        groupName: "Establishment",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "establishments-update",
      },
    },
    {
      path: "/establishments",
      name: "EstablishmentsPage",
      component: () => import("@/views/Establishment/Show.vue"),
      meta: {
        groupName: "Establishment",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "establishments-index",
      },
    },

    // water-tape
    {
      path: "/water-tapes/create",
      name: "NewWaterTape",
      component: () => import("@/views/waterTape/New.vue"),
      meta: {
        groupName: "waterTape",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "water-tape-create",
      },
    },
    {
      path: "/water-tapes/update/:id",
      name: "EditWaterTape",
      component: () => import("@/views/waterTape/Edit.vue"),
      meta: {
        groupName: "waterTape",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "water-tape-update",
      },
    },
    {
      path: "/water-tapes",
      name: "WaterTapePage",
      component: () => import("@/views/waterTape/Show.vue"),
      meta: {
        groupName: "waterTape",
        middlewares: [
          Middleware.auth,
          Middleware.permission,
          Middleware.signeture,
        ],
        permissions: "water-tape-index",
      },
    },
    // washroom
    {
      path: "/washrooms/create",
      name: "NewWashroom",
      component: () =>
        import("@/views/Washroom/New.vue"),
      meta: {
        groupName: "Washroom",
        middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
        permissions: 'gis-washroom-create',
      },
    },
    {
      path: "/washrooms/update/:id",
      name: "EditWashroom",
      component: () =>
        import("@/views/Washroom/Edit.vue"),
      meta: {
        groupName: "Washroom",
        middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
        permissions: 'gis-washroom-update',
      },
    },
    {
      path: "/washrooms",
      name: "WashroomPage",
      component: () =>
        import("@/views/Washroom/Show.vue"),
      meta: {
        groupName: "Washroom",
        middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
        permissions: 'gis-washroom-index',
      },
    },

    // electrical-meter
    {
      path: "/electrical-meters/create",
      name: "NewElectricalMeters",
      component: () =>
        import("@/views/ElectricalMeter/New.vue"),
      meta: {
        groupName: "ElectricalMeters",
        middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
        permissions: 'gis-electrical-meter-create',
      },
    },
    {
      path: "/electrical-meters/update/:id",
      name: "EditElectricalMeters",
      component: () =>
        import("@/views/ElectricalMeter/Edit.vue"),
      meta: {
        groupName: "ElectricalMeters",
        middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
        permissions: 'gis-electrical-meter-update',
      },
    },
    {
      path: "/electrical-meters",
      name: "ElectricalMetersPage",
      component: () =>
        import("@/views/ElectricalMeter/Show.vue"),
      meta: {
        groupName: "ElectricalMeters",
        middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
        permissions: 'gis-electrical-meter-index',
      },
    },
  ],
};

/************** End Routes ***********************/
const routes = [
  {
    path: "/",
    name: "Dashboard",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "Default",
        component: Dashboard,
        meta: {
          groupName: "Dashboards",
          middlewares: [
            Middleware.auth,
            Middleware.permission,
            Middleware.signeture,
          ],
          permissions: "",
        },
      },
      {
        path: "/pages/dashboards/automotive",
        name: "Automotive",
        component: Automotive,
        meta: {
          groupName: "Dashboards",
        },
      },
      {
        path: "/pages/dashboards/smart-home",
        name: "SmartHome",
        component: SmartHome,
        meta: {
          groupName: "Dashboards",
        },
      },
      {
        path: "/pages/dashboards/crm",
        name: "Crm",
        component: Crm,
        meta: {
          groupName: "Components",
        },
      },
      {
        path: "/pages/pages/rtl",
        name: "RTL",
        component: Rtl,
        meta: {
          groupName: "Components",
        },
      },
      {
        path: "/pages/pages/charts",
        name: "Charts",
        component: Charts,
        meta: {
          groupName: "Components",
        },
      },
      {
        path: "/pages/pages/alerts",
        name: "Alerts",
        component: Alerts,
        meta: {
          groupName: "Components",
        },
      },
      {
        path: "/pages/pages/notifications",
        name: "Notifications",
        component: Notifications,
        meta: {
          groupName: "Components",
        },
      },
      {
        path: "getting-started",
        name: "Getting Started",
        component: GettingStarted,
        meta: {
          groupName: "Components",
        },
      },
      {
        path: "/pages/ecommerce/products/edit-product",
        name: "EditProduct",
        component: EditProduct,
        meta: {
          groupName: "Ecommerce",
        },
      },
      {
        path: "/pages/ecommerce/products/product-page",
        name: "ProductPage",
        component: ProductPage,
        meta: {
          groupName: "Ecommerce",
        },
      },
      {
        path: "/pages/ecommerce/orders/list",
        name: "OrderList",
        component: OrderList,
        meta: {
          groupName: "Ecommerce",
        },
      },
      {
        path: "/pages/ecommerce/orders/details",
        name: "OrderDetails",
        component: OrderDetails,
        meta: {
          groupName: "Ecommerce",
        },
      },
      // {
      //     path: "/form",
      //     name: "Form",
      //     component: () =>
      //         import("@/views/Users/form.vue"),
      //     meta: {
      //         groupName: "Form",
      //         middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
      //         permissions: 'form-index',
      //     },
      // },
    ],
  },
  pricingPage,
  profilePages,
  applicationPages,
  ecommercePages,
  userPages,
  accountPages,
  projectsPages,
  vrPages,
  authBasicPages,
  authCoverPages,
  authIllustrationPages,
  Login,
  RegisterFormPages,
  SignUp,
  OrdersPage,
  campsPage,
  SquaresPage,
  CitiesPage,
  questionsPage,
  questionCategoryPage,
  AnswerFromPage,
  TamplateFormPage,
  categoriesPage,
  SignaturesPage,
  AppointmentsPage,
  EmployeePage,
  AssignsPage,
  TypesPage,
  FilePage,
  Admins,
  PageError,
  Roles,
  GISPage,
  Permissions,
  Report,
  {
    path: "*",
    component: AuthCoverLayout,
    name: "Error",
    redirect: "/404",
    children: [
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/Error/404.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
