import { FaWallet } from "react-icons/fa"
import RowInfo from "../../components/ui/RowInfo"
import { FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox"
import Section from "../../style/mui/styled/Section"
import { useSelector } from "react-redux"
import { Button, TextField } from "@mui/material"

import PaymentMethods from "../../components/payment/PaymentMethods"
import { useState } from "react"
import Separator from "../../components/ui/Separator"
import paymentInteg from "../../settings/constants/paymentInteg"
import TitleSection from "../../components/ui/TitleSection"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Invoices from "../../components/all/Invoices"
import RefreshUser from "../../components/users/RefreshUser"

function PaymentsPage() {
    const [price, setPrice] = useState("")
    const [open, setOpen] = useState(false)

    const user = useSelector(s => s.global.user)

    return (
        <Section>
            <TitleSection title={'المحفظه و المدفوعات'} />

            <FlexColumn sx={{ width: '100%' }}>
                <FlexRow>
                    <RowInfo icon={<FaWallet size={'1.5rem'} />} title={'رصيد محفظتك '} fromStart={false} desc={user.wallet + ' ريالا'} />
                    <RefreshUser />
                </FlexRow>

                <FlexRow m={'16px 0'}>
                    <TextField placeholder='limit is between 0 : 2000' variant='standard' type='number' value={price} onChange={(e) => setPrice(e.target.value)} label="قم بادخال مبلغ لشحنه" />
                    <Button disabled={price <= 0 || !price || price > 2000} onClick={() => setOpen(true)} variant='outlined' sx={{ mx: '16px' }} endIcon={<FaWallet />}>
                        اضغط لشحن المحفظه
                    </Button>
                </FlexRow>
                <Separator sx={{ maxWidth: '500px' }} />
            </FlexColumn>

            <TitleWithDividers title={'المدفوعات'} />
            <Invoices />
            <PaymentMethods
                title={'شحن محفظه !'}
                subTitle={'سيتم إضافة مبلغ ' + price + ' الي محفظتك'}
                open={open} setOpen={setOpen}
                invoiceNameId={'wallet'}
                wallet={price} price={price}
                exclude={paymentInteg.WALLET}
                isUseCoupon={false}
            // handelResponse={}
            />
        </Section>
    )
}

export default PaymentsPage
