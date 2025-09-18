const { getQuestions, createQuestion, deleteQuestion, updateQuestion, createManyQuestions, linkQuestionToTags, unLinkQuestionToTags, startQuestionsBank } = require("../controllers/questionController")
const allowedTo = require("../middleware/allowedTo")
const verifyToken = require("../middleware/verifyToken")


const { user_roles } = require("../tools/constants/rolesConstants")
const { reCorrectAnswersOnUpdateOneQuestion } = require("../controllers/answerController")
const { validateUserTag } = require("../controllers/tagController")
const { getQuestionsCount } = require("../controllers/statisticsController")
const { checkPermAndModify } = require("../middleware/permissions")
const { pages } = require("../tools/permissions/pages")
const { questionsPerms } = require("../tools/permissions/courses")
const router = require("express").Router()

const secureQs = (modify = false) => checkPermAndModify({
    globalPerms: pages.questions,
    scopedPerms: questionsPerms('manageQuestions'), modify,
})

router.route("/")
    .get(
        verifyToken(),
        secureQs(true),
        // allowedTo(user_roles.ADMIN, user_roles.SUBADMIN),
        getQuestions)
    .post(verifyToken(),
        // allowedTo(user_roles.ADMIN, user_roles.SUBADMIN),
        secureQs(),
        createManyQuestions)
router.route("/count")
    .get(verifyToken(), secureQs(true), getQuestionsCount)

router.route('/bank')
    .post(verifyToken(),
        allowedTo(user_roles.STUDENT, user_roles.ONLINE), validateUserTag, startQuestionsBank)

router.route("/:id")
    .put(verifyToken(),
        allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureQs(), reCorrectAnswersOnUpdateOneQuestion, updateQuestion)
    .delete(verifyToken(),
        allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureQs(), deleteQuestion) //*_* remove all related answers

router.route("/:id/tags")
    .post(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureQs(), linkQuestionToTags)
    .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureQs(), unLinkQuestionToTags)

module.exports = router