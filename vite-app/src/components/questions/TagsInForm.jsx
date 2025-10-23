import { memo, useEffect, useMemo, useState } from "react"
import useLazyGetData from "../../hooks/useLazyGetData"
import AutoCompleteFixed from "../../style/mui/styled/AutoCompleteFixed"
import { useLazyGetTagsQuery } from "../../toolkit/apis/tagsApi"
import { handelObjsOfArr } from "../../tools/fcs/MakeArray"
import { useField } from "formik"
import { FlexBetween } from "../../style/mui/styled/Flexbox"


function TagsInForm({ value, input, inputName, setValue }) {
    const [tags, setTags] = useState([])

    const [{ value: grade }] = useField(inputName.replace('tags', 'grade'))
    const [getTags, { isLoading }] = useLazyGetTagsQuery()
    const [getTagsFc] = useLazyGetData(getTags)

    useEffect(() => {
        const trigger = async () => {
            const res = await getTagsFc({ grade });
            setTags(res.tags);
        };
        trigger();
    }, [grade]);

    const formattedTags = useMemo(
        () => handelObjsOfArr(tags, { label: 'name', id: '_id' }),
        [tags]
    );

    return (
        <FlexBetween sx={{ width: '100%' }}>
            {/* <ChooseChapter value={chapter} setValue={setChapter} input={{ label: 'الفرع' }} defaultGrade={grade} /> */}
            {/* <AutoCompleteFixed sx={{ maxWidth: { xs: '100%', md: '45%' } }} variant="filled"
                reset={[grade]}
                options={formattedTags} isLoading={isLoading} label={'الفرع'} multiple={false}
                value={value} setValue={setValue} /> */}

            <AutoCompleteFixed sx={{ maxWidth: { xs: '100%' } }} variant="filled"
                // reset={[grade]}
                options={formattedTags} isLoading={isLoading} label={'المهاره'} multiple={false}
                value={Array.isArray(value) ? value[0] : value} setValue={setValue} />
        </FlexBetween>
    )
}

export default memo(TagsInForm)
