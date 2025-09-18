import { Box, Card, CardActions, CardContent, Typography } from '@mui/material'
import Separator from '../../../components/ui/Separator'
import Image from '../../../components/ui/Image'

function CardStyled({ img, title, description, children, btn1, btn2 }) {
    return (
        <Card sx={{
            maxWidth: "430px", display: 'flex', flexDirection: 'column', '&:hover  img': {
                transform: 'scale(1.1) !important'
            }
        }}>
            <Box sx={{ p: '16px', pb: 0, overflow: 'hidden', textAlign: 'center' }}>
                <Image img={img} borderRadius='6px' />
            </Box>
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" component="div" >
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Separator sx={{ m: '6px 0' }} />
                {children}
            </CardContent>
            <CardActions disableSpacing>
                {btn1} {btn2}
            </CardActions>
        </Card>
    )
}

export default CardStyled
