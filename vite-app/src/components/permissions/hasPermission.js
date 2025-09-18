import { user_roles } from "../../settings/constants/roles";

const hasPermission = (user, perms) => {
    if (user.role === user_roles.ADMIN) return true;

    const userPermissions = new Set(user.permissions || []);
    const hasAny = perms.some(p => userPermissions.has(p));
    return hasAny;
}

//Scenarios =>
// 1- All models => update only
// 2- specific Model as course => course.update
// 3- specific Doc as courseId => update:courseId

// 4- actions => actionsName as Prev schema || 

export default hasPermission