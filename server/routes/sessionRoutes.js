const { filterById, analysisMonthly } = require("../controllers/factoryHandler")
const { getSessions, sessionLogout, sessionParams } = require("../controllers/sessionController")
const { userParams } = require("../controllers/userController")

const { checkPermAndModify } = require("../middleware/permissions")
const verifyToken = require("../middleware/verifyToken")
const SessionModel = require("../models/SessionModel")
const UserModel = require("../models/UserModel")
const { pages } = require("../tools/permissions/pages")

const router = require("express").Router()

const sessionsSecure = (modify = true, isOnline = true) => checkPermAndModify({
    globalPerms: pages.sessions,isOnline,
    modify
})

router.route("/")
    .get(verifyToken(), sessionsSecure(), filterById(UserModel, userParams, 'user'), getSessions)

//allowedTo(user_roles.ADMIN, user_roles.SUBADMIN),
router.route('/statistics/analysis')
    .get(verifyToken(), sessionsSecure(), analysisMonthly(SessionModel, sessionParams))

router.route("/:sessionId/logout")
    .post(verifyToken(), sessionLogout)

module.exports = router