const LectureModel = require("../models/LectureModel")
const { insertOne, deleteFromBody } = require("../controllers/factoryHandler")
const { upload } = require("../middleware/storage")
const { getLectures, getOneLecture, createLecture, deleteLecture, updateLecture, getLectureForCenter, handelUpdateLecture, getLecturesForAdmin, addToLectures, removeFromLectures, protectGetLectures, pushLectures } = require("../controllers/lectureController")

const { user_roles } = require("../tools/constants/rolesConstants")
const verifyToken = require("../middleware/verifyToken")
const allowedTo = require("../middleware/allowedTo")

const { checkPermAndModify } = require("../middleware/permissions")
const { chapterPerms } = require("../tools/permissions/courses")
const { pages } = require("../tools/permissions/pages")

const router = require("express").Router()

router.route('/all')
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), getLecturesForAdmin) // not used

const secureGetLectures = checkPermAndModify({
    globalPerms: pages.lectures, isOnline: true,
    secureGetAll: (req) => {
        const user = req.user
        return (req.query.chapters && (user.chapters || []).includes(req.query.chapters)) ?
            ({ chapters: req.query.chapters }) : ({ createdBy: user._id })
    }
})

//user.chapters || pages.lectures permission
router.route("/")
    .get(verifyToken(),
        secureGetLectures,
        protectGetLectures, getLectures)//secureGetAll(null, [user_roles.ONLINE]),
    .post(verifyToken(),
        allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER),
        upload.single('video'),
        checkPermAndModify({
            globalPerms: pages.lectures,
            scopedPerms: (req) => chapterPerms(req.body.chapters, 'lecturesCreate'),
        }),
        createLecture, insertOne(LectureModel, true, 'course'))

router.route("/center/:id")
    .get(verifyToken(), allowedTo(user_roles.STUDENT, user_roles.ONLINE), getLectureForCenter) //allowed to center

router.route('/push')
    .post(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), pushLectures)

router.route('/array')
    .post(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), addToLectures)
    .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), removeFromLectures)

router.route("/:id")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), getOneLecture)
    .put(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), upload.single('video'),
        checkPermAndModify({
            globalPerms: pages.lectures,
            scopedPerms: (req) => chapterPerms(req.body.chapters, 'lecturesUpdate'),
        }),
        deleteFromBody(['course', 'exam']), updateLecture)

    .patch(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), upload.single('video'),
        checkPermAndModify({
            globalPerms: pages.lectures,
            scopedPerms: (req) => chapterPerms(req.body.chapters, 'lecturesUpdate'),
        }), handelUpdateLecture)

    .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER),
        checkPermAndModify({
            globalPerms: pages.lectures,
            scopedPerms: (req) => chapterPerms(req.body.chapters, 'lecturesDelete'),
        }), deleteLecture)

module.exports = router
