import Section from "../../style/mui/styled/Section"
import BannerIcon from "../ui/BannerIcon"
import { FaChalkboardTeacher } from "react-icons/fa"
import { lang } from "../../settings/constants/arlang"
import { MdMarkEmailRead, MdOutlineDriveFileRenameOutline } from "react-icons/md"
import * as Yup from 'yup'
import { FaSquarePhoneFlip } from "react-icons/fa6"
import { makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"

import governments from "../../settings/constants/governments"
import { RiGovernmentFill } from "react-icons/ri"
import { user_roles } from "../../settings/constants/roles"
import { TbPasswordUser } from "react-icons/tb"
import MakeForm from "../../tools/makeform/MakeForm"
import { useCreateUserMutation } from "../../toolkit/apis/usersApi"
import usePostData from "../../hooks/usePostData"
import fileValidation from "../../tools/validations/imageValidation"
function CreateTeacher({ setReset }) {

    const inputs = [
        {
            name: 'avatar',
            label: 'صوره المدرس',
            type: 'file',
            validation: fileValidation
        }, {
            name: 'name',
            label: lang.NAME,
            width: { xs: '100%', md: '49%' },
            icon: <MdOutlineDriveFileRenameOutline color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
                .matches(/^\s*(\S+\s+){2}\S+\s*$/, "يجب ان يكون 3 كلمات"),
        }, {
            name: 'description',
            label: 'وصف المدرس',
            width: { xs: '100%', md: '49%' },
            rows: 4, variant: 'filled',
            icon: <MdOutlineDriveFileRenameOutline color='green' />,
        }, {
            name: 'userName',
            label: lang.USERNAME,
            width: { xs: '100%', md: '49%' },
            icon: <MdOutlineDriveFileRenameOutline color='green' />,
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
            icon: <MdMarkEmailRead color='green' />,
            validation: Yup.string().required(lang.REQUERIED).email('يجب ادخال ايميل صالح')
        }, {
            name: 'phone',
            label: lang.PHONE,
            width: { xs: '100%', md: '49%' },
            icon: <FaSquarePhoneFlip color='green' />,
            validation: Yup.string().required(lang.REQUERIED).matches(/^[0-9]{11}$/, "يجب ان يكون 11 رقم")

        }, {
            name: 'government',
            label: lang.GOVERNMENT,
            type: 'select',
            options: makeArrWithValueAndLabel(governments, { value: 'region_id', label: 'name_ar' }),
            icon: <RiGovernmentFill color='green' />,
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
            icon: <TbPasswordUser color='green' />,
            validation: Yup.string().required("مطلوب").min(6, "يجب ان يكون اكثر من 6")

        }, {
            name: 'confirmPassword',
            label: lang.CONFIRM_PASSWORD,
            icon: <TbPasswordUser color='green' />,
            validation: Yup.string().required("مطلوب")
                .min(6, "يجب ان يكون اكثر من 6").oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقه')
        },
    ]
    const [sendData, status] = useCreateUserMutation()
    const [createUser] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        await createUser(values, true)
        props.resetForm()
        if (setReset) {
            setReset(p => !p)
        }
    }
    return (
        <Section>
            <BannerIcon title={'انشاء مدرس جديد'} icon={<FaChalkboardTeacher style={{
                width: '3rem', height: '3rem', color: '#fff'
            }} />} />

            <MakeForm inputs={inputs} status={status} onSubmit={onSubmit} />
        </Section>
    )
}

export default CreateTeacher
// {
//     name: 'grades',
//     label: lang.GRADE,
//     type: 'select',
//     options: makeArrWithValueAndLabel(grades, { value: '_id', label: 'name' }),
//     icon: <IoSchool color='green' />,
//     // validation: Yup.string().required(lang.REQUERIED)
// },