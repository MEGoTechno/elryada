import usePostData from "../../hooks/usePostData"
import Section from "../../style/mui/styled/Section"
import { useUpdateUserMutation } from "../../toolkit/apis/usersApi"
import TitleWithDividers from "../ui/TitleWithDividers"
import TeacherForm from "./TeacherForm"

function TeacherUpdate({ setReset, row }) {
    const [sendData, status] = useUpdateUserMutation()
    const [updateUser] = usePostData(sendData, null, setReset)

    const onSubmit = async (values) => {
        await updateUser({ ...values, _id: row._id, id: row._id }, true)
    }

    return (
        <Section>
            <TitleWithDividers title={'بيانات المعلم : ' + row.name} />
            <TeacherForm onSubmit={onSubmit} status={status} teacher={row} filters='password confirmPassword' />
        </Section>
    )
}

export default TeacherUpdate
