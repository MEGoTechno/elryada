const { getUnits, createUnit, getOneUnit, updateUnit, deleteUnit, checkUnitsBeforeDelete } = require("../controllers/unitController")
const { checkPermAndModify } = require("../middleware/permissions")
const verifyToken = require("../middleware/verifyToken")
const { unitsPerms } = require("../tools/permissions/courses")

const router = require("express").Router()

router.route("/")
    .get(getUnits)
    .post(verifyToken(),
        checkPermAndModify({
            globalPerms: unitsPerms(null, 'create')
        }),
        createUnit)

router.route("/:id")
    .get(getOneUnit)
    .put(verifyToken(),
        checkPermAndModify({
            globalPerms: unitsPerms(null, 'update')
        }),
        updateUnit)
    .delete(verifyToken(), checkPermAndModify({
        globalPerms: unitsPerms(null, 'delete')
    }), checkUnitsBeforeDelete, deleteUnit)

module.exports = router
