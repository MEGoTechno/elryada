const expressAsyncHandler = require("express-async-handler");
const { getAll, getOne, insertOne, deleteOne, updateOne, analysisMonthly } = require("./factoryHandler");
const UserCourseModel = require("../models/UserCourseModel");
const CourseModel = require("../models/CourseModel");
const createError = require("../tools/createError.js");
const { FAILED, SUCCESS } = require("../tools/statusTexts");
const UserModel = require("../models/UserModel.js");


const userCoursesParams = (query) => {
    return [
        { key: "course", value: query.course, operator: "equal" },
        { key: "user", value: query.user, operator: "equal" },
        { key: "currentIndex", value: query.currentIndex, type: "number" },
        { key: "payment", value: query.payment, type: "number" },
    ]
}

// const getUsersCourses = getAll(UserCourseModel, 'subscriptions', userCoursesParams)
const getCourseSubscriptions = getAll(UserCourseModel, 'subscriptions', userCoursesParams)
const updateSubscription = updateOne(UserCourseModel)
const analysisSubscriptions = analysisMonthly(UserCourseModel, userCoursesParams)

const updateChapterIndex = expressAsyncHandler(async (req, res, next) => {
    const id = req.params.id
    const chapterId = req.params.chapterId

    const currentIndex = req.body.currentIndex
    await UserCourseModel.updateOne(
        { _id: id, "chapters.chapter": chapterId },
        { $set: { "chapters.$.currentIndex": currentIndex } } // `$` = matched chapter
    );

    return res.status(200).json({ message: 'تم تغيير تقدم الطالب بنجاح', status: SUCCESS })
})

const removeSubscription = expressAsyncHandler(async (req, res, next) => {
    const subscriptionId = req.params.id

    const userCourse = await UserCourseModel.findById(subscriptionId)

    await Promise.all([
        UserModel.findByIdAndUpdate(
            userCourse.user,
            { $pull: { courses: userCourse.course } },
            { new: true }
        ),
        userCourse.deleteOne()
    ])

    res.json({ message: 'تم ازاله الاشتراك', status: SUCCESS })
})

const addSubscription = expressAsyncHandler(async (req, res, next) => {
    const userId = req.body.user
    const courseId = req.body.course

    const userCourse = await UserCourseModel.findOne({ user: userId, course: courseId })
    if (userCourse) {
        return next(createError("هذا الطالب مشترك بالفعل", 400, FAILED))
    }

    const [doc] = await Promise.all([
        await UserCourseModel.create(req.body),
        await UserModel.updateOne({ _id: userId }, {
            $push: { courses: courseId },
        })
    ]).catch(err => {
        return next(err)
    })

    return res.status(201).json({ status: SUCCESS, values: doc, message: 'تم الانشاء بنجاح' })
})
// insertOne(UserCourseModel)
//add to courses in user
module.exports = {
    getCourseSubscriptions, analysisSubscriptions, userCoursesParams, updateSubscription, addSubscription, removeSubscription,
    updateChapterIndex
}