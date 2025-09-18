const { markQuestion, markAttempt, getAnswers, deleteAnswer, updateAnswer } = require("../controllers/answerController")
const { filterById } = require("../controllers/factoryHandler")
const { questionParams } = require("../controllers/questionController")
const { getAnswersCount } = require("../controllers/statisticsController")
const { userParams } = require("../controllers/userController")
const allowedTo = require("../middleware/allowedTo")
const { checkPermAndModify } = require("../middleware/permissions")
const { secureGetAll } = require("../middleware/secureMiddleware")
const verifyToken = require("../middleware/verifyToken")
const QuestionModel = require("../models/QuestionModel")
const UserModel = require("../models/UserModel")
const { user_roles } = require("../tools/constants/rolesConstants")
const { questionsPerms } = require("../tools/permissions/courses")
const { pages } = require("../tools/permissions/pages")

const router = require("express").Router()

const secureQs = checkPermAndModify({
    globalPerms: pages.questions,
    scopedPerms: questionsPerms('showAnswers'), isOnline: true, modify: false
})

router.route('/')
    .get(verifyToken(),
        secureQs,
        filterById(UserModel, userParams, 'user'), filterById(QuestionModel, questionParams, 'question'),
        secureGetAll(null, [user_roles.SUBADMIN, user_roles.TEACHER]),
        getAnswers)

router.route("/count")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureQs, getAnswersCount)

router.route('/attempt')
    .post(verifyToken(), markAttempt)//for Attempt

router.route('/:id')
    .post(verifyToken(), markQuestion) //for Single Question 
    .put(verifyToken(), updateAnswer)
    .delete(verifyToken(), deleteAnswer)
module.exports = router