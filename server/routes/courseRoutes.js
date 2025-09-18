const { getCourses, createCourse, getOneCourse, updateCourse, deleteCourse, getCourseLecturesAndCheckForUser, subscribe, getLectureAndCheck, lecturePassed, getExam, createAttempt, linkCourse, checkDeleteCourse, getCoursesValidation, removeCoursePermissions } = require("../controllers/courseController")
const { upload } = require("../middleware/storage")

const { user_roles } = require("../tools/constants/rolesConstants")
const verifyToken = require("../middleware/verifyToken")
const allowedTo = require("../middleware/allowedTo")
const { handelOneFile } = require("../controllers/factoryHandler")
const { checkPermAndModify } = require("../middleware/permissions")
const { coursesPerms } = require("../tools/permissions/courses")

const router = require("express").Router()
const secureGetCourses = checkPermAndModify({
    globalPerms: coursesPerms(null, 'read'), isOnline: true,
    secureGetAll: (req) => ({ _id: req.user.courses?.length ? req.user.courses : 'empty' })
})

router.route("/")
    .get(verifyToken(true, 'courses'), getCoursesValidation, getCourses) //getCoursesValidation
    .post(
        verifyToken(), upload.single('thumbnail'),
        checkPermAndModify({
            globalPerms: coursesPerms(null, 'create')
        }),
        handelOneFile('thumbnail'),
        createCourse)

router.route("/:id")
    .get(getOneCourse)
    .put(verifyToken(),
        upload.single('thumbnail'),
        checkPermAndModify({
            globalPerms: (req) => coursesPerms(req.params.id, 'update')
        }), handelOneFile('thumbnail'), updateCourse)

    .delete(verifyToken(),
        checkPermAndModify({
            globalPerms: (req) => coursesPerms(req.params.id, 'delete')
        }), checkDeleteCourse, removeCoursePermissions, deleteCourse)

router.route("/:id/link")
    .post(verifyToken(), linkCourse)

// USER LECTURES ROUTES ######
router.route('/:id/lectures') //most important id === index
    .get(verifyToken(true), getCourseLecturesAndCheckForUser)

router.route('/:id/lectures/:lectureId') //most important id === index || lectureId ===_id
    .get(verifyToken(), allowedTo(user_roles.ONLINE, user_roles.STUDENT), getLectureAndCheck)

router.route('/:id/lectures/:lectureId/pass') //most important id === course._id || lectureId ===_id
    .post(verifyToken(), allowedTo(user_roles.ONLINE, user_roles.STUDENT), lecturePassed)

// EXAMS ROUTES ##########
router.route('/:id/exams/:examId') //most important id === course._id || lectureId ===_id
    .get(verifyToken(), allowedTo(user_roles.ONLINE, user_roles.STUDENT), getExam)

router.route('/:id/attempts') //calc mark, most important id === course._id || lectureId ===_id
    .post(verifyToken(), allowedTo(user_roles.ONLINE, user_roles.STUDENT), createAttempt)

// router.route('/:id/subscribe') //most important id === _id
//     .post(verifyToken(), allowedTo(user_roles.ONLINE, user_roles.STUDENT), subscribe)

module.exports = router
