
import MakeForm from '../../tools/makeform/MakeForm'

import useQuestionsSchema from './useQuestionsSchema'

function QuestionsForm({ onSubmit, status, type = 'mcq', questions = null, metaData = { isAdd: true, isDelete: true }, grade = '', tags = '', chapter = '' }) {
    const test = useQuestionsSchema({ type, grade, tags, metaData, questions })

    return (
        <div>
            <MakeForm inputs={test} onSubmit={onSubmit} status={status} enableReinitialize={false} />
        </div>
    )
}

export default QuestionsForm
