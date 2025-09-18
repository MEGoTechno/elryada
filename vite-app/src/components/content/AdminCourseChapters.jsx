import { Grid } from "@mui/material"

import usePostData from "../../hooks/usePostData"
import { useCallback, useEffect, useState } from "react"
import BtnsGroup from "../../style/mui/styled/BtnsGroup"
import { TextBorderWithIcons } from "../ui/TextBorderAround"
import BtnModal from "../ui/BtnModal"
import CreateChapter from "../chapters/CreateChapter"
import ChapterData from "../chapters/ChapterData"
import usePermissions from "../permissions/hooks/usePermissions"
import { chapterPerms } from "../permissions/constants/perms"
import { useLazyGetChaptersQuery } from "../../toolkit/apis/chaptersApi"
import useLazyGetData from "../../hooks/useLazyGetData"

function AdminCourseChapters({ course, setLecturesCount, refetchLectures, unit, grade }) {

    const [chapters, setChapters] = useState([])

    // const [getData, status] = useLazyGetAllLecturesQuery()
    const [getData, status] = useLazyGetChaptersQuery()
    const [getChaptersAndLectures] = useLazyGetData(getData)
    const [hasPermission] = usePermissions()

    useEffect(() => {
        const trigger = async () => {
            const res = await getChaptersAndLectures({ courses: course }, false)
            setChapters(res.chapters)
            // console.log(res.chapters)
            // if (setLecturesCount) {
            //     setLecturesCount(res.lectures?.length || 'loading')
            // }
        }
        trigger()
    }, [refetchLectures, course])

    const changeChapter = useCallback((ch) => {
        setChapters(prev =>
            prev.map(chapter => (chapter._id === ch._id ? { ...chapter, ...ch } : chapter))
        )
    }, [])

    const deleteChapter = useCallback((ch) => {
        setChapters(prev =>
            prev.filter(chapter => (chapter._id !== ch._id))
        )
    }, [])

    return (
        <Grid gap='10px'>
            <TextBorderWithIcons title="الفصول" />
            <BtnsGroup
                btns={[...chapters.map(ch => ({
                    label: ch.name, component: <ChapterData
                        chapter={ch}
                        setChapter={changeChapter}
                        deleteChapter={deleteChapter}
                        course={course} grade={grade} unit={unit}
                    />
                })),
                {
                    btn: <BtnModal disabled={!hasPermission(chapterPerms(null, 'create', { courseId: course }))} size="medium" btnName={'انشاء جزء جديد'} variant="outlined" color={'warning'}
                        component={<CreateChapter setChapters={setChapters} courseId={course} />} />
                }]}
            />
        </Grid>
    )
}

export default AdminCourseChapters
