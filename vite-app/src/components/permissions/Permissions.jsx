import Section from "../../style/mui/styled/Section"
import BtnModal from "../ui/BtnModal"
import Users from "../all/Users"

import { useMemo } from "react"
import { useAddToUserMutation } from "../../toolkit/apis/usersApi"
import usePostData from "../../hooks/usePostData"
import { user_roles } from "../../settings/constants/roles"

function Permissions({
    perms = [], ifNotBtn = false, addMoreColumns = [], isShowPerms = true,
    filters = { role: [user_roles.SUBADMIN, user_roles.TEACHER] }, deleteFc, allStatuses = [], scoped = true
}) {

    const [sendData, status] = useAddToUserMutation()
    const [editPermissions] = usePostData(sendData)

    const addColumns = useMemo(() => {
        if (!isShowPerms) return []
        let permsArray = Array.isArray(perms) ? perms : Object.values(perms)
  
        // [{perms = [], id}]
        //scoped true, (false, null)
        return permsArray.flat().filter((p) => (p.isValid ?? true) && p.id && ((scoped ? p.scoped : !p.scoped)))
            .map((p, i) => ({
                field: p.id,
                headerName: ++i + '- ' + p.label,
                type: "boolean",
                isSwitch: true,
                width: 200,
                valueGetter: (_, u) => (u.permissions || []).includes(p.id),
            }));
    }, [perms])

    const editFc = (value, f) => {
        try {
            // console.log(value, f)
            const userId = value.id
            editPermissions({
                field: 'permissions', value: f, id: userId, action: value[f] ? 'push' : 'pull'
            })
        } catch (error) {
            console.log('error from permissions', error)
        }
    }
    const Compo = <UsersComponent addColumns={[...addColumns, ...addMoreColumns]} allStatuses={[...allStatuses, status]} editFc={editFc} deleteFc={deleteFc} filters={filters} />

    if (ifNotBtn) return Compo

    return (
        <BtnModal
            btnName={'الصلاحيات'}
            color={'warning'}
            fullScreen
            component={<Section>
                {/* <TabsAutoStyled originalTabs={tabs} /> */}
                {Compo}
            </Section>}
        />
    )
}

const UsersComponent = ({ addColumns, editFc, allStatuses, filters, deleteFc }) => {
    return <Users
        addColumns={addColumns} updateFc={editFc} filters={filters}
        allStatuses={allStatuses} deleteFc={deleteFc}
        removeCols={['email', 'isActive', 'familyPhone', 'government', 'createdAt']}
    />
}
export default Permissions

