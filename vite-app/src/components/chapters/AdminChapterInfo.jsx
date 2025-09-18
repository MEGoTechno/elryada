import { IconButton } from "@mui/material"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import InfoText from "../ui/InfoText"

import TabInfo from "../ui/TabInfo"
import { orange, red } from "@mui/material/colors"
import { MdDeleteForever, MdEdit } from "react-icons/md"

import BtnModal from "../ui/BtnModal"
import UpdateChapter from "./UpdateChapter"
import BtnConfirm from "../ui/BtnConfirm"
import { chapterPerms } from "../permissions/constants/perms"
import usePermissions from "../permissions/hooks/usePermissions"
import ChapterTeachers from "./ChapterTeachers"

import { useDeleteChapterMutation, useUpdateChapterMutation } from "../../toolkit/apis/chaptersApi"
import usePostData from "../../hooks/usePostData"
import SwitchStyled from "../../style/mui/styled/SwitchStyled"

function AdminChapterInfo({ chapter, setChapter, lecturesCount = '', deleteChapter }) {

    const [sendData, updateStatus] = useUpdateChapterMutation()
    const [updateChapter] = usePostData(sendData)

    const onSubmit = async (values) => {
        const res = await updateChapter({ ...values, _id: chapter._id, id: chapter._id })
        setChapter({ ...chapter, ...res })
    }

    const [hasPermission] = usePermissions()
    const [sendDelete, status] = useDeleteChapterMutation()
    const [deleteChapterFc] = usePostData(sendDelete)

    const deleteSubmit = async () => {
        await deleteChapterFc({ _id: chapter._id })
        deleteChapter({ _id: chapter._id })
    }

    return (
        <FlexRow gap={'12px'} sx={{ width: '100%', my: "16px" }}>
            <InfoText label={'الاسم'} description={chapter.name} />
            <InfoText label={'الوصف'} description={chapter.description} />
            <TabInfo count={lecturesCount} title={'عدد المحاضرات'} i={1} isBold={false} />
            {hasPermission(chapterPerms(chapter._id, 'update')) && (
                <SwitchStyled
                    checked={chapter.isMust}
                    onChange={(v) => onSubmit({ isMust: v })} isLoading={updateStatus.isLoading} label={'تفعيل اكمال المحاضرات'} />
            )}
            {hasPermission(chapterPerms(chapter._id, 'permissions')) && (
                <ChapterTeachers chapter={chapter} />
            )}
            
            <FlexRow gap={'4px'}>
                {hasPermission(chapterPerms(chapter._id, 'update')) && (
                    <BtnModal
                        btn={<IconButton
                            sx={{
                                bgcolor: orange[500],
                                '&:hover': {
                                    bgcolor: orange[600]
                                }
                            }}>
                            <MdEdit color={'#fff'} />
                        </IconButton>}
                        component={<UpdateChapter chapter={chapter} setChapter={setChapter} />}
                    />
                )}
                {hasPermission(chapterPerms(chapter._id, 'delete')) && (
                    <BtnConfirm
                        btn={<IconButton
                            disabled={status.isLoading}
                            onClick={deleteSubmit}
                            sx={{
                                bgcolor: red[500],
                                '&:hover': {
                                    bgcolor: red[600]
                                }
                            }}>
                            <MdDeleteForever color={'#fff'} />
                        </IconButton>} />
                )}
            </FlexRow>

            {/* <Button>الصلاحيات</Button>
            <InfoText label={'المدرس'} description={'teacher'} /> */}
        </FlexRow>
    )
}

export default AdminChapterInfo
