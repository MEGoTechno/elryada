import { useSelector } from "react-redux"
import hasPermission from "./hasPermission";

function PermissionsGate({ perms, children }) {
    const user = useSelector(s => s.global.user)
    if (hasPermission(user, perms)) return children

    return null
}

export default PermissionsGate
