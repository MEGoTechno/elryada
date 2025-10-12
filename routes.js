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
import { SiHashicorp } from "react-icons/si";
import { FcPrivacy } from "react-icons/fc";
import { RiEditCircleFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { CiBank } from "react-icons/ci";
import { MdQuestionAnswer } from "react-icons/md";
import { PiQuestionFill } from "react-icons/pi";
import { TbWorldQuestion } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { PiInvoiceBold } from "react-icons/pi";
import { VscFeedback } from "react-icons/vsc";
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
import Permissions from "../components/permissions/Permissions.jsx";
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
import GetGroupsPage from "../pages/admin/GetGroupsPage.jsx";
import ReportsPage from "../pages/admin/ReportsPage.jsx";
import InvoicesPage from "../pages/admin/InvoicesPage.jsx";
import GetCouponsPage from "../pages/admin/GetCouponsPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import NotFoundPage from "../pages/errors/NotFoundPage.jsx";
import TestPage from "../pages/test/TestPage.js";
const GetQuestionsPage = lazy(() => import("../pages/admin/GetQuestionsPage"))

const AttemptPage = lazy(() => import("../pages/user/AttemptPage"))
const AttemptsPage = lazy(() => import("../pages/admin/AttemptsPage"))

const GetCodesPage = lazy(() => import("../pages/admin/GetCodesPage"))
const CreateCodePage = lazy(() => import("../pages/admin/CreateCodePage"))

const UnitsPage = lazy(() => import("../pages/user/UnitsPage"))
const CoursePage = lazy(() => import("../pages/user/CoursePage"))
const LecturePage = lazy(() => import("../pages/user/LecturePage"))

const LectureIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 17a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9.46c.35.61.54 1.3.54 2h10v11h-9v2m4-10v2H9v13H7v-6H5v6H3v-8H1.5V9a2 2 0 0 1 2-2zM8 4a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2a2 2 0 0 1 2 2" /></svg>
}

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
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE], isDisabled: false, info: { title: 'جديد', i: 2 },
        element: <QuestionsBankPage />
    }, {
        name: "ايجاباتك", icon: <MdQuestionAnswer size="22px" />, to: "/answers",
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE], isDisabled: false, info: { title: 'جديد', i: 1 },
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
        name: "إدارة المستخدمين", icon: <FaUsersCog size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "تسجيلات الدخول", icon: <IoLogInSharp size="22px" />,
        to: "/management/sessions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        permissions: [''], element: <GetSessionsPage />, id: 'sessions'
    }, {
        name: "اداره الصلاحيات", icon: <FaUsers size="22px" />, to: "/management/users/permissions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        Component: () => <Permissions
            perms={pagesPerms}
            ifNotBtn
            scoped={false} />, id: 'permissions'
    }, {
        name: "عرض المدرسين", icon: <FaUsers size="22px" />, to: "/management/users/teachers", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <TeachersPage />, id: 'teachers'
    }, {
        name: "عرض الطلاب", icon: <FaUsers size="22px" />, to: "/management/users", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetUsersPage />, id: 'users'
    }, {
        name: "البحث عن طالب", icon: <RiUserSettingsFill size="22px" />, to: "/management/users/view", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <FindUserPage />, id: 'findUser'
    }, {
        name: "إدارة المحتوى", icon: <SiGooglecampaignmanager360 size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة الكورسات", icon: <FaSchool size="22px" />, to: "/management/courses", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <ManageCoursesPage />, id: 'coursesManage'
    }, {
        name: "عرض الاشتراكات", icon: <MdOutlineSubscriptions size="22px" />, to: '/statistics/courses', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetSubscriptionsAll />, id: 'subscriptions' //'/management/subscriptions'
    }, {
        name: "إدارة الاسئله", icon: <PiQuestionFill size="22px" />, to: "/management/questions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], isDisabled: false, info: { title: 'جديد', i: 1 },
        element: <GetQuestionsPage />, id: 'questions'
    }, {
        name: "الاختبارات", icon: <MdQuestionAnswer size="22px" />, to: "/management/attempts", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], isDisabled: false, info: { title: 'جديد', i: 1 },
        element: <AttemptsPage />, id: 'attempts'
    }, {
        name: "المحاضرات", icon: <LectureIcon size="22px" />, to: '/management/lectures', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <LecturesPage />, id: 'lectures'
    }, {
        name: "عرض المشاهدات", icon: <MdWatchLater size="22px" />, to: '/statistics/views', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetViewsPage />, id: 'views'
    }, {
        name: "اخري", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الاكواد", icon: <GiSecretBook size="22px" />, to: "/management/codes", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetCodesPage />, id: 'codes'
    }, {
        name: "عرض الكوبونات", icon: <MdOutlineCurrencyPound size="22px" />, to: "/management/coupons", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetCouponsPage />, id: 'coupons'
    }, {
        name: "انشاء كود", icon: <SiHashicorp size="22px" />, to: "/management/codes/create", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <CreateCodePage />, id: 'createCode'
    }, {
        name: "إدارة المجموعات", icon: <MdGroups size="22px" />, to: "/management/groups", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetGroupsPage />, id: 'groups'
    }, {
        name: "إدارة سياسات الموقع", icon: <RiEditCircleFill size="22px" />, to: "/management/privacy", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <ManagePrivacyPage />, id: 'managePrivacy'
    }, {
        name: "تقارير الطلاب", icon: <TbReportSearch size="22px" />, to: "/management/reports", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <ReportsPage />, id: 'stdReports'
    }, {
        name: "المدفوعات", icon: <SignupIcon size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], // info: { title: 'تحت الانشاء', i: 2 }
    }, {
        name: "وسائل الدفع", icon: <RiSecurePaymentFill size="22px" />, to: "/management/payments", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], isDisabled: false, info: { title: "جديد", i: 1 },
        element: <PaymentsPage />, id: 'payments'
    }, {
        name: "الفواتير", icon: <PiInvoiceBold size="22px" />, to: "/management/invoices", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], isDisabled: false, info: { title: "جديد", i: 1 },
        element: <InvoicesPage />, id: 'invoices'
    }, {
        name: 'المحفظه و المدفوعات', icon: <PiInvoiceBold size="22px" />, to: "/payments", allowedTo: [user_roles.ONLINE, user_roles.STUDENT],
        element: <PaymentsPage />
    }, {
        name: "اقتراح/شكوي", icon: <VscFeedback size="22px" />, to: "/feedBacks", allowedTo: [user_roles.ONLINE, user_roles.STUDENT], info: { title: "جديد", i: 1 },
        element: <FeedBacks />
    }, {
        name: "اقتراحات/شكاوي", icon: <VscFeedback size="22px" />, to: "/management/feedBacks", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], info: { title: "جديد", i: 1 },
        element: <FeedBacks isAdmin={true} />, id: 'feedBacks'
    },
]

export const pagesPerms = sidebarLinks.filter(l => l.id).map(l => ({ id: l.id, label: l.name }))

const otherLinks = [
    {
        index: true, element: <HomePage />,

    }, {
        path: '/grades/:gradeId', element: <UnitsPage />
    }, {// Edit Path here 
        path: '/grades/:gradeId/courses/:courseId', element: <CoursePage />, children: [
            {
                path: '/grades/:gradeId/courses/:courseId/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
                    <LecturePage />
                </ProtectedRoute>
            }
        ]
    }, {
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
        path: '/statistics/courses/:courseId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetSubscriptionsCourse />
        </ProtectedRoute>
    }, {
        path: '/statistics/courses/:courseId/views/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetViewsPage />
        </ProtectedRoute>
    }, {
        path: '/management/courses/:courseId/exams/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <ExamCreatePage />
        </ProtectedRoute>
    }, {
        path: '/management/courses/:courseId/exams/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
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

    const element = (link.allowedTo && !link.skipVerifyRoute) ? <ProtectedRoute allowedTo={link.anyUser ? [] : link.allowedTo} >
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










/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoJgNARCB0DscUgVhAZgGwE4moBxNxCQAZViAWC9c1ETARnvTSXM11XPr0vVsQgBDAE6JiYYPTBSZ0sMQC6kWAGN06JJlgQFQA==
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autosave,
	Essentials,
	Paragraph,
	ImageUtils,
	ImageEditing,
	List,
	TodoList,
	Fullscreen,
	Autoformat,
	TextTransformation,
	Mention,
	MediaEmbed,
	Markdown,
	PasteFromMarkdownExperimental,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Code,
	Subscript,
	Superscript,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	RemoveFormat,
	Highlight,
	Heading,
	Link,
	AutoLink,
	BlockQuote,
	HorizontalLine,
	CodeBlock,
	Indent,
	IndentBlock,
	Alignment,
	ImageInline,
	ImageToolbar,
	ImageBlock,
	ImageUpload,
	CKBox,
	CloudServices,
	ImageInsert,
	ImageInsertViaUrl,
	AutoImage,
	PictureEditing,
	ImageStyle,
	LinkImage,
	ImageCaption,
	ImageTextAlternative,
	Table,
	TableToolbar,
	PlainTableOutput,
	TableCaption,
	ShowBlocks,
	GeneralHtmlSupport,
	TextPartLanguage,
	Title,
	BalloonToolbar,
	BlockToolbar
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ar.js';

import 'ckeditor5/ckeditor5.css';

import './App.css';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjE0MzY3OTksImp0aSI6ImUyNDkyMzdhLWUwYjEtNDVjMS1iZjY0LWJhMjQ4MWJmZDQyMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjY2MzZlMzQwIn0.uZjla_56We22LTr1wGOBQ1dK4JUm7TiK_AmBvMlmfhdZxRDsSv-NR6MiNnY0n6J-vIC_9-giot4Vvaq-vSzIgQ';

const CLOUD_SERVICES_TOKEN_URL =
	'https://wh3foockbj4k.cke-cs.com/token/dev/92ffcdb092e71303de80e394b884d42fc3c7d9f2541362925fe3b4e04095?limit=10';

export default function App() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}

		return {
			editorConfig: {
				toolbar: {
					items: [
						'undo',
						'redo',
						'|',
						'showBlocks',
						'|',
						'heading',
						'|',
						'fontSize',
						'fontFamily',
						'fontColor',
						'fontBackgroundColor',
						'|',
						'bold',
						'italic',
						'underline',
						'|',
						'link',
						'insertImage',
						'insertTable',
						'highlight',
						'blockQuote',
						'codeBlock',
						'|',
						'alignment',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Alignment,
					Autoformat,
					AutoImage,
					AutoLink,
					Autosave,
					BalloonToolbar,
					BlockQuote,
					BlockToolbar,
					Bold,
					CKBox,
					CloudServices,
					Code,
					CodeBlock,
					Essentials,
					FontBackgroundColor,
					FontColor,
					FontFamily,
					FontSize,
					Fullscreen,
					GeneralHtmlSupport,
					Heading,
					Highlight,
					HorizontalLine,
					ImageBlock,
					ImageCaption,
					ImageEditing,
					ImageInline,
					ImageInsert,
					ImageInsertViaUrl,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					ImageUtils,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					Markdown,
					MediaEmbed,
					Mention,
					Paragraph,
					PasteFromMarkdownExperimental,
					PictureEditing,
					PlainTableOutput,
					RemoveFormat,
					ShowBlocks,
					Strikethrough,
					Subscript,
					Superscript,
					Table,
					TableCaption,
					TableToolbar,
					TextPartLanguage,
					TextTransformation,
					Title,
					TodoList,
					Underline
				],
				balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
				blockToolbar: [
					'fontSize',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'|',
					'link',
					'insertImage',
					'insertTable',
					'|',
					'bulletedList',
					'numberedList',
					'outdent',
					'indent'
				],
				cloudServices: {
					tokenUrl: CLOUD_SERVICES_TOKEN_URL
				},
				fontFamily: {
					supportAllValues: true
				},
				fontSize: {
					options: [10, 12, 14, 'default', 18, 20, 22],
					supportAllValues: true
				},
				fullscreen: {
					onEnterCallback: container =>
						container.classList.add(
							'editor-container',
							'editor-container_classic-editor',
							'editor-container_include-block-toolbar',
							'editor-container_include-fullscreen',
							'main-container'
						)
				},
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				htmlSupport: {
					allow: [
						{
							name: /^.*$/,
							styles: true,
							attributes: true,
							classes: true
						}
					]
				},
				image: {
					toolbar: ['toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText']
				},
				initialData:
					'<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n\t<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>\n\t<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n\t<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n\t<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n\t<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser\'s\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n',
				language: 'ar',
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				mention: {
					feeds: [
						{
							marker: '@',
							feed: [
								/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
							]
						}
					]
				},
				menuBar: {
					isVisible: true
				},
				placeholder: 'Type or paste your content here!',
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
				},
				translations: [translations]
			}
		};
	}, [isLayoutReady]);

	useEffect(() => {
		if (editorConfig) {
			configUpdateAlert(editorConfig);
		}
	}, [editorConfig]);

	return (
		<div className="main-container">
			<div
				className="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-fullscreen"
				ref={editorContainerRef}
			>
				<div className="editor-container__editor">
					<div ref={editorRef}>{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} />}</div>
				</div>
			</div>
		</div>
	);
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config) {
	if (configUpdateAlert.configUpdateAlertShown) {
		return;
	}

	const isModifiedByUser = (currentValue, forbiddenValue) => {
		if (currentValue === forbiddenValue) {
			return false;
		}

		if (currentValue === undefined) {
			return false;
		}

		return true;
	};

	const valuesToUpdate = [];

	configUpdateAlert.configUpdateAlertShown = true;

	if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
		valuesToUpdate.push('LICENSE_KEY');
	}

	if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>')) {
		valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
	}

	if (valuesToUpdate.length) {
		window.alert(
			[
				'Please update the following values in your editor config',
				'to receive full access to Premium Features:',
				'',
				...valuesToUpdate.map(value => ` - ${value}`)
			].join('\n')
		);
	}
}
