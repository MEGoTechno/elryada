import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import AdminGetQuestions from '../../components/questions/AdminGetQuestions'
import TabsAutoStyled from '../../style/mui/styled/TabsAutoStyled'
import GetTags from '../../components/tags/GetTags'
import GetAnswers from '../../components/exam/GetAnswers'
import { useGetQuestionsCountQuery } from '../../toolkit/apis/questionsApi'
import { questionsPerms, tagsPerms } from '../../components/permissions/constants/perms'
import usePermissions from '../../components/permissions/hooks/usePermissions'
import { useGetTagsCountQuery } from '../../toolkit/apis/tagsApi'
import { useGetAnswersCountQuery } from '../../toolkit/apis/answersApi'
import AutoCompleteFixed from '../../style/mui/styled/AutoCompleteFixed'
import useGrades from '../../hooks/useGrades'
import { handelObjsOfArr } from '../../tools/fcs/MakeArray'
import { useState } from 'react'
import { Box } from '@mui/material'


function GetQuestionsPage() {
    const { grades } = useGrades()
    const { data } = useGetQuestionsCountQuery()
    const { data: tagsCount } = useGetTagsCountQuery()
    const { data: answersCount } = useGetAnswersCountQuery()
    const [hasPermission] = usePermissions()

    const [chosenGrades, setGrades] = useState(null)

    const tabs = [
        {
            label: 'بنك الأسئلة', component: <AdminGetQuestions isShowHeader />, count: data?.values?.count ?? 'laoding', permId: 0
        }, {
            label: 'المهارات', component: <GetTags />, count: tagsCount?.values?.count ?? 'loading', permId: 1
        }, {
            label: 'عرض الإجابات', component: <GetAnswers filteredGrade={chosenGrades?.id || undefined} />, count: answersCount?.values?.count ?? 'loading', permId: 2 //<GetUserAnswers />
        },
    ]
    const permissions = [
        hasPermission(questionsPerms('manageQuestions')),
        hasPermission(tagsPerms('manageTags')),
        hasPermission(questionsPerms('showAnswers')),
    ]

    return (
        <Section>
            <TitleWithDividers title={'بنك الأسئلة'} />
            {/* <AutoCompleteFixed
                value={chosenGrades} multiple={false} setValue={setGrades} options={handelObjsOfArr(grades, { label: 'name', id: '_id' })} label={'المواد الاساسيه'} />
            <Box my={'16px'} /> */}
            <TabsAutoStyled originalTabs={tabs} permissions={permissions} />
        </Section>
    )
}

export default GetQuestionsPage
