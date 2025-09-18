import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { user_roles } from "../../../settings/constants/roles";

function usePermissions() {
    const user = useSelector(s => s.global.user);

    const role = user?.role;
    const userPerms = useMemo(() => new Set(user?.permissions || []), [user]);

    const hasPermission = useCallback(
        (...permsInfo) => { ///permInfo {id, label}
            if (role === user_roles.ADMIN) return true;

            let allowedPerms = []
            permsInfo.flat().forEach(p => {
                allowedPerms.push(p.id)
            })
            return allowedPerms.some(p => {
                if (userPerms.has(p)) return true;
                // fallback logic for "update", "Model.update:id", Models.update
                return false;
            });
        },
        [role, userPerms]
    );

    return [hasPermission];
}

export default usePermissions

// const [action, modelOrId] = p.split(":");
// if (userPerms.has(action)) return true;
// if (modelOrId && userPerms.has(`${action}.${modelOrId}`)) return true;
