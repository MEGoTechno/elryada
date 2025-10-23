import { Box, Button } from "@mui/material"
import { Fragment, useMemo, useState } from "react"
import { FlexRow } from "./Flexbox";

function BtnsGroup({ btns = [], defaultActive = 0, sx = {}, innerSx={} }) {
    const [active, setActive] = useState(defaultActive ?? 0);

    const handleClick = (index) => {
        setActive(index);
    };
    const component = useMemo(() => btns?.find((btn, i) => active === i)?.component, [btns, active])
    return (
        <Box width={'100%'} sx={{ ...sx }}>
            <FlexRow gap={'6px'} sx={{ mb: '16px',...innerSx }}>
                {btns.map((btn, index) => (
                    <Fragment key={index}>
                        {btn.btn ? btn.btn :
                            <Button
                                key={index}
                                endIcon={btn.icon}
                                variant={active === index ? "contained" : "outlined"}
                                onClick={() => handleClick(index)}
                            >
                                {btn.label}
                            </Button>}
                    </Fragment>
                ))}
            </FlexRow>

            {/* <ButtonGroup sx={{ flexWrap: 'wrap', justifyContent: 'center', mb: '16px', ...sx }} color="primary" aria-label="Medium-sized button group">
            </ButtonGroup> */}
            {component}
        </Box >
    )
}

export default BtnsGroup
