import { Typography, useTheme } from "@mui/material"
import TabInfo from "../../components/ui/TabInfo"
import UserAvatar from "../../components/users/UserAvatar"
import { lang } from "../../settings/constants/arlang"
import governments from "../../settings/constants/governments"
import { user_roles } from "../../settings/constants/roles"
import { makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"
import { getFullDate } from "../../settings/constants/dateConstants"
import FullComponent from "../../tools/datagrid/FullComponent"
import { useDeleteManyUsersMutation, useDeleteUserMutation, useLazyGetUsersQuery, useUpdateUserMutation } from "../../toolkit/apis/usersApi"
import Section from "../../style/mui/styled/Section"
import TitleSection from "../../components/ui/TitleSection"
import BtnModal from "../../components/ui/BtnModal"

import CreateTeacher from "../../components/users/CreateTeacher"
import { useState } from "react"
import UserResetPassword from "../../components/users/UserResetPassword"
import TeacherUpdate from "../../components/users/TeacherUpdate"


function TeachersPage() {
    const [reset, setReset] = useState(false)

    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return (
                    <UserAvatar user={params.row} />
                )
            }
        },
        {
            field: 'name',
            headerName: lang.NAME,
            width: 200,
        }, {
            field: 'description',
            headerName: 'وصف المدرس',
            width: 200,
            editable: true,
        }, {
            field: 'email',
            headerName: lang.EMAIL,
            width: 200,
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150

        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
            renderCell: (params) => {
                return (
                    params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                        : <TabInfo count={lang.NOT_ACTIVE} i={3} />
                )
            }
        }, {
            field: 'phone',
            headerName: lang.PHONE,
            width: 200
        }, {
            field: 'role',
            headerName: lang.ROLE,
            type: 'singleSelect',
            width: 200,
            valueOptions: [user_roles.TEACHER],
            filterable: false,
            sortable: false,
        },
        {
            field: "government",
            headerName: 'المحافظه',
            type: 'singleSelect',
            width: 200,
            editable: true,
            valueOptions: makeArrWithValueAndLabel(governments, { value: 'region_id', label: 'name_ar', isNumber: true }),
            renderCell: (params) => {
                const government = governments.find(({ region_id }) => Number(region_id) === Number(params.row.government))
                return (
                    <Typography>
                        {params.row.role === user_roles.ADMIN ? user_roles.ADMIN
                            : government?.name_ar}
                    </Typography>
                )
            }
        }, {
            field: 'isHome',
            headerName: 'إظهار المعلم للطلاب',
            type: "boolean",
            isSwitch: true
        }, {
            field: "isResetPassword",
            headerName: 'اعاده ضبط كلمه السر',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return (
                    <UserResetPassword setUser={(newUser) => setReset(p => !p)} user={params.row} />
                )
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            type: 'date',
            valueGetter: (params) => new Date(params),//*_*
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]

    return (
        <div>
            <Section>
                <TitleSection title={'مدرسي المنصه'} />
                <BtnModal
                    variant='contained'
                    component={<CreateTeacher setReset={setReset} />}
                    btnName={'انشاء مدرس جديد'} />
            </Section>
            <FullComponent data={{
                resKey: 'users',
                useFetch: useLazyGetUsersQuery, isMultiPart: true,
                useUpdate: useUpdateUserMutation,
                useDelete: useDeleteUserMutation,
                useDeleteMany: useDeleteManyUsersMutation,
                columns, fetchFilters: { role: user_roles.TEACHER }, reset,
                ViewRow: TeacherUpdate
            }} />
        </div>
    )
}

export default TeachersPage
