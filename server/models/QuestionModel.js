const mongoose = require('mongoose');
const filePlayers = require('../tools/constants/filePlayers');

const questionSchema = new mongoose.Schema({
    // questionId: String,
    //For Idea should Ref To => grade ;or; Tags
    prevId: String,
    grade: { type: mongoose.Schema.Types.ObjectId, ref: 'grade', required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },

    title: String,
    hints: String,
    points: { type: Number, default: 1 },

    options: [{ id: String, title: String }],
    rtOptionId: { type: String },

    isActive: { type: Boolean, default: true },
    clarifyText: String,
    clarifyUrl: String,
    // explanation: String,

    image: {
        url: String,
        // size: { type: Number },
        resource_type: String,
        player: { type: String, enum: [filePlayers.SERVER] }
    },
}, {
    timestamps: true,
    versionKey: false

});

const QuestionModel = mongoose.model('Question', questionSchema);
module.exports = QuestionModel