// import { FaHome } from "react-icons/fa";
import { LoginIcon, SignupIcon } from "../components/header/Icons";
import { user_roles } from "./constants/roles";
import { store } from "../toolkit/store";

import { IoLogInSharp } from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { FaSchool } from "react-icons/fa";
import { LiaSchoolSolid } from "react-icons/lia";
import { CiBarcode } from "react-icons/ci";
import { MdOutlineCurrencyPound, MdOutlineSubscriptions } from "react-icons/md";
import { GiSecretBook } from "react-icons/gi";
import { FcPrivacy } from "react-icons/fc";
import { RiEditCircleFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
// import { MdGroups } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { CiBank } from "react-icons/ci";
import { MdQuestionAnswer } from "react-icons/md";
import { PiQuestionFill } from "react-icons/pi";
import { TbWorldQuestion } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { PiInvoiceBold } from "react-icons/pi";
import { VscFeedback } from "react-icons/vsc";
import { IoSchoolSharp } from "react-icons/io5";
import { GrInsecure } from "react-icons/gr";
import { GiTeacher } from "react-icons/gi";



import { lazy } from "react";
import UserProfilePage from '../pages/user/UserProfilePage'

const HomePage = lazy(() => import("../pages/HomePage"))

const ExamStartPage = lazy(() => import("../pages/user/ExamStartPage"))

const LectureCenterPage = lazy(() => import("../pages/user/LectureCenterPage"))

const ManagePrivacyPage = lazy(() => import("../pages/admin/ManagePrivacyPage"))
const PrivacyPage = lazy(() => import("../pages/user/PrivacyPage"))

const PaymentsPage = lazy(() => import("../pages/user/PaymentsPage"))
const FeedBacks = lazy(() => import("../pages/user/FeedBacks"))
const RechargeCodePage = lazy(() => import("../pages/user/RechargeCodePage"))
const SignupPage = lazy(() => import("../pages/user/SignupPage"))
const LoginPage = lazy(() => import("../pages/user/LoginPage"))

const GradesPage = lazy(() => import("../pages/user/GradesPage"))

import GetUserAnswers from "../components/exam/GetUserAnswers";
// import { pagesPerms } from "../components/permissions/constants/pages.js";
const GetSessionsPage = lazy(() => import("../pages/admin/GetSessionsPage.jsx"))
const GetUsersPage = lazy(() => import("../pages/admin/GetUsersPage"))
const TeachersPage = lazy(() => import("../pages/admin/TeachersPage"))
const FindUserPage = lazy(() => import("../pages/admin/FindUserPage"))

const ManageCoursesPage = lazy(() => import("../pages/admin/ManageCoursesPage"))
const ExamCreatePage = lazy(() => import("../pages/admin/ExamCreatePage"))
const ExamUpdatePage = lazy(() => import("../pages/admin/ExamUpdatePage"))

const GetSubscriptionsAll = lazy(() => import("../pages/admin/GetSubscriptionsAll"))
const GetSubscriptionsCourse = lazy(() => import("../pages/admin/GetSubscriptionsCourse"))

import QuestionsBankPage from "../pages/user/QuestionsBankPage";
import LecturesPage from "../pages/admin/LecturesPage.jsx";
import GetViewsPage from "../pages/admin/GetViewsPage.jsx";
// import GetGroupsPage from "../pages/admin/GetGroupsPage.jsx";
import ReportsPage from "../pages/admin/ReportsPage.jsx";
import InvoicesPage from "../pages/admin/InvoicesPage.jsx";
import GetCouponsPage from "../pages/admin/GetCouponsPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import NotFoundPage from "../pages/errors/NotFoundPage.jsx";
import TestPage from "../pages/test/TestPage.js";
import PermissionsPage from "../pages/admin/PermissionsPage.jsx";
import { chapterPerms, questionsPerms, tagsPerms } from "../components/permissions/constants/perms.js";
import { coursesPerms } from "../components/permissions/constants/courses.js";
import ManagePaymentsPage from "../pages/admin/ManagePaymentsPage.jsx";
import GradesManage from "../pages/admin/GradesManage.jsx";
import TeacherPage from "../pages/user/TeacherPage.jsx";
import CoursesPage from "../pages/user/CoursesPage.jsx";
const GetQuestionsPage = lazy(() => import("../pages/admin/GetQuestionsPage"))

const AttemptPage = lazy(() => import("../pages/user/AttemptPage"))
const AttemptsPage = lazy(() => import("../pages/admin/AttemptsPage"))

const GetCodesPage = lazy(() => import("../pages/admin/GetCodesPage"))
// const CreateCodePage = lazy(() => import("../pages/admin/CreateCodePage"))

const UnitsPage = lazy(() => import("../pages/user/UnitsPage"))
const CoursePage = lazy(() => import("../pages/user/CoursePage"))
const LecturePage = lazy(() => import("../pages/user/LecturePage"))

const LectureIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 17a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9.46c.35.61.54 1.3.54 2h10v11h-9v2m4-10v2H9v13H7v-6H5v6H3v-8H1.5V9a2 2 0 0 1 2-2zM8 4a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2a2 2 0 0 1 2 2" /></svg>
}

// {
//     name: "إدارة المجموعات", icon: <MdGroups size="22px" />, to: "/management/groups", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
//     element: <GetGroupsPage />, id: 'p_groups'
// }, 

//Routes - sidebar - permissions
export const sidebarLinks = [
    {
        name: "تسجيل الدخول", icon: <LoginIcon size="22px" />, to: "/login", allowedTo: [user_roles.NOT_USER],
        element: <LoginPage />, skipVerifyRoute: true
    }, {
        name: "انشاء حساب", icon: <SignupIcon size="22px" />, to: "/signup", allowedTo: [user_roles.NOT_USER],
        element: <SignupPage />, skipVerifyRoute: true
    }, {
        name: "سياسات الموقع", icon: <FcPrivacy size="22px" />, to: "/privacy",
        element: <PrivacyPage />
    }, {
        name: "الكورسات", icon: <LiaSchoolSolid size="22px" />,
        to: "/grades", allowedTo: [user_roles.STUDENT, user_roles.ONLINE], element: <GradesPage />
    }, {
        name: "محاضراتى", icon: <FaSchool size="22px" />, to: "/grades/" + store?.getState()?.global?.user?.grade,
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE],
        // element: <UnitsPage /> Down
    }, {
        name: "بنك الاسئله", icon: <CiBank size="22px" />, to: "/questions_bank",
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE], isDisabled: false,
        element: <QuestionsBankPage />
    }, {
        name: "ايجاباتك", icon: <MdQuestionAnswer size="22px" />, to: "/answers",
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE], isDisabled: false,
        element: <GetUserAnswers />
    }, {
        name: "مجتمع الطلاب", icon: <TbWorldQuestion size="22px" />,
        to: "/community5050", allowedTo: [user_roles.STUDENT, user_roles.ONLINE], isDisabled: true, info: { title: 'قريبا', i: 2 },
    }, {
        name: "اداره الحساب", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "حسابى", icon: <SignupIcon size="22px" />, to: "/user/profile",
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE], anyUser: true, //sidebar => user, routes => all
        element: <UserProfilePage />
    }, {
        name: "شحن كود", icon: <CiBarcode size="22px" />, to: "/user/recharge_code", allowedTo: [user_roles.STUDENT, user_roles.ONLINE],
        element: <RechargeCodePage />
    }, {
        name: "إدارة المستخدمين", icon: <FaUsersCog size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER]
    }, {
        name: "تسجيلات الدخول", icon: <IoLogInSharp size="22px" />,
        to: "/management/sessions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        permissions: [''], element: <GetSessionsPage />, id: 'p_sessions'
    }, {
        name: "اداره الصلاحيات", icon: <GrInsecure size="22px" />, to: "/management/users/permissions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <PermissionsPage />, id: 'p_permissions'
    }, {
        name: "عرض المدرسين", icon: <GiTeacher size="22px" />, to: "/management/users/teachers", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <TeachersPage />, id: 'p_teachers'
    }, {
        name: "عرض الطلاب", icon: <FaUsers size="22px" />, to: "/management/users", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <GetUsersPage />, id: 'p_users'
    }, {
        name: "البحث عن طالب", icon: <RiUserSettingsFill size="22px" />, to: "/management/users/view", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <FindUserPage />, id: 'p_findUser'
    }, {
        name: "إدارة المحتوى", icon: <SiGooglecampaignmanager360 size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER]
    }, {
        name: "إدارة الصفوف", icon: <IoSchoolSharp size="22px" />, to: "/management/grades", allowedTo: [user_roles.ADMIN],//user_roles.SUBADMIN, user_roles.TEACHER
        element: <GradesManage />, id: 'p_gradesManage'
    }, {
        name: "إدارة الكورسات", icon: <FaSchool size="22px" />, to: "/management/courses", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <ManageCoursesPage />, id: 'p_coursesManage'
    }, {
        name: "عرض الاشتراكات", icon: <MdOutlineSubscriptions size="22px" />, to: '/statistics/courses', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <GetSubscriptionsAll />, id: 'p_subscriptions', perms: coursesPerms(null, 'subscriptions') //'/management/subscriptions'
    }, {
        name: "إدارة الاسئله", icon: <PiQuestionFill size="22px" />, to: "/management/questions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER], isDisabled: false,
        element: <GetQuestionsPage />, id: 'p_questions',
        perms: [...questionsPerms('manageQuestions'), ...tagsPerms('manageTags')]
    }, {
        name: "احصائيات الاختبارات", icon: <MdQuestionAnswer size="22px" />, to: "/management/attempts", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER], isDisabled: false,
        element: <AttemptsPage />, id: 'p_attempts',
        //  perms: chapterPerms(null, 'lecturesStatistics')
    }, {
        name: "المحاضرات", icon: <LectureIcon size="22px" />, to: '/management/lectures', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <LecturesPage />, id: 'p_lectures', perms: chapterPerms(null, 'lecturesShow')
    }, {
        name: "عرض المشاهدات", icon: <MdWatchLater size="22px" />, to: '/statistics/views', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <GetViewsPage />, id: 'p_views', perms: chapterPerms(null, 'lecturesStatistics')
    }, {
        name: "اخري", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER]
    }, {
        name: "عرض الاكواد", icon: <GiSecretBook size="22px" />, to: "/management/codes", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <GetCodesPage />, id: 'p_codes', perms: chapterPerms(null, 'lecturesCodes')
    }, {
        name: "عرض الكوبونات", icon: <MdOutlineCurrencyPound size="22px" />, to: "/management/coupons", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <GetCouponsPage />, id: 'p_coupons', perms: coursesPerms(null, 'coupons')
    }, {
        name: "إدارة سياسات الموقع", icon: <RiEditCircleFill size="22px" />, to: "/management/privacy", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <ManagePrivacyPage />, id: 'p_managePrivacy'
    }, {
        name: "تقارير الطلاب", icon: <TbReportSearch size="22px" />, to: "/management/reports", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <ReportsPage />, id: 'p_stdReports'
    }, {
        name: "المدفوعات", icon: <SignupIcon size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER], // info: { title: 'تحت الانشاء', i: 2 }
    }, {
        name: "وسائل الدفع", icon: <RiSecurePaymentFill size="22px" />, to: "/management/payments", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER], isDisabled: false,
        element: <ManagePaymentsPage />, id: 'p_payments'
    }, {
        name: "الفواتير", icon: <PiInvoiceBold size="22px" />, to: "/management/invoices", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER], isDisabled: false,
        element: <InvoicesPage />, id: 'p_invoices'
    }, {
        name: 'المحفظه و المدفوعات', icon: <PiInvoiceBold size="22px" />, to: "/payments", allowedTo: [user_roles.ONLINE, user_roles.STUDENT],
        element: <PaymentsPage />
    }, {
        name: "اقتراحات/شكاوي", icon: <VscFeedback size="22px" />, to: "/management/feedBacks", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
        element: <FeedBacks isAdmin={true} />, id: 'p_feedBacks'
    }, {
        name: "اقتراح/شكوي", icon: <VscFeedback size="22px" />, to: "/feedBacks", allowedTo: [user_roles.ONLINE, user_roles.STUDENT],
        element: <FeedBacks />
    },
]
// {
//     name: "انشاء كود", icon: <SiHashicorp size="22px" />, to: "/management/codes/create", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER],
//     element: <CreateCodePage />, id: 'p_createCode'
// }, 
export const pagesPerms = sidebarLinks.filter(l => l.id).map(l => ({ id: l.id, label: l.name, perms: l.perms }))

const otherLinks = [
    {
        index: true, element: <HomePage />,

    }, {
        path: '/grades/:gradeId', element: <UnitsPage />
    }, {
        path: '/teachers/:index', element: <TeacherPage />
    }, {// Edit Path here 
        path: '/grades/:gradeId/courses/:courseId', element: <CoursePage />, children: [
            {
                path: '/grades/:gradeId/courses/:courseId/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
                    <LecturePage />
                </ProtectedRoute>
            }
        ]
    }, {
        path: '/courses', element: <CoursesPage />
    },{
        path: '/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.STUDENT, user_roles.ONLINE]}>
            <LectureCenterPage />
        </ProtectedRoute>
    }, {
        path: '/exams/:examId', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
            <ExamStartPage />
        </ProtectedRoute>
    }, {
        path: '/attempts/:attemptId', element: <ProtectedRoute>
            <AttemptPage />
        </ProtectedRoute>
    }, {
        path: '/statistics/courses/:courseId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER]}>
            <GetSubscriptionsCourse />
        </ProtectedRoute>
    }, {
        path: '/statistics/courses/:courseId/views/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetViewsPage />
        </ProtectedRoute>
    }, {
        path: '/management/courses/:courseId/exams/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER]}>
            <ExamCreatePage />
        </ProtectedRoute>
    }, {
        path: '/management/courses/:courseId/exams/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER]}>
            <ExamUpdatePage />
        </ProtectedRoute>
    }, {
        path: '/test', isDevelop: true, element: <ProtectedRoute>
            <TestPage />
        </ProtectedRoute>
    }, {
        path: '/assets/*', element: <NotFoundPage />
    }, {
        path: '*', element: <NotFoundPage />
    }
]

export const routesLinks = [...sidebarLinks.map(link => {
    if (link.Component) {
        link.element = <link.Component />
    }
    if (!link.element) return null

    const element = (link.allowedTo && !link.skipVerifyRoute) ? <ProtectedRoute allowedTo={link.anyUser ? [] : link.allowedTo} perms={link.perms} permId={link.id ?? null} >
        {link.element}
    </ProtectedRoute> : link.element
    if (!link.to && !link.index && !link.element) return null

    return { path: link.to, element, index: link.index ?? false }
}), ...otherLinks].filter(Boolean)

// {
//     name: "احصائيات الموقع", icon: <SignupIcon size="22px" />, to: "/not_found", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], disabled: true
// }, {
//     name: "جوجل تاجس و فيس بوك", icon: <SignupIcon size="22px" />, to: "/not_found", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], disabled: true
// },
// {
//     name: "مدفوعاتى", icon: <SignupIcon size="22px" />, to: "/user/payments", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
// },




//##Unused Components =>
// <GetAttemptsPage />, '/statistics/courses/:courseId/exams/:lectureId'
// <GetCourseCoupons />, '/management/courses/:courseId/coupons'
