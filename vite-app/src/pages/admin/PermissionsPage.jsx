import Courses from "../../components/all/Courses"
import AdminCourseTeachers from "../../components/content/AdminCourseTeachers"
import { coursesPerms, unitsPerms } from "../../components/permissions/constants/courses"
import { chapterPerms, questionsPerms, tagsPerms, usersPerms } from "../../components/permissions/constants/perms"
import Permissions from "../../components/permissions/Permissions"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import { pagesPerms } from "../../settings/sidebarLinks"
import Section from "../../style/mui/styled/Section"
import TabsAutoStyled from "../../style/mui/styled/TabsAutoStyled"

function PermissionsPage() {
    //<>users --= courses global + courses scoped </>


    const addedCourseCols = [
        {
            field: 'permissions',
            headerName: 'المستخدمين',
            type: 'actions',
            width: 200,
            renderCell: (params) => {
                const course = params.row
                return <AdminCourseTeachers course={course} />
            }
        }
    ]

    const tabs = [
        {
            label: 'صلاحيات الصفحات', component: <Permissions
                perms={[...pagesPerms, ...usersPerms(null, 'delete')]}
                ifNotBtn
                scoped={false} />, count: pagesPerms.length + 1
        }, {
            label: 'صلاحيات عامه على الكورسات', component: <Permissions
                perms={[...unitsPerms(null, null, { values: true }), ...coursesPerms(null, null, { values: true }), ...chapterPerms(null, null, { values: true })]}
                ifNotBtn
                scoped={false} />
        }, {
            label: 'الكورسات', component: <Courses addColumns={addedCourseCols} /> //
        }, {
            label: 'الأسئلة', component: <Permissions
                perms={[...questionsPerms(null, { values: true }),...tagsPerms(null, { values: true })]}
                ifNotBtn
                scoped={false} /> //
        }]

    return (
        <Section>
            <TitleWithDividers title={'إدارة صلاحيات المنصه للمدرس و المشرفين'} />
            <TabsAutoStyled originalTabs={tabs} searchVal="perms" />
        </Section>
    )
}

export default PermissionsPage

//1- new courses page => subscribers, permissions(users)
//2- in that page => add courses scoped => permissions(users) .
//3- in that page, in permissions per user => permissions(courses)