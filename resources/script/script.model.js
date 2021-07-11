import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const scriptSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    scriptBody: String,
    tags: [String],
    isPrivate: {
        type: Boolean,
        default: false
    },

    forkable: {
        type: Boolean,
        default: true
    },

    fundable: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

export const Script = mongoose.model('Script', scriptSchema)