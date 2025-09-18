import { useMemo, useState } from "react"
import DataWith3Items from "../ui/DataWith3Items"
import InfoText from "../ui/InfoText"
import TabInfo from "../ui/TabInfo"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import { Button, IconButton, } from "@mui/material"
import { HiMinus, HiPlus } from "react-icons/hi"

import usePostData from "../../hooks/usePostData"
import BtnConfirm from "../ui/BtnConfirm"
import { useUpdateSubscriptionChapterIndexMutation } from "../../toolkit/apis/userCoursesApi"
import Loader from "../../style/mui/loaders/Loader"

function ModifyProgress({ chapter, params, setReset }) {
    const [currentIndex, setCurrentIndex] = useState(chapter.currentIndex)
    const originalIndex = useMemo(() => chapter.currentIndex, [chapter])

    const [sendData, status] = useUpdateSubscriptionChapterIndexMutation()
    const [update] = usePostData(sendData)

    const onSubmit = async () => {
        await update({
            id: params.row._id,
            chapter: chapter.chapter._id,
            currentIndex
        })
        setReset(pre => !pre)
    }

    return (
        <DataWith3Items key={chapter._id}
            src={params.row?.avatar?.url}
            title={
                <InfoText label={'اسم الجزء'} description={chapter.chapter.name} />
            }
            desc={<FlexRow gap={'8px'}>
                <TabInfo isBold={false} title={'هذا الطالب عند المحاضره : '} count={currentIndex} i={0} />
                <FlexRow>
                    <IconButton  size="small" onClick={() => setCurrentIndex(currentIndex + 1)}><HiPlus /></IconButton>
                    <IconButton disabled={currentIndex <= 1} size="small" onClick={() => setCurrentIndex(currentIndex - 1)}><HiMinus /></IconButton>
                    {originalIndex !== currentIndex && (
                        <BtnConfirm >
                            <Button disabled={status.isLoading} endIcon={status.isLoading && <Loader />} onClick={onSubmit} variant="outlined" size="small">حفظ</Button>
                        </BtnConfirm>
                    )}
                </FlexRow>
            </FlexRow>} />
    )
}

export default ModifyProgress
