import { Box, Typography, useTheme, Link as MuiLink } from '@mui/material'
import { useEffect } from 'react'
import Section from '../../style/mui/styled/Section'
import BannerAuth from '../../components/ui/BannerAuth'
import { FlexBetween, FlexRow } from '../../style/mui/styled/Flexbox'
import TextBorderAround from '../../components/ui/TextBorderAround'

import { FaFileSignature } from "react-icons/fa6";
import SignupForm from '../../components/auth/SignupForm'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SEOHelmetAsync from '../../tools/SEOHelmetAsync'


const BUILD = "إنشاء"
const ACCOUNT = 'حساب'


function SignupPage() {

    const theme = useTheme()
    const navigate = useNavigate()
    const user = useSelector(s => s.global.user)

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])
    return (
        <FlexBetween sx={{ flexWrap: 'wrap-reverse' }}>
            <SEOHelmetAsync
                title={'انشاء حساب - انشئ حسابك الان على منصه الريادة'}
                desc={"انشئ حسابك الان, وابدا رحلتك فى منصه الريادة"}
                url={"https://elryada.com/signup"}
                isSiteLink={true}
            />

            {/* signup form */}
            <Section sx={{
                flex: 1
            }}>
                {/* signup title */}
                <FlexRow sx={{ justifyContent: 'center', my: '2rem' }}>

                    <TextBorderAround>

                        <span style={{ color: theme.palette.neutral[0] }}> {BUILD} </span>
                        <span style={{ marginRight: '10px', marginLeft: '10px' }}> {ACCOUNT}</span>

                        <FaFileSignature size='2rem' />
                    </TextBorderAround>

                </FlexRow>

                {/* signup form */}
                <SignupForm />
                <FlexRow gap={1}>
                    <Typography variant='body1'>
                        لديك حساب ؟
                    </Typography>
                    <MuiLink component={Link} to="/login" underline='hover' sx={{ cursor: 'pointer' }}> سجل دخولك الان !</MuiLink>
                </FlexRow>
            </Section>

            <BannerAuth img={'/assets/signup.webp'} title={BUILD + ' ' + ACCOUNT} minHeight='130vh' sx={{
                borderTopLeftRadius: '16px'
            }} />

        </FlexBetween>
    )

}

export default SignupPage
