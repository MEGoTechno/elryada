import { useEffect, useState } from 'react'
import HeaderContent from '../ui/HeaderContent'

import { useLazyGetCoursesCountQuery, useLazyGetLecturesCountQuery, useLazyGetUnitsCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'

import { lang } from '../../settings/constants/arlang'

import { CoursesIcon, UnitsIcon, VidsIcon2 } from '../ui/svg/ContentSvgs'
// import GradeHeaderBanner from '../grades/GradeHeaderBanner'

function GradeHeader({ grade }) {

    const [unitsCount, setUnitsCount] = useState('يتم التحميل ...!')
    const [coursesCount, setCoursesCount] = useState('يتم التحميل ...!')
    const [lecturesCount, setLecturesCount] = useState('يتم التحميل ...!')


    const [getUnits] = useLazyGetUnitsCountQuery()
    const [getCourses] = useLazyGetCoursesCountQuery()
    const [getLectures] = useLazyGetLecturesCountQuery()

    const [getUnitsCount] = useLazyGetData(getUnits)
    const [getCoursesCount] = useLazyGetData(getCourses)
    const [getLecturesCount] = useLazyGetData(getLectures)



    useEffect(() => {
        const trigger = async () => {
            const unitsCountRes = await getUnitsCount({ grade: grade._id })
            const coursesCountRes = await getCoursesCount({ grade: grade._id, isActive: true })
            const lecturesCountRes = await getLecturesCount({ grade: grade._id, isActive: true })

            setUnitsCount(unitsCountRes.count || 0)
            setCoursesCount(coursesCountRes.count || 0)
            setLecturesCount(lecturesCountRes.count || 0)
        }

        trigger()
    }, [])

    return (
        <HeaderContent title={grade.name} body={grade.description} img={grade.image.url} middle={true}
        sectionName={'الماده الاساسيه'}
            infos={[{
                caption: lang.UNITS, desc: '+ ' + unitsCount, icon: <UnitsIcon size='1.5rem' />
            },
            {
                caption: lang.COURSES_NUMBER, desc: '+ ' + coursesCount, icon: <CoursesIcon size='1.5rem' />
            }, {
                caption: lang.LECTURES, desc: '+ ' + lecturesCount, icon: <VidsIcon2 size='1.5rem' />
            }
            ]} />
    )
}

export default GradeHeader
