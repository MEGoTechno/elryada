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


function GetQuestionsPage() {

    const { data } = useGetQuestionsCountQuery()
    const { data: tagsCount } = useGetTagsCountQuery()
    const { data: answersCount } = useGetAnswersCountQuery()
    const [hasPermission] = usePermissions()

    const tabs = [
        {
            label: 'بنك الاسئله', component: <AdminGetQuestions />, count: data?.values?.count ?? 'laoding', permId: 0
        },
        {
            label: 'الروابط', component: <GetTags />, count: tagsCount?.values?.count ?? 'loading', permId: 1
        }, {
            label: 'عرض الايجابات', component: <GetAnswers />, count: answersCount?.values?.count ?? 'loading', permId: 2 //<GetUserAnswers />
        },
    ]
    const permissions = [
        hasPermission(questionsPerms('manageQuestions')),
        hasPermission(tagsPerms('manageTags')),
        hasPermission(questionsPerms('showAnswers')),
    ]

    return (
        <Section>
            <TitleWithDividers title={'بنك الاسئله'} />
            <TabsAutoStyled originalTabs={tabs} permissions={permissions} />
        </Section>
    )
}

export default GetQuestionsPage
