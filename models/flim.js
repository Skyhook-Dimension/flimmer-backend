import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const flimSchema = new Schema({
    movieTitle: String,
    moviePoster: String,
    movieYear: String,
    movieId: String,

    flimBody: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        min: 0,
        default: 0,
    },

}, { timestamps: true })


export const Flim = mongoose.model('Flim', flimSchema)