var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var flimSchema = new Schema({
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
    }
})


module.exports = mongoose.model('Flim', flimSchema)