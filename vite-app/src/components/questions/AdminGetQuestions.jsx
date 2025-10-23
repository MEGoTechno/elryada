import useLazyGetData from '../../hooks/useLazyGetData'
import { lang } from '../../settings/constants/arlang'
import { getDateWithTime } from '../../settings/constants/dateConstants'
import Section from '../../style/mui/styled/Section'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import usePostData from '../../hooks/usePostData'

import UserAvatar from '../users/UserAvatar'
import { useDeleteQuestionMutation, useLazyGetQuestionsQuery, useLinkQuestionToTagsMutation, useUnlinkQuestionToTagsMutation, useUpdateQuestionMutation } from '../../toolkit/apis/questionsApi'
import CreateQuestion from './CreateQuestions'
import BtnModal from '../ui/BtnModal'
import { useMemo, useState } from 'react'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import UpdateQuestion from './UpdateQuestion'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import GetTags from '../tags/GetTags'
import { FlexColumn, FlexRow, } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { FaMinus, FaPlus, FaTags } from "react-icons/fa";
import { TbTagsOff } from "react-icons/tb";
import Loader from '../../style/mui/loaders/Loader'
import TabInfo from '../ui/TabInfo'
import { IconButton } from '@mui/material'
import BtnConfirm from '../ui/BtnConfirm'
import useGrades from '../../hooks/useGrades'

import Separator from '../ui/Separator'
import AdminTagQs from './AdminTagQs'
import { useGetTagsQuery } from '../../toolkit/apis/tagsApi'

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
        createdAt: (row) => {
            return getDateWithTime(row.createdAt)
        },
        updatedAt: (row) => {
            return getDateWithTime(row.updatedAt)
        }, tags: (row) => {
            return row.tags.map(tag => tag.name).join(' - ') || 'لا يوجد مهاره'
        }
    }
}


function AdminGetQuestions({
    setSelectedQs, allSelected = false, filters = {}, defaultGrade = '',
    isShowCreate = true, isShowHeader = false, colsIgnored = [], addColumns = [], disableAllActions = false, preReset = [] }) {
    const { grades } = useGrades()
    const { isLoading: loaderTags, data } = useGetTagsQuery({ select: '_id name' })

    const [reset, setReset] = useState(false)

    const [getData, status] = useLazyGetQuestionsQuery()
    const [getQuestions] = useLazyGetData(getData)

    //removing subscription
    const [sendDelete, { isLoading }] = useDeleteQuestionMutation()
    const [deleteQuestion] = usePostData(sendDelete)

    const deleteFc = async (id) => {
        await deleteQuestion({ _id: id })
    }

    const [sendUpdate, updateStatus] = useUpdateQuestionMutation()
    const [updateQuestion] = usePostData(sendUpdate)

    const updateFc = async (data) => {
        await updateQuestion({ id: data._id, ...data })
        return data
    }

    const fetchFc = async (params) => {
        const toSearch = { ...params, ...filters } //grade, 
        toSearch.tags = (filterTags && filterTags?.length) ? filterTags : toSearch.tags

        const res = await getQuestions(toSearch, false)
        const data = { values: res.questions, count: res.count }
        return data
    }

    //Linking
    const [chosenTags, setChosenTags] = useState([])

    const [linkQuestion, linkStatus] = useLinkQuestionToTagsMutation()
    const [linkToTags] = usePostData(linkQuestion)

    //UnLinking
    const [unLinkedTags, setUnLinkedTags] = useState([])

    const [unLinkQs, unLinkStatus] = useUnlinkQuestionToTagsMutation()
    const [UnLinksTags] = usePostData(unLinkQs)

    const columns = [
        {
            field: "image",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar url={params.row?.image?.url} />
            }
        },
        {
            field: 'title',
            headerName: 'عنوان السؤال',
            width: 200,
            editable: true,
            renderCell: (p) => {
                return <div dangerouslySetInnerHTML={{ __html: p.row.title }} />
            }
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            editable: true,
            filterable: true,
            sortable: false,
            valueOptions: makeArrWithValueAndLabel(grades, { value: '_id', label: 'name' }),
        }, {
            field: "tags",
            headerName: 'المهارات',
            width: 200,
            // type: 'singleSelect',
            editable: false,
            filterable: false,
            sortable: false,
            valueFormatter: (v) => {
                return v.map(tag => data?.values?.tags.find(t => t._id === tag).name).join(' - ') || 'لا يوجد مهاره'
            }
        }, {
            field: 'hints',
            headerName: "ملاحظات",
            width: 150,
            editable: true
        }, {
            field: 'points',
            headerName: "النقاط",
            type: 'number',
            width: 150,
            editable: true
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
            // valueGetter: (isActive) => ,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                                : <TabInfo count={lang.NOT_ACTIVE} i={3} />
                        }
                    </>
                )
            }
        }, {
            field: 'tagsAction',
            headerName: 'المهارات',
            width: 150,
            type: "actions",
            disableExport: true,

            renderCell: (params) => {
                let tagsIds = params.row.tags || []
                if (params.row?.tags?.length === 0 || !params.row?.tags?.length) {
                    tagsIds = 'emptyArray'
                }
                const unLinkFc = async (tag = null) => {
                    await UnLinksTags({ tags: tag ? [tag] : unLinkedTags, _id: params.row._id })
                    setUnLinkedTags([])
                    setReset(!reset)
                }

                const addColumns = {
                    field: 'someFcs',
                    type: 'actions',
                    getActions: (params) => {
                        return [
                            <BtnConfirm
                                modalInfo={{
                                    desc: 'سيتم ازاله هذه المهاره من السؤال'
                                }}
                                btn={<IconButton color='error' onClick={() => unLinkFc(params?.row?._id)}>
                                    <FaMinus></FaMinus>
                                </IconButton>} key={0} />
                        ]
                    }
                }
                // console.log(tagsIds)
                return <BtnModal
                    btnName={'ازاله المهاره'}
                    icon={<FaTags />}
                    color={'success'}
                    fullScreen={true}
                    titleInSection={<>مهارات السؤال : <span dangerouslySetInnerHTML={{ __html: params.row.title }} /></>}
                    component={<FlexColumn>
                        <GetTags
                            addColumns={addColumns}
                            disableAllActions={true}
                            colsIgnored={['questions', 'notQuestions']}
                            preReset={[params.row?.tags]}
                            filters={{ _id: tagsIds }}
                            setSelectedTags={setUnLinkedTags} isShowCreate={false}
                            singleSelection={true}
                        />

                        {unLinkedTags.length > 0 && (
                            <BtnConfirm
                                btn={<FilledHoverBtn onClick={() => unLinkFc()} disabled={unLinkStatus.isLoading}>
                                    {unLinkStatus.isLoading ? <Loader /> : `ازاله ${unLinkedTags.length} مهارات`}
                                </FilledHoverBtn>} />
                        )}
                    </FlexColumn>} //, grade: params.row.grade
                />
            }
        }, {
            field: 'notTags',
            type: "actions",
            headerName: 'المهارات الغير مضافه',
            disableExport: true,
            width: 200,
            renderCell: (params) => {
                const modifiedTags = params.row.tags?.map((tag) => {
                    return '!=_split_' + tag //Populate
                })
                const linkFc = async (tag = null) => {
                    await linkToTags({ tags: tag || chosenTags, _id: params.row._id })
                    setChosenTags([])
                    setReset(!reset)
                }

                const addColumns = {
                    field: 'someFcs',
                    type: 'actions',
                    getActions: (params) => {
                        return [
                            <BtnConfirm
                                modalInfo={{
                                    desc: 'سيتم إضافه هذه المهاره الي السؤال'
                                }}
                                btn={<IconButton color='success' onClick={() => linkFc(params?.row?._id)}>
                                    <FaPlus></FaPlus>
                                </IconButton>} key={0} />
                        ]
                    }
                }

                return <BtnModal
                    btnName={'اضافه مهارات الي السؤال'}
                    color={'error'}
                    icon={<TbTagsOff />}
                    disabled={params.row.tags.length ? true : false}
                    close={reset}
                    fullScreen={true}
                    titleInSection={<>اضافه مهاره الي السؤال: <span dangerouslySetInnerHTML={{ __html: params.row.title }} /></>}
                    component={<FlexColumn>
                        <GetTags
                            disableAllActions={true} addColumns={addColumns}
                            defaultGrade={params.row.grade}
                            colsIgnored={['questions', 'notQuestions']}
                            preReset={[params.row.tags]} filters={{ _id: modifiedTags, grade: params.row.grade }}
                            setSelectedTags={setChosenTags} isShowCreate={true} singleSelection={true}
                        />
                        {chosenTags.length > 0 && (
                            <BtnConfirm
                                btn={<FilledHoverBtn onClick={() => linkFc()} disabled={linkStatus.isLoading}>
                                    {linkStatus.isLoading ? <Loader /> : `ربط السؤال ب ${chosenTags.length} مهارات`}
                                </FilledHoverBtn>}
                            />

                        )}
                    </FlexColumn>} //, grade: params.row.grade
                />
            }
        }, {
            field: 'createdAt',
            headerName: "تاريخ الإنشاء",
            type: 'date',
            width: 150,
            valueGetter: (createdAt) => new Date(createdAt)
        },
    ]

    const [viewData, setViewData] = useState()
    const [open, setOpen] = useState(false)
    const viewFc = (data) => {
        setViewData(data)
        setOpen(true)
    }

    // Filter out columns whose `field` is in `colsIgnored`
    const modifiedCols = useMemo(() => {
        if (colsIgnored?.length > 0) {
            return columns.filter(col => !colsIgnored.includes(col.field));
        } else {
            return columns
        }
    }, [colsIgnored])

    const [filterTags, setFilterTags] = useState([])
    const [grade, setGrade] = useState(defaultGrade)

    return (
        <Section>
            {/* <TabInfo count={viewsCount} title={'عدد المشاهدات'} i={1} /> */}
            {isShowHeader && (
                <AdminTagQs
                    filterTags={filterTags}
                    setFilterTags={setFilterTags}
                    grade={grade} setGrade={setGrade}
                    setReset={setReset}
                    reset={reset}
                />
            )}

            <Separator />
            {isShowCreate && (
                <FlexRow>
                    <BtnModal
                        btnName={'إنشاء سؤال' + ' اختيار متعدد'}
                        component={<CreateQuestion setReset={setReset} grade={grade} tags={filterTags[0] || filters.tags} />}
                        size='medium' isFilledHover={true} />

                    <BtnModal
                        btnName={'إنشاء سؤال' + ' صواب و خطأ'}
                        component={<CreateQuestion type='tAf' setReset={setReset} grade={grade} tags={filterTags[0] || filters.tags} />}
                        size='medium' isFilledHover={true} />
                </FlexRow>
            )}

            <MeDatagrid
                type={'crud'}
                exportObj={exportObj(grades)} exportTitle={'تفاصيل الاسئله'}
                columns={modifiedCols} addColumns={addColumns} disableAllActions={disableAllActions}
                reset={[reset, ...preReset, filterTags]}
                loading={status.isLoading || updateStatus.isLoading || isLoading}
                fetchFc={fetchFc}
                deleteFc={deleteFc} updateFc={updateFc} viewFc={viewFc}
                setSelection={setSelectedQs} allSelected={allSelected}

                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
            <ModalStyled open={open} setOpen={setOpen}>
                <UpdateQuestion question={viewData} setReset={setReset} />
            </ModalStyled>
        </Section>
    )
}

export default AdminGetQuestions
