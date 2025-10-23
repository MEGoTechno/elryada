import { useCallback, useEffect, useState } from "react"
import AutoCompleteFixed from "../../style/mui/styled/AutoCompleteFixed"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import { handelObjsOfArr } from "../../tools/fcs/MakeArray"
import { tagsPerms } from "../permissions/constants/perms"
import usePermissions from "../permissions/hooks/usePermissions"
import CreateTag from "../tags/CreateTag"
import BtnModal from "../ui/BtnModal"
import { useLazyGetTagsQuery } from "../../toolkit/apis/tagsApi"
import useLazyGetData from "../../hooks/useLazyGetData"
import { useGetChaptersQuery } from "../../toolkit/apis/chaptersApi"

function AdminTagQs({ filterTags, setFilterTags, setGrade, grade, setReset, reset }) {// grade, 

    const [tags, setTags] = useState([])
    const [chapter, setChapter] = useState()

    const [hasPermission] = usePermissions()

    const { isLoading, data } = useGetChaptersQuery({ populate: 'grade.name' }, { refetchOnMountOrArgChange: true })

    const [getTags, { isLoading: tagsLoader, }] = useLazyGetTagsQuery()
    const [getTagsFc] = useLazyGetData(getTags)

    useEffect(() => {
        const trigger = async () => {
            const res = await getTagsFc({ chapters: chapter })
            setTags(res.tags) // as Options
        }

        trigger()
    }, [chapter, reset])

    const getLabel = useCallback(opt => (opt?.label + ' - ' + opt?.grade?.name) || '', [])
    const defineGrade = useCallback((chapter) => setGrade(chapter?.grade?._id), [])

    return (
        <FlexRow gap={'12px'}>
            {/* <AutoCompleteFixed
                variant={'filled'}
                value={grade}
                multiple={false} setValue={setGrade}
                options={handelObjsOfArr(grades, { label: 'name', id: '_id' })} label={'المواد الاساسيه'} /> */}
            <AutoCompleteFixed
                variant={'filled'}
                value={chapter} isLoading={isLoading} 
                addSetFc={defineGrade}
                multiple={false} setValue={setChapter} getLabel={getLabel}
                options={handelObjsOfArr(data?.values?.chapters || [], { label: 'name', id: '_id', grade: 'grade' })}
                label={'الفروع'}
            />

            <AutoCompleteFixed
                variant={'standard'}
                value={filterTags} reset={[chapter]} isLoading={tagsLoader}
                multiple setValue={setFilterTags}
                options={handelObjsOfArr(tags, { label: 'name', id: '_id' })} label={'المهارات'} />

            {hasPermission(tagsPerms('manageTags')) && (
                <BtnModal
                    fullWidth={true} btnName={'إنشاء مهاره'}
                    component={<CreateTag setReset={setReset} defaultGrade={grade} defaultChapter={chapter} />}
                    size='medium' isFilledHover={true} />
            )}
        </FlexRow>
    )
}

export default AdminTagQs
