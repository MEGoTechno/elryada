import { Box, Button, ButtonGroup } from "@mui/material"
import { useMemo, useState } from "react"

function BtnsGroup({ btns = [], defaultActive = 0 }) {
    const [active, setActive] = useState(defaultActive ?? 0);


    const handleClick = (index) => {
        setActive(index);
    };
    const component = useMemo(() => btns?.find((btn, i) => active === i)?.component, [btns, active])

    return (
        <Box width={'100%'}>
            <ButtonGroup sx={{ flexWrap: 'wrap', width: "100%", justifyContent: 'center' }} color="primary" aria-label="Medium-sized button group">
                {btns.map((btn, index) => (
                    <div key={index}>
                        {btn.btn ? btn.btn :
                            <Button
                                key={index}
                                variant={active === index ? "contained" : "outlined"}
                                onClick={() => handleClick(index)}
                            >
                                {btn.label}
                            </Button>}
                    </div>

                ))}
            </ButtonGroup>
            {component}
        </Box>
    )
}

export default BtnsGroup
