const expressAsyncHandler = require("express-async-handler")
const ChapterModel = require("../models/ChapterModel")
const UserModel = require("../models/UserModel")
const { chapterPerms } = require("../tools/permissions/courses")
const { getAll, insertOne, updateOne, deleteMany, deleteOne, pushToModel } = require("./factoryHandler")

const chapterParams = (query) => {
    return [
        { key: "name", value: query.name },
        { key: "description", value: query.description },
        { key: "isActive", value: query.isActive },
        { key: "courses", value: query.courses },
        { key: "_id", value: query._id },
        { key: "createdBy", value: query.createdBy },
        // { key: "teachers", value: query.teachers },
        // { key: "lectures", value: query.lectures },
    ]
}

const getChapters = getAll(ChapterModel, 'chapters', chapterParams)

//add chapter to user, default permissions
const afterCreation = async (req, newChapter) => {
    try {
        const user = req.user
        const chPerms = chapterPerms(newChapter._id, null, { values: true })
        const defaultChapter = chPerms.filter(ch => ch.isDefault).map(ch => ch.id)

        const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
            $addToSet: {
                chapters: newChapter._id,
                permissions: defaultChapter
            }
        }, { new: true })
        return { user: updatedUser }
    } catch (error) {
        console.log('error from afterCreation ===>', error)
    }
}
const createChapter = insertOne(ChapterModel, true, null, { createdBy: true, afterCreation })
const updateChapter = updateOne(ChapterModel)

const removeChapterPermissions = expressAsyncHandler(async (req, res, next) => {
    const chapterId = req.params.id
    const user = req.user

    const chPerms = chapterPerms(chapterId, null, { values: true }).flat().filter(c => c.scoped).map(c => c.id)
    await UserModel.updateOne({ _id: user._id }, {
        $pull: {
            permissions: {$in: chPerms}
        }
    })
    return next()
})

const deleteManyChapters = deleteMany(ChapterModel, chapterParams)
const removeChapter = deleteOne(ChapterModel)

const pushAndPullInChapters = pushToModel(ChapterModel)
module.exports = {
    getChapters, createChapter, updateChapter, removeChapter, pushAndPullInChapters,
    removeChapterPermissions
}