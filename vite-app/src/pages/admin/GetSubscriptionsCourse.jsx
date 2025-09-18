import { useParams } from 'react-router-dom'
import Section from '../../style/mui/styled/Section'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { useGetOneCourseQuery } from '../../toolkit/apis/coursesApi'
import GetSubscriptionsNot from './GetSubscriptionsNot'

import GetSubscriptions from '../../components/subscriptions/GetSubscriptions'
import TabsAutoStyled from '../../style/mui/styled/TabsAutoStyled'
import usePermissions from '../../components/permissions/hooks/usePermissions'
import { coursesPerms } from '../../components/permissions/constants/courses'

function GetSubscriptionsCourse() {

    const { courseId } = useParams()
    const { data, isLoading } = useGetOneCourseQuery({ _id: courseId })
    const [hasPermission] = usePermissions()

    if (isLoading) return <LoaderSkeleton />
    const tabs = [
        { label: 'الطلاب المشتركون', component: <GetSubscriptions courseId={courseId} />, permId: 0 },
        { label: 'الطلاب الغير مشتركين', component: <GetSubscriptionsNot grade={data?.values?.grade} />, permId: 1 },

    ]
    const permissions = [
        hasPermission(coursesPerms(courseId, 'subscriptions'), ['p_subscriptions']),
        hasPermission(coursesPerms(courseId, 'addSubscriptions'), ['p_subscriptions']),
    ]
    return (
        <Section>
            <TitleWithDividers title={'اسم الكورس : ' + data?.values?.name} />
            <TabsAutoStyled originalTabs={tabs} permissions={permissions} />
        </Section>
    )
}

export default GetSubscriptionsCourse
