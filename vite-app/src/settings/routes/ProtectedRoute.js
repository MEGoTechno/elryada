import { useSelector } from 'react-redux'
import NotFoundPage from '../../pages/errors/NotFoundPage'
import { user_roles } from '../constants/roles'
import usePermissions from '../../components/permissions/hooks/usePermissions'

function ProtectedRoute({ children, allowedTo = [], permId = null, perms = [] }) {
    const user = useSelector(s => s.global.user)
    const [hasPermission] = usePermissions()

    if (permId && user) {
        const canAccess = hasPermission([{ id: permId }, ...perms].flat())
        if (!canAccess) return <NotFoundPage />
    }

    if (!user && allowedTo.includes(user_roles.NOT_USER)) return children
    if (user && allowedTo.length === 0) return children

    if (allowedTo.length > 0 && !allowedTo?.includes(user?.role)) { return <NotFoundPage /> }

    if (user) return children
}

export default ProtectedRoute
