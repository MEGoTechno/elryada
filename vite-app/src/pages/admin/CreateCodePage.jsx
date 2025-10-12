import React from 'react'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import CreateCode from '../../components/codes/CreateCode'

function CreateCodePage() {
    return (
        <Section>
            <TitleWithDividers title={'إنشاء كود'} />
            <CreateCode />
        </Section>
    )
}

export default CreateCodePage
