import { Alert } from "@mui/material"
import { FlexColumn } from "../../style/mui/styled/Flexbox"
import AdminChapterInfo from "./AdminChapterInfo"
import AdminCardLecture from "../content/AdminCardLecture"
import { lang } from "../../settings/constants/arlang"
import BtnModal from "../ui/BtnModal"
import { OutLinedHoverBtn } from "../../style/buttonsStyles"
import LectureCreate from "../content/LectureCreate"
import { useEffect, useState } from "react"
import { useLazyGetLecturesQuery } from "../../toolkit/apis/lecturesApi"
import useLazyGetData from "../../hooks/useLazyGetData"
import Grid from "../../style/vanilla/Grid"
import Loader from "../../style/mui/loaders/Loader"
import usePermissions from "../permissions/hooks/usePermissions"
import { chapterPerms } from "../permissions/constants/perms"

function ChapterData({ chapter, setChapter, course,  grade, deleteChapter }) { //unit,

    const [lectures, setLectures] = useState()
    const [hasPermission] = usePermissions()

    const [getData, status] = useLazyGetLecturesQuery()
    const [getLectures] = useLazyGetData(getData)

    useEffect(() => {
        const handleLectures = async () => {
            const res = await getLectures({ chapters: chapter._id }, false)
            setLectures(res.lectures)
        }
        handleLectures()
    }, [chapter])

    return (
        <FlexColumn sx={{ width: '100%' }}>
            <AdminChapterInfo course={course} lecturesCount={lectures?.length} chapter={chapter} setChapter={setChapter} deleteChapter={deleteChapter} />

            <Grid gap="10px" sx={{ width: '100%' }}>
                {lectures && lectures.map((lecture, i) => (
                    <AdminCardLecture chapter={chapter} setLectures={setLectures} key={lecture._id || i} i={i} courseId={course} lecture={lecture} />
                ))}
            </Grid>

            {status.isLoading && (
                <Alert variant="outlined" severity="warning" icon={<Loader />}>يتم تحميل المحاضرات </Alert>
            )}
            {(status.isSuccess && !lectures?.length) && (
                <Alert variant="filled" severity="warning">
                    {lang.NO_LECTURES_IN_THIS_COURSE}
                </Alert>
            )}
            {hasPermission(chapterPerms(chapter._id, 'lecturesCreate')) && (
                <BtnModal
                
                    btn={<OutLinedHoverBtn>إضافة محاضرة إلى {chapter.name}</OutLinedHoverBtn>}
                    component={
                        <LectureCreate
                            setLectures={setLectures}
                            //unit={unit}
                            grade={grade}
                            course={course}
                            chapter={chapter._id}
                        />
                    }
                />
            )}

        </FlexColumn>
    )
}

export default ChapterData
