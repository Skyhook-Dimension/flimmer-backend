var Flim = require('../models/flim')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var mongoose = require('mongoose')

var functions = {

    addFlim: function(req, res) {
        //res.json({ success: true, msg: 'newFlim._id' })

        if ((!req.body.userId) || (!req.body.flimBody)) {
            res.json({ success: false, msg: 'Enter all fields' })
        } else {
            var newFlim = Flim({
                userId: req.body.userId,
                flimBody: req.body.flimBody,
                movieTitle: req.body.movieTitle,
                moviePoster: req.body.moviePoster,
                movieYear: req.body.movieYear,
                movieId: req.body.movieId,

            })
            newFlim.save(function(err, newFlim) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })

                } else {
                    res.json({ success: true, msg: newFlim._id })
                }
            })
        }
    },

    fetchFlims: function(req, res) {

        if (!req.headers.userid) {
            res.json({ success: false, msg: 'Enter userId' })
        } else {
            Flim.find({ userId: req.headers.userid }, null, {
                    sort: {
                        createdAt: -1
                    }
                }

                ,
                function(err, flims) {
                    if (err)
                        throw err

                    if (!flims) {
                        res.json({ success: false, msg: 'No flims found for the user' })
                    } else {

                        res.json({ success: true, msg: flims })
                    }
                })

        }
    }

}


module.exports = functions