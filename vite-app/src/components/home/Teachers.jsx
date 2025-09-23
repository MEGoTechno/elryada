import { Box, Rating, Typography } from "@mui/material"
import { useGetTeachersQuery } from "../../toolkit/apis/usersApi"
import Section from "../../style/mui/styled/Section"

import { FlexColumn } from "../../style/mui/styled/Flexbox"
import Grid from "../../style/vanilla/Grid"
import { TextBorderWithIcons } from "../ui/TextBorderAround"
import { Link } from "react-router-dom"

function Teachers() {
    const { data, isLoading } = useGetTeachersQuery()

    const teachers = [
        { name: 'احمد عصام السيد', description: 'lorem ipsum dolar set imt', avatar: { url: './assets/bill.webp' }, id: 1 },
        { name: 'احمد عصام السيد', description: 'lorem ipsum dolar set imt', avatar: { url: './assets/bill.webp' }, id: 2 },
        { name: 'احمد عصام السيد', description: 'lorem ipsum dolar set imt', avatar: { url: './assets/bill.webp' }, id: 2 },
        { name: 'احمد عصام السيد', description: 'lorem ipsum dolar set imt', avatar: { url: './assets/bill.webp' }, id: 2 },
        { name: 'احمد عصام السيد', description: 'lorem ipsum dolar set imt', avatar: { url: './assets/bill.webp' }, id: 2 },

    ]
    //https://codesandbox.io/p/sandbox/infinite-marquee-with-framer-motion-wheel-scroll-d78he6?file=%2Fsrc%2FApp.tsx
    // if (isLoading) return <>loading</>
    if (data?.values?.users?.length)
        return (
            <Section>
                <TextBorderWithIcons title={'خبراء منصه الريادة'} endIcon={<img src='./assets/teacher-icon.svg' style={{ width: '40px' }} />} />
                <Grid>
                    {data?.values?.users && [...data.values.users].map((teacher, i) => {
                        return <Box component={Link} to={'/teachers/' + teacher.index} key={i}
                            sx={{
                                width: 'fit-content', borderRadius: '0 16px 0 16px', bgcolor: 'background.alt', p: '32px',
                                cursor: 'pointer', textDecoration: 'none', color: 'neutral.0',
                                '&:hover img': {
                                    filter: 'saturate(140%) !important', '--scale': ' 1.15 !important', '--scale-sm': '.9 !important'
                                }
                            }}>
                            <FlexColumn sx={{ height: '100%' }}>
                                <Box sx={{ position: 'relative', '--scale': 1 }}>
                                    {/* Image */}
                                    {teacher.hasBg ?
                                        <img src={teacher.avatar.url} style={{
                                            width: '100%', maxHeight: '220px', borderRadius: '0 16px 0 32px', transition: '.3s ease all',
                                        }} />
                                        : (
                                            <>
                                                <Box sx={{
                                                    position: 'absolute', top: 0, left: 0, bgcolor: teacher.bg || 'background.default',
                                                    width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', borderRadius: '0 16px 0 32px',
                                                    // border: '1px solid', borderColor: 'primary.dark'
                                                }}>
                                                    <Box position={'relative'}>
                                                        <img
                                                            src={"./assets/teacher-banner.png"}
                                                            style={{
                                                                position: 'absolute', top: '0', height: 'auto', '--px': '50%',
                                                                transition: '.3s ease all', transform: 'scaleX(var(--scale)) scaleY(var(--scale))', zIndex: 7,
                                                            }} />
                                                    </Box>
                                                </Box>
                                                <img
                                                    src={teacher.avatar.url}
                                                    style={{
                                                        transition: '.3s ease all', objectFit: 'cover',
                                                        transformOrigin: 'bottom', width: '80%', height: 'auto',
                                                        transform: 'translateX(-12.5%) scaleX(var(--scale)) scaleY(var(--scale))',
                                                        // filter: 'drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.3))'
                                                    }} />
                                            </>
                                        )}

                                </Box>
                                <Typography variant="h5" sx={{ zIndex: 2, textAlign: 'center' }}>{teacher.name}</Typography>
                                <Typography variant="body1" sx={{ zIndex: 2 }}>{teacher.description}</Typography>
                                <Rating readOnly value={5} />
                            </FlexColumn>
                        </Box>
                    })}

                </Grid>
            </Section>
        )
}

export default Teachers
