import { MdMarkEmailRead, MdOutlineDriveFileRenameOutline } from "react-icons/md"
import { lang } from "../../settings/constants/arlang"
import fileValidation from "../../tools/validations/fileValidation"
import * as Yup from 'yup'
import { FaSquarePhoneFlip } from "react-icons/fa6"
import { validatePhone } from "../../tools/validations/validatePhone"
import { makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"
import governments from "../../settings/constants/governments"
import { RiGovernmentFill } from "react-icons/ri"
import { user_roles } from "../../settings/constants/roles"
import { TbPasswordUser } from "react-icons/tb"
import MakeForm from "../../tools/makeform/MakeForm"



function TeacherForm({ status, onSubmit, teacher, filters = '' }) {
    const inputs = [
        {
            name: 'avatar',
            label: 'صوره المدرس',
            type: 'file',
            validation: fileValidation,
            width: '40%'
        }, {
            name: 'hasBg',
            label: 'هل لدي الصوره خلفيه ؟',
            type: 'switch',
            value: false,
            width: '40%'
        }, {
            name: 'name',
            label: lang.NAME,
            width: { xs: '100%', md: '49%' },
            icon: <MdOutlineDriveFileRenameOutline color='orange' />,
            validation: Yup.string().required(lang.REQUERIED)
                .matches(/^\s*(\S+\s+){2}\S+\s*$/, "يجب ان يكون 3 كلمات"),
        }, {
            name: 'description',
            label: 'وصف المدرس',
            width: { xs: '100%', md: '49%' },
            rows: 4, variant: 'filled',
            icon: <MdOutlineDriveFileRenameOutline color='orange' />,
        }, {
            name: 'userName',
            label: lang.USERNAME,
            width: { xs: '100%', md: '49%' },
            icon: <MdOutlineDriveFileRenameOutline color='orange' />,
            validation: Yup.string()
                .required(lang.REQUERIED)
                .matches(/^[a-z0-9@.]+$/, "Only lowercase letters, numbers, '@', and '.' are allowed")
                .min(6, 'يجب ان يكون على الاقل 6 حروف')
                .max(100, 'يجب ان يكون اقل من 100 حرف'),
        }, {
            name: 'email',
            label: lang.EMAIL,
            width: { xs: '100%', md: '49%' },
            type: 'email',
            icon: <MdMarkEmailRead color='orange' />,
            validation: Yup.string().required(lang.REQUERIED).email('يجب ادخال ايميل صالح')
        }, {
            name: 'phone',
            label: lang.PHONE,
            width: { xs: '100%', md: '49%' },
            icon: <FaSquarePhoneFlip color='orange' />,
            validation: validatePhone

        }, {
            name: 'isHome',
            label: 'إظهار المعلم للطلاب',
            type: 'switch',
            value: true,
            width: { xs: '100%', md: '49%' },
        }, {
            name: 'government',
            label: lang.GOVERNMENT,
            type: 'select',
            options: makeArrWithValueAndLabel(governments, { value: 'region_id', label: 'name_ar' }),
            icon: <RiGovernmentFill color='orange' />,
            value: 1,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'role',
            label: lang.ROLE,
            value: user_roles.TEACHER,
            disabled: true
        }, {
            name: 'password',
            label: lang.PASSWORD,
            icon: <TbPasswordUser color='orange' />,
            validation: Yup.string().required("مطلوب").min(6, "يجب ان يكون اكثر من 6")

        }, {
            name: 'confirmPassword',
            label: lang.CONFIRM_PASSWORD,
            icon: <TbPasswordUser color='orange' />,
            validation: Yup.string().required("مطلوب")
                .min(6, "يجب ان يكون اكثر من 6").oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقه')
        },
    ]

    return (
        <MakeForm inputs={inputs.filter(i => !filters.includes(i.name))} status={status} onSubmit={onSubmit} preValue={teacher} />
    )
}

export default TeacherForm
