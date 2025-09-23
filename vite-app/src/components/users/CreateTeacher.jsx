import Section from "../../style/mui/styled/Section"
import BannerIcon from "../ui/BannerIcon"
import { FaChalkboardTeacher } from "react-icons/fa"

import { useCreateUserMutation } from "../../toolkit/apis/usersApi"
import usePostData from "../../hooks/usePostData"
import TeacherForm from "./TeacherForm"


function CreateTeacher({ setReset }) {


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

            <TeacherForm onSubmit={onSubmit} status={status} />
        </Section>
    )
}

export default CreateTeacher
// {
//     name: 'grades',
//     label: lang.GRADE,
//     type: 'select',
//     options: makeArrWithValueAndLabel(grades, { value: '_id', label: 'name' }),
//     icon: <IoSchool color='orange' />,
//     // validation: Yup.string().required(lang.REQUERIED)
// },