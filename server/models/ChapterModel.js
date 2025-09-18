const mongoose = require("mongoose")

const chapterSchema = new mongoose.Schema({
    name: String,
    description: String,
    isActive: { type: Boolean, default: true },
    // lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lecture' }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    isMust: Boolean
    // teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    // user: {type}
}, {
    timestamps: true,
    versionKey: false
})

const ChapterModel = mongoose.model("chapter", chapterSchema)
module.exports = ChapterModel