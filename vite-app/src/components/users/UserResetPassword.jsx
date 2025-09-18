import { Button } from "@mui/material"
import { useUpdateUserMutation } from "../../toolkit/apis/usersApi"
import usePostData from "../../hooks/usePostData"
import Loader from "../../style/mui/loaders/Loader"
import BtnConfirm from "../ui/BtnConfirm"

function UserResetPassword({ setUser, user }) {
    const [sendData, { isLoading }] = useUpdateUserMutation()
    const [updateUser] = usePostData(sendData)

    const resetPassword = async () => {
        const resUser = await updateUser({ _id: user._id, password: 'reset' })
        if (setUser) {
            setUser({ ...resUser })
        }
    }

    return (
        <BtnConfirm
            modalInfo={{
                desc: ' سيتم اعاده ضبط كلمه السر لتكون مثل اسم المستخدم '
            }}
            btn={<Button disabled={user.isResetPassword} onClick={resetPassword}>
                {isLoading ? <Loader /> : 'اعاده ضبط كلمه السر'}
            </Button>}
        />
    )
}

export default UserResetPassword
