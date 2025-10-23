import MakeForm from '../../tools/makeform/MakeForm'
// icons
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoSchool } from "react-icons/io5";


import { lang } from '../../settings/constants/arlang';
import Section from '../../style/mui/styled/Section';

import usePostData from '../../hooks/usePostData'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray';

import * as Yup from "yup"
import { useCreateTagMutation } from '../../toolkit/apis/tagsApi';
import TitleWithDividers from '../ui/TitleWithDividers';
import useGrades from '../../hooks/useGrades';
import { useGetChaptersQuery } from '../../toolkit/apis/chaptersApi';
import MakeSelect from '../../style/mui/styled/MakeSelect';
import { FlexColumn } from '../../style/mui/styled/Flexbox';
import { useField } from 'formik';
import { useMemo } from 'react';

export const ChooseChapter = ({ value, setValue, input, defaultGrade }) => {

    const [{ value: gradeVal }] = useField('grade')
    const grade = defaultGrade || gradeVal

    const { isLoading, data } = useGetChaptersQuery({ grade })

    const options = useMemo(() => {
        const chapters = data?.values?.chapters || []
        const handled = makeArrWithValueAndLabel(chapters, { value: '_id', label: 'name' })
        return handled
    }, [data])

    return <FlexColumn>
        <MakeSelect
            variant='filled'
            disabled={isLoading} setValue={setValue} value={value} options={options} title={input.label} />
        {/* {showError && <Alert variant='filled' severity='error'>{error}</Alert>} */}
    </FlexColumn>
}

function CreateTag({ setReset, defaultGrade, defaultChapter }) {
    const { grades } = useGrades()

    const [sendData, status] = useCreateTagMutation()
    const [createTagFc] = usePostData(sendData)


    const inputs = [
        {
            name: 'name',
            label: 'اسم المهاره',
            icon: <MdOutlineDriveFileRenameOutline color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'description',
            label: 'الوصف',
            icon: <MdOutlineDriveFileRenameOutline color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'grade',
            label: lang.GRADE,
            type: 'select',
            value: defaultGrade,
            options: makeArrWithValueAndLabel(grades, { value: '_id', label: 'name' }),
            icon: <IoSchool color='green' />,
            validation: Yup.string().required(lang.REQUERIED)

        }, {
            name: 'chapters',
            label: 'الفروع',
            Component: ChooseChapter,
            value: defaultChapter
            // type: 'select',
            // options: makeArrWithValueAndLabel(grades, { value: '_id', label: 'name' }),
            // icon: <IoSchool color='green' />,
            // validation: Yup.string().required(lang.REQUERIED)
        },
    ]

    const onSubmit = async (values, props) => {
        await createTagFc(values)
        if (setReset) {
            setReset(pre => !pre)
        }
        props.resetForm()
    }
    return (
        <Section sx={{ width: '100%' }}>
            <TitleWithDividers title={'إنشاء مهاره'} />
            <MakeForm inputs={inputs} btnWidth={'100%'} status={status} onSubmit={onSubmit} />
        </Section>
    )
}

export default CreateTag
