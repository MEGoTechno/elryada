import CreateGrade from "../../components/grades/CreateGrade"
import BtnModal from "../../components/ui/BtnModal"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import UserAvatar from "../../components/users/UserAvatar"
import { lang } from "../../settings/constants/arlang"
import Section from "../../style/mui/styled/Section"
import { useLazyGetGradesQuery, useUpdateGradeMutation } from "../../toolkit/apis/gradesApi"
import FullComponent from "../../tools/datagrid/FullComponent"

//grade frontend to be fetched globally
//Models use Grade
//Fix Data
function GradesManage() {

    const columns = [
        {
            field: "image",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar url={params.row?.image?.url} />
            }
        }, {
            field: 'name',
            headerName: 'الاسم',
            editable: true
        }, {
            field: 'description',
            headerName: 'الوصف',
            flex: 1,
            editable: true


        }, {
            field: 'isActive',
            headerName: 'فعال ؟',
            type: 'boolean',
            isSwitch: true
        }
    ]

    return (
        <Section>
            <TitleWithDividers title={'اداره السنوات الدراسيه'} />
            <BtnModal btnName={'انشاء صف جديد'}>
                <CreateGrade />
            </BtnModal>

            <FullComponent data={{
                useFetch: useLazyGetGradesQuery,
                resKey: 'grades',
                useUpdate: useUpdateGradeMutation, isMultiPart: true,
                columns
            }} />
        </Section>
    )
}

export default GradesManage
