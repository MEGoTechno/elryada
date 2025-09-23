import { useParams } from "react-router-dom"
import HeaderContent from "../../components/ui/HeaderContent"
import Section from "../../style/mui/styled/Section"
import SEOHelmetAsync from "../../tools/SEOHelmetAsync"
import { useGetOneTeacherByIndexQuery } from "../../toolkit/apis/usersApi"
import { useGetCoursesQuery } from "../../toolkit/apis/coursesApi"
import Grid from "../../style/vanilla/Grid"
import UserCourseDetails from "../../components/content/UnitCourseDetails"
import { Alert } from "@mui/material"
import TitleSection from "../../components/ui/TitleSection"
import { FlexColumn } from "../../style/mui/styled/Flexbox"
import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton"

function TeacherPage() {
    const params = useParams()
    const { data, isLoading } = useGetOneTeacherByIndexQuery({ index: params.index })
    const teacher = data?.values?.users[0]
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery({ _id: teacher?.courses?.length ? teacher?.courses : 'empty' }, { skip: !teacher?.courses })

    if (isLoading) return <LoaderSkeleton />
    if (teacher) {
        return (
            <Section>
                <SEOHelmetAsync
                    title={" صفحه المعلم - " + teacher.name}
                    desc={teacher.description}
                    url={window.location.href}
                    isSiteLink={true}
                />
                <FlexColumn gap={'16px'}>

                    <HeaderContent title={teacher.name} body={teacher.description} sideImg={teacher?.avatar?.url}
                        sectionName={'صفحه المعلم'}
                    />

                    <TitleSection title={'الدورات التدريبيه الخاصه بالمعلم'} />
                    {coursesLoading && (
                        <LoaderSkeleton />
                    )}
                    {courses?.values?.courses?.length ? (
                        <Grid>
                            {courses?.values?.courses?.map((course, i) => <UserCourseDetails key={i} course={course} />)}
                        </Grid>
                    ) : (
                        <Alert variant="filled" severity="warning">سيتم تنزيل الدورات التدريبيه قريبا, تابع !</Alert>
                    )}
                </FlexColumn>

            </Section>
        )
    }

}

export default TeacherPage
