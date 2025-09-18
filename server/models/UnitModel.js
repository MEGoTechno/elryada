const mongoose = require("mongoose")

const unitSchema = new mongoose.Schema({
    grade: { type: mongoose.Schema.Types.ObjectId, ref: 'grade', required: true },
    name: { type: String },
}, {
    timestamps: true,
    versionKey: false
})

const UnitModel = mongoose.model("unit", unitSchema)
module.exports = UnitModel