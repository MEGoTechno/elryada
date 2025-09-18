import './home.css'
import Section from '../../style/mui/styled/Section'
import { FlexBetween, FlexColumn } from '../../style/mui/styled/Flexbox'
import { Box, Typography } from '@mui/material'
import Grid from '../../style/vanilla/Grid'
import CardInfo from '../../style/mui/components/CardInfo'


function Services() {
    return (
        <Box className='rotating-border' sx={{
            background: "linear-gradient(135deg, #ffcc80, #ff9800, #f57c00) !important",
        }}>
            <Section>
                <FlexBetween>
                    <FlexColumn sx={{ flexGrow: 1 }}>
                        <Typography  color={'grey.0'}> كيف ستفيدك <Typography variant='subBanner'>منصه الريادة</Typography> ؟</Typography>
                        <Box sx={{ p: '16px', maxWidth: '450px' }}>
                            <Typography variant='body1'  color={'grey.0'}>
                                منصه الريادة تقدم لك مجموعات من الكورسات المختلفه التي تناسب اهتماماتك واهدافك التعليميه من خلال مدرسين وخبراء متخصصون فى شرح المناهج بطرق مبسطه وسهله.

                            </Typography>
                        </Box>
                        <Grid min="200px" gap="6px" sx={{ width: '100%' }} >

                            <CardInfo sx={{ width: '100%' }} caption={'حفظ ومتابعة تقدّم الطالب'}
                                desc={<ul>
                                    <li>جميع الأسئلة التي يحلّها الطالب تُحفظ تلقائيًا في حسابه.</li>
                                    <li>يمكن للطالب مراجعة إجاباته السابقة وتحليل أخطائه بسهولة.</li>
                                </ul>}
                                icon={<img src="https://www.svgrepo.com/show/530119/desk-lamp.svg" style={{ width: '190px' }} />} />

                            <CardInfo
                                sx={{ width: '100%' }}
                                caption={"اختبارات محاكية للاختبارات الرسمية"}
                                icon={<img src="https://www.svgrepo.com/show/530143/certificate.svg" style={{ width: '190px' }} />}
                                desc={
                                    <ul>
                                        <li>محاكاة واقعية للاختبارات الوطنية مثل القدرات والتحصيلي.</li>
                                        <li>تقارير مفصلة بنتائج الطالب ونصائح لتحسين الأداء.</li>
                                    </ul>
                                }
                            />

                            <CardInfo sx={{ width: '100%' }}
                                caption={"فيديوهات شرح تفاعلية"}
                                icon={<img src="https://www.svgrepo.com/show/530152/online-class.svg" style={{ width: '190px' }} />}
                                desc={
                                    <ul>
                                        <li>مكتبة ضخمة من الفيديوهات التعليمية المصمّمة وفق المناهج السعودية.</li>
                                        <li>تقارير مفصلة بمشاهدات و نتائج الطالب ترسل للطالب ولولي الامر من اجل المتابعه.</li>
                                    </ul>
                                } />
                            {/* <CardService dir="vert"  icon={<img src="./assets/arrow.svg" style={{ width: '60px' }} />} desc={'دورات تدريبيه'} color="primary.main" /> */}
                        </Grid>
                    </FlexColumn>
                    {/* <img src='https://www.svgrepo.com/show/530165/mobile-phone-binding.svg' style={{ width: '500px' }} /> */}
                </FlexBetween>
            </Section>
        </Box >
    )
}
//textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: 'red'
export default Services
