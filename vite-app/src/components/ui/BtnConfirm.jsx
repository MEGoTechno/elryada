import React, { useState } from "react"
import ModalStyled from "../../style/mui/styled/ModalStyled"

function BtnConfirm({ btn = null, children, modalInfo = {} }) {
    const [open, setOpen] = useState(false)
    const [confirmedAction, setConfirmedAction] = useState(() => () => { });
    const realBtn = btn || children

    const handleBtnClick = (e) => {
        e.stopPropagation();
        // Save the original onClick from the button to run after confirmation
        if (realBtn.props?.onClick) {
            setConfirmedAction(() => () => realBtn.props.onClick(e));
        }
        setOpen(true);
    };

    const clonedBtn = React.cloneElement(realBtn, {
        onClick: handleBtnClick
    });

    return (
        <div>
            {clonedBtn}
            <ModalStyled action={confirmedAction} open={open} setOpen={setOpen} title={modalInfo.title} desc={modalInfo.desc} />
        </div>
    )
}

export default BtnConfirm
