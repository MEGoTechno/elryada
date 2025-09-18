const { createCode, getOneCode, updateCode, deleteCode, getCodes, verifyCode, getUserUsedCodes, getLectureCodes, handelCreateCode } = require("../controllers/codeController")

const allowedTo = require("../middleware/allowedTo")
const verifyToken = require("../middleware/verifyToken")
const { user_roles } = require("../tools/constants/rolesConstants")

const { checkPermAndModify } = require("../middleware/permissions")
const { pages } = require("../tools/permissions/pages")
const { chapterPerms } = require("../tools/permissions/courses")

const router = require("express").Router()
//1-admin go
//2-teacher, subadmin => p.codes => all codes, permSpecific || not permsissions
const codesSecure = (modify = false) => checkPermAndModify({
    globalPerms: pages.codes,
    scopedPerms: (req) => chapterPerms(req.query.chapter ?? req.body.chapter, 'lecturesCodes'),
    modify
})

//teacher specific => lectures,exams, questions,  attempts, answers
//if scoped(by id, in course) only who has, global (pages) => ALl
//if No id but has permId => startsWith
//Id perm=>> in its page - scoped by userItself - page All
// Always add desired Id

router.route("/")
    .get(verifyToken(), codesSecure(true), getLectureCodes, getCodes) //allowed
    .post(verifyToken(), codesSecure(), handelCreateCode, createCode)//allowed

router.route('/user') //for user
    .get(verifyToken(), getUserUsedCodes)

router.route('/verify')
    .post(verifyToken(), allowedTo(user_roles.STUDENT, user_roles.ONLINE), verifyCode)

router.route("/:id")
    .get(verifyToken(), getOneCode)
    .put(verifyToken(), codesSecure(), updateCode)
    .delete(verifyToken(), codesSecure(), deleteCode)

module.exports = router