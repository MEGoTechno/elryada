import { useState } from "react"
import { user_roles } from "../../settings/constants/roles"
import TabsAutoStyled from "../../style/mui/styled/TabsAutoStyled"

import Permissions from "../permissions/Permissions"
import BtnModal from "../ui/BtnModal"
import Users from "../all/Users"
import { IconButton } from "@mui/material"
import { FaPlus } from "react-icons/fa6"
import { useAddToUserMutation } from "../../toolkit/apis/usersApi"
import usePostData from "../../hooks/usePostData"
import BtnConfirm from "../ui/BtnConfirm"
import { coursesPerms } from "../permissions/constants/courses"
import usePermissions from "../permissions/hooks/usePermissions"
import { chapterPerms } from "../permissions/constants/perms"
import TitleWithDividers from "../ui/TitleWithDividers"
import { useSelector } from "react-redux"

function AdminCourseTeachers({ course }) {
    const user = useSelector(s => s.global.user)

    const [reset, setReset] = useState(false)
    const [sendData, status] = useAddToUserMutation()
    const [pushAndPull] = usePostData(sendData, null, setReset)
    const [hasPermission] = usePermissions()

    const canModifyPerms = hasPermission(coursesPerms(course._id, 'permissions'))
    const permissions = [
        hasPermission(coursesPerms(course._id, 'teachers')),
        canModifyPerms || hasPermission(coursesPerms(course._id, 'teachers')) //teacher for remove
    ]

    const tabs = [
        {
            label: 'إضافة مدرس', permId: 0, component: <Users
                filters={{
                    courses: '!=' + course._id, role: [user_roles.TEACHER, user_roles.SUBADMIN], _id: '!=' + user._id
                }}
                allStatuses={[status]} reset={reset}
                addColumns={[{
                    field: 'addToCourse',
                    headerName: 'إضافة المدرس',
                    type: 'actions',
                    renderCell: (params) => {
                        const teacher = params.row
                        return <BtnConfirm>
                            <IconButton onClick={() => pushAndPull({
                                field: 'courses', value: course._id, id: teacher._id, action: 'push'
                            })}>
                                <FaPlus />
                            </IconButton>
                        </BtnConfirm>
                    }
                }]}
            />
        }, {
            label: canModifyPerms ? 'الصلاحيات' : 'ازاله معلمين', permId: 1, component:
                <Permissions isShowPerms={canModifyPerms} allStatuses={[status]} ifNotBtn filters={{
                    role: [user_roles.SUBADMIN, user_roles.TEACHER], courses: course._id, _id: '!=' + user._id
                }}
                    deleteFc={(id) => pushAndPull({
                        field: 'courses', value: course._id, id, action: 'pull'
                    })}
                    perms={{
                        ...coursesPerms(course._id),
                        createChapters: chapterPerms(null, 'create', { courseId: course._id },),
                        lecturesStatistics: chapterPerms(null, 'lecturesStatistics', { courseId: course._id }),
                        lecturesCodes: chapterPerms(null, 'lecturesCodes', { courseId: course._id })
                    }}
                />
        }
    ]


    return (
        <BtnModal btnName={'عرض المدرسين و الصلاحيات'} >
            {course?.name && (
                <TitleWithDividers title={course.name} />
            )}
            <TabsAutoStyled originalTabs={tabs} permissions={permissions} />
        </BtnModal>
    )
}

export default AdminCourseTeachers
