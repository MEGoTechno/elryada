import { useEffect, useMemo, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Alert, Box, Paper, Typography, useMediaQuery, } from '@mui/material'

import HeaderContent from '../../components/ui/HeaderContent'
import { ExamIcon, FilesIcon, VidsIcon2 } from '../../components/ui/svg/ContentSvgs'

import CourseSubscribeCard from '../../components/content/CourseSubscribeCard'

import Section from '../../style/mui/styled/Section'

import Loader from '../../style/mui/loaders/Loader'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'

import { lang } from '../../settings/constants/arlang'
import sectionConstants from '../../settings/constants/sectionConstants'

import { useLazyGetCourseLecturesAndCheckUserQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import SEOHelmetAsync from '../../tools/SEOHelmetAsync'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import LectureUserCard from '../../components/content/LectureUserCard'
import Grid from '../../style/vanilla/Grid'
import DataWith3Items from '../../components/ui/DataWith3Items'
import InfoText from '../../components/ui/InfoText'
import { useGetTeachersQuery } from '../../toolkit/apis/usersApi'

function CoursePage() {
    const params = useParams() // {lectureId, courseId = index, gradeId}

    const isLargeScreen = useMediaQuery('(min-width:980px)')

    const [getData, status] = useLazyGetCourseLecturesAndCheckUserQuery()
    const [getCourseAndLectures] = useLazyGetData(getData)

    const [courseDetails, setCourseDetails] = useState(null)// Not Sub or Not Reg => {lectures=[], counts} || subscribed => {}
    const [userProgress, setUserProgress] = useState(null)

    const { data: teachers } = useGetTeachersQuery({ courses: courseDetails?.course?._id }, { skip: (!courseDetails?.course?._id || !courseDetails?.course?.showTeachers) })

    useEffect(() => {
        const trigger = async () => {
            const { course, chapters } = await getCourseAndLectures({ index: params.courseId })
            // console.log(chapters)
            let counts = {
                videos: chapters.map(ch => ch.lectures).flat().filter(lecture => lecture.sectionType === sectionConstants.VIDEO)?.length,
                chapters: chapters?.length,
                exams: chapters.map(ch => ch.lectures).flat().filter(lecture => lecture.sectionType === sectionConstants.EXAM)?.length
            }
            setUserProgress(course.userProgress)
            setCourseDetails({ course, chapters, counts })
        }

        if (!courseDetails?.course) {
            trigger()
        }
    }, [params.courseId])

    //unlock lecture when user pass it

    const getCurrentLectureIndexInChapter = useMemo(() => {
        if (!courseDetails || !userProgress) return {}

        let lectureId = null
        let currentChapter = null

        let currentIndex = null
        let index = null//cant use from Get lecture Page is it is the native one

        if (params.lectureId) {
            let currentLecture = courseDetails.chapters
                .map(ch => ch.lectures).flat()?.find(item => item._id === params.lectureId)
            currentChapter = courseDetails.chapters.find(ch => currentLecture.chapters.includes(ch._id))._id
            lectureId = currentLecture?._id
            index = currentLecture.index

            currentIndex = userProgress?.find(u => u.chapter === currentChapter)?.currentIndex || 1
        }
        return { lectureId, currentChapter, currentIndex, index }

    }, [courseDetails, params.lectureId, userProgress])

    if (!courseDetails?.course) {
        return <LoaderSkeleton />
    }
    //get /lectures/lectureId (index)

    const compo = <Paper elevation={1} sx={{ width: '100%', p: '16px', mt: '16px' }}>
        <TitleWithDividers title={'محتوى الدوره'} />
        {courseDetails?.chapters && courseDetails?.chapters.map(chapter => {

            return <AccordionStyled
                beforeTitle={(chapter.lectures.length && userProgress) ? <Typography sx={{ opacity: .6 }}>{chapter.lectures.length}/{userProgress.find(u => u.chapter === chapter._id)?.currentIndex - 1 || 1}</Typography> : ''}
                expanded={getCurrentLectureIndexInChapter?.currentChapter === chapter._id}
                key={chapter._id}
                color='primary.main'
                desc={chapter.description} title={chapter.name}>
                <Box>
                    {chapter?.lectures.length === 0 && (
                        <Alert variant='filled' severity='warning'>المحاضرات هتنزل قريب , خليك متابع !</Alert>
                    )}

                    <Grid>
                        {chapter?.lectures.map((lecture, i) => {
                            return <LectureUserCard
                                lecturesProgress={userProgress && userProgress.find(u => u.chapter === chapter._id) || {}}
                                unlock={lecture.chapters?.includes(getCurrentLectureIndexInChapter.currentChapter) && getCurrentLectureIndexInChapter.currentIndex >= lecture.index}
                                key={i} lecture={lecture} i={i}

                                currentLectureId={getCurrentLectureIndexInChapter?.lectureId}
                                isSubscribed={courseDetails?.course?.isSubscribed} />
                        })}

                    </Grid>
                </Box>
            </AccordionStyled>
        })}
    </Paper>

    return (
        <Section>
            <SEOHelmetAsync
                title={'صفحه الكورسات - ' + courseDetails?.course?.name}
                desc="افضل كورسات منصه الريادة"
                url={window.location.href}
            />

            <HeaderContent
                sideChildren={<FlexColumn>
                    {/* getLectureCurrentIndex(), */}
                    <Outlet context={[getCurrentLectureIndexInChapter, courseDetails.course._id, setUserProgress]} />
                    {(!isLargeScreen || !params.lectureId) && (
                        compo
                    )}
                </FlexColumn>}
                sectionName={'صفحه الكورسات '}
                title={courseDetails?.course?.name} body={<span dangerouslySetInnerHTML={{ __html: courseDetails?.course?.description }} />}
                infos={
                    [
                        {
                            caption: lang.LECTURES, desc: '+ ' + courseDetails?.counts?.videos, icon: <VidsIcon2 size='1.5rem' />
                        }, {
                            caption: 'الفصول', desc: '+ ' + courseDetails?.counts?.chapters, icon: <FilesIcon size='1.5rem' />
                        }, {
                            caption: lang.EXAMS, desc: '+ ' + courseDetails?.counts?.exams, icon: <ExamIcon size='1.5rem' />
                        }
                    ]}
            >
                {(courseDetails?.course) ?// setSubscribed={setSubscribed}
                    <FlexColumn gap={'16px'}>
                        {teachers?.values?.users?.length ? (
                            <Box sx={{ width: '100%' }}>
                                <InfoText label={'المعلمون'} sx={{ my: '6px' }} />
                                {/* <TextBorderWithIcons title='المعلمون' sx={{ my: '.5rem', justifyContent: 'flex-start' }} /> */}
                                <FlexRow justifyContent={'center'} gap='4px' sx={{ width: '100%' }}>
                                    {teachers?.values?.users.map(u => {
                                        return <DataWith3Items key={u._id} sx={{  flexWrap: 'wrap', justifyContent: 'center' }}
                                            src={u.avatar?.url}
                                            title={u.name} desc={u.description} />
                                    })}

                                </FlexRow>
                            </Box>
                        ) : ''}
                        <CourseSubscribeCard course={courseDetails?.course} isSubscribed={courseDetails?.course?.isSubscribed} setCourseDetails={setCourseDetails} />

                        {isLargeScreen && params.lectureId && (
                            compo
                        )}
                    </FlexColumn>
                    : <Loader />}
            </HeaderContent>

            {/* Lecture Is Here */}
        </Section >
    )
}

// header
// subscribe card
// content
export default CoursePage
