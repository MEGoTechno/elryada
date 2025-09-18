const mongoose = require("mongoose")
const codeConstants = require("../tools/constants/codeConstants")
const UserModel = require("./UserModel")

const codeSchema = new mongoose.Schema({
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: UserModel }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, required: true },

    isChecked: { type: Boolean, default: false },
    code: { type: String, required: true, unique: true },
    type: {
        type: String, required: true,
        enum: [codeConstants.ACTIVATE, codeConstants.CENTER, codeConstants.WALLET, codeConstants.LECTURES]
    },
    price: { type: Number, default: 0, min: [0, "القيمة الدنيا هي 0 ريال"], max: [2000, "اقصى مبلغ هو 2000 ريال"] },
    isActive: { type: Boolean, default: true },
    numbers: { type: Number, default: 1, min: [0, 'القيمة الدنيا هي 0'], max: [200, 'اقصى عدد هو 200'] },
}, {
    timestamps: true,
    versionKey: false
})

const CodeModel = mongoose.model("code", codeSchema)
module.exports = CodeModel