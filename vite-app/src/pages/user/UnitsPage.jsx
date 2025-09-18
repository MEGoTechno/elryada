import { useEffect, useState } from 'react'


import Section from '../../style/mui/styled/Section'
import { Alert, Box,  } from '@mui/material'
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

function UnitsPage() {
  const { gradeId } = useParams()

  const { grades } = useGrades()
  const [grade, setGrade] = useState()
  // const user = useSelector(s => s.global.user)

  // const navigate = useNavigate()
  const [units, setUnits] = useState([])
  // units
  const [getUnitsFc, status] = useLazyGetUnitsQuery()
  const [getUnits] = useLazyGetData(getUnitsFc)

  useEffect(() => {
    const trigger = async () => {
      const grade = grades.find(g => g.index === Number(gradeId))
      // console.log('grade ==>', grade)
      if (!grade) return
      setGrade(grade)
      const res = await getUnits({ grade: grade._id })
      setUnits(res.units)
    }

    if (gradeId !== "undefined" && grades.length && typeof Number(gradeId) === 'number') {
      trigger()
    }
    //  else {
    //   if (user) { navigate('/grades/' + user.grade) }
    // }
  }, [gradeId, grades])
  if (!grade) return

  return (
    <>
      {/* <GradeHeader grade={grade} /> */}
      <Section>
        <SEOHelmetAsync
          title={"الصف الدراسي - " + grade.name}
          desc={grade.description}
          url={window.location.href}
          isSiteLink={true}
        />

        <GradeHeader grade={grade} />

        <Box sx={{ padding: '8px' }}>
          <TitleSection title={lang.GRADE_CONTENT} />
          {(status.isSuccess && units?.length === 0) && (
            <Alert variant='filled' severity='warning'>الوحدات هتنزل قريب , خليك متابع !</Alert>
          )}

          {status.isLoading && <LoaderSkeleton />}
          {units?.length > 0 &&
            <>
              {units?.map((unit, i) => <UnitCourses key={i} unit={unit} />)}
            </>
          }
        </Box>
      </Section >
    </>

  )
}


export default UnitsPage
