import { Box, useMediaQuery } from '@mui/material'
import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'

import Navbar from '../components/header/Navbar'
import Sidebar from '../components/header/Sidebar'
import GlobalMsg from '../components/ui/GlobalMsg'

import LoaderSkeleton from "../style/mui/loaders/LoaderSkeleton"
import FooterPage from '../components/footer/FooterPage'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyIsLoggedQuery } from '../toolkit/apis/usersApi'
import { setUser } from '../toolkit/globalSlice'


function Layout() {

    const location = useLocation()
    const isMobileScreen = useMediaQuery('(max-width:630px)');
    const [isOpenedSidebar, setSidebar] = useState(false)

    const pathName = location.pathname
    const user = useSelector(s => s.global?.user)
    useEffect(() => {
        window.scrollTo({
            top: 0, left: 0, behavior: 'instant'
        })
    }, [pathName])

    useEffect(() => {
        if (localStorage.getItem('prevPage')) {
            const prev = localStorage.getItem('prevPage')
            localStorage.removeItem('prevPage')
            window.location.href = prev
        }
    }, [])

    const dispatch = useDispatch()
    const [getUserData] = useLazyIsLoggedQuery()

    useEffect(() => {
        const checkIslogged = async () => {
            const { data } = await getUserData()
            const userData = data?.values

            dispatch(setUser({ ...user, ...userData }))
        }
        if (user?._id && user?.userName) {
            checkIslogged()
        }
    }, [])

    return (
        <Box>
            <Navbar isOpenedSidebar={isOpenedSidebar} setSidebar={setSidebar} isMobileScreen={isMobileScreen} />
            <Sidebar isOpenedSideBar={isOpenedSidebar} setSideBar={setSidebar} />
            <Suspense fallback={<LoaderSkeleton />}>
                <Box sx={{ width: '100%', minHeight: '80vh' }}>
                    <Outlet />
                </Box>
            </Suspense>
            <FooterPage />
            <GlobalMsg />
        </Box >
    )
}

export default Layout
