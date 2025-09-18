import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useGridApiRef } from '@mui/x-data-grid'
import { useNavigate, useSearchParams } from 'react-router-dom';

import { user_roles } from '../../settings/constants/roles'
import governments from '../../settings/constants/governments'
import { lang } from '../../settings/constants/arlang'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'

import Section from "../../style/mui/styled/Section"
import ModalStyled from '../../style/mui/styled/ModalStyled'

import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import { useLazyGetUsersCountQuery } from '../../toolkit/apis/statisticsApi'
import { useDeleteManyUsersMutation, useDeleteUserMutation, useLazyAnalysisUsersQuery, useLazyGetUsersQuery, useUpdateUserMutation } from '../../toolkit/apis/usersApi'
import usePostData from '../../hooks/usePostData'
import useLazyGetData from '../../hooks/useLazyGetData'

import CreateUser from '../../components/users/CreateUser'
import TabInfo from '../../components/ui/TabInfo'
import TitleSection from '../../components/ui/TitleSection'
import GradesTabs from '../../components/grades/GradesTabs'
import UserAvatar from '../../components/users/UserAvatar';
import UserShowTable from '../../components/users/UserShowTable';
import UserResetPassword from '../../components/users/UserResetPassword';

import useGrades from '../../hooks/useGrades';
import BtnModal from '../../components/ui/BtnModal';
// import CreateUser from '../../components/users/CreateUser'

const exportObj = (grades) => {
    return {
        grade: (row) => {
            return grades.find(grade => grade._id === row.grade)?.name
        },
        isActive: (row) => {
            if (row.isActive) {
                return 'فعال'
            } else {
                return 'غير فعال'
            }
        },
        wallet: (row) => {
            return row.wallet + ' ' + 'ريال'
        },
        createdAt: (row) => {
            return getDateWithTime(row.createdAt)
        }
    }
}

function GetUsersPage({ setExcludedUsers, isShowTitle = true, courses, isShowGrades = true }) {

    const { grades } = useGrades()

    // console.log(data)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const [gradesCounts, setGradeCounts] = useState({})
    const [grade, setGrade] = useState(Number(searchParams.get('grade')) || 0)

    const changeGrade = (newVal) => {
        setSearchParams({
            grade: newVal
        })
        setGrade(newVal)
    }

    //get users
    const [reset, setReset] = useState(false)
    const [getData, { isLoading }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {

        if (!params.role) {
            params.role = '!=' + user_roles.TEACHER
        } else if (params.role?.includes('_split_')) {
            const value = params.role.split('_split_')[1]
            if (!value) {
                params.role = '!=' + user_roles.TEACHER
            }
        }
        const res = await getUsers({ ...params, grade: grade || 'all', courses }, false)
        const data = { values: res.users, count: res.count }
        return data
    }

    //get users count
    const [getStatistics] = useLazyGetUsersCountQuery()
    const [getUsersCount] = useLazyGetData(getStatistics)

    useEffect(() => {
        const trigger = async () => {

            const [...counts] = await Promise.all([
                getUsersCount({ grade: 'all', role: '!=' + user_roles.TEACHER }),
                ...grades.map(g => getUsersCount({ grade: g._id }, true)),
            ])
            setGradeCounts(counts)
        }
        trigger()
    }, [grades])


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
            valueGetter: (params) => params, //*_*
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            }
        }, {
            field: 'phone',
            headerName: lang.PHONE,
            width: 200

        }, {
            field: 'familyPhone',
            headerName: lang.FAMILY_PHONE,
            width: 200
        }, {
            field: 'wallet',
            headerName: lang.WALLET,
            width: 200,
            type: 'number',
        }, {
            field: 'role',
            headerName: lang.ROLE,
            type: 'singleSelect',
            width: 200,
            valueOptions: [user_roles.INREVIEW, user_roles.ONLINE, user_roles.STUDENT, user_roles.ADMIN, user_roles.SUBADMIN,],
            editable: true
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            editable: true,
            sortable: false,
            filterable: false,
            valueOptions: makeArrWithValueAndLabel(grades, { value: '_id', label: 'name' }),
            renderCell: (params) => {
                const grade = grades.find(({ _id }) => _id === params.row.grade)
                return (
                    <Typography>
                        {params.row.role === user_roles.ADMIN ? user_roles.ADMIN
                            : grade?.name}
                    </Typography>
                )
            }
        }, {
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
            field: 'marks',
            headerName: 'درجات الاسئله',
            type: 'number',
        }, {
            field: 'exam_marks',
            headerName: 'درجات الاختبارات',
            type: 'number',
        }, {
            field: 'totalPoints',
            headerName: 'نقاط الطالب',
            type: 'number',
        }, {
            field: "isResetPassword",
            headerName: 'اعاده ضبط كلمه السر',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return (
                    <UserResetPassword user={params.row} setUser={(u) => {
                        apiRef.current.updateRows([{ ...u }])
                    }} />
                )
            }
        },
        //  {
        //     field: 'devicesAllowed',
        //     headerName: 'عدد الاجهزه المسموح بها',
        //     editable: true,
        //     width: 200,
        //     disableExport: true,
        //     filterable: false,
        //     sortable: false,
        //     renderCell: (params) => {
        //         return <TabInfo count={params.row.devicesAllowed} i={1} />
        //     }
        // }, {
        //     field: 'devicesRegistered',
        //     headerName: 'عدد الاجهزه المسجله',
        //     width: 200,
        //     disableExport: true,
        //     filterable: false,
        //     sortable: false,
        //     renderCell: (params) => {
        //         return <TabInfo count={params.row.devicesRegistered?.length} i={3} />
        //     }
        // }, {
        //     field: 'filterDevices',
        //     headerName: "مسح الاجهزه المسجله",
        //     width: 200,
        //     disableExport: true,
        //     filterable: false,
        //     sortable: false,
        //     renderCell: (params) => {
        //         return <Button disabled={params.row?.devicesRegistered?.length === 0} onClick={() => {
        //             setUserRegister(params.row)
        //             setOpenRegisterModal(true)
        //         }}>
        //             مسح الاجهزه المسجله
        //         </Button>
        //     }
        // }, 
        // {
        //     field: 'fileConfirm',
        //     headerName: 'صوره التاكيد',
        //     width: 200,
        //     disableExport: true,
        //     filterable: false,
        //     sortable: false,
        //     renderCell: (params) => {
        //         return <UserAvatar user={params.row} url={params.row?.fileConfirm?.url} />
        //     }
        // },
        {
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

    const [sendData, { isLoading: updateLoader }] = useUpdateUserMutation()
    const [updateUser] = usePostData(sendData)

    const updateFc = async (values) => {
        const user = await updateUser(values)
        return user
    }


    const [deleteData, { isLoading: deleteLoader }] = useDeleteUserMutation()
    const [deleteUser] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await deleteUser({ _id: id })
    }

    const viewFc = (user) => {
        navigate('/management/users/view?userName=' + user.userName)
    }

    // reset device registered
    const apiRef = useGridApiRef();
    const [userToRegister, setUserRegister] = useState()
    const [isOpenRegisterModal, setOpenRegisterModal] = useState(false)
    const resetDevicesReg = async () => {
        const user = await updateUser({ ...userToRegister, devicesRegistered: [] })
        apiRef.current.updateRows([{ ...user }])
        setUserRegister()
    }

    //reset Password
    // const [openReset, setOpenReset] = useState(false)
    // const resetPassword = async () => {
    //     const user = await updateUser({ _id: userToRegister._id, password: 'reset' })
    //     apiRef.current.updateRows([{ ...user }])
    //     setUserRegister()
    // }

    const [getAnalysis] = useLazyAnalysisUsersQuery()
    const [analysisUsers] = useLazyGetData(getAnalysis)

    const [deleteMany, deleteManyStatus] = useDeleteManyUsersMutation()
    const [deleteManyUsers] = usePostData(deleteMany)

    return (
        <Section>
            {isShowTitle && (
                <>
                    <TitleSection title={lang.USERS_PAGE} />
                </>
            )}
            <BtnModal btnName={lang.CREATE_USER} component={<CreateUser setReset={setReset} />} />

            {isShowGrades && (
                <GradesTabs grade={grade} setGrade={changeGrade} counts={gradesCounts} />
            )}


            <MeDatagrid
                apiRef={apiRef}
                reset={[reset, grade]}
                setSelection={setExcludedUsers}
                type={'crud'} exportObj={exportObj(grades)} exportTitle={lang.USERS_PAGE} analysisFc={analysisUsers}
                columns={columns} allStatuses={[deleteManyStatus]} deleteMany={deleteManyUsers}
                viewFc={viewFc} fetchFc={fetchFc} updateFc={updateFc} deleteFc={deleteFc}
                ViewRow={UserShowTable} viewRowModal={{
                    fullScreen: true
                }}
                loading={isLoading || updateLoader || deleteLoader}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />

            <ModalStyled open={isOpenRegisterModal} setOpen={setOpenRegisterModal} title={'هل انت متاكد من مسح الاجهزه المسجله لهذا المستخدم ؟'} action={resetDevicesReg} />
            {/* <ModalStyled open={openReset} setOpen={setOpenReset} title={'هل انت متاكد من اعاده ضبط كلمه السر ؟'} action={resetPassword} /> */}
        </Section>
    )
}


export default GetUsersPage
