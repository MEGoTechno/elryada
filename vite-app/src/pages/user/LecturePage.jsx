import { useEffect, useState, } from 'react'
import { useLazyGetLectureAndCheckQuery, usePassLectureMutation } from '../../toolkit/apis/coursesApi'
import { useOutletContext, useParams } from 'react-router-dom'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import usePostData from '../../hooks/usePostData'
import WrapperHandler from '../../tools/WrapperHandler'
import sectionConstants from '../../settings/constants/sectionConstants'
import LectureBody from '../../components/grades/LectureBody'
import dayjs from 'dayjs'
import useLazyGetData from '../../hooks/useLazyGetData'

function LecturePage() {

    const params = useParams()

    const [currentLectureInfo, course, setUserProgress] = useOutletContext();

    const [lecture, setLecture] = useState()
    //Function fetches Lecture
    const [getData, getStatus] = useLazyGetLectureAndCheckQuery()
    const [getLecture] = useLazyGetData(getData)

    const [sendData, status] = usePassLectureMutation()
    const [passLecture] = usePostData(sendData)

    useEffect(() => {
        const trigger = async () => {
            const lecture = await getLecture({
                index: params.courseId, lectureId: params.lectureId
            })
            setLecture(lecture)
        }
        trigger()
        status.reset()
    }, [currentLectureInfo])


    if (getStatus.isLoading || getStatus.isFetching || getStatus.isError) return <LoaderSkeleton />

    // console.log(lecture)
    const passed = async () => {
        const nextLectureIndex = currentLectureInfo.index + 1 //
        const chapterProgress = {
            chapter: currentLectureInfo.currentChapter, currentIndex: nextLectureIndex
        }

        await passLecture({ courseId: course, lectureId: lecture._id, chapterProgress }) //linked to
        setUserProgress(pre => {
            return pre.map(ch => {
                if (ch.chapter === currentLectureInfo.currentChapter) {
                    return { ...ch, currentIndex: nextLectureIndex }
                }
                return ch
            })
        })
    }

    if (!lecture) return
    const cantPass = currentLectureInfo.currentIndex !== currentLectureInfo.index

    return (
        <FlexColumn sx={{ minHeight: '90vh', backgroundColor: 'background.alt', borderRadius: '16px', p: '12px', width: '100%' }}>

            {lecture && (
                <LectureBody lecture={lecture} lectureIndex={currentLectureInfo?.index} courseId={course} />
            )}

            {(lecture?.sectionType !== sectionConstants.EXAM || lecture.exam?.attempts.length !== 0 || (dayjs().isAfter(dayjs(lecture.dateEnd)))) && (
                <FilledHoverBtn onClick={() => passed()} disabled={status.isLoading || cantPass || false} > تعليم كتم الانتهاء ! </FilledHoverBtn>
                // (lectureIndex !== currentIndex && currentIndex !== 0) ||
            )}
            <WrapperHandler status={status} showSuccess={true} />
        </FlexColumn>
    )
}

export default LecturePage
