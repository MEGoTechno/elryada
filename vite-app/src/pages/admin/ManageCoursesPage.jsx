import { useEffect, useState } from 'react'
import { Box, Paper, } from '@mui/material'

import Section from "../../style/mui/styled/Section"
import { FlexColumn } from "../../style/mui/styled/Flexbox"

import { useLazyGetCoursesCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'

import GradesTabs from '../../components/grades/GradesTabs'
import Separator from '../../components/ui/Separator'
import AdminCourseDetails from '../../components/content/AdminCourseDetails'

import ManageUnits from './ManageUnits'
import ManageCourses from './ManageCourses'
import { useSearchParams } from 'react-router-dom'

import AdminCourseChapters from '../../components/content/AdminCourseChapters'
import useGrades from '../../hooks/useGrades'


function ManageCoursesPage() {
    const { grades } = useGrades()
    //modals params
    const [searchParams, setSearchParams] = useSearchParams();

    const [grade, setGrade] = useState(Number(searchParams.get('grade')) || 0)
    const [activeUnit, setActiveUnit] = useState(searchParams.get('unit') || null) // unit_id
    const [activeCourse, setActiveCourse] = useState(searchParams.get('course') || null)
    const [courses, setCourses] = useState([]) //just for delete in admin COurse details ___++___ select Courses

    const [counts, setCounts] = useState({})
    const [refetchLectures, setRefetchLectures] = useState(false)

    //lectures numbers in every grade
    const [getCoursesCountFc] = useLazyGetCoursesCountQuery()
    const [getCoursesCount] = useLazyGetData(getCoursesCountFc)

    const [lecturesCount, setLecturesCount] = useState('loading...')
    useEffect(() => {
        const trigger = async () => {
            const [...counts] = await Promise.all([
                getCoursesCount({ grade: 'all' }),
                ...grades.map(g => getCoursesCount({ grade: g._id })),
            ])
            setCounts(counts)
        }
        trigger()
    }, [grade, activeCourse, grades]) // activeUnit,

    const changeGrade = (index) => {
        setGrade(index)
        setSearchParams({
            grade: index
        })
        // setActiveUnit('')
        setActiveCourse('')
    }

    const changeOnlyGrade = (index) => {
        setGrade(index)
        setSearchParams(prev => ({
            ...Object.fromEntries(prev.entries()), // convert to a plain object
            grade: index.toString(),              // set the new param
        }));
    }

    const changeUnit = (unit) => {
        setActiveUnit(unit)
        setSearchParams({
            grade, unit
        })
        setActiveCourse(null)
    }

    const changeCourse = (course) => {
        setActiveCourse(course)
        setSearchParams({
            grade,  course //unit: activeUnit,
        })
    }

    return (
        <Section>
            <Paper sx={{ p: '40px' }}>

                <GradesTabs setGrade={changeGrade} counts={counts} grade={grade} />
                <FlexColumn>
                    {/* <BannerIcon title="manage Courses" icon="icon " /> */}
                    {/* <ManageUnits grade={grade} activeUnit={activeUnit} setActiveUnit={changeUnit} /> */}

                    {(grade || grade === 0) && (
                        <ManageCourses courses={courses} setCourses={setCourses} grade={grade}  activeCourse={activeCourse} setActiveCourse={changeCourse} /> //activeUnit={activeUnit}
                    )}

                    {(activeCourse) && ( // && activeUnit
                        <Box sx={{ width: '100%' }}>
                            <AdminCourseDetails
                                setGrade={changeOnlyGrade}
                                setCourses={setCourses}
                                setActiveCourse={setActiveCourse}
                                lecturesCount={lecturesCount}
                                courseId={activeCourse} setRefetchLectures={setRefetchLectures} />
                        </Box>
                    )}

                    <Separator sx={{ width: '100%' }} />

                    {(activeCourse) && ( // && activeUnit
                        <Box sx={{ width: '100%' }}>
                            <AdminCourseChapters
                                setLecturesCount={setLecturesCount}
                                course={activeCourse} grade={grade} // unit={activeUnit}
                                refetchLectures={refetchLectures} />
                        </Box>
                    )}

                </FlexColumn>
            </Paper>
        </Section>
    )
}

//banner
//units
//courses
//lectures
export default ManageCoursesPage
