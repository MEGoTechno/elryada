import { Box, Card, CardActions, CardContent, Typography } from '@mui/material'
import Separator from '../../../components/ui/Separator'
import Image from '../../../components/ui/Image'

function CardStyled({ img, title, description, children, btn1, btn2 }) {
    return (
        <Card sx={{ maxWidth: "430px", display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: '16px', pb: 0, overflow: 'hidden', textAlign: 'center' }}>

                <Image img={img} borderRadius='6px' />
            </Box>
            <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom variant="h5" component="div" >
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Separator />
                {children}
            </CardContent>
            <CardActions>
                {btn1} {btn2}
            </CardActions>
        </Card>
    )
}

export default CardStyled
