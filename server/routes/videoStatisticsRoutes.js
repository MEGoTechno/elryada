const { filterById } = require("../controllers/factoryHandler")
const { countStatistics } = require("../controllers/videoController")
const { getViews, updateView, removeView, viewParams, getByUserViews } = require("../controllers/viewsController")
const allowedTo = require("../middleware/allowedTo")
const { checkPermAndModify, checkPerms } = require("../middleware/permissions")

const verifyToken = require("../middleware/verifyToken")
const CourseModel = require("../models/CourseModel")
const LectureModel = require("../models/LectureModel")

const { user_roles } = require("../tools/constants/rolesConstants")
const { chapterPerms } = require("../tools/permissions/courses")
const { pages } = require("../tools/permissions/pages")
const router = require("express").Router()

const courseParams = (query) => {
    return [
        { key: "name", value: query.courseName },
        { key: "price", value: query.price },
    ]
}

const lectureParams = (query) => {
    return [
        { key: "name", value: query.lectureName },
        { key: "duration", value: query.duration },
    ]
}

const userParams = (query) => {
    return [
        { key: 'name', value: query.name },
        { key: 'userName', value: query.userName },
        { key: 'phone', value: query.phone },
        { key: 'familyPhone', value: query.familyPhone },
        { key: 'name', value: query.name },
    ]
}

const secureViews = (modify = false, isOnline = false, others = {}) => checkPermAndModify({
    globalPerms: pages.views,
    scopedPerms: (req) => chapterPerms(null, 'lecturesStatistics', { courseId: req.query?.course || req.body.course }),
    modify, isOnline, ...others,
    modifyFc: (req) => req.query.course ? { course: req.query.course } : { course: req.user.courses }
})

router.route("/")
    .get(
        verifyToken(false, 'courses'),
        allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER),
        secureViews(true, true, { modifyKey: 'course', userValue: 'courses' }),
        filterById(CourseModel, courseParams, 'course'),
        filterById(LectureModel, lectureParams, 'lecture'),
        getViews)

router.route("/users")
    .get(verifyToken(false, 'courses'),
        allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER),
        secureViews(true, true, { modifyKey: 'course', userValue: 'courses' }),
        getByUserViews)

router.route("/:id")
    .put(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), updateView)
    .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), checkPermAndModify({
        globalPerms: pages.views,
        scopedPerms: (req) => chapterPerms(null, 'lecturesStatistics', { courseId: req.body.course }),
    }), removeView)

router.route("/on")
    .post(verifyToken(), allowedTo(user_roles.STUDENT, user_roles.ONLINE), countStatistics)

module.exports = router