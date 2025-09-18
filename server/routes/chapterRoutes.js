const { getChapters, createChapter, updateChapter, removeChapter, pushAndPullInChapters, removeChapterPermissions } = require('../controllers/chapterControllers')
const { checkPermAndModify } = require('../middleware/permissions')
// const { hasPermission } = require('../middleware/permissions')
const { secureGetAll } = require('../middleware/secureMiddleware')
const verifyToken = require('../middleware/verifyToken')
const { user_roles } = require('../tools/constants/rolesConstants')
const { chapterPerms } = require('../tools/permissions/courses')

const router = require('express').Router()

router.route("/")
    .get(verifyToken(), secureGetAll((user) => [{ key: '_id', value: user.chapters?.length ? user.chapters : 'empty' }], [user_roles.ONLINE]), getChapters) // secureGetAll([{ key: 'teachers' }]),
    .post(verifyToken(),
        checkPermAndModify({
            globalPerms: (req) => chapterPerms(null, 'create', { courseId: req.body.courses[0] }),
        }), createChapter)
// .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.MENTOR), deleteManyInvoices)

// router.route("/push")
//     .patch(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.TEACHER),pushAndPullInChapters)

router.route("/:id")
    .put(verifyToken(), checkPermAndModify({
        globalPerms: (req) => chapterPerms(req.params.id, 'update')
    }), updateChapter)
    .delete(verifyToken(), checkPermAndModify({
        globalPerms: (req) => chapterPerms(req.params.id, 'delete')
    }), removeChapterPermissions, removeChapter)

module.exports = router