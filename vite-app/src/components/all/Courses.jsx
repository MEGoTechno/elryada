import FullComponent from '../../tools/datagrid/FullComponent'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import UserAvatar from '../users/UserAvatar'
import { lang } from '../../settings/constants/arlang'
import products from '../../settings/constants/products'
import TabInfo from '../ui/TabInfo'
import { useLazyGetCoursesQuery } from '../../toolkit/apis/coursesApi'

const exportObj = {
    grade: (row) => {
        return products.find(p => p.id === row.id)?.name
    },
    price: (row) => {
        return row.price + ' ' + 'ريال'
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    }
}

function Courses({ filters, addColumns }) {
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
        },
        {
            field: 'name',
            headerName: 'اسم الكورس',
            width: 200,
        }, {
            field: 'price',
            headerName: 'سعر الكورس',
            type: 'number',
            renderCell: (params) => {
                return (
                    <TabInfo count={(params.row.price || 0) + ' ريال'} i={0} />
                )
            }
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
        }, {
            field: 'createdAt',
            headerName: "تاريخ الإنشاء",
            type: 'date',
            width: 150,
            valueGetter: (date) => new Date(date),
            renderCell: (params) => {
                return <TabInfo i={1} count={getFullDate(params.row.createdAt)} />
            }
        },
    ]

    return (
        <FullComponent data={{
            useFetch: useLazyGetCoursesQuery, resKey: 'courses',
            columns, addColumns, fetchFilters: filters,
            exportObj, exportTitle: 'الكورسات'
        }} />

    )
}

export default Courses
