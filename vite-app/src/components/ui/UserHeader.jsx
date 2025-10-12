import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material'

import { user_roles } from '../../settings/constants/roles'
import { lang } from '../../settings/constants/arlang'

import Grid from '../../style/vanilla/Grid'
import DataWith3Items from './DataWith3Items'
import { RiGovernmentFill } from "react-icons/ri";

import { FaSquarePhoneFlip } from 'react-icons/fa6'
import { PiPhoneDisconnectFill } from 'react-icons/pi'
// import { IoSchool } from 'react-icons/io5'
import { MdMarkEmailRead, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { MdVerifiedUser } from "react-icons/md";
import { FlexBetween, FlexColumn } from '../../style/mui/styled/Flexbox'
import RowInfo from './RowInfo'
import { FaWallet } from 'react-icons/fa'
import { HashLink } from 'react-router-hash-link';
import governments from '../../settings/constants/governments'
import TabInfo from './TabInfo'
import { GrScorecard } from "react-icons/gr";
// import useGrades from '../../hooks/useGrades'

// eslint-disable-next-line react/prop-types
export default function UserHeader({ children, user, flexDirection = 'row', variant, isAll = false }) {

    const theme = useTheme()
    // const { grades } = useGrades()
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    return (
        <Box sx={{
            display: 'flex',
            alignItems: "center",
            justifyContent: 'flex-start',
            flexDirection: isMobileScreen ? "column" : flexDirection, gap: '16px', width: '100%'
        }}>
            <FlexColumn>

                <Avatar alt={user.name.toUpperCase()} src={user?.avatar?.url || "#"}
                    sx={{
                        m: '6px',
                        height: "200px",
                        width: "200px",
                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[0] : theme.palette.primary[400],
                        fontWeight: 800,
                        fontSize: '50px',
                        color: theme.palette.mode === 'dark' ? theme.palette.primary[400] : theme.palette.grey[0],
                    }}
                    variant={variant || 'square'} />
                {(!user?.avatar?.url && !isAll) && (
                    <HashLink to={'/user/profile#edit'} smooth style={{ color: theme.palette.primary.main }}>
                        <Typography color={'primary.main'} sx={{ cursor: 'pointer' }}>هل تريد ايضافه صوره شخصيه ؟</Typography>
                    </HashLink>
                )}

            </FlexColumn>
            <Box sx={{
                width: '100%'
            }}>

                <Grid>
                    <DataWith3Items title={lang.NAME} icon={<MdOutlineDriveFileRenameOutline size={'2rem'} />} desc={user?.name} />
                    {/* <DataWith3Items title={lang.GRADE} icon={<IoSchool size={'2rem'} />} desc={grades.find(g => g._id === user.grade)?.name} /> *No-grade */}
                    <DataWith3Items title={lang.ROLE} icon={<MdVerifiedUser size={'2rem'} />} desc={user?.role} />
                    <DataWith3Items title={'الدرجات'} icon={<GrScorecard size={'1.8rem'} />} desc={<FlexBetween>
                        <TabInfo count={user.marks} i={1} title={'درجات الأسئلة'} isBold={false} />
                        <TabInfo count={user.exam_marks} i={2} title={'درجات الاختبارت'} isBold={false} />
                    </FlexBetween>} />
                    {isAll && (
                        <>
                            <DataWith3Items title={lang.USERNAME} icon={<MdOutlineDriveFileRenameOutline size={'2rem'} />} desc={user?.userName} />
                            <DataWith3Items title={lang.EMAIL} icon={<MdMarkEmailRead size={'2rem'} />} desc={user?.email} />
                            <DataWith3Items title={lang.PHONE} icon={<FaSquarePhoneFlip size={'2rem'} />} desc={user?.phone} />
                            <DataWith3Items title={lang.FAMILY_PHONE} icon={<PiPhoneDisconnectFill size={'2rem'} />} desc={user?.familyPhone} />
                            <DataWith3Items title={lang.GOVERNMENT} icon={<RiGovernmentFill size={'2rem'} />} desc={governments.find(g => Number(g.region_id) === user?.government)?.name_ar} />
                            {/* <DataWith3Items title={'عدد الاجهزه المسجله'} icon={<PiPhoneDisconnectFill size={'2rem'} />} desc={user?.devicesRegistered.length} /> */}
                            {(user.role === user_roles.STUDENT || user.role === user_roles.ONLINE) && (
                                <FlexColumn sx={{ width: '100%' }}>
                                    <RowInfo icon={<FaWallet size={'1.5rem'} />} title={'رصيد محفظتك '} fromStart={false} desc={user.wallet + ' ريالا'} />
                                </FlexColumn>
                            )}
                        </>
                    )}
                </Grid>
            </Box>
            <div id='edit'>
                <Box sx={{ flex: 1, textAlign: "center" }}>
                    {children}
                </Box>
            </div>
        </Box>
    )
}
