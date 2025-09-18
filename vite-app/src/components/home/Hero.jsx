import { Box, Typography, useTheme, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from "@mui/material"
import { FlexBetween, FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox"
import { OutLinedHoverBtn, ScallyBtn } from "../../style/buttonsStyles"
import SpecialCard from "../ui/cards/SpecialCard"
import CardService from "../ui/CardService"
import CardInfo from "../../style/mui/components/CardInfo"
import Grid from "../../style/vanilla/Grid"
import { Link } from 'react-router-dom'

function Hero() {
    const theme = useTheme()
    return (
        <FlexRow sx={{ justifyContent: 'space-around', position: 'relative', flexWrap: 'wrap-reverse' }}>
            {/* <img src="./assets/envelope-p.png" style={{ width: '30px', height: '44px', position: 'absolute', top: '0', right: '10%', objectFit: 'contain' }} /> */}
            <FlexColumn gap={'16px'} >
                <FlexColumn sx={{ alignItems: 'flex-start', gap: '16px' }}>
                    <FlexRow>
                        <Typography variant="banner" >
                            <span style={{ fontWeight: 400 }}>منصة </span>
                            <span style={{ fontWeight: 700, color: theme.palette.primary.main }}>الريادة </span>
                        </Typography>
                        <img src="./assets/arrow.svg" style={{ width: '60px' }} />
                    </FlexRow>
                    {/* <Typography variant="subBanner">منصه واحده لكل احتيجاتك للتعلم بسهوله</Typography> */}
                    <Typography variant="subtitle1" sx={{ maxWidth: '450px' }}> منصتك الرقميه التي تهتم بتنميه مهارات الطلاب وبناء مهاراتهم العمليه من خلال دورات تدريبيه وتوفير معلمين ذوي خبره فى تدريس المناهج</Typography>

                </FlexColumn>
                {/* <OutLinedHoverBtn sx={{ minWidth: '250px', }}>عرض دورات المنصه</OutLinedHoverBtn> */}
                <ScallyBtn component={Link} to='/signup' endIcon={<img style={{ width: '30px' }} alt='التسجيل' src='/assets/icon-signup.svg' />} sx={{ minWidth: '250px', fontSize: '1.5rem', borderRadius: 1 }}>قم بالتسجيل الان !</ScallyBtn>
                <Grid min="150px" gap="6px" sx={{ width: '100%' }} >
                    <CardInfo caption={'برامج تدريبيه '} icon={<img src="./assets/course-icon.svg" style={{ width: '40px' }} />} />
                    <CardInfo caption={'نخبه من المعلمين'} icon={<img src="./assets/teacher-icon.svg" style={{ width: '40px' }} />} />
                    <CardInfo caption={'اختبارات وبنك اسئله  '} icon={<img src="./assets/questions-icon.svg" style={{ width: '40px' }} />} />
                    {/* <CardService dir="vert"  icon={<img src="./assets/arrow.svg" style={{ width: '60px' }} />} desc={'دورات تدريبيه'} color="primary.main" /> */}
                </Grid>
            </FlexColumn>

            <img src="./assets/hero.webp" style={{
                maxWidth: '550px', flexShrink: 1
            }} />
        </FlexRow>
    )
}

export default Hero
