import usePostData from '../../hooks/usePostData'
import Section from '../../style/mui/styled/Section'
import { useCreateChapterMutation } from '../../toolkit/apis/chaptersApi'
import TitleWithDividers from '../ui/TitleWithDividers'

import ChapterForm from './ChapterForm'

function CreateChapter({ courseId, setChapters }) {
    const [sendData, status] = useCreateChapterMutation()
    const [createChapter] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const res = await createChapter({ ...values, courses: [courseId] })
        props.resetForm()
        if (setChapters) {
            setChapters(pre => ([res, ...pre]))
        }
    }
    return <Section>
        <TitleWithDividers title={'انشاء جزء جديد'} />
        <ChapterForm onSubmit={onSubmit} status={status} />
    </Section>
}

export default CreateChapter
