import { Box, Typography, useTheme } from '@mui/material'

function BannerIcon({ icon, title, bgcolor = 'primary.main', sx = {} }) {
    const theme = useTheme()
    return (
        <Box
            sx={{
                justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: "row", gap: '10px',
                minWidth: "250px", minHeight: '100px', borderRadius: '16px',
                bgcolor: bgcolor, m: '30px auto', boxShadow: theme.shadows[8], ...sx
            }}>
            {icon}
            <Typography variant='h5' color={'grey.0'}>{title}</Typography>
        </Box>
    )
}

export default BannerIcon
