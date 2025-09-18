import { useEffect, useMemo, useState } from 'react'
import TabsStyled from '../../style/mui/styled/TabsStyled'
import { handelObjsOfArr } from '../../tools/fcs/MakeArray'


import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton';
import { lang } from '../../settings/constants/arlang';
import useGrades from '../../hooks/useGrades';

function GradesTabs({ setGrade, counts, grade }) {

    const { grades: originalGrades } = useGrades()

    // const [value, setValue] = React.useState(grade);
    const addedCounts = useMemo(() => originalGrades.map((g, i) => ({ ...g, count: counts[i + 1]?.count })), [counts, originalGrades])

    const grades = handelObjsOfArr(addedCounts, { value: '_id', label: 'name', count: 'count' })
    const [gradeOptions, setGradeOptions] = useState([])

    useEffect(() => {
        setGradeOptions(
            [{ label: lang.ALL, value: 0, count: counts[0]?.count }, ...grades]
        )

    }, [counts])

    if (gradeOptions.length === 0) return <LoaderSkeleton />

    return (
        <TabsStyled value={grade} setValue={setGrade}
            tabs={gradeOptions}
        />
    )
}

export default GradesTabs
