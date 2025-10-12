import React, { useEffect, useMemo, useState } from 'react'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import { useLazyGetUnitsQuery } from '../../toolkit/apis/unitsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import { useLazyGetCoursesQuery } from '../../toolkit/apis/coursesApi'
import TabInfo from '../ui/TabInfo'
import { lang } from '../../settings/constants/arlang'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { Alert } from '@mui/material'

function SelectCourse({ grade = 0, activeCourse, setActiveCourse, reset, setCourses, courses }) { //unit = 0,

    const [count, setCount] = useState('loading ...')

    const [getData, status] = useLazyGetCoursesQuery()
    const [getCourses] = useLazyGetData(getData)

    useEffect(() => {

        const trigger = async () => {
            const coursesRes = await getCourses({ grade: grade !== 0 ? grade : 'all' }, false) //unit: unit !== 0 ? unit : 'all'
            setCourses(coursesRes.courses)
            setCount(coursesRes.count)
        }

        trigger()

    }, [grade, courses])

    if (status.isLoading) return <LoaderWithText />

    if (status.isSuccess && courses.length === 0) return <Alert variant="filled" severity="warning">
        لا يوجد دورات فى هذه الماده
    </Alert>

    return (
        <>
            {/* <StyledBtn disabled={!unit} onClick={() => setCourseModal(true)}> {lang.CREATE_COURSE}</StyledBtn> */}
            <TabInfo count={count} i={1} title={lang.CHOOSE_COURSE} />
            <MakeSelect title={lang.CHOOSE_COURSE} reset={reset} value={activeCourse} setValue={setActiveCourse} options={makeArrWithValueAndLabel(courses, { value: '_id', label: 'name' })} />
        </>
    )
}

export default SelectCourse
