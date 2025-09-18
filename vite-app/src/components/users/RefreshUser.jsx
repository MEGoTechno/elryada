import { IconButton } from '@mui/material'
import { useLazyIsLoggedQuery } from '../../toolkit/apis/usersApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../../toolkit/globalSlice'
import { HiOutlineRefresh } from 'react-icons/hi'

function RefreshUser({ disabled }) {
    const dispatch = useDispatch()
    const [getUserData, statusRefresh] = useLazyIsLoggedQuery()

    const refreshUser = async () => {
        const { data } = await getUserData()
        const userData = data?.values
        dispatch(setUser({ ...userData }))
    }

    return (
        <IconButton disabled={disabled || statusRefresh.isLoading} onClick={() => {
            refreshUser()
        }}>
            <HiOutlineRefresh style={{ animation: (statusRefresh.isFetching) && 'rotate .5s linear 0s infinite', color: 'inherit' }} />
        </IconButton>
    )
}

export default RefreshUser
