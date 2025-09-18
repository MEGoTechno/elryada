const mongoose = require("mongoose")
const UserModel = require("./UserModel")
const CourseModel = require("./CourseModel")


const userCourseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
    course: { type: mongoose.Schema.Types.ObjectId, ref: CourseModel },
    currentIndex: { type: Number, default: 1, min: [1, '1'], },
    payment: { type: Number, default: 0, min: [0, 'القيمة الدنيا هي 0'], },

    chapters: [{
        chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'chapter' },
        currentIndex: { type: Number, default: 1, min: [1, 'القيمة الدنيا هي 1'], }
    }]
}, {
    timestamps: true,
    versionKey: false
})

const UserCourseModel = mongoose.model("userCourse", userCourseSchema)
module.exports = UserCourseModel