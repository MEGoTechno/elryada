import { Divider, useTheme } from '@mui/material'

function Separator({ color = 'primary.main', sx }) {
    const theme = useTheme()
    return (
        <Divider sx={{ border: '4px solid', borderColor: theme.palette.mode === 'dark' ? '#fff60' : color, borderRadius: '16px', my: '16px', width: '100%', ...sx, }} />
    )
}

export default Separator
