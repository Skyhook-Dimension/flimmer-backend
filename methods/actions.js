var User = require('../models/user')
var Flim = require('../models/flim')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var mongoose = require('mongoose')

var functions = {
    addNew: function(req, res) {
        if ((!req.body.name) || (!req.body.password)) {
            res.json({ success: false, msg: 'Enter all fields' })
        } else {
            var newUser = User({
                name: req.body.name,
                password: req.body.password,
            })

            newUser.save(function(err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })

                } else {
                    res.json({ success: true, msg: newUser._id })
                }
            })
        }
    },

    authenticate: function(req, res) {
        User.findOne({
            name: req.body.name
        }, function(err, user) {
            if (err)
                throw err

            if (!user) {
                res.status(403).send({ success: false, msg: 'Authentication Faild, User Not Found!' })
            } else {
                user.comparePassword(req.body.password, function(err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret)
                            res.json({ success: true, token: token })

                        } else {
                            return res.status(403).send({ success: false, msg: 'Authentication Faild, Password does not Match!' })
                        }
                    })
                    //res.send('Dashboard')

            }
        })
    },

    getinfo: function(req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

            console.log(req.headers.authorization)
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({ success: true, msg: decodedtoken.name })
        } else {
            return res.json({ success: false, msg: `No Headers` })

        }

    },

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
    },
    nextTen: function(req, res) {

       if(req.headers.id==null)
       {
           
     
        Flim.find(null, null, {
            sort: {
                createdAt: -1
            },
            limit: 10
        }
        ,
        function(err, flims) {
            if (err)
                throw err

            if (!flims) {
                res.json({ success: false, msg: 'No flims left' })
            } else {

                res.json({ success: true, msg: flims })
            }
        });


       }
       else 
       {
 
        
        Flim.find({ _id: {$lt: req.headers.id } }, null, {
            sort: {
                createdAt: -1
            },
            limit: 10
        }
        ,
        function(err, flims) {
            if (err)
                throw err

            if (!flims) {
                res.json({ success: false, msg: 'No flims left' })
            } else {

                res.json({ success: true, msg: flims })
            }
        });
       }
           

        }
    }

    




module.exports = functions