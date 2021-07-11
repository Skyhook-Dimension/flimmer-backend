import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const scriptSchema = new Schema({
    title: {
        type: String,
        required: true,

        trim: true
    },
    scriptBody: String,
    tags: [String],
    isPrivate: {
        type: Boolean,
        default: false
    },

    isForked: {
        type: Boolean,
        default: false
    },

    forkedFrom: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
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

scriptSchema.index({ createdBy: 1, title: 1 }, { unique: true })

export const Script = mongoose.model('Script', scriptSchema)