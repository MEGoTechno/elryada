import { useState } from 'react'

import ModalStyled from '../../style/mui/styled/ModalStyled'
import { Box, Button } from '@mui/material'
import Section from '../../style/mui/styled/Section'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import TitleWithDividers from './TitleWithDividers'

function BtnModal({
    parenetSx = {}, btn, disabled = false,
    btnName, icon, children, component, variant = 'contained', color, size = 'small', isFilledHover = false, fullWidth = true, fullScreen = false, titleInSection = false
}) {
    const [open, setOpen] = useState(false)
    return (
        <FlexColumn sx={parenetSx}>
            {btn ?
                <Box onClick={() => setOpen(true)}>
                    {btn}
                </Box> : isFilledHover ?
                    <FilledHoverBtn disabled={disabled} endIcon={icon} size={size} onClick={() => setOpen(true)} color={color}>
                        {btnName}
                    </FilledHoverBtn>
                    :
                    <Button disabled={disabled} variant={variant} endIcon={icon} size={size} onClick={() => setOpen(true)} color={color}>
                        {btnName}
                    </Button>
            }


            <ModalStyled open={open} setOpen={setOpen} fullWidth={fullWidth} fullScreen={fullScreen}>
                <Section>
                    {titleInSection && (
                        <TitleWithDividers title={titleInSection} />
                    )}
                    {component}
                    {children}
                </Section>
            </ModalStyled>
        </FlexColumn >
    )
}

export default BtnModal
