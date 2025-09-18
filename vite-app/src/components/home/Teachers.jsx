import { Box, Paper, Rating, Typography, useTheme } from "@mui/material"
import { useGetTeachersQuery } from "../../toolkit/apis/usersApi"
import Section from "../../style/mui/styled/Section"
import TitleWithDividers from "../ui/TitleWithDividers"
import { FlexColumn } from "../../style/mui/styled/Flexbox"
import Grid from "../../style/vanilla/Grid"
import { TextBorderWithIcons } from "../ui/TextBorderAround"

function Teachers() {
    const { data, isLoading } = useGetTeachersQuery()
    const theme = useTheme()
    const teachers = [
        { name: 'احمد عصام السيد', descritpion: 'lorem ipsum dolar set imt', img: './assets/bill.webp', id: 1 },
        { name: 'احمد عصام السيد', descritpion: 'lorem ipsum dolar set imt', img: './assets/bill.webp', id: 2 },

    ]
    //https://codesandbox.io/p/sandbox/infinite-marquee-with-framer-motion-wheel-scroll-d78he6?file=%2Fsrc%2FApp.tsx
    // if (isLoading) return <>loading</>
    if (teachers)
        return (
            <Section>
                <TextBorderWithIcons title={'خبراء منصه الريادة'} />

                {/* <Box sx={{ position: 'relative' }}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
                        <path fill="#EFA14D" d="M57,-18.7C65.5,7.6,58.3,38.9,41.1,49.9C23.8,60.8,-3.4,51.4,-26,35.1C-48.7,18.8,-66.8,-4.4,-61.7,-26C-56.6,-47.7,-28.3,-67.7,-2,-67.1C24.3,-66.4,48.5,-45,57,-18.7Z" transform="translate(100 100)" />
                    </svg>
                    <img src={'./assets/bill.webp'} style={{
                        transition: '.3s ease all', maxWidth: '200px', objectFit: 'contain',
                        marginBottom: '16px', '--scale': 1,
                        position: "absolute", top: 0, left: '50%', transformOrigin: 'bottom',
                        transform: 'translateX(-50%) scaleX(var(--scale)) scaleY(var(--scale))'
                    }} />
                </Box> */}

                {/* <Box sx={{
                    height: '250px', width: '250px', '&:hover img': {
                        filter: 'saturate(140%) !important', '--scale': '1.1 !important'
                    }
                }} position={'relative'} >
                    <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden', bgcolor: 'red' }}>
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
                            <path fill="#EFA14D" d="M57,-18.7C65.5,7.6,58.3,38.9,41.1,49.9C23.8,60.8,-3.4,51.4,-26,35.1C-48.7,18.8,-66.8,-4.4,-61.7,-26C-56.6,-47.7,-28.3,-67.7,-2,-67.1C24.3,-66.4,48.5,-45,57,-18.7Z" transform="translate(100 100)" />
                        </svg>
                    </Paper>
                    <img src={'./assets/bill.webp'} style={{
                        transition: '.3s ease all',
                        marginBottom: '16px', '--scale': 1,
                        position: "absolute", bottom: 0, left: '50%', transformOrigin: 'bottom',
                        transform: 'translateX(-50%) scaleX(var(--scale)) scaleY(var(--scale))',
                        width: '80%', height: 'auto', verticalAlign: 'middle'
                    }} />
                </Box> */}

                <Grid>
                    {teachers.map(teacher => {
                        return <Paper key={teacher.id} elevation={1}
                            sx={{
                                width: 'fit-content', borderRadius: '0 16px 0 16px', bgcolor: theme.palette.primary.main + 30, '&:hover img': {
                                    filter: 'saturate(140%) !important', '--scale': ' 1.15 !important', '--scale-sm': '.9 !important'
                                }
                            }}>
                            <FlexColumn>
                                <Box sx={{ position: 'relative', '--scale': 1 }}>
                                    <Box sx={{
                                        position: 'absolute', top: 0, left: 0,
                                        width: '100%', height: '100%', bgcolor: '#fff', zIndex: 0, overflow: 'hidden', borderRadius: '0 16px 0 32px',
                                        // border: '1px solid', borderColor: 'primary.dark'
                                    }}>
                                        <Box position={'relative'}>
                                            <img
                                                style={{
                                                    width: '80%', position: 'absolute', bottom: '-22px', right: '-22px', height: 'auto',
                                                    transition: '.3s ease all', transform: 'scaleX(var(--scale-sm)) scaleY(var(--scale-sm))'
                                                }}
                                                src={"./assets/p-something2.png"} />
                                            <img
                                                src={"./assets/teacher-bg.png"}
                                                style={{
                                                    width: '80%', position: 'absolute', top: '0', right: '50%', height: 'auto', '--px': '50%',
                                                    transition: '.3s ease all', transform: 'translateX(50%)', zIndex: 7,
                                                }} />

                                            <img
                                                style={{ width: '100%', position: 'relative', zIndex: 8, height: 'auto', transition: '.3s ease all', transform: 'scaleX(var(--scale-sm)) scaleY(var(--scale-sm))' }}
                                                src={"./assets/arrow.svg"} />
                                        </Box>
                                    </Box>

                                    <img
                                        src={teacher.img}
                                        style={{
                                            transition: '.3s ease all', objectFit: 'cover',
                                            transformOrigin: 'bottom', width: '80%', height: 'auto', maxHeight: '250px',
                                            transform: 'translateX(-12.5%) scaleX(var(--scale)) scaleY(var(--scale))',
                                            // filter: 'drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.3))'
                                        }} />
                                </Box>

                                <Typography variant="h5" sx={{ zIndex: 2 }}>{teacher.name}</Typography>
                                <Typography variant="body1" sx={{ zIndex: 2 }}>{teacher.descritpion}</Typography>
                                <Rating readOnly value={5} />
                            </FlexColumn>
                        </Paper>
                    })}


                </Grid>
                {data?.values?.users?.length === 0 && <> </>}
                {data?.values?.users && data?.values?.users.map((teacher, i) => {
                    return <Typography key={i}>{teacher.name}</Typography>
                })}
            </Section>
        )
}

export default Teachers
