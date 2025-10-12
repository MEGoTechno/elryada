import { useEffect, useState } from 'react'


import Section from '../../style/mui/styled/Section'
import { Alert, Box, } from '@mui/material'
import TitleSection from '../../components/ui/TitleSection'

import { useParams } from 'react-router-dom'
import useLazyGetData from '../../hooks/useLazyGetData'

import { lang } from '../../settings/constants/arlang'
import GradeHeader from '../../components/content/GradeHeader'
import { useLazyGetUnitsQuery } from '../../toolkit/apis/unitsApi'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'

import UnitCourses from '../../components/content/UnitCourses'


import SEOHelmetAsync from '../../tools/SEOHelmetAsync'
import useGrades from '../../hooks/useGrades'
import { useLazyGetCoursesQuery } from '../../toolkit/apis/coursesApi'
import UserCourseDetails from '../../components/content/UnitCourseDetails'
import Grid from '../../style/vanilla/Grid'

function UnitsPage() {
  const { gradeId } = useParams()

  const { grades } = useGrades()
  const [grade, setGrade] = useState()
  // const user = useSelector(s => s.global.user)

  // const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  // units
  const [getCoursesFc, status] = useLazyGetCoursesQuery()
  const [getCourses] = useLazyGetData(getCoursesFc)

  useEffect(() => {
    const trigger = async () => {
      const grade = grades.find(g => g.index === Number(gradeId))
      // console.log('grade ==>', grade)
      if (!grade) return
      setGrade(grade)

      const res = await getCourses({ grade: grade._id })
      setCourses(res.courses)
    }

    if (gradeId !== "undefined" && grades.length && typeof Number(gradeId) === 'number') {
      trigger()
    }

    //  else {
    //   if (user) { navigate('/grades/' + user.grade) }
    // }
  }, [gradeId, grades])
  if (!grade) return <>Invalid</>

  return (
    <>
      {/* <GradeHeader grade={grade} /> */}
      <Section>
        <SEOHelmetAsync
          title={"الماده الاساسيه - " + grade.name}
          desc={grade.description}
          url={window.location.href}
          isSiteLink={true}
        />

        <GradeHeader grade={grade} />

        <Box sx={{ padding: '8px' }}>
          <TitleSection title={lang.GRADE_CONTENT + ' - ' + grade?.name} />
          {(status.isSuccess && courses?.length === 0) && (
            <Alert variant='filled' severity='warning'> سيتم تنزيل الدورات قريبا, تابع!</Alert>
          )}

          {status.isLoading && <LoaderSkeleton />}
          <Grid>
            {courses?.length > 0 &&
              <>
                {courses?.map((course, i) => <UserCourseDetails key={i} course={course} />)}
              </>
            }
          </Grid>
        </Box>
      </Section >
    </>

  )
}


export default UnitsPage
