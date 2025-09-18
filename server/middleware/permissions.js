const expressAsyncHandler = require("express-async-handler");
const { user_roles } = require("../tools/constants/rolesConstants")
const createError = require("../tools/createError")
const { FAILED } = require("../tools/statusTexts");
const { pages } = require("../tools/permissions/pages");
const { chapterPerms } = require("../tools/permissions/courses");


// hasPermission(['courses.statistics', 'statistics', {
//     permission: 'statistics', in: 'query', key: 'course'
// }]),


const hasPermission = (perms = [], permsKey, meta = {
    in: 'query', key: null,
    secureAllByRole: false, rolesToSecure: []
}) => {
    const secureAllByRole = meta.secureAllByRole ?? false
    const rolesToSecureAll = meta.rolesToSecure || [user_roles.ONLINE]

    return (req, res, next) => {
        const currentUser = req.user;

        // console.log(currentUser)
        // Admin always allowed
        if (currentUser.role === user_roles.ADMIN) {
            return next();
        } else if (secureAllByRole && rolesToSecureAll.includes(currentUser.role)) {
            req.query.user = currentUser._id
            return next()
        }

        if ([user_roles.SUBADMIN, user_roles.TEACHER].includes(currentUser.role)) {
            const effectivePerms = typeof perms === "function"
                ? perms(req[meta.in][meta.key], permsKey) || []
                : perms.flat();

            //effective Perms = [{id, label}]
            if (effectivePerms.some(p => currentUser?.permissions?.includes(p.id || p))) { //for Pages
                return next();
            }
        }

        // Default: not authorized
        return next(createError("You don`t have permissions to Continue ", 401, FAILED));
    };
};

// checkPermAndModify({
//     globalPerms: pages.codes,
//     scopedPerms: (req) => chapterPerms(null, 'lectureCodes', { courseId: req.query.course }),
//     modify: true //don`t next
// })
const checkPerms = (perms, user) => {
    if (user.role === user_roles.ADMIN) {
        return true
    }
    const hasAccess = perms.flat().some(p => user?.permissions?.includes(p.id || p))
    return hasAccess
}
//globalPerms ===> no need for Get Striction
//scopedPerms ==> need Protection Id, restrict by Modify
const checkPermAndModify = (perms = {}) => expressAsyncHandler(async (req, res, next) => {
    const { globalPerms = [], scopedPerms = [], modify = true, isOnline = false } = perms
    const user = req.user

    if (isOnline && user.role === user_roles.ONLINE) {
        req.query.user = user._id
        return next()
    }
    if (user.role === user_roles.ADMIN) {
        return next()
    }

    if (globalPerms) {//return All
        const effectivePerms = typeof globalPerms === "function"
            ? globalPerms(req) || []
            : globalPerms.flat();

        const hasGlobalPerm = effectivePerms.flat().some(p => user?.permissions?.includes(p.id || p))
        if (hasGlobalPerm) return next()
    }

    if (scopedPerms) {//Only createdBy

        const effectivePerms = typeof scopedPerms === "function"
            ? scopedPerms(req) || []
            : scopedPerms.flat();
        const hasPermission = effectivePerms.some(p => user?.permissions?.includes(p.id || p))

        if (hasPermission) {
            if (modify) {
                const modifyFc = perms.modifyFc && perms.modifyFc(req)
                if (modifyFc) {
                    req.query = { ...req.query, ...modifyFc }
                } else {
                    const modifyKey = perms.modifyKey ?? 'createdBy'
                    const userValue = perms.userValue ? user[perms.userValue] : user._id
                    req.query[modifyKey] = userValue ?? 'empty'
                }
            }
            return next()
        }
    }

    if (perms?.secureGetAll) {
        req.query = { ...req.query, ...perms?.secureGetAll(req) }
        // console.log(req.query)
        return next()
    }
    return next(createError('ليس لديك الصلاحيات للمتابعه', 401, FAILED))
})

module.exports = { checkPermAndModify, hasPermission, checkPerms }