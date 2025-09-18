const expressAsyncHandler = require("express-async-handler")

const createError = require("../tools/createError")
const { FAILED, SUCCESS } = require("../tools/statusTexts")

const { user_roles } = require("../tools/constants/rolesConstants")
const allowedTo = require("../middleware/allowedTo")
const verifyToken = require("../middleware/verifyToken")

const CouponModel = require("../models/CouponModel")
const { getCoupons, createCoupon, updateCoupon, deleteCoupon, verifyCoupon, createCoupons } = require("../controllers/couponController")

const CourseModel = require("../models/CourseModel")
const { filterById } = require("../controllers/factoryHandler")
const { coursesParams } = require("../controllers/courseController")
const { coursesPerms } = require("../tools/permissions/courses")
const { checkPermAndModify } = require("../middleware/permissions")
const { pages } = require("../tools/permissions/pages")

const router = require("express").Router()


const codesSecure = (modify = false) => checkPermAndModify({
    globalPerms: pages.coupons,
    scopedPerms: (req) => coursesPerms(req.query?.course || req.body?.course?._id, 'coupons'),
    modify
})

router.route("/")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), codesSecure(true), filterById(CourseModel, coursesParams, 'course'), getCoupons)
    .post(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), codesSecure(false,), createCoupons, createCoupon)

router.route('/verify')
    .post(verifyToken(), allowedTo(user_roles.STUDENT, user_roles.ONLINE), verifyCoupon)

router.route("/:id")
    // .get(verifyToken(), getOneCode)
    .put(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), codesSecure(false, 'body', 'course'), updateCoupon)
    .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), codesSecure(false, 'body', 'course'), deleteCoupon)

module.exports = router