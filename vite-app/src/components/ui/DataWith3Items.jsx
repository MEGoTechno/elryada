import { alpha, Avatar, CardHeader, IconButton, Typography, useTheme } from '@mui/material'
import BtnModal from './BtnModal'
import Image from './Image'

function DataWith3Items({ icon, title, desc, src, bgcolor, sx }) {
    const theme = useTheme()
    return (
        <CardHeader
            sx={{
                borderRadius: '14px', bgcolor: bgcolor ? alpha(bgcolor, .2) : theme.palette.primary.main + 20, width: '100%',
                ...sx
            }}
            avatar={
                <>
                    {
                        src ? (
                            <BtnModal btn={<IconButton sx={{ m: 0, p: 0 }}>
                                <Avatar src={src} sx={{ bgcolor: bgcolor ? bgcolor : 'primary.main', color: 'grey.0' }}>
                                </Avatar>
                            </IconButton>} component={<Image img={src} borderRadius='4px' />} />
                        ) : (
                            <Avatar sx={{ bgcolor: bgcolor ? bgcolor : 'primary.main', color: 'grey.0' }}>
                                {icon}
                            </Avatar>
                        )
                    }
                </>
            }
            title={<Typography component={'div'}>{title}</Typography>}
            subheader={desc}
        />
    )
}

export default DataWith3Items
