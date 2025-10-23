const { getTagsCount } = require('../controllers/statisticsController')
const { getTags, createTag, updateTag, deleteTag, linkTag, unLinkTag } = require('../controllers/tagController')
const allowedTo = require('../middleware/allowedTo')
const { checkPermAndModify } = require('../middleware/permissions')
const verifyToken = require('../middleware/verifyToken')
const { user_roles } = require('../tools/constants/rolesConstants')
const { tagsPerms } = require('../tools/permissions/courses')
const { pages } = require('../tools/permissions/pages')

const router = require('express').Router()
const secureTags = (modify = false, isOnline = false) => checkPermAndModify({
    globalPerms: pages.questions,
    scopedPerms: tagsPerms('manageTags'), modify, isOnline
})

router.route("/")
    .get(verifyToken(), getTags) //secureTags(true, true),
    .post(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureTags(true), createTag)

router.route("/count")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureTags(true), getTagsCount)

router.route("/:id")
    .put(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureTags(), updateTag)
    .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureTags(), deleteTag)

router.route("/:id/questions")
    .post(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureTags(), linkTag)
    .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER), secureTags(), unLinkTag)

module.exports = router

