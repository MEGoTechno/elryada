const { default: mongoose } = require("mongoose");

//Tag payments => UserQuestionBank, getTags in controller, price in model
const tagSchema = new mongoose.Schema({
    grade: { type: mongoose.Schema.Types.ObjectId, ref: 'grade', required: true },
    name: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    isActive: { type: Boolean, default: true },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chapter' }],
    description: String,
    price: Number,
    isFree: Boolean
}, {
    timestamps: true,
    versionKey: false
})

const TagModel = mongoose.model('tag', tagSchema)
module.exports = TagModel
