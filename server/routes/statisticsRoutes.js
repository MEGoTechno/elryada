const { getUsersCount, getUnitsCount, getCoursesCount, getLecturesCount, getSubscriptionsCount, getNotificationsCount, getAttemptsCount, getTagsCount,  getAnswersCount } = require("../controllers/statisticsController")
const { getViewsCount, getByUsersCount } = require("../controllers/viewsController")
const { analysisMonthly } = require("../controllers/factoryHandler.js")
const allowedTo = require("../middleware/allowedTo")
const { secureGetAll } = require("../middleware/secureMiddleware")
const verifyToken = require("../middleware/verifyToken")
const { user_roles } = require("../tools/constants/rolesConstants")
const UserModel = require("../models/UserModel.js")
 
 
const { getCoursesValidation } = require("../controllers/courseController.js")
const { checkPermAndModify } = require("../middleware/permissions.js")
const { pages } = require("../tools/permissions/pages.js")

const router = require("express").Router()

router.route("/users")
    .get(verifyToken(),
        allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER),
        checkPermAndModify({
            globalPerms: [pages.users, pages.teachers]
        }),
        getUsersCount)

router.route("/users/analysis")
    .get(analysisMonthly(UserModel)) //verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN),

router.route("/units")
    .get(getUnitsCount)

router.route("/courses")
    .get(verifyToken(true), getCoursesValidation, getCoursesCount)

router.route("/lectures")
    .get(getLecturesCount)

router.route("/subscriptions")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), getSubscriptionsCount)

router.route("/views")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), getViewsCount)
router.route("/views_users")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), getByUsersCount)

router.route("/notifications")
    .get(verifyToken(), secureGetAll(), getNotificationsCount)

router.route("/attempts")
    .get(verifyToken(), secureGetAll(), getAttemptsCount)



module.exports = router
