const expressAsyncHandler = require("express-async-handler")
const { analysisMonthly, handelOneFile } = require("../controllers/factoryHandler")
const { getUsers, createUser, updateUser, updateUserProfile, deleteUser, getByUserName, addToUsers, userParams, deleteManyUsers, checkDeleteUser, validateCreate, defaultsPermissionsTeacherAndSubadmin, defaultsPermissionsOnChapter } = require("../controllers/userController")
const allowedTo = require("../middleware/allowedTo")
const { hasPermission, checkPerms } = require("../middleware/permissions")
const { secureGetAll } = require("../middleware/secureMiddleware")
const { imageUpload } = require("../middleware/storage")
const verifyToken = require("../middleware/verifyToken")
const UserModel = require("../models/UserModel")
const { user_roles } = require("../tools/constants/rolesConstants")
const { coursesPerms, chapterPerms } = require("../tools/permissions/courses")
const { pages, usersPerms } = require("../tools/permissions/pages")
const createError = require("../tools/createError")
const { FAILED } = require("../tools/statusTexts")
const router = require("express").Router()

const securePush = expressAsyncHandler(async (req, res, next) => {
    const field = req.body?.field
    const value = req.body.value //field=permissions --= :id, field=courses --> courseId
    const user = req.user

    if (field === 'permissions') {//value=> 
        //course courses_permissions, course_permissions: || chapters || all, others
        const pagesPerms = pages.permissions.flat()
        const accessToGlobalPerms = checkPerms(pagesPerms, user)
        //p.permissions, course, chapter
        if (accessToGlobalPerms) {
            return next()
        }
        const courseId = value.startsWith('course') ? value?.split(':')[1] : null
        const accessToCoursePerms = checkPerms(coursesPerms(courseId, 'permissions'), user)//need courseId or global

        if (accessToCoursePerms && value.startsWith('course')) {
            return next()
        }

        if (value.startsWith('chapter')) {
            const chapterId = value?.split(':')[1]
            const accessToChapters = checkPerms(chapterPerms(chapterId, 'permissions'), user)
            if (accessToChapters) {
                return next()
            }
        }
        return next(createError('You don`t have permissions to do this action', 401, FAILED))

    } else if (field === 'courses') {
        const pagesPerms = pages.permissions.flat()
        const accessToGlobalPerms = checkPerms(pagesPerms, user)
        if (accessToGlobalPerms) {
            return next()
        }

        const accessToCoursePerms = checkPerms(coursesPerms(value, 'teachers'), user)//need courseId or global
        if (accessToCoursePerms) {
            return next()
        }
        return next(createError('You don`t have permissions to do this action', 401, FAILED))
    }
    return next()
})

//For secure use getALl => by key of user
// router.get("/check", isUser)
router.route("/")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), getUsers) //allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), hasPermission([pages.users, pages.teachers]),
    .post(verifyToken(),
        imageUpload.single('avatar'),
        hasPermission([pages.users, pages.teachers]),
        validateCreate, defaultsPermissionsTeacherAndSubadmin, handelOneFile('avatar'),
        createUser) //allowedTo(user_roles.ADMIN, user_roles.SUBADMIN),
    .delete(verifyToken(), hasPermission(usersPerms(null, 'delete')), deleteManyUsers) //allowedTo

router.route("/teachers")
    .get(verifyToken(true, 'courses'), secureGetAll(
        [
            { key: 'role', value: user_roles.TEACHER }, { key: 'isActive', value: true }, { key: 'isHome', value: true },
            { key: 'select', value: 'avatar name description hasBg index' }]), getUsers)

router.route("/teachers/:index")
    .get(verifyToken(true, 'courses'), secureGetAll((user, req) => ([
        { key: 'role', value: user_roles.TEACHER }, { key: 'isActive', value: true }, { key: 'isHome', value: true },
        { key: 'limit', value: 1 }, { key: 'index', value: (Number(req.params.index) || 'empty') },
        { key: 'select', value: 'avatar name description hasBg index courses' }])), getUsers)

router.route('/push')//create middleware specific
    .patch(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), securePush,
        defaultsPermissionsOnChapter,
        addToUsers)

router.route("/analysis")
    .get(verifyToken(), hasPermission([pages.users, pages.permissions]), analysisMonthly(UserModel, userParams))

router.route("/:userName")
    .get(verifyToken(), hasPermission([pages.findUser]), getByUserName) //allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.MENTOR)

router.route("/:id")
    .put(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), imageUpload.single("avatar"), handelOneFile('avatar'), updateUser)
    .patch(verifyToken(), imageUpload.single("avatar"), updateUserProfile)
    .delete(verifyToken(), hasPermission(usersPerms(null, 'delete')), checkDeleteUser, deleteUser) //allowed

module.exports = router