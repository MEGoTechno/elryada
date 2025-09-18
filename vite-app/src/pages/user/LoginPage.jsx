import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Typography, useTheme, Link as MuiLink } from '@mui/material'

import { LoginAnimatedIcon } from '../../components/ui/svg/Registers'
import LoginForm from '../../components/auth/LoginForm'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'

import BannerAuth from '../../components/ui/BannerAuth'
import TextBorderAround from '../../components/ui/TextBorderAround'
import { lang } from '../../settings/constants/arlang'
import ModalStyled from '../../style/mui/styled/ModalStyled'

import SEOHelmetAsync from '../../tools/SEOHelmetAsync'
import ForgetPassword from '../../components/auth/ForgetPassword'
import Section from '../../style/mui/styled/Section'

function LoginPage() {

    const theme = useTheme()
    const navigate = useNavigate()
    const user = useSelector(s => s.global.user)
    const location = useLocation()
    const isPrev = location.state

    useEffect(() => {
        if (user && isPrev) {
            navigate(-1)
        }
        if (user) {
            navigate('/')
        }
    }, [user, navigate])
    const [open, setOpen] = useState(false)
    return (
        <FlexBetween>
            <SEOHelmetAsync
                title={'تسجيل الدخول - تسجيل الدخول لمنصه الريادة'}
                desc={"سجل دخولك الان, وابدا رحلتك فى منصه الريادة"}
                url={window.location.href}
                isSiteLink={true}
            />
            <BannerAuth title={lang.LOGIN_ENTRY} img={'/assets/login.png'} sx={{ borderTopRightRadius: '16px', }} />
            {/* Login form */}
            <FlexColumn sx={{
                flex: 1
            }}>
                <Section>
                    {/* login form */}
                    <Box>
                        <FlexRow sx={{ justifyContent: 'center', mt: '2rem' }}>
                            <TextBorderAround>
                                {/* <ReactLoginIcon style={{ margin: '0 10px' }} size={'2rem'} /> */}
                                {/* <img src='./assets/teacher-icon.svg' style={{width: '2rem'}} /> */}

                                <span style={{ color: theme.palette.neutral[0] }}> {lang.LOGIN} </span>
                                <span style={{ marginRight: '10px' }}> {lang.ENTRY}</span>
                                <div style={{
                                    transform: 'rotate(180deg)'
                                }}>
                                    <LoginAnimatedIcon size='2rem' />
                                </div>
                            </TextBorderAround>
                        </FlexRow>

                        <LoginForm />
                        <FlexRow gap={1}>
                            <Typography variant='body1'>
                                ليس لديك حساب ؟
                            </Typography>
                            <MuiLink component={Link} to="/signup" underline='hover' sx={{ cursor: 'pointer' }}>انشئ حساب الان !</MuiLink>
                        </FlexRow>
                        <MuiLink component={Link} to="/signup" onClick={(e) => {
                            e.preventDefault()
                            setOpen(true)
                        }} underline='always' sx={{ cursor: 'pointer', mt: '4px' }}> هل نسيت كلمه السر ؟</MuiLink>
                    </Box>
                </Section>

                <ModalStyled open={open} setOpen={setOpen} fullWidth={true} >
                    <ForgetPassword />
                </ModalStyled>
            </FlexColumn>

        </FlexBetween >
    )
}

export default LoginPage
