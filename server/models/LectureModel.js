const mongoose = require("mongoose")
const CourseModel = require("./CourseModel")
const VideoModel = require("./VideoModel")
const sectionConstants = require("../tools/constants/sectionConstants")
const ExamModel = require("./ExamModel")
const LinkModel = require("./LinkModel")
const FileModel = require("./FileModel")
const GroupModel = require("./GroupModel")

const lectureSchema = new mongoose.Schema({
    grade: { type: mongoose.Schema.Types.ObjectId, ref: 'grade', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: CourseModel, required: true },
    isSalable: Boolean,
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chapter' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },

    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },

    dateStart: { type: Date },
    dateEnd: { type: Date },
    isMust: { type: Boolean, default: false },
    isCenter: { type: Boolean },
    isFree: { type: Boolean, },
    price: Number,

    index: { type: Number, required: true },
    sectionType: { type: String, required: true, enum: Object.values(sectionConstants) },//[sectionConstants.VIDEO, sectionConstants.EXAM, sectionConstants.LINK, sectionConstants.FILE]
    video: {
        type: mongoose.Schema.Types.ObjectId, ref: VideoModel
    },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: ExamModel },
    link: { type: mongoose.Schema.Types.ObjectId, ref: LinkModel },
    file: { type: mongoose.Schema.Types.ObjectId, ref: FileModel },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: GroupModel }],
    codes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'code' }],

}, {
    timestamps: true,
    versionKey: false
})


// Auto populate 'exam' and 'exam.questions'
function autoPopulateExam(next) {
    this.populate({
        path: 'exam',
        populate: [
            {
                path: 'questions',
                populate: {
                    path: 'tags',
                },
            },
        ],
    });
    next();
}

lectureSchema.pre('find', autoPopulateExam);
lectureSchema.pre('findOne', autoPopulateExam)


const LectureModel = mongoose.model("lecture", lectureSchema)
module.exports = LectureModel