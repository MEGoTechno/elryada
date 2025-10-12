import { useState } from 'react'
import { FlexBetween } from '../../style/mui/styled/Flexbox'
import { StyledBtn } from '../../style/buttonsStyles'
import SelectCourse from '../../components/content/SelectCourse'
import { lang } from '../../settings/constants/arlang'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import CourseCreate from '../../components/content/CourseCreate'
import { Alert } from '@mui/material'
import usePermissions from '../../components/permissions/hooks/usePermissions'
import { coursesPerms } from '../../components/permissions/constants/courses'

function ManageCourses({ grade, activeCourse, setActiveCourse, courses, setCourses }) { //activeUnit, 

    const [openCourseModal, setCourseModal] = useState(false)
    const [hasPermission] = usePermissions()
    return (
        <>
            <FlexBetween gap={'10px'} m={'20px 0'} >
                {hasPermission(coursesPerms(null, 'create')) && (
                    <StyledBtn disabled={!grade} onClick={() => setCourseModal(true)}> {lang.CREATE_COURSE}</StyledBtn>
                )}
                <SelectCourse grade={grade} setActiveCourse={setActiveCourse} activeCourse={activeCourse} courses={courses} setCourses={setCourses} />
                {/* unit={activeUnit}  */}
                {/* reset={[activeUnit]} */}
            </FlexBetween>

            <ModalStyled open={openCourseModal} setOpen={setCourseModal} >
                {(grade) ?
                    <CourseCreate grade={grade} setCourses={setCourses} />
                    // unit={activeUnit}
                    : <Alert severity='warning'>من فضلك اختر ماده دراسيه !</Alert>
                }
            </ModalStyled>
        </>
    )
}

export default ManageCourses
