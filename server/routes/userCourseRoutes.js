const { filterById } = require("../controllers/factoryHandler")
const { userParams, getUsers } = require("../controllers/userController")
const { getCourseSubscriptions, addSubscription, removeSubscription, updateSubscription, analysisSubscriptions, updateChapterIndex } = require("../controllers/userCourseController")

const { hasPermission, checkPermAndModify } = require("../middleware/permissions")

const verifyToken = require("../middleware/verifyToken")
const CourseModel = require("../models/CourseModel")
const UserModel = require("../models/UserModel")
const { user_roles } = require("../tools/constants/rolesConstants")
const { coursesPerms } = require("../tools/permissions/courses")
const { pages } = require("../tools/permissions/pages")

const router = require("express").Router()

const courseParams = (query) => {
    return [
        { key: "name", value: query.courseName },
    ]
}
const secureSubscriptions = (modify = false, isOnline = false, others = {}) => checkPermAndModify({
    globalPerms: pages.subscriptions,
    scopedPerms: (req) => coursesPerms(req.query?.course || req.body.course, 'subscriptions'),
    modify, isOnline, ...others
})

router.route("/courses")
    .get(verifyToken(false, 'courses'),
        secureSubscriptions(true, true, { modifyKey: 'course', userValue: 'courses' }),
        filterById(UserModel, userParams, 'user'),
        filterById(CourseModel, courseParams, 'course'),
        getCourseSubscriptions) //in: 'query', key: 'course'
    .post(verifyToken(),
        checkPermAndModify({
            globalPerms: pages.subscriptions,
            scopedPerms: (req) => coursesPerms(req.body.course, 'addSubscriptions'),
        }),
        addSubscription)//allowedTo(user_roles.ADMIN, user_roles.SUBADMIN)

router.route("/analysis")
    .get(verifyToken(false, 'courses'),
        secureSubscriptions(true, true, { modifyKey: 'course', userValue: 'courses' }),
        analysisSubscriptions)

router.route("/courses/:id/chapters/:chapterId")
    .put(verifyToken(), secureSubscriptions(false, false), updateChapterIndex)

router.route("/courses/:id")
    .put(verifyToken(), secureSubscriptions(false, false), updateSubscription)
    .delete(verifyToken(), secureSubscriptions(false, false, 'body', 'course'), checkPermAndModify({
        globalPerms: pages.subscriptions,
        scopedPerms: (req) => coursesPerms(req.body.course, 'deleteSubscriptions'),
    }), removeSubscription)

module.exports = router
