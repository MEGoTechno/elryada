import { IconButton } from "@mui/material"
import { user_roles } from "../../settings/constants/roles"
import TabsAutoStyled from "../../style/mui/styled/TabsAutoStyled"
import Users from "../all/Users"
import BtnConfirm from "../ui/BtnConfirm"
import BtnModal from "../ui/BtnModal"
import usePostData from "../../hooks/usePostData"
import { FaPlus } from "react-icons/fa"
import Permissions from "../permissions/Permissions"
import { chapterPerms } from "../permissions/constants/perms"
import { useAddToUserMutation } from "../../toolkit/apis/usersApi"
import { useState } from "react"
import { useSelector } from "react-redux"

function ChapterTeachers({ chapter, course }) {
    const [reset, setReset] = useState(false)

    const [sendData, status] = useAddToUserMutation()
    const [addTeacher] = usePostData(sendData, null, setReset)
    const user = useSelector(s => s.global.user)

    const tabs = [
        {
            label: 'ايضافه مدرس', component: <Users
                filters={{
                    chapters: '!=' + chapter._id, courses: course,
                    role: [user_roles.TEACHER, user_roles.SUBADMIN], _id: '!=' + user._id
                }}
                allStatuses={[status]} reset={reset}
                addColumns={[{
                    field: 'addTeachers',
                    headerName: 'ايضافه المدرس',
                    type: 'actions',
                    renderCell: (params) => {
                        const teacher = params.row
                        return <BtnConfirm>
                            <IconButton onClick={() => addTeacher({
                                field: 'chapters', value: chapter._id, id: teacher._id, action: 'push'
                            })}>
                                <FaPlus />
                            </IconButton>
                        </BtnConfirm>
                    }
                }]}
            />
        },
        {
            label: 'صلاحيات المدرسين', component: <Permissions
                perms={chapterPerms(chapter._id, null)} reset={reset} allStatuses={[status]}
                filters={{
                    chapters: chapter._id, role: [user_roles.TEACHER, user_roles.SUBADMIN], _id: '!=' + user._id
                }} ifNotBtn
                deleteFc={(id) => addTeacher({
                    field: 'chapters', value: chapter._id, id, action: 'pull'
                })}
            />
        },
    ]

    return (
        <BtnModal btnName={'اداره المعلمين'} color={'warning'} titleInSection={'معلمين الفصل: ' + chapter.name}>
            <TabsAutoStyled originalTabs={tabs} />
        </BtnModal>
    )
}

export default ChapterTeachers
