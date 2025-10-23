import { useCreateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'
import LectureForm from './LectureForm'

function LectureCreate({ setLectures, grade, course, chapter, sectionParent }) {
    const [sendData, status] = useCreateLectureMutation()
    const [createLecture] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const res = await createLecture({ ...values, chapters: [chapter] }, true)
        setLectures(prev => { return [...prev, res] })
        props.resetForm()
    }
    return (
        <LectureForm grade={grade} course={course} onSubmit={onSubmit} status={status} chapter={chapter} setLectures={setLectures} sectionParent={sectionParent} />
    )
}

export default LectureCreate
