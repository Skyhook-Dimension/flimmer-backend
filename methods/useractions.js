var User = require('../models/user')
var Flim = require('../models/flim')
var jwt = require('jwt-simple')
var jwt2 = require('jsonwebtoken')
var config = require('../config/dbconfig')
var mongoose = require('mongoose')
const passport = require('passport');

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
                            console.log('JSON')
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

    login: function(req, res) {

        passport.authenticate('local', { session: false }, (err, user, info) => {
                console.log(err);
                if (err || !user) {
                    return res.status(400).json({
                        message: info ? info.message : 'Login failed',
                        user: user
                    });
                }

                req.login(user, { session: false }, (err) => {
                    if (err) {
                        res.send(err);
                    }

                    const token = jwt2.sign(user, config.secret);

                    return res.json({ user, token });
                });
            })
            //(req, res);

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



}


module.exports = functions