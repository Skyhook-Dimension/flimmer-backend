var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var User = require('../models/user')
var config = require('./dbconfig')

module.exports = function(passport) {
    var opts = {}
    console.log('Inside Passport Function')
    console.log(ExtractJwt.fromAuthHeaderWithScheme('jwt'))

    opts.secretOrKey = config.secret
        // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    console.log('--------------> Inside Inside')
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log('Inside Inside')
        User.findById(jwt_payload.id, function(err, user) {
            if (err) {
                return done(err, false)
            }
            if (user) {
                console.log(user.username)
                return done(null, user)
            } else {
                return done(null, false)
            }
        })

        //done(null, user)
    }))

}